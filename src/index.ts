import express, { Request, Response } from "express";
import { connectDB } from "./db/mongoose";
import usersRouter from "./routers/users";
const app = express();
app.use(express.json());

app.use("/users", usersRouter);

const port = process.env.PORT || 3000;
app.get("/", (req: Request, res: Response) => {
  res.send("hi");
});
async function startServer() {
  await connectDB(); // wait for DB connection first

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
startServer();
//backend for key club
//use postman to test data
