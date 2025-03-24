import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";

export const db = drizzle({
  schema,
  mode: "default",
  connection: { uri: process.env.DATABASE_URL },
});
