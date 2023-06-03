export default function BookCardSelect(props: any) {
  const date = new Date(props.dateReturn);
  const options: any = { day: "2-digit", month: "2-digit" };
  const dateFormatee = date.toLocaleDateString("fr-FR", options);

  return (
    <div className="grid grid-cols-3 w-1/2 py-5 mx-auto drop-shadow-sm my-12 rounded-lg bg-[#ece9e9] hover:bg-[#a6bbc9] border-2 hover:border-[#08283b] cursor-pointer">
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
