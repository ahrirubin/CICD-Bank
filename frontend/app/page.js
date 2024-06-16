import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main

      className="w-full min-h-screen flex flex-col"
    >
      {/* Navbar */}
      <nav className="p-4 flex flex-col justify-between items-center bg-slate-500">
      <Link href="/" className="ml-4 no-underline hover:text-slate-400 text-xl text-white "><Image src={"/boa1.png"} width={125} height={125} /></Link>
        <ul className="list none flex">
        <li
            href="/"
            className=" no-underline px-4 text-white   hover:text-slate-400 list-none hover:cursor-pointer"
          >
            Privat
          </li>
          <li
            href="/"
            className=" no-underline px-4 text-white   hover:text-slate-400 list-none hover:cursor-pointer"
          >
            Företag
          </li>
          <li
            href="/"
            className=" no-underline px-4 text-white border-2  hover:text-slate-400  list-none hover:cursor-pointer"
          >
            Logga in
          </li>
        </ul>
      </nav>

      {/* Hero-section */}
      <section id="landingPageHero" className="flex-grow flex flex-col justify-center items-center bg-cover">
      
        <div className="flex flex-col  w-full bg-slate-800/80 flex-grow">
          <div className=" flex flex-1  justify-center items-end ">
        <h1 className="text-5xl text-white text-center ">Ahri Banken</h1>
        <h2 className="text-2xl text-white text-center">Skaffa låga lånelöften</h2>
        </div>
        <div className="flex  flex-1 space-x-10  justify-center items-start" >
          <div className=" space-y-6 w-[400px]"> 
            <Link
            href="/login"
            className=" bg-slate-400 h-16 no-underline px-4 flex items-center justify-center text-white rounded-full border-2 border-none  hover:bg-slate-500"
          >
            Logga in
          </Link>
          <Link
            href="/signup"
            className=" bg-slate-400 h-16 no-underline px-4 flex items-center justify-center text-white rounded-full border-2 border-none  hover:bg-slate-500"
          >
            Skapa användare
          </Link></div>
         
        </div>
        </div>
      </section>

      {/* Footer */}
      <nav className="flex justify-around  p-0 bg-slate-500 text-white text-center">
        <ul className="list-none flex flex-col items-start">
          Besöksadress:
          <li>Himmelvägen 72</li>
          <li>12345</li>
          <li>Stockholm</li>
        </ul>
        <ul className="list-none flex flex-col items-start">
          Kundservice:
          <li>Tel: +46 123 456 789</li>
          <li>Mail: kundservice@dinbank.se</li>
          
        </ul>
        <p className="items-end">© 2024 Min Bank AB</p>
      </nav>
    </main>
  );
}
