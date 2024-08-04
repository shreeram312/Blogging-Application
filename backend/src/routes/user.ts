import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@shreeram312/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });
  console.log(user);

  if (!user) {
    return c.json({
      msg: user,
    });
  }

  const token = await sign({ id: user.id }, c.env.SECRET);

  return c.json({
    jwt: token,
  });
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    return c.json({
      message: "Inputs are Incorrect",
    });
  }
  const user = await prisma.user.findFirst({
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
