import IUser from "./users";

export default interface IBook {
  id?: Number;
  title?: string;
  genre?: Array<string>;
  author?: string;
  description?: string;
  publishedAt?: string;
  publisher?: string;
  isAvailable?: boolean;
  dateLeave?: string | null;
  dateReturn?: string | null;
  user?: IUser | null;
  idUserHasBook?: number | null;
  isbn?: Number;
  createdAt?: string | null;
  lastModified?: string | null;
}
