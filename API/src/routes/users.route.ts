import {
  create,
  deleteOne,
  getAll,
  getById,
  search,
  updateOne,
  loginController,
  modifPasswordController,
  getEmployees,
  getUsers
} from "../controller/users.controller";

const express = require("express");

// Router instantiation
const router = express.Router();

// Routes

// Get all elements of the ressource
router.get("/", getAll);

// Get all Users
router.get("/getUsers", getUsers);

// Search an element of the resource
router.get("/search", search);

// Get employees
router.get("/getEmployees", getEmployees);

// Get one element by id
router.get("/searchOne", getById);

// Get one element by id
router.get("/:id", getById);

// Create an element of the ressource
router.post("/register", create);

// Update an element of the ressource
router.put("/:id", updateOne);

// Delete an element of the resource
router.delete("/:id", deleteOne);

// Login
router.post("/login", loginController);

// search an element of the resource
router.get("/search", search);

router.post("/modifPassword/:id", modifPasswordController);

// Export the instance of the route
export default router;
