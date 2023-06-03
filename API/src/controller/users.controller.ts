// Importing external variables and functions
import { Request, Response } from "express";
import {
  createController,
  updateController,
  deleteController,
  login,
  modifPassword,
} from "../services/users.services";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all elements
export async function getAll(req: Request, res: Response) {
  const findAll = await prisma.user.findMany();
  if (findAll === null) {
    res.sendStatus(404);
  } else {
    res.send(JSON.stringify(findAll));
  }
}


// Get all Users
export async function getUsers(req: Request, res: Response) {
  const findAll = await prisma.user.findMany({
    where: {
      role: "user",
    },
  });
  if (findAll === null) {
    res.sendStatus(404);
  } else {
    res.send(JSON.stringify(findAll));
  }
}
// Get all employees
export async function getEmployees(req: Request, res: Response) {
  const findAll = await prisma.user.findMany({
    where: {
      role: "admin",
    },
  });
  if (findAll === null) {
    res.sendStatus(404);
  } else {
    res.send(JSON.stringify(findAll));
  }
}

// Get one element
export async function getById(req: Request, res: Response) {
  const { query }: any = req.query;
  const id: number = Math.floor(parseInt(String(query)));
  if (isNaN(id)) {
    res.status(200);
    // console.log("ID is not a number.");
    return;
  }
  const findOne = await prisma.user.findUnique({
    where: { id },
  });
  if (findOne === null) {
    res.sendStatus(404);
    console.log("User not found");
  } else {
    res.send(JSON.stringify(findOne));
    // console.log("User found");
  }
}

// Create an element
export async function create(req: Request, res: Response) {
  if (req.body === null) {
    res.sendStatus(406);
  } else {
    createController(req);
    res.send("Compte créé avec succès.");
  }
}

// Update an elemment
export async function updateOne(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  const find = await prisma.user.findUnique({ where: { id } });
  if (find === null) {
    res.sendStatus(406);
  } else {
    updateController(req);
    res.send("User updated successfully.");
  }
}

// Delete an element
export async function deleteOne(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  const find = await prisma.user.findUnique({
    where: { id },
  });
  if (find === null) {
    res.sendStatus(406);
  } else {
    deleteController(req);
    res.send("Resource deleted successfully.");
  }
}

export async function search(req: Request, res: Response) {
  const { query }: any = req.query;
  try {
    const results = await prisma.user.findMany({
      where: {
        OR: [
          { firstName: { contains: query } },
          { lastName: { contains: query } },
        ],
      },
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de la recherche." });
  }
}

export async function loginController(req: Request, res: Response) {
  if (req.body === null) {
    res.sendStatus(406);
  } else {
    const result = await login(req);
    res.send(result);
  }
}
//0 = mdp incorrect
//1 = mdp correct user
//2 = mdp correct admin

export async function modifPasswordController(req: Request, res: Response) {
  const modif = await modifPassword(req);
  if (modif === null) {
    res.sendStatus(406);  } else {
    res.send("Password modified successfully.");
  }
}