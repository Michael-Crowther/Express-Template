import { config } from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.routes";
import { errorHandler } from "./middleware/error-handler";
import { users } from "./db/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Load environment variables from .env file
config();

const app = express();

// Port the server runs on
const PORT = process.env.PORT || 8080;

// CORS allows the frontend to communicate with the backend
// since it's on a different port (3000)
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// This tells Express that we are only handling JSON
app.use(express.json());

// User routes
app.use("/users", userRoutes);

// Gracefully handle errors and return a message to the frontend
app.use(errorHandler);

// Start server
app.listen(PORT, async () => {
  await db.delete(users).where(eq(users.email, "john@example.com"));

  const user: typeof users.$inferInsert = {
    name: "John",
    age: 30,
    email: "john@example.com",
  };

  await db.insert(users).values(user);

  console.log(`Server running at http://localhost:${PORT}`);
});
