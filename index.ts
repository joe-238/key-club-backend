import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req: Request, res: Response) => {
  res.send("hi");
});
app.listen(port, () => {
  //how you acc start the server
  console.log(`Server is hosted on http://localhost:${port}`);
});

//backend for key club
