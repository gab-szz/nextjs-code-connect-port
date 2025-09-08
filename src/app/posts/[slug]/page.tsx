import logger from "@/logger";
import { remark } from "remark";
import html from "remark-html";

import styles from "./page.module.css";
import { CardPost } from "@/components/CardPost";
import { getDataSource } from "@/data-source";
import { Post } from "@/entity/Post";
import { notFound } from "next/navigation";

async function getPostBySlug(slug: string) {
  try {
    const dataSource = await getDataSource();
    const postRepository = dataSource.getRepository(Post);
    const post = await postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author")
      .where("post.slug = :slug", { slug })
      .getOne();

    if (!post) {
      throw new Error("Post not found");
    }

    const processedContent = await remark().use(html).process(post.markdown);
    const contentHtml = processedContent.toString();

    post.markdown = contentHtml;

    return post;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    logger.error("Ops, alguma coisa deu errado.");
    notFound();
  }
}

type PagePostProps = {
  params: { slug: string };
};

const PagePost = async ({ params }: PagePostProps) => {
  const awaitedParams = await params;
  const post = await getPostBySlug(awaitedParams.slug);
  return (
    <div>
      <CardPost post={post} highlight />
      <h3 className={styles.subtitle}>Código:</h3>
      <div className={styles.code}>
        <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
      </div>
    </div>
  );
};

export default PagePost;
