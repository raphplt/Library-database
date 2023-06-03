import React, { useState } from "react";
import Link from "next/link";
import Metadata from "@/componants/metadata";
import { useRouter } from "next/router";
import { login } from "../services/users.services";

export interface Book {
  id: string;
  genre: string[];
  title: string;
  author: string;
  description: string;
  publishedAt: Date;
  publisher: string;
  isAvailable: boolean;
  dateLeave: Date;
  dateReturn: Date;
  idUserHasBook: number;
  isbn: number;
  createdAt: Date;
  lastModified: Date;
}

export interface User {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password_hash: string;
  password_salt: string;
  endSubscription: Date;
  books: string[];
  contractStart: Date;
  contractEnd: Date;
  subscriber: boolean;
  salary: number;
  createdAt: Date;
  lastModified: Date;
}

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      setResponse(result);

      localStorage.setItem("idlogin", result.id);
      if (result.status === "admin") {
        router.push("/gestion"); // Rediriger vers la page admin
      } else {
        router.push("/mon-compte"); // Rediriger vers la page utilisateur
      }
    } catch (error) {
      // Traitement de l'erreur en cas d'échec
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-300 h-[100vh] pt-12">
      <Metadata />
      <h1 className="text-center bg-white py-2 px-4 rounded-lg text-2xl w-fit mx-auto">
        Bienvenue sur le portail de la librairie de l&apos;ETNA
      </h1>
      <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-md">
        <h2 className="text-xl text-center font-bold mb-5">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email :
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Mot de passe :
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="rounded-lg bg-[#80410e] hover:bg-[#522e11] text-white drop-shadow-md cursor-pointer px-4 py-2"
              type="submit"
            >
              Se connecter
            </button>
            <button className="ml-4 text-[#80410e] hover:text-[#522e11 font-semibold">
              <Link href="/register">Créer un compte</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
