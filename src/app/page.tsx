// src/app/page.tsx

import { CardPost } from "../components/CardPost";
import { PaginatedPost, IPost } from "./types";
import logger from "../logger";
import styles from "./page.module.css";
import Link from "next/link";
import { getDataSource } from "../data-source"; // Importe a nova função
import { Post } from "../entity/Post";

async function getAllPosts(page: number): Promise<PaginatedPost> {
  const LIMIT = 4;

  try {
    const dataSource = await getDataSource();

    const postRepository = dataSource.getRepository(Post);

    const [posts, total] = await postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author")
      .orderBy("post.createdAt", "DESC")
      .skip((page - 1) * LIMIT)
      .take(LIMIT)
      .getManyAndCount();

    const lastPage = Math.ceil(total / LIMIT);
    const prev = page > 1 ? page - 1 : null;
    const next = page < lastPage ? page + 1 : null;

    return {
      data: posts,
      prev,
      next,
      page: page,
    };
  } catch (error) {
    // É uma boa prática logar o erro real
    logger.error("Ops, alguma coisa deu errado ao buscar os posts.", { error });
    console.error(error); // Também logue no console para visibilidade imediata

    return { data: [], prev: null, next: null, page: 1 };
  }
}

// O resto do seu componente Home permanece o mesmo
export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page) : 1;
  if (isNaN(currentPage) || currentPage < 1) {
    throw new Error("Parâmetro de página inválido");
  }

  const { data: posts, prev, next } = await getAllPosts(currentPage);

  return (
    <div className={styles.grid}>
      {posts.map((post: IPost) => (
        <CardPost key={post.id} post={post} />
      ))}
      <div className={styles.links}>
        {prev && <Link href={`/?page=${prev}`}>Página anterior</Link>}
        {next && <Link href={`/?page=${next}`}>Próxima página</Link>}
      </div>
    </div>
  );
}
