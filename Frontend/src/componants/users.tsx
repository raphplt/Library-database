import { Book, User } from "@/pages";
import { searchByUser } from "@/services/books.services";
import Link from "next/link";
import { useRouter } from "next/router";
import { pid } from "process";
import { useEffect, useState } from "react";

export default function UserCard(props: any) {
  const [booksUser, setBooksUser] = useState<Book[]>([]);

  const router = useRouter();
  const id: number = props.id;

  useEffect(() => {
    const result = async () => {
      const res = await searchByUser(id);
      setBooksUser(res);
    };
    result();
  }, [id]);

  return (
    <div className="flex justify-around items-center w-1/2 py-5 mx-auto drop-shadow-sm my-12 rounded-lg bg-[#ece9e9]">
      <div className="flex justify-center">
        {props.firstName} {props.lastName}
      </div>
      <div className="flex justify-center">{props.email}</div>
      <div> Livres empruntés : {booksUser.length}</div>
      <div className="rounded-lg bg-[rgb(92,55,8)] hover:bg-[rgb(134,96,46)] text-white cursor-pointer w-fit px-2 py-1 mt-2">
        <Link href={`../gestion/update-user/${props.id}`}>
          Éditer le membre
        </Link>
      </div>
    </div>
  );
}
