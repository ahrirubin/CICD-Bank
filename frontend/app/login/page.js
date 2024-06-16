"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  /*TESTTING 2*/

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://ec2-51-20-191-164.eu-north-1.compute.amazonaws.com:3001/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data); 
        
        localStorage.setItem("token", data.token);
        router.push("/saldo");
      } else {
      
        setErrorMessage("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error:", error);
   
    }
  };

  return (
    <main
      style={{
        background:
          "linear-gradient(to bottom right, #090979 0%, #1a36ed 35%, #00bbe0 80%)",
      }}
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
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-5xl text-white text-center ">Logga in</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
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
          <div className="flex flex-col justify-start">
            <button type="submit" className=" text-lg bg-slate-400 h-16 no-underline px-4 flex items-center justify-center text-white rounded-full border-2 border-none  hover:bg-slate-500">Logga in</button>
            
          </div>
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div></div></section>

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
