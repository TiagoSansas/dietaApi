# Sistema de Cadastro de Usuários e Comidas
Este é um projeto simples de sistema de cadastro de usuários e comidas. O sistema permite o cadastro de usuários e suas preferências alimentares. 

## Funcionalidades
Cadastro de Usuários: Os usuários podem se cadastrar fornecendo nome.

Cadastro de Comidas: Os usuários podem adicionar informações sobre os alimentos que consomem.

## Como Usar
#### Instale as Dependências:

npm install

### Rode as migrations
#### Comando : npm run knex igrate:latest

#### Inicie o Aplicativo:
#### Comando : npm run dev

### Tecnologias Utilizadas
    * Node.Js
    * TypeScript
    * Knex (Construtor de consultas SQL)
    * Sqlite 3

### O que foi realizado no projeto

[x] Deve ser possível criar um usuário

[x] Deve ser possível identificar o usuário entre as requisições

[x] Deve ser possível registrar uma refeição feita, com as seguintes informações:

_As refeições devem ser relacionadas a um usuário._

    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta

[x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima

[x] Deve ser possível apagar uma refeição

[x] Deve ser possível listar todas as refeições de um usuário

[x] Deve ser possível visualizar uma única refeição

[x] Quantidade total de refeições registradas

[x] Quantidade total de refeições dentro da dieta

[x] Quantidade total de refeições fora da dieta
