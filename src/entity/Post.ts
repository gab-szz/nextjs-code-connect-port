import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "post", schema: "public" })
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cover!: string;

  @Column()
  title!: string;

  @Column()
  slug!: string;

  @Column()
  body!: string;

  @Column()
  markdown!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  authorId!: number;

  @ManyToOne("User", "posts")
  author!: unknown;
}
