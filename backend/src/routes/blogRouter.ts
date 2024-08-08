import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createblogInput, updateblogInput } from "@shreeram312/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

//....................................................................................
// Middleware.js

blogRouter.use("/*", async (c, next) => {
  //get the header
  // verify the header
  //if the header is correct then good to go
  // else return 403 status code to user
  const jwt = c.req.header("Authorization") || "";
  if (!jwt || !jwt.startsWith("Bearer ")) {
    c.status(403);
    return c.json({
      msg: "No JWT or incorrect format",
    });
  }

  const token = jwt.split(" ")[1];

  const payload = await verify(token, c.env.SECRET);
  console.log(payload);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  //@ts-ignore

  c.set("userId", payload.id);
  await next();
});

//......................................................................................
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = createblogInput.safeParse(body);

  if (!success) {
    return c.json({
      message: "Inputs are Incorrect",
    });
  }
  const authorId = c.get("userId");
  console.log(authorId);

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: String(authorId),
    },
  });

  return c.json({
    message: blog,
  });
});

//.....................................................................................

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = updateblogInput.safeParse(body);

  if (!success) {
    return c.json({
      message: "Inputs are Incorrect",
    });
  }

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    message: blog,
  });
});

//.................................................................................

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");

    const blog = await prisma.blog.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log(blog);

    if (!blog) {
      return c.json({ message: "Blog not found" }, { status: 404 });
    }

    return c.json(blog);
  } catch (e) {
    // @ts-ignore
    console.log(e);
  }
});

//.................................................................................

//add  pagination
blogRouter.get("/bulk/new", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");
  const blogs = await prisma.blog.findMany({
    where: {
      authorId,
    },
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({ blogs });
});
