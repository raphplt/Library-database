import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import IUser from "../interfaces/users";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createController = async (req: Request) => {
  const salt: string = await bcrypt.genSalt(10);
  const hash: string = await bcrypt.hash(req.body.password, salt);
  const role = "user";
  const createOne = await prisma.user.create({
    data: {
      role: role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: parseInt(String(req.body.phone)),
      password_hash: hash,
      password_salt: salt,
      endSubscription: new Date(),
      books: undefined,
      contractStart: new Date(),
      contractEnd: new Date(),
      subscriber: false,
      salary: 0,
    },
  });

  return createOne;
};

export const getHashById = async (id: string) => {
  const parsedId = parseInt(id, 10);
  const Hash = await prisma.user.findUnique({
    where: { id: parsedId },
    select: {
      password_hash: true,
    },
  });

  return Hash;
};

export const getHashByEmail = async (email: string) => {
  const Hash = await prisma.user.findUnique({
    where: { email },
    select: {
      password_hash: true,
    },
  });

  return Hash;
};

export const comparePasswordById = async (OldPass: string, id: string) => {
  const hash = await getHashById(id);

  if (hash !== null) {
    const compare = bcrypt.compare(OldPass, hash.password_hash);
    return compare;
  }

  return false;
};

export const comparePasswordByEmail = async (
  OldPass: string,
  email: string
) => {
  const hash = await getHashByEmail(email);

  if (hash !== null) {
    const compare = bcrypt.compare(OldPass, hash.password_hash);
    return compare;
  }

  return false;
};

export const modifPassword = async (req: Request) => {
  const uid = req.params.id;
  const pass = await comparePasswordById(req.body.oldPass, uid);
  if (pass) {
    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(req.body.newPass, salt);
    const update = await prisma.user.update({
      where: { id: parseInt(uid, 10) },
      data: {
        password_hash: hash,
        password_salt: salt,
      },
    });
    return update;
  } else {
    return null;
  }
};

export const login = async (req: Request) => {
  let value = {};
  let access = false;
  const findOne = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (!findOne) {
    return null;
  }
  const compare = await comparePasswordByEmail(
    req.body.password,
    req.body.email
  );
  if (compare) {
    access = true;
  } else {
    Object.assign(value, { status: "Erreur" });
  }

  if (findOne.role === "admin" && access === true) {
    Object.assign(value, { status: "admin" });
  } else {
    Object.assign(value, { status: "user" });
  }
  Object.assign(value, { id: findOne.id });
  return value;
};
// 0 = mdp incorrect
// 1 = mdp correct user
// 2 = mdp correct admin




export const updateController = async (req: Request) => {
  const id = parseInt(req.params.id, 10);
  const findOne = await prisma.user.findUnique({
    where: { id },
  });
  if (!findOne) {
    return null;
  }
  const update = await prisma.user.update({
    where: { id },
    data: {
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      endSubscription: req.body.endSubscription,
      //books: req.body.books,
      contractStart: req.body.contractStart,
      contractEnd: req.body.contractEnd,
      subscriber: req.body.subscriber,
      salary: req.body.salary,
    },
  });

  return update;
};

export const deleteController = async (req: Request) => {
  const id = parseInt(req.params.id, 10);

  const findOne = await prisma.user.findUnique({
    where: { id },
  });

  if (!findOne) {
    return null;
  }

  const destroyOne = await prisma.user.delete({
    where: { id },
  });

  return destroyOne;
};