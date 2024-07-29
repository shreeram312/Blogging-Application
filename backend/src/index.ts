import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono,,!");
});

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    return c.json({
      msg: "User Not found",
    });
  }

  const token = sign({ id: user.id }, c.env.SECRET);

  return c.json({
    jwt: token,
  });
});

app.post("/api/v1/user/signin", (c) => {
  return c.text("hi");
});

app.post("/api/v1/blog", (c) => {
  return c.text("hi");
});

app.put("/api/v1/blog", (c) => {
  return c.text("hey blog");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("hey...");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("bye....");
});

export default app;
