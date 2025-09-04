import Image from "next/image";
import { Avatar } from "../Avatar";
import styles from "./cardpost.module.css";
import Link from "next/link";

type CardPostProps = {
  highlight?: boolean;
  post: {
    id: number;
    cover: string;
    title: string;
    slug: string;
    body: string;
    markdown: string;
    author: {
      id: number;
      name: string;
      username: string;
      avatar: string;
    };
  };
};

export const CardPost = ({ post }: CardPostProps) => {
  return (
    <Link href={`/posts/${post.slug}`} className={styles.link}>
      <article className={styles.card}>
        <header className={styles.header}>
          <figure>
            <Image
              src={post.cover}
              alt={`Capa da postagem com titulo ${post.title}`}
              width={438}
              height={133}
            />
          </figure>
        </header>
        <section className={styles.body}>
          {post.title} {post.body}
        </section>
        <footer className={styles.footer}>
          <Avatar name={post.author.name} imagesrc={post.author.avatar} />
        </footer>
      </article>
    </Link>
  );
};
