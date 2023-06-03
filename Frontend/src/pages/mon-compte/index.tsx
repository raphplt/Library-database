import { useEffect, useState } from "react";
import { Book, User } from "..";
import { useRouter } from "next/router";
import { fetchUser } from "@/services/users.services";
import { fetchBooks, searchByUser } from "@/services/books.services";
import { pid } from "process";
import BookCard from "@/componants/bookCard";
import SearchBar from "@/componants/searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function MonCompte() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [dataDefault, setDataDefault]: any = useState<User[]>([]);
  const [booksUser, setBooksUser] = useState<Book[]>([]);
  const [user, setUser] = useState("");
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [data, setData] = useState<Book[]>([]);
  const [resultats, setResultats] = useState<Book[]>([]);
  const [bookListLenght, setBookListLenght] = useState(10);

  // exemples de local storage
  useEffect(() => {
    const storedResults = localStorage.getItem("idlogin");
    if (storedResults) {
      setUser(JSON.parse(storedResults));
    }
    setIsLoadingUser(false);
  }, []);

  // const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser) {
      const fetchData = async () => {
        const result: any = await fetchUser(user);
        setDataDefault(result);
      };
      fetchData();
    }
  }, [isLoadingUser, user]);

  useEffect(() => {
    if (!isLoadingUser) {
      const result = async () => {
        const res = await searchByUser(user);
        setBooksUser(res);
      };
      result();
    }
  }, [isLoadingUser, user]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  const handleCardClick = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

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

  return (
    <div className="bg-[#d1d1d1] min-h-screen flex flex-col">
      <div className="flex justify-end items-center p-4">
        <span className="mr-2">
          {dataDefault.firstName} {dataDefault.lastName}
        </span>
        <FontAwesomeIcon
          icon={faUserCircle}
          className="mr-2 cursor-pointer h-6 w-6"
          onClick={toggleMenu}
        />
        {menuOpen && (
          <div className="absolute top-12 right-4 bg-white text-gray-700 rounded-md shadow-md">
            <ul>
              <li onClick={handleLogout} className="py-2 px-4 cursor-pointer">
                {/* <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> */}
                Déconnexion
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-2">
        <div className="text-center py-4 px-4 rounded-lg text-3xl font-semibold bg-[#ece9e9] w-fit mx-auto drop-shadow-md mb-8">
          <h1 className="text-3xl">Mon Compte</h1>
        </div>
      </div>
      <div className="flex justify-center mt-2 space-x-4 flex-grow">
        <div className="w-1/2 border border-gray-300 p-4 bg-[#e08702] bg-opacity-50 flex-grow">
          <div className="w-fit py-3 px-12 mx-auto drop-shadow-sm my-1 rounded-lg bg-[#ece9e9]">
            <div className="flex justify-center  items-center text-2xl font-bold">
              Mes Emprunts
            </div>
          </div>
          {booksUser &&
            booksUser
              // .slice(0, bookListLenght)
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
        </div>
        <div className="w-1/2 border border-gray-300 p-4 bg-[#55432b] bg-opacity-100 flex-grow">
          <div className="w-fit py-3 px-12 mx-auto drop-shadow-sm my-1 rounded-lg bg-[#ece9e9]">
            <div className="flex justify-center  items-center text-2xl font-bold">
              Les livres répertoriés
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
          <button
            onClick={() => setBookListLenght(bookListLenght + 10)}
            className="mx-auto flex justify-center mb-12 mt-4 bg-[rgb(196,121,23)] text-white w-fit py-1 px-3 rounded-lg drop-shadow-lg"
          >
            Voir plus
          </button>
        </div>
      </div>
      {popupVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <p>coucou</p>
            <button onClick={handlePopupClose}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}
