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

  app.get("/:id", async (request) => {
    const getSnackIdParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = getSnackIdParams.parse(request.params);

    const snack = await knex("snack").where({ id }).first();
    return { snack };
  });

  app.get("/user/:id", async (request, response) => {
    const getUserIdParams = z.object({
      id: z.string().uuid(),
    });
    const { id } = getUserIdParams.parse(request.params);
    const userSnackList = await knex("snack")
      .where({ user_id: id })
      .select(
        "snack.id",
        "snack.name",
        "snack.description",
        "snack.date_time",
        "snack.pertence"
      );
    return { userSnackList };
  });

  app.get("/summary/:id", async (request, response) => {
    const getUserIdParams = z.object({
      id: z.string().uuid(),
    });
    const { id } = getUserIdParams.parse(request.params);
    const countTrue = await knex("snack")
      .where({ user_id: id, pertence: true })
      .count("pertence as count_true");
    const countFalse = await knex("snack")
      .where({ user_id: id, pertence: false })
      .count("pertence as count_false");
    return { countTrue, countFalse };
  });

  app.get("/fullsnack", async () => {
    const count = await knex("snack").count("* as total");
    return { count };
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

    try {
      const userExists = await knex("users").where({ id }).first();

      if (!userExists) {
        return response.status(404).send({ error: "Usuário não encontrado" });
      }

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
  app.put("/:id", async (request, response) => {
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

    try {
      const dateTime = new Date(date_time);

      await knex("snack")
        .update({
          name,
          description,
          date_time: dateTime,
          pertence,
        })
        .where({ id });

      response.status(204).send();
    } catch (error) {
      response.status(500).send();
    }
  });
  app.delete("/:id", async (request, response) => {
    const getUserIdParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = getUserIdParams.parse(request.params);

    await knex("snack").where({ id }).delete();
    return response.status(204).send();
  });
}
