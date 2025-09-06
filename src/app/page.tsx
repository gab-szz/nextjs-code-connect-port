import { CardPost } from "../components/CardPost";
import { PaginatedPost, IPost } from "./types";
import logger from "../logger";
import styles from "./page.module.css";
import Link from "next/link";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";

async function getAllPosts(page: number): Promise<PaginatedPost> {
  try {
    const posts = await AppDataSource.getRepository(Post).find();
    return {
      data: posts,
      prev: null,
      next: null,
      page: page,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    logger.error("Ops, alguma coisa deu errado.");
    return { data: [], prev: null, next: null, page: 1 };
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
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
