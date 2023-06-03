import Header from "@/componants/header";
import MetaData from "@/componants/metadata";
import { Book, User } from "@/pages";
import { deleteBook, fetchBook, updateBook } from "@/services/books.services";
import { deleteUser, fetchUser, updateUser } from "@/services/users.services";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookDetailsAdmin() {
  const [dataDefault, setDataDefault]: any = useState<User[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    subscriber: false,
    email: "",
    endSubscription: "",
    books: "",
  });
  const router = useRouter();
  const { pid }: any = router.query;
  useEffect(() => {
    const fetchData = async () => {
      const result: any = await fetchUser(pid);
      setDataDefault(JSON.stringify(result));
      setData({
        firstName: result.firstName,
        lastName: result.lastName,
        subscriber: result.subscriber,
        email: result.email,
        endSubscription: result.endSubscription,
        books: result.books,
      });
    };
    fetchData();
  }, [pid]);

  const handleInputChange = (event: any) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const query = { id: pid, data: data };
    await updateUser(query);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handleDelete = async (event: any) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    const query = pid;
    await deleteUser(query);
    router.push("../users-admin");
  };

  const callBack = () => {
    router.push("../users-admin");
  };

  return (
    <div className="bg-[#d1d1d1] pt-5 min-h-[100vh] pb-5">
      <Header />
      <h1 className="text-center py-4 px-4 rounded-lg text-2xl font-semibold bg-[#ecece9] w-fit mx-auto drop-shadow-md">
        Modifier les informations du membre
      </h1>

      <p
        className="mx-auto mt-4 bg-[rgb(196,121,23)] text-white w-fit py-1 px-3 rounded-lg drop-shadow-lg"
        onClick={callBack}
      >
        Retour
      </p>

      <form
        onSubmit={handleSubmit}
        className=" flex flex-col w-1/3 justify-center mx-auto mt-12 gap-8 bg-[#c4c1c1] rounded-lg py-6 px-16 drop-shadow-md"
      >
        <label className="mb-1">
          <p className="mb-2 font-semibold">Prénom :</p>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleInputChange}
            className="px-2 py-1 focus:outline-none focus:ring-1 rounded-sm drop-shadow-sm w-full"
          />
        </label>
        <label>
          <p className="mb-2 font-semibold">Nom de famille :</p>
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleInputChange}
            className="px-2 py-1 focus:outline-none focus:ring-1 rounded-sm drop-shadow-sm w-full"
          />
        </label>
        <label>
          <p className="mb-2 font-semibold">Adresse mail :</p>

          <input
            type="text"
            name="email"
            value={data.email}
            onChange={handleInputChange}
            className="px-2 py-1 focus:outline-none focus:ring-1 rounded-sm drop-shadow-sm w-full"
          />
        </label>
        <label>
          <p className="mb-2 font-semibold">Fin de l&apos;abonnement :</p>
          <input
            type="text"
            name="endSubscription"
            value={data.endSubscription}
            onChange={handleInputChange}
            className="px-2 py-1 focus:outline-none focus:ring-1 rounded-sm drop-shadow-sm w-full"
          />
        </label>
        <label>
          <p className="mb-2 font-semibold">Est abonné :</p>
          <input
            type="checkbox"
            name="subscriber"
            checked={data.subscriber}
            className="transform scale-150 h-6 w-6 mr-2 align-middle ml-4 mt-5"
            onChange={(event) =>
              setData({
                ...data,
                subscriber: event.target.checked,
              })
            }
          />
        </label>

        <button
          type="submit"
          className="rounded-lg  bg-[#69bd1b] w-1/2 mx-auto hover:bg-[#5da719] text-white drop-shadow-md cursor-pointer px-2 py-1 mt-4"
        >
          Modifier
        </button>
        <button
          className="rounded-lg w-1/2 mx-auto bg-[#df5018] hover:bg-[#c94815] text-white drop-shadow-md cursor-pointer px-2 py-1 mt-4"
          onClick={handleDelete}
        >
          Supprimer
        </button>

        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8">
              <p className="text-lg font-semibold mb-4">
                Êtes-vous sûr de vouloir supprimer ?
              </p>
              <div className="flex justify-end">
                <button
                  className="mr-2 px-4 py-2 bg-[#df5018] hover:bg-[#c94815] text-white rounded-lg"
                  onClick={() => setShowConfirmation(false)}
                >
                  Annuler
                </button>
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  onClick={confirmDelete}
                >
                  Confirmer
                </button>
              </div>
              Z
            </div>
          </div>
        )}
      </form>
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold bg-green-400 p-4 rounded-lg shadow-md z-50">
          <p className="text-center">Modification réussie !</p>
        </div>
      )}
    </div>
  );
}
