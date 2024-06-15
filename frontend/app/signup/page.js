
"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://ec2-51-20-191-164.eu-north-1.compute.amazonaws.com:3001/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      console.log(data); 
      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
      
    }
  };

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

      <section id="landingPageHero" className="flex-grow flex flex-col justify-center items-center bg-cover">
      <div className="flex flex-col  w-full bg-slate-800/80 flex-grow">
      <div className="flex-grow flex flex-col justify-center items-center ">
        <h1 className="text-5xl text-white text-center ">Skapa konto</h1>
        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
          <div className="flex flex-col ">
            <input
              type="text"
              placeholder="Användarnamn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-start ">
            <button type="submit" className=" text-lg bg-slate-400 h-16 no-underline px-4 flex items-center justify-center text-white rounded-full border-2 border-none  hover:bg-slate-500">
              Skapa konto
            </button>

          </div>
        </form>
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
