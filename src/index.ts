import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
// traduza para portugues
AppDataSource.initialize()
  .then(async () => {
    console.log("Inserindo um novo usuário no banco de dados...");
    const user = new User();
    user.name = "Gabriel Silvio";
    user.username = "gabriel";
    user.avatar = "https://github.com/gab-szz.png";
    await AppDataSource.manager.save(user);
    console.log("Usuário salvo com id: " + user.id);

    console.log("Carregando usuários do banco de dados...");
    const users = await AppDataSource.manager.find(User);
    console.log("Usuários carregados: ", users);

    console.log(
      "Aqui você pode configurar e executar express / fastify / qualquer outro framework."
    );
  })
  .catch((error) => console.log(error));
