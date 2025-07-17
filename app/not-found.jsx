import Image from "next/image";
import Link from "next/link";

const URL = process.env.NEXT_PUBLIC_URL;

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <Image src={`${URL}/not-found.png`} height={333} width={221} className="w-auto h-auto" alt="PERONDA GROUP"/>
        <h1 className="text-6xl font-bold mt-8">404</h1>
        <p className="text-xl mt-4">Oops! La página que buscas no existe.</p>
        <Link className="mt-6" href="/login">
          <span className="mt-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Volver al inicio
          </span>
        </Link>
      </div>
    );
  }