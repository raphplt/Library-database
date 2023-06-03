// Importing external variables and functions
import { Request, Response } from "express";
import {
  createController,
  updateController,
  deleteController,
} from "../services/books.services";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all elements
export async function getAll(req: Request, res: Response) {
  const findAll = await prisma.book.findMany();
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
    return;
  }
  const findOne = await prisma.book.findUnique({
    where: { id: id as unknown as Prisma.UserWhereUniqueInput["id"] },
  });
  if (findOne === null) {
    res.sendStatus(404);
    // console.log("Book not found");
  } else {
    res.send(JSON.stringify(findOne));
    // console.log("Book found");
  }
}

// Create an element
export async function create(req: Request, res: Response) {
  if (req.body === null) {
    res.sendStatus(406);
  } else {
    createController(req);
    res.send("Book created successfully.");
  }
}

// Update an elemment
export async function updateOne(req: Request, res: Response) {
  let id: number = Math.floor(parseFloat(req.params.id));
  const find = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (find === null) {
    res.sendStatus(406);
  } else {
    // console.log("Book found");
    updateController(id, req);
    res.send("Book updated successfully.");
  }
}

// Delete an element
export async function deleteOne(req: Request, res: Response) {
  const id: number = parseInt(req.params.id, 10);
  const find = await prisma.book.findUnique({ where: { id } });
  if (find === null) {
    res.sendStatus(406);
  } else {
    deleteController(req);
    res.send("Book deleted successfully.");
  }
}

// Search elements
export async function search(req: Request, res: Response) {
  const { query }: any = req.query;
  console.log(query);
  try {
    const results = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { author: { contains: query } },
          { description: { contains: query } },
        ],
      },
    });

    res.json(results);
    // console.log(results.length, "books found");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de la recherche." });
  }
}

// Search elements by user
export async function searchByUser(req: Request, res: Response) {
  const { query }: any = req.query;
  let id: number | null = parseInt(String(query));

  if (isNaN(id)) {
    res.status(200);
    return;
  }

  try {
    const results = await prisma.book.findMany({
      where: { idUserHasBook: id },
    });

    res.json(results);
    // console.log(results.length, "books found for this user");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de la recherche." });
  }
}
