import { Book, User } from "@/pages";
import { searchByUser } from "@/services/books.services";
import Link from "next/link";
import { useRouter } from "next/router";
import { pid } from "process";
import { useEffect, useState } from "react";

export default function AdminCard(props: any) {
  const options: any = { day: "2-digit", month: "2-digit", year: "numeric" };

  const dateStart = new Date(props.contractStart);
  const dateFormateedateStart = dateStart.toLocaleDateString("fr-FR", options);

  const dateReturn = new Date(props.contractEnd);
  const dateFormateedateEnd = dateReturn.toLocaleDateString("fr-FR", options);

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
      <div>Début du contrat : {dateFormateedateStart}</div>
      <div>Fin du contrat : {dateFormateedateEnd}</div>
    </div>
  );
}
