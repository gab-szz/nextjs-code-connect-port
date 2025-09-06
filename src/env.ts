// Carrega variáveis de ambiente do arquivo .env
import "dotenv/config";
import z from "zod";

/**
 * Esquema de validação para variáveis de ambiente da aplicação.
 * Garante que os valores estejam no formato esperado e fornece defaults onde aplicável.
 */
const envSchema = z.object({
  AMBIENTE: z
    .enum(["desenvolvimento", "producao", "teste"])
    .default("desenvolvimento"),
  PORTA: z.coerce.number().default(3030),
  USUARIO_BD: z.string(),
  HOST_BD: z.string(),
  NOME_BD: z.string(),
  SENHA_BD: z.string().optional(),
  PORTA_BD: z.coerce.number().default(3254),
});

// Valida as variáveis de ambiente usando o schema definido
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  // Exibe erro formatado no terminal caso alguma variável esteja inválida
  console.error("Variáveis de Ambiente inválidas", _env.error.format());

  // Interrompe a aplicação caso as variáveis estejam incorretas
  throw new Error("Variáveis de Ambiente inválidas");
}

/**
 * Objeto `env` contendo todas as variáveis de ambiente validadas e tipadas.
 * Pode ser importado e utilizado em qualquer parte da aplicação com segurança.
 */
export const env = _env.data;
