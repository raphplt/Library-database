import React, { useState } from "react";
import Metadata from "@/componants/metadata";
import { useRouter } from "next/router";
import { register } from "../../services/users.services";
import Link from "next/link";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState();
  const router = useRouter();

  const handleFirstNameChange = (e: any) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e: any) => {
    setLastName(e.target.value);
  };
  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value);
  };
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handleConfirmEmailChange = (e: any) => {
    setConfirmEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      alert("Les adresses email ne correspondent pas.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const response = await register(
        firstName,
        lastName,
        email,
        password,
        phone
      );
      setResponse(response);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    router.push("/");
  };

  return (
    <div>
      <Metadata />
      <h1 className="text-center mt-12"></h1>
      <div className="max-w-md mx-auto my-10 bg-[#d1d1d1] p-5 rounded-md shadow-md">
        <h2 className="text-xl text-center font-bold mb-5">Créer un compte</h2>
        <h2 className="mx-auto bg-[rgb(233,162,70)] w-fit py-1 px-8 rounded-lg drop-shadow-lg mt-6 mb-6">
          <Link href={"/gestion"}>Retour à l&apos;accueil</Link>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="firstName"
            >
              Prénom :
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Entrez le prénom"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="lastName"
            >
              Nom :
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Entrez le nom"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Numéro de téléphone :
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              type="text"
              placeholder="Entrez le numéro de téléphone"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
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
              placeholder="Entrez l'email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="confirmEmail"
            >
              Confirmez l&apos;email :
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmEmail"
              name="confirmEmail"
              type="email"
              placeholder="Confirmez l'email"
              value={confirmEmail}
              onChange={handleConfirmEmailChange}
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
              placeholder="Entrez un mot de passe provisoire"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirmez le mot de passe :
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirmez le mot de passe provisoire"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="mx-auto bg-[rgb(92,55,8)] text-white w-fit py-2 px-8 rounded-lg drop-shadow-lg mt-12"
              type="submit"
            >
              Créer le compte
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/3 mx-auto mt-12 flex justify-center flex-col items-center">
        <div className="flex flex-col">{JSON.stringify(response)}</div>
      </div>
    </div>
  );
}
