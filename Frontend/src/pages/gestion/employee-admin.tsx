import MetaData from "@/componants/metadata";
import SearchBarUser from "@/componants/searchBarUser";
import UserCard from "@/componants/users";
import { fetchEmployees } from "@/services/users.services";
import { useState, useEffect } from "react";
import { User } from "..";
import Header from "@/componants/header";
import AdminCard from "@/componants/admin";
import Link from "next/link";

export default function EmployeeAdmin() {
  const [dataUsers, setDataUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await fetchEmployees();
      setDataUsers(result);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#d1d1d1] pt-5 min-h-[100vh]">
      <Header />
      <h1 className="text-center py-4 px-4 rounded-lg text-2xl font-semibold bg-[#ece9e9] w-fit mx-auto drop-shadow-md">
        Gestion des membres
      </h1>
      <SearchBarUser />
      <Link href={"add-an-user"}>
        <h2 className="mx-auto bg-[rgb(92,55,8)] text-white w-fit py-2 px-8 rounded-lg drop-shadow-lg mt-12">
          Ajouter un employé
        </h2>
      </Link>
      {dataUsers &&
        dataUsers.map((result) => (
          <AdminCard
            key={result.id}
            id={result.id}
            firstName={result.firstName}
            lastName={result.lastName}
            email={result.email}
            contractStart={result.contractStart}
            contractEnd={result.contractEnd}
          />
        ))}
    </div>
  );
}
