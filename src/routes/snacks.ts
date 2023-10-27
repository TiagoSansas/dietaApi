import { randomUUID } from "crypto";
import { knex } from "../database";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function snacksRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const snacks = await knex("snack")
      .select(
        "snack.id",
        "snack.name",
        "snack.description",
        "snack.date_time",
        "snack.pertence",
        "users.name as nameUser"
      )
      .join("users", "snack.user_id", "users.id");
    return {
      snacks,
    };
  });

  app.post("/:id", async (request, response) => {
    const createSnackSchema = z.object({
      name: z.string(),
      description: z.string(),
      date_time: z.string(),
      pertence: z.boolean(),
    });
    const getUserIdParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = getUserIdParams.parse(request.params);
    const { name, description, date_time, pertence } = createSnackSchema.parse(
      request.body
    );
    debugger;
    try {
      const userExists = await knex("users").where({ id }).first();

      if (!userExists) {
        return response.status(404).send({ error: "Usuário não encontrado" });
      }

      console.log(request.body);
      const dateTime = new Date(date_time);

      await knex("snack").insert({
        id: randomUUID(),
        name,
        description,
        date_time: dateTime,
        pertence,
        user_id: id,
      });

      response.status(201).send();
    } catch (error) {
      response.status(500).send();
    }
  });
}
