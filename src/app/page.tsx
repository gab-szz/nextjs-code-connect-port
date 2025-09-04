import { CardPost } from "@/components/CardPost";
import { PaginatedPost, Post } from "./types";
import logger from "@/logger";
import styles from "./page.module.css";
import Link from "next/link";

async function getAllPosts(page: number): Promise<PaginatedPost> {
  const response = await fetch(
    `http://localhost:3042/posts?_page=${page}&_per_page=6`
  );

  if (!response.ok) {
    logger.error("Ops, alguma coisa deu errado.");
  }

  logger.info("Posts obtidos com sucesso!");
  return response.json() as Promise<PaginatedPost>;
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
      {posts.map((post: Post) => (
        <CardPost key={post.id} post={post} />
      ))}
      <div className={styles.links}>
        {prev && <Link href={`/?page=${prev}`}>Página anterior</Link>}
        {next && <Link href={`/?page=${next}`}>Próxima página</Link>}
      </div>
    </div>
  );
}
