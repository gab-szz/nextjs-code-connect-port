import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("post")
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
