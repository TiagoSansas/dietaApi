import fastify from "fastify";
import { usersRoutes } from "./routes/user";
import { snacksRoutes } from "./routes/snacks";

const app = fastify();

app.register(usersRoutes, {
  prefix: "users",
});
app.register(snacksRoutes, {
  prefix: "snacks",
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Conectado");
  });
