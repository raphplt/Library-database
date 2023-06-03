export default function UserSelectCard(props: any) {
  return (
    <div className="grid grid-cols-4 w-1/2 py-5 mx-auto drop-shadow-sm my-12 rounded-lg bg-[#ece9e9] hover:bg-[#a6bbc9] border-2 hover:border-[#08283b]">
      <h1 className="flex justify-center">
        {props.firstName} {props.lastName}
      </h1>
      <p className="flex justify-center">{props.email}</p>

      {props.currentsBooks &&
        props.currentsBooks.map((book: any, index: any) => (
          <div key={index} className="border border-gray-300 p-4 w-fit">
            {/* Afficher les détails du livre ici */}
            <div className="w-fit">{book}</div>
          </div>
        ))}
    </div>
  );
}
