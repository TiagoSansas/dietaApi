import fastify from "fastify";
import { usersRoutes } from "./routes/user";

const app = fastify();

app.register(usersRoutes, {
  prefix: "users",
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Conectado");
  });
