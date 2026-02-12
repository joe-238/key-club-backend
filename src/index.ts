import express, { Request, Response } from "express";
import userRouter from "./routers/user";
const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req: Request, res: Response) => {
  res.send("hi");
});
app.use("/user", userRouter);
app.listen(port, () => {
  //how you acc start the server
  console.log(`Server is hosted on http://localhost:${port}`);
});

//backend for key club
//use postman to test data
