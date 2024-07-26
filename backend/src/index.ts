import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono,,,,!");
});

app.post("/api/v1/user/signup", (c) => {
  return c.json({
    message: "hey",
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
