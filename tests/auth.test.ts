import request from "supertest";
import express from "express";
import authRouter from "../src/routers/auth";
import { connectDB } from "../src/db/mongoose";

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

beforeAll(async () => {
  await connectDB();
});

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        osis: 123456789,
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        grade: 10,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
  });

  it("should login a user", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBeDefined();
  });

  it("should not login with wrong password", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword",
      });

    expect(response.status).toBe(401);
  });
});