import { updateBook } from "@/services/books.services";

export default function BookCardReturn(props: any) {
  const date = new Date(props.dateReturn);
  const options: any = { day: "2-digit", month: "2-digit" };
  const dateFormatee = date.toLocaleDateString("fr-FR", options);

  const requestUpdate = async () => {
    let clone = Object.assign({}, props.data);

    clone.isAvailable = true;
    clone.idUserHasBook = null;

    const query = { id: props.pid, data: clone };
    await updateBook(query);
  };

  return (
    <div className="grid grid-cols-4 w-1/2 py-5 mx-auto drop-shadow-sm my-12 rounded-lg bg-[#ece9e9]">
      <div className="flex flex-col ml-12">
        <div className="">{props.title}</div>
        <div className="flex gap-2">
          <div>Auteur:</div>
          <div className="">{props.author}</div>
        </div>
      </div>
      <div>
        <p>Description:</p>
        <div className="">{props.description}</div>
        {props.idUserHasBook}
      </div>
      <button
        onClick={requestUpdate}
        className="rounded-lg bg-[rgb(92,55,8)] hover:bg-[rgb(134,96,46)] text-white cursor-pointer w-fit px-2 py-1 h-fit  mt-6"
      >
        Rendre le livre
      </button>
      {props.isAvailable ? (
        <div className="flex flex-col justify-end items-end mr-5 gap-2">
          <div className="w-4 h-4 rounded-full bg-green-400"></div>
          <p>En rayon</p>
        </div>
      ) : (
        <div className="flex flex-col justify-end items-end mr-5 gap-2">
          <div className="w-4 h-4 rounded-full bg-red-400"></div>
          <p>Pas disponible</p>
          <h3>Date de retour: {dateFormatee}</h3>
        </div>
      )}
    </div>
  );
}
