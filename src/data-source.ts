import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { env } from "./env";
import { Post } from "./entity/Post";

export const dataSourceConfig = new DataSource({
  type: "postgres",
  host: env.HOST_BD,
  port: env.PORTA_BD,
  username: env.USUARIO_BD,
  database: env.NOME_BD,
  logging: false,
  entities: [User, Post],

  migrationsRun: true,
  subscribers: [],
});

// Função Singleton para obter a conexão
export async function getDataSource(): Promise<DataSource> {
  if (dataSourceConfig.isInitialized) {
    console.log("Reutilizando conexão com o banco de dados existente.");
    return dataSourceConfig;
  }

  try {
    console.log("Inicializando nova conexão com o banco de dados...");
    const newDataSource = await dataSourceConfig.initialize();
    console.log("Conexão com o banco de dados inicializada com sucesso!");
    return newDataSource;
  } catch (error) {
    console.error("Erro ao inicializar a conexão com o banco de dados:", error);
    throw error; // Lança o erro para que a aplicação saiba que falhou
  }
}
