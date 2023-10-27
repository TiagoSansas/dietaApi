import { Knex } from "knex";

declare module "knex/types/tables" {
  interface User {
    id: string;
    name: string;
  }

  interface Tables {
    users: User;
  }
}
