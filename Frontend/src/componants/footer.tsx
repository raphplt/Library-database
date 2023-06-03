import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-center gap-10 text-md pb-6">
      <Link
        href={"https://www.op.gg/summoners/euw/Béchamel%20IV"}
        target="blank"
      >
        Raphaël PLASSARRT
      </Link>
      <div>
        <Link href={"https://www.op.gg/summoners/euw/NemAmog"} target="blank">
          Jounayd MOSBAH
        </Link>
      </div>
      <div>
        <Link
          href={"https://www.op.gg/summoners/euw/minichorizo"}
          target="blank"
        >
          Lucas AYMARD
        </Link>
      </div>
      <div>Tous droits réservés - 2023</div>
    </div>
  );
}
