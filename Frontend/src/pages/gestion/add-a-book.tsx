import Header from "@/componants/header";
import MetaData from "@/componants/metadata";
import { Book } from "@/pages";
import { createBook } from "@/services/books.services";
import Link from "next/link";
import { useState } from "react";

export default function AddABook() {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    publishedAt: "",
    publisher: "",
    isAvailable: true,
    genre: "",
    author: "",
    isbn: ""
  });

  const handleInputChange = (event: any) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const query = { data };
    await createBook(query);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="bg-[#d1d1d1] pt-5 min-h-[100vh] pb-5">
      <Header />
      <h1 className="text-center py-4 px-4 rounded-lg text-2xl font-semibold bg-[#ecece9] w-fit mx-auto drop-shadow-md">
        Ajouter un livre
      </h1>
      <Link href={"books-admin"}>
        <p className="mx-auto mt-4 bg-[rgb(196,121,23)] text-white w-fit py-1 px-3 rounded-lg drop-shadow-lg">
          Retour
        </p>
      </Link>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col w-1/3 justify-center mx-auto mt-12 gap-8 bg-[#c4c1c1] rounded-lg py-6 px-16 drop-shadow-md"
      >
        <label className="mb-1">
          <p className="mb-2 font-semibold">Titre de l&apos;œuvre: &ensp;</p>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleInputChange}
            className="px-2 py-1 focus:outline-none focus:ring-1 rounded-sm drop-shadow-sm w-full"
          />
        </label>
        <label>
          <p className="mb-2 font-semibold">Description :</p>
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleInputChange}
            className="px-2 py-1 focus:outline-none focus:ring-1 rounded-sm drop-shadow-sm w-full"
          />
        </label>
        <label>
          <p className="mb-2 font-semibold">Date de publication :</p>

          <input
            type="text"
            name="publishedAt"
            value={data.publishedAt}
            onChange={handleInputChange}
            className="px-2 py-1 focus:outline-none focus:ring-1 rounded-sm drop-shadow-sm w-full"
          />
        </label>
        <label>
          <p className="mb-2 font-semibold">Éditeur :</p>
          <input
            type="text"
            name="publisher"
            value={data.publisher}
            onChange={handleInputChange}
            className="px-2 py-1 focus:outline-none focus:ring-1 rounded-sm drop-shadow-sm w-full"
          />
        </label>

        <label>
          <p className="mb-2 font-semibold">Genre(s) :</p>
          <input
            type="text"
            name="genre"
            value={data.genre}
            onChange={handleInputChange}
            className="px-2 py-1 focus:outline-none focus:ring-1 rounded-sm drop-shadow-sm w-full"
          />
        </label>
        <label>
          <p className="mb-2 font-semibold">Auteur :</p>
          <input
            type="text"
            name="author"
            value={data.author}
            onChange={handleInputChange}
            className="px-2 py-1 focus:outline-none focus:ring-1 rounded-sm drop-shadow-sm w-full"
          />
        </label>
        <label>
          <p className="mb-2 font-semibold">ISBN :</p>
          <input
            type="text"
            name="isbn"
            value={data.isbn}
            onChange={handleInputChange}
            className="px-2 py-1 focus:outline-none focus:ring-1 rounded-sm drop-shadow-sm w-full"
          />
        </label>
        <button
          type="submit"
          className="rounded-lg bg-[#df7218] hover:bg-[#c06317] text-white drop-shadow-md cursor-pointer px-2 py-1 mt-4"
        >
          Ajouter
        </button>
      </form>
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold bg-green-400 p-4 rounded-lg shadow-md z-50">
          <p className="text-center">Livre créé avec succès !</p>
        </div>
      )}
    </div>
  );
}
