import { Book } from "@/pages";
import { searchBooks } from "@/services/books.services";
import { useState } from "react";
import { useRouter } from "next/router";

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState<Book[]>([]);
  const [resultBool, setResultBool] = useState(false);

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result: any = await searchBooks(searchTerm);
    setResult(result);
    localStorage.setItem("searchResults", JSON.stringify(result));
    setResultBool(!resultBool);
    router.reload();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex justify-center mt-12 w-1/2 "
      >
        <input
          type="text"
          placeholder="Rechercher un livre, une BD..."
          value={searchTerm}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 bg-[#ece9e9] rounded-l-md focus:outline-none focus:ring-1 focus:bg-[rgb(214,145,55)]0 focus:border-[rgb(214,145,55)] w-1/2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[rgb(196,121,23)] text-white font-semibold  hover:bg-[rgb(214,145,55)] focus:outline-none focus:hover:bg-[rgb(214,145,55)]"
        >
          Rechercher
        </button>
        <button
          onClick={handleChange}
          className="px-4 py-2 bg-[rgb(97,71,38)] text-white font-semibold rounded-r-md hover:bg-[rgb(214,145,55)] focus:outline-none focus:hover:bg-[rgb(214,145,55)]"
        >
          Réinitialiser
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
