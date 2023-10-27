import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("snack", (table) => {
    table.uuid("id").notNullable().primary;
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.dateTime("date_time").notNullable();
    table.boolean("pertence");

    table.string("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("snack");
}
