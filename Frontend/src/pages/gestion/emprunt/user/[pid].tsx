import BookCard from "@/componants/bookCard";
import BookCardSelect from "@/componants/bookCardSelect";
import BookCardReturn from "@/componants/booksCardReturn";
import Header from "@/componants/header";
import SearchBarEmprunt from "@/componants/searchBarEmprunt";
import { Book, User } from "@/pages";
import { searchByUser, updateBook } from "@/services/books.services";
import { searchOneUser } from "@/services/users.services";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function EmpruntPage() {
  const [empruntBooks, setEmpruntBooks] = useState<Book[]>([]);
  const [user, setUser]: any = useState<User[]>([]);
  const [booksUser, setBooksUser] = useState<Book[]>([]);
  const [maxBook, setMaxBook] = useState(10);
  const [showBook, setShowBook] = useState(false);
  const [verif, setVerif] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [title, setTitle] = useState("");

  const [maxAlert, setMaxAlert] = useState(false);

  const router = useRouter();
  const { pid }: any = router.query;

  useEffect(() => {
    const storedResults = localStorage.getItem("emprunt");
    if (storedResults) {
      setEmpruntBooks(JSON.parse(storedResults));
    }
  }, []);

  useEffect(() => {
    const result = async () => {
      const res = await searchOneUser(pid);
      setUser(res);
    };
    result();
  }, [pid]);

  useEffect(() => {
    const result = async () => {
      const res = await searchByUser(pid);
      setBooksUser(res);
    };
    result();
  }, [pid]);

  const confirmation = (index: any) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;
    const today2 = new Date();
    today2.setDate(today2.getDate() + 14);
    const year2 = today2.getFullYear();
    const month2 = String(today2.getMonth() + 1).padStart(2, "0");
    const day2 = String(today2.getDate()).padStart(2, "0");
    const formattedDate2 = `${year2}-${month2}-${day2}T00:00:00.000Z`;

    let clone = Object.assign({}, index[0]);

    clone.isAvailable = false;
    clone.idUserHasBook = pid;
    clone.dateLeave = formattedDate;
    clone.dateReturn = formattedDate2;

    setVerif(!verif);

    setSelectedBook(clone);
    // console.log(clone);
    setTitle(index[0].title);
  };

  const requestUpdate = async () => {
    const query = { id: pid, data: selectedBook };
    if (booksUser.length <= 10) await updateBook(query);
    else {
      setMaxAlert(true);
    }
    // router.reload();
    setVerif(!verif);
  };

  return (
    <div className="bg-[#d1d1d1] pt-5 min-h-[100vh] pb-5">
      <Header />
      <h1 className="text-center py-4 px-4 rounded-lg text-2xl font-semibold bg-[#ece9e9] w-fit mx-auto drop-shadow-md">
        Emprunt de livre(s)
      </h1>
      <p className="mx-auto flex justify-center mb-12 mt-8 bg-[rgb(209,178,138)] w-fit py-2 px-6 rounded-lg drop-shadow-lg">
        {user.firstName} {user.lastName} a emprunté {booksUser.length}&nbsp;
        {booksUser.length > 1 ? "livres" : "livre"}, il peut encore en
        emprunter&nbsp;
        {maxBook - booksUser.length}&nbsp;
      </p>
      <button
        className="mx-auto bg-[rgb(92,55,8)] text-white w-fit py-2 px-8 rounded-lg drop-shadow-lg mt-4 flex justify-center"
        onClick={() => setShowBook(!showBook)}
      >
        {showBook ? (
          <p>Cacher les livres empruntés</p>
        ) : (
          <p>Voir les livres empruntés</p>
        )}
      </button>
      {booksUser &&
        showBook &&
        booksUser
          // .slice(0, bookListLenght)
          .map((result) => (
            <BookCardReturn
              key={result.id}
              title={result.title}
              author={result.author}
              isAvailable={result.isAvailable}
              isbn={result.isbn}
              description={result.description}
              dateReturn={result.dateReturn}
              data={result}
              pid={pid}
            />
          ))}
      <SearchBarEmprunt />
      {verif && (
        <div className="mx-auto fixed inset-0 pt-[50vh] z-40 bg-slate-400 w-full h-full bg-opacity-50 overflow-hidden">
          <p className="text-center text-2xl mb-8">
            Emprunter le livre {title} pour l&apos;utilisateur {user.firstName}{" "}
            {user.lastName}?
          </p>
          <div className="flex gap-5 justify-center">
            <div
              className="px-4 py-2 bg-green-400 rounded-lg cursor-pointer text-lg"
              onClick={requestUpdate}
            >
              Oui
            </div>
            <div
              onClick={() => setVerif(!verif)}
              className="px-4 py-2 bg-red-400 rounded-lg cursor-pointer text-lg"
            >
              Non
            </div>
          </div>
        </div>
      )}
      {/* {JSON.stringify(empruntBooks)} */}
      {empruntBooks &&
        empruntBooks
          // .slice(0, bookListLenght)
          .map((result, index) => (
            <div
              key={result.id}
              onClick={() => confirmation(empruntBooks.slice(index, index + 1))}
            >
              <BookCardSelect
                key={result.id}
                title={result.title}
                author={result.author}
                isAvailable={result.isAvailable}
                isbn={result.isbn}
                description={result.description}
                dateReturn={result.dateReturn}
              />
            </div>
          ))}
    </div>
  );
}
