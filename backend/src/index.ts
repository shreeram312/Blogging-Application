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

app.use("/api/v1/blog/*", async (c, next) => {
  //get the header
  // verify the header
  //if the header is correct then good to go
  // else return 403 status code to user
  const jwt = c.req.header("Authorization");
  if (!jwt || !jwt.startsWith("Bearer ")) {
    c.status(403); // You might want to use 401 for unauthorized access
    return c.json({
      msg: "No JWT or incorrect format",
    });
  }

  const token = jwt.split(" ")[1];
  console.log(token);
  const payload = await verify(token, c.env.SECRET);
  console.log(payload);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set(userId, payload.id);
  await next();
});

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
  console.log(user);

  if (!user) {
    return c.json({
      msg: "User Not found",
    });
  }

  const token = await sign({ id: user.id }, c.env.SECRET);

  return c.json({
    jwt: token,
  });
});

app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({
      message: "Invalid Creditionals",
    });
  }

  const token = await sign({ id: user.id }, c.env.SECRET);

  return c.json({
    jwt: token,
  });
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
