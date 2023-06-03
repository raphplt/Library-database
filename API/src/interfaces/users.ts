import IBook from "./books";

export default interface IUser {
  id?: number;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: number | null;
  password_hash: string;
  password_salt: string;
  endSubscription?: Date | null;
  books: IBook[];
  contractStart?: Date | null;
  contractEnd?: Date | null;
  subscriber?: boolean | null;
  salary?: number | null;
  createdAt?: Date | null;
  lastModified?: Date | null;
}
