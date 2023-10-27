import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "crypto";
import { knex } from "../database";

export async function usersRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const users = await knex("users").select("*");
    return { users };
  });

  app.get("/:id", async (request) => {
    const getUserParamsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = getUserParamsSchema.parse(request.params);

    const user = await knex("users").where({ id }).first();

    return { user };
  });

  app.post("/", async (request, response) => {
    const createUserBodySchema = z.object({
      name: z.string(),
    });
    const { name } = createUserBodySchema.parse(request.body);

    await knex("users").insert({
      id: randomUUID(),
      name,
    });
    return response.status(201).send();
  });

  app.put("/:id", async (request, response) => {
    const gettIdParamsSchema = z.object({
      id: z.string().uuid(),
    });
    const getNameParamsSchema = z.object({
      name: z.string(),
    });
    const { id } = gettIdParamsSchema.parse(request.params);
    const { name } = getNameParamsSchema.parse(request.body);

    try {
      await knex("users").update({ name }).where({ id });
      return response.status(204).send();
    } catch (error) {
      console.error("Erro na atualizacao");
    }
  });

  app.delete("/:id", async (request, response) => {
    const gettIdParamsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = gettIdParamsSchema.parse(request.params);

    const user = await knex("users").where({ id }).first();
    if (!user) {
      return response.status(400).send({ message: "Registro não encontrado" });
    }

    await knex("users").where({ id }).delete();
    return response.status(204).send();
  });
}
