# Desafio Adireto Brasil
Desafio consiste em criar um sistema que simule a bricandeira "Amigo Secreto"

1. Crie um backend simples usando mongoose e algum framework web qualquer para salvar as pessoas (nome, email, amigo). Um CRUD bem simples mesmo.

2. Crie um frontend bem simples usando Angular ou React para listar, cadastrar, editar e apagar as pessoas e realizar o sorteio.

3. Crie um botão no frontend para realizar o sorteio e enviar para cada pessoa um email contendo o amigo sorteado. Salve o nome de cada amigo sorteado (campo amigo)

### Requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [MongoDB](https://github.com/mongodb/node-mongodb-native)

> Obs: Recomendo usar o Docker

**Siga os passos a seguir**

```bash
# Clone o projeto e acesse a pasta
$ git clone https://github.com/luanfj/ad-2019.git && cd ad-2019

# Instale as dependências
$ cd backend && yarn && cd .. && cd frontend && yarn

# Crie uma instância do mongoDB usando docker
$ docker run --name mongodb -p 27017:27017 -d -t mongo

# Inicie o backend
$ cd backend && yarn dev:server

# Inicie o frontend
$cd frontend && yarn start
```
