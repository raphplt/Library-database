import Metadata from "@/componants/metadata";
import SearchBarUser from "@/componants/searchBarUser";
import { useEffect, useState } from "react";
import { Book, User } from "@/pages";
import UserCard from "@/componants/users";
import UserSelectCard from "@/componants/userSelect";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/componants/header";

export default function Emprunt() {
  const [dataUsers, setDataUsers] = useState<User[]>([]);
  const [userSelected, setUserSelected] = useState<User[]>([]);
  const [showSelectUser, setShowSelectUser] = useState(true);
  const [empruntBooks, setEmpruntBooks] = useState<Book[]>([]);
  const [bookListLenght, setBookListLenght] = useState(10);
  const [userID, setUserID] = useState("");
  const router = useRouter();

useEffect(() => {
  const storedResults = localStorage.getItem("userSelected");
  if (storedResults) {
    try {
      setDataUsers(JSON.parse(storedResults));
    } catch (error) {
      console.error("Error parsing stored results:", error);
    }
  }
}, []);

const setUser = () => {
  setUserSelected(dataUsers);
  setShowSelectUser(!showSelectUser);
};

useEffect(() => {
  if (userSelected && userSelected.length > 0) {
    setUserID(userSelected[0].id);
  }
}, [userSelected]);

const changeuser = () => {
  setShowSelectUser(!showSelectUser);
  localStorage.setItem("userSelected", JSON.stringify({}));

  router.reload();
};

useEffect(() => {
  const storedResults = localStorage.getItem("emprunt");
  if (storedResults) {
    setEmpruntBooks(JSON.parse(storedResults));
  }
}, []);

return (
  <div className="bg-[#d1d1d1] pt-5 min-h-[100vh]">
    <Header />
    <h1 className="text-center py-4 px-4 rounded-lg text-2xl font-semibold bg-[#ece9e9] w-fit mx-auto drop-shadow-md">
      Emprunt de livres
    </h1>
    <div>
      {showSelectUser && (
        <div>
          <div className="mx-auto bg-[rgb(92,55,8)] text-white w-fit py-2 px-8 rounded-lg drop-shadow-lg mt-12">
            Sélectionnez un utilisateur
          </div>
          <SearchBarUser />
          {dataUsers.length > 0 ? (
            dataUsers.map((result) => (
              <button key={result.id} className="w-full" onClick={setUser}>
                <UserSelectCard
                  key={result.id}
                  firstName={result.firstName}
                  lastName={result.lastName}
                  email={result.email}
                />
              </button>
            ))
          ) : (
            <p className="text-center mt-12">Aucun utilisateur trouvé</p>
          )}
        </div>
      )}

      {userSelected.length > 0 && (
        <div className="mb-12">
          <div className="mx-auto bg-[rgb(92,55,8)] text-white w-fit py-2 px-8 rounded-lg drop-shadow-lg mt-16 flex justify-center">
            Utilisateur choisi :
          </div>

          <div>
            {userSelected &&
              userSelected.map((result) => (
                <UserCard
                  key={result.id}
                  firstName={result.firstName}
                  lastName={result.lastName}
                  email={result.email}
                  currentsBooks={result.books}
                  id={result.id}
                />
              ))}
            {!showSelectUser && (
              <div>
                <button
                  onClick={changeuser}
                  className="mx-auto bg-[rgb(92,55,8)] rgba(233,177,75,0.86) text-white w-fit py-1 px-8 rounded-lg drop-shadow-lg mt-12 flex justify-center"
                >
                  Changer d&apos;utilisateur
                </button>
              </div>
            )}
            <Link href={`emprunt/user/${userID}`}>
              <div className="mx-auto bg-[rgba(233,177,75,0.86)] text-black w-fit py-2 px-8 rounded-lg drop-shadow-lg mt-24 flex justify-center rgba(233,177,75,0.86) hover:text-black">
                Aller sur la page d&apos;emprunt
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
);
}
