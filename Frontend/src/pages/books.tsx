import BookCard from "@/componants/bookCard";
import { fetchBooks } from "@/services/books.services";
import { useState, useEffect } from "react";
import { Book } from ".";

export default function Books() {
  const [data, setData] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await fetchBooks();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center">Liste des livres</h1>
      {data &&
        data.map((result) => (
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
    </div>
  );
}
