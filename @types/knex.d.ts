import { Knex } from "knex";

declare module "knex/types/tables" {
  interface User {
    id: string;
    name: string;
  }
  interface Snack {
    id: string;
    name: string;
    description: string;
    date_time: Date;
    pertence: boolean;
    user_id: string;
  }

  interface Tables {
    users: User;
    snack: Snack;
  }
}
