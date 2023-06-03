import Link from "next/link";
import MetaData from "./metadata";

export default function Header() {
  return (
    <div className="flex justify-center gap-16 mb-8">
      <MetaData />
      <Link href={"/gestion"}>
        <div className="hover:border-black border-b-2 border-transparent">
          Accueil
        </div>
      </Link>
      <Link href={"/gestion/emprunt"}>
        <div className="hover:border-black border-b-2 border-transparent">
          Emprunt
        </div>
      </Link>
      <Link href={"/gestion/books-admin"}>
        <div className="hover:border-black border-b-2 border-transparent">
          Gestion des livres
        </div>
      </Link>
      <Link href={"/gestion/users-admin"}>
        <div className="hover:border-black border-b-2 border-transparent">
          Gestion des membres
        </div>
      </Link>
      <Link href={"/gestion/employee-admin"}>
        <div className="hover:border-black border-b-2 border-transparent">
          Gestion des employés
        </div>
      </Link>
    </div>
  );
}
