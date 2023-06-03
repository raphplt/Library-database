import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import IBook from "../interfaces/books";

const prisma = new PrismaClient();

export const createController = async (req: Request) => {
  const bookData = {
    genre: req.body.query.genre,
    title: req.body.query.title,
    author: req.body.query.author,
    description: req.body.query.description,
    publishedAt: req.body.query.publishedAt,
    publisher: req.body.query.publisher,
    isAvailable: req.body.query.isAvailable,
    dateLeave: null,
    dateReturn: null,
    idUserHasBook: undefined,
    isbn: parseInt(String(req.body.query.isbn)),
    createdAt: null,
    lastModified: null,
  };
  // console.log(req.body.query.title);
  const createOne = await prisma.book.create({
    data: bookData,
  });

  return createOne;
};

export const updateController = async (id: number, req: Request) => {
  const isbn: number = req.body.data.isbn;
  const bookData = {
    genre: req.body.data.genre,
    title: req.body.data.title,
    author: req.body.data.author,
    description: req.body.data.description,
    publishedAt: req.body.data.publishedAt,
    publisher: req.body.data.publisher,
    isAvailable: req.body.data.isAvailable,
    dateLeave: req.body.data.dateLeave,
    dateReturn: req.body.data.dateReturn,
    idUserHasBook: parseInt(String(req.body.data.idUserHasBook)) || null,
    isbn: parseInt(String(req.body.data.isbn)),
  };

  try {
    const update = await prisma.book.update({
      where: { isbn },
      data: bookData,
    });
    console.log("Livre mis à jour");
    return update;
  } catch (error) {
    console.error(error);
  }
};

export const deleteController = async (req: Request) => {
  const id = parseInt(req.params.id, 10);

  const findOne = await prisma.book.findUnique({
    where: { id },
  });

  if (!findOne) {
    return null;
  }

  const destroyOne = await prisma.book.delete({
    where: { id },
  });

  return destroyOne;
};
