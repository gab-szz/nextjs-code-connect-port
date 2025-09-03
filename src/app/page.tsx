import { CardPost } from "@/components/CardPost";
import { Post } from "./types";
import logger from "@/logger";

async function getAllPosts(): Promise<Post[]> {
  const response = await fetch("http://localhost:3042/posts");

  if (!response.ok) {
    logger.error("Ops, alguma coisa deu errado.");
  }

  logger.info("Posts obtidos com sucesso!");
  return response.json() as Promise<Post[]>;
}

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div className={"postsContainer"}>
      {posts.map((post: Post) => (
        <CardPost key={post.id} post={post} />
      ))}
    </div>
  );
}
