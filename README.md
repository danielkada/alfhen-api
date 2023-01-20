
# Alfhen API

## Essa é uma API que utiliza como base a BooksGoogle e sua variedade de livros, nela você pode se cadastrar como usuário e começar a anotar os livros que você lê, em que página parou e se já terminou o livro.

### Features

- [x] Criação, busca, alteração e remoção de usuário
- [x] Criação, busca, alteração e remoção de leitura
- [x] Criação e busca de livro

### Clone este repositório

$ git clone <https://github.com/danielkada/alfhen-api.git>

### Pré-requisitos

Antes de começar instale todas as dependência utilizando o yarn

$ yarn

ou npm

$ npm install

Crie o banco de dados com o docker

$ docker run --name alfhen -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

Rode todas as migrations

$ yarn migration:run

### Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Express](https://expressjs.com/pt-br/)
- [NodeJS](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [JWT](https://jwt.io/)
- [TypeORM](https://typeorm.io/)

### Autor
---

 <img style="border-radius: 50%;" src="https://scontent.frao5-1.fna.fbcdn.net/v/t39.30808-6/288509195_1011995556173209_6052091924153555660_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=174925&_nc_ohc=s376LQm8HuUAX8ZTsWX&_nc_ht=scontent.frao5-1.fna&oh=00_AfApIdxMprphhuie6LDXxOd9vYv_GR4jPsY7ZYc1mxYPMw&oe=63CFFA66" width="100px;" alt=""/>
 <br />
 <sub><b>Daniel Kadã</b></sub>


Feito durante meus estudos!

Entre em contato comigo.

<a href="https://www.linkedin.com/in/kadadniel/">Linkedin</a>
<a href="https://www.instagram.com/jvm_programador/">Instagran</a>
