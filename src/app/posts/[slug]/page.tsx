import logger from "@/logger";
import { remark } from "remark";
import html from "remark-html";

import styles from "./page.module.css";
import { CardPost } from "@/components/CardPost";

async function getPostBySlug(slug: string) {
  try {
    const url = `http://localhost:3042/posts?slug=${slug}`;
    const response = await fetch(url);
    if (!response.ok) {
      logger.error("Ops, alguma coisa correu mal");
      return {};
    }
    logger.info("Posts obtidos com sucesso");
    const data = await response.json();
    if (data.length == 0) {
      return {};
    }

    const post = data[0];

    const processedContent = await remark().use(html).process(post.markdown);
    const contentHtml = processedContent.toString();

    post.markdown = contentHtml;

    return post;
  } catch (error: unknown) {
    logger.error("Ops, alguma coisa deu errado.");
    if (error instanceof Error) {
      throw new Error(error.message || "Erro ao obter post");
    }
    throw new Error("Erro ao obter post");
  }
}

type PagePostProps = {
  params: { slug: string };
};

const PagePost = async ({ params }: PagePostProps) => {
  const post = await getPostBySlug(params.slug);
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
