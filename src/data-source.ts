import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { env } from "./env";
import { Post } from "./entity/Post";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.HOST_BD,
  port: env.PORTA_BD,
  username: env.USUARIO_BD,
  database: env.NOME_BD,
  synchronize: true,
  logging: false,
  entities: [User, Post],

  migrationsRun: true,
  subscribers: [],
});
