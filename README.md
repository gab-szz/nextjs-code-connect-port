# Code Connect Port

> Portfólio Next.js — Projeto desenvolvido por Gabriel para demonstrar habilidades com Next.js, React, TypeScript e boas práticas modernas de front-end.

## Sobre o projeto

O **Code Connect Port** é uma rede social fictícia para desenvolvedores, onde posts técnicos são exibidos em cards, com navegação paginada, visualização detalhada e layout responsivo. O objetivo é servir como portfólio, mostrando domínio de Next.js, componentes reutilizáveis, integração com API REST e estilização avançada.

### Funcionalidades

- Listagem de posts paginada
- Visualização detalhada de cada post
- Cards com imagem, título, resumo e autor
- Avatar do autor
- Navegação entre páginas
- Conversão de markdown para HTML no detalhe do post
- Layout responsivo com CSS Modules
- Logger customizado com Winston
- Backend simulado com JSON Server

### Tecnologias utilizadas

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
- [Winston](https://github.com/winstonjs/winston) para logs
- [remark](https://github.com/remarkjs/remark) e [remark-html](https://github.com/remarkjs/remark-html) para converter markdown
- [json-server](https://github.com/typicode/json-server) para simular API

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o backend (API fake):
   ```bash
   npm run backend
   ```
3. Inicie o servidor Next.js:
   ```bash
   npm run dev
   ```
4. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura de pastas

- `src/app` — Páginas e estilos globais
- `src/components` — Componentes reutilizáveis (CardPost, Avatar, Aside)
- `posts.json` — Base de dados fake para os posts
- `src/logger.ts` — Logger customizado

## Demonstração

![Demonstração da listagem de posts](./public/demo-listagem.png)
![Demonstração do detalhe do post](./public/demo-detalhe.png)

## Autor

Gabriel — [github.com/gab-szz](https://github.com/gab-szz)

---

Este projeto é parte do meu portfólio. Fique à vontade para clonar, estudar e sugerir melhorias!
