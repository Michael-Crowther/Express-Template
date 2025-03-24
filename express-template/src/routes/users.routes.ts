import { Router } from "express";
import { db } from "../db";

const usersRouter = Router();

usersRouter.get("/", async (_req, res) => {
  const dbUsers = await db.query.users.findMany();

  res.json(dbUsers);
});

export default usersRouter;
