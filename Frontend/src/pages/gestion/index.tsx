import { fetchBooks } from "@/services/books.services";
import { useState, useEffect } from "react";
import { Book, User } from "..";
import BookCard from "@/componants/bookCard";
import { fetchUsers } from "@/services/users.services";
import UserCard from "@/componants/users";
import Link from "next/link";
import Metadata from "@/componants/metadata";
import SearchBar from "@/componants/searchbar";
import Header from "@/componants/header";
import Footer from "@/componants/footer";

export default function Index() {
  const [data, setData] = useState<Book[]>([]);
  const [dataUsers, setDataUsers] = useState<User[]>([]);
  const [resultats, setResultats] = useState<Book[]>([]);
  const [bookListLenght, setBookListLenght] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await fetchBooks();
      setData(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await fetchUsers();
      setDataUsers(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedResults = localStorage.getItem("searchResults");
    if (storedResults) {
      setResultats(JSON.parse(storedResults));
    }
  }, []);

  const bookLength = data.length || 0;
  return (
    <div className="bg-[#d1d1d1] pt-5 min-h-[100vh]">
      <Header />
      <h1 className="text-center py-4 px-4 rounded-lg text-2xl font-semibold bg-[#ece9e9] w-fit mx-auto drop-shadow-md">
        Bienvenue dans le portail de gestion de la librairie !
      </h1>
      <Link href={"/"} className="">
        <p className="mx-auto mt-4 bg-[rgb(196,121,23)] text-white w-fit py-1 px-3 rounded-lg drop-shadow-lg">
          Retour à la page de connexion
        </p>
      </Link>

      <div className="bg-[#b6b6b6] w-1/2 rounded-lg mx-auto py-6 px-12 mt-8 drop-shadow-sm">
        <h2 className="text-2xl text-center">Actions rapides</h2>
        <div className="flex justify-center gap-12">
          <Link href={"gestion/emprunt"}>
            <h2 className="mx-auto bg-[rgb(92,55,8)] text-white w-fit py-2 px-8 rounded-lg drop-shadow-lg mt-12">
              Mode emprunt de livres
            </h2>
          </Link>
          <Link href={"gestion/books-admin"}>
            <h2 className="mx-auto bg-[rgb(92,55,8)] text-white w-fit py-2 px-8 rounded-lg drop-shadow-lg mt-12">
              Gestion des livres
            </h2>
          </Link>
          <Link href={"gestion/users-admin"}>
            <h2 className="mx-auto bg-[rgb(92,55,8)] text-white w-fit py-2 px-8 rounded-lg drop-shadow-lg mt-12">
              Gestion des membres
            </h2>
          </Link>
        </div>
      </div>

      <div className="flex gap-5 justify-center items-center mt-12">
        <h1 className="text-2xl">Liste des livres</h1>
        <p className="text-lg">-</p>
        <div className="flex text-2xl gap-2">
          <p className="text-[rgb(175,80,50)] font-semibold">{bookLength}</p>
          <p>trouvés</p>
        </div>
      </div>

      <SearchBar />
      {data && resultats.length === 0
        ? data
            .slice(0, bookListLenght)
            .map((result) => (
              <BookCard
                key={result.id}
                title={result.title}
                author={result.author}
                isAvailable={result.isAvailable}
                isbn={result.isbn}
                description={result.description}
                dateReturn={result.dateReturn}
              />
            ))
        : resultats
            .slice(0, bookListLenght)
            .map((result) => (
              <BookCard
                key={result.id}
                title={result.title}
                author={result.author}
                isAvailable={result.isAvailable}
                isbn={result.isbn}
                description={result.description}
                dateReturn={result.dateReturn}
              />
            ))}
      {bookLength > bookListLenght && (
        <button
          onClick={() => setBookListLenght(bookListLenght + 10)}
          className="mx-auto flex justify-center mb-12 mt-4 bg-[rgb(196,121,23)] text-white w-fit py-1 px-3 rounded-lg drop-shadow-lg"
        >
          Voir plus
        </button>
      )}
      <h1 className="text-center">Liste des abonnées</h1>
      <div className="pb-24">
        {dataUsers &&
          dataUsers.map((result) => (
            <UserCard
              key={result.id}
              firstName={result.firstName}
              lastName={result.lastName}
              email={result.email}
              id={result.id}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}
