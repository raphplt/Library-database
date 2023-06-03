import MetaData from "@/componants/metadata";
import { useEffect, useState } from "react";
import { Book } from "..";
import { fetchBooks } from "@/services/books.services";
import BookCardAdmin from "@/componants/bookCardAdmin";
import Link from "next/link";
import SearchBar from "@/componants/searchbar";
import Header from "@/componants/header";

export default function BooksAdmin() {
  const [resultats, setResultats] = useState<Book[]>([]);
  const [data, setData] = useState<Book[]>([]);
  const [bookListLenght, setBookListLenght] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await fetchBooks();
      setData(result);
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
    <div className="bg-[#d1d1d1] pt-5 min-h-[100vh] pb-5">
      <Header />
      <h1 className="text-center py-4 px-4 rounded-lg text-2xl font-semibold bg-[#ece9e9] w-fit mx-auto drop-shadow-md">
        Gestion des livres
      </h1>
      <Link href={"/gestion"}>
        <p className="mx-auto mt-4 bg-[rgb(196,121,23)] text-white w-fit py-1 px-3 rounded-lg drop-shadow-lg">
          Retour
        </p>
      </Link>
      <SearchBar />
      <Link href={"add-a-book"}>
        <h2 className="mx-auto bg-[rgb(92,55,8)] text-white w-fit py-2 px-8 rounded-lg drop-shadow-lg mt-12">
          Ajouter un livre
        </h2>
      </Link>
      {data && resultats.length === 0
        ? data
            .slice(0, bookListLenght)
            .map((result) => (
              <BookCardAdmin
                key={result.id}
                title={result.title}
                author={result.author}
                isAvailable={result.isAvailable}
                isbn={result.isbn}
                description={result.description}
                dateReturn={result.dateReturn}
                id={result.id}
              />
            ))
        : resultats
            .slice(0, bookListLenght)
            .map((result) => (
              <BookCardAdmin
                key={result.id}
                title={result.title}
                author={result.author}
                isAvailable={result.isAvailable}
                isbn={result.isbn}
                description={result.description}
                dateReturn={result.dateReturn}
                id={result.id}
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
    </div>
  );
}
