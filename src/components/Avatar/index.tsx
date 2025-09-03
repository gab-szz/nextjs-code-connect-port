import Image from "next/image";
import styles from "./avatar.module.css";

type AvatarProps = {
  name: string;
  imagesrc: string;
};

export const Avatar = ({ name, imagesrc }: AvatarProps) => {
  return (
    <ul className={styles.avatar}>
      <li>
        <Image
          src={imagesrc}
          alt={`Avatar do ${name}`}
          width={32}
          height={32}
        />
      </li>

      <li>@{name}</li>
    </ul>
  );
};
