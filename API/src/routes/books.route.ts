import { PrismaClient } from "@prisma/client";
import {
  create,
  deleteOne,
  getAll,
  getById,
  search,
  searchByUser,
  updateOne,
} from "../controller/books.controllers";

const express = require("express");

// Router instantiation
const router = express.Router();

// Routes

// Get all elements of the ressource
router.get("/", getAll);

// Get one element by id
router.get("/searchOne", getById);

// Search elements
router.get("/search", search);



// Create an element of the ressource
router.post("/", create);

// Update an element of the ressource
router.put("/:id", updateOne);

// Delete an element of the resource
router.delete("/:id", deleteOne);

// Search an element of the resource by user
router.get("/searchByUser", searchByUser);

// Export the instance of the route
export default router;
