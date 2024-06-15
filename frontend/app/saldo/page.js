
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Saldo() {
  const [saldo, setSaldo] = useState(null);
  const [amount, setAmount] = useState("");

  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
   
    const fetchSaldo = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await fetch(
          "http://ec2-51-20-191-164.eu-north-1.compute.amazonaws.com:3001/me/accounts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );
        const data = await response.json();
        console.log(data); 
        setSaldo(data.amount);
      } catch (error) {
        console.error("Error:", error);
        
      }
    };

    fetchSaldo();

    return () => {
      
    };
  }, []);

  const handleTransaction = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch(
        "http://ec2-51-20-191-164.eu-north-1.compute.amazonaws.com:3001/me/accounts/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, amount }),
        }
      );
      const data = await response.json();
      console.log(data); 
      
      setSaldo(data.newBalance);
      setMessage("Transaktionen lyckades!");
      
    } catch (error) {
      console.error("Error:", error);
      setMessage("Transaktionen misslyckades.");
      
    }
  };

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    
    router.push("/");
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
            <button onClick={handleLogout}>Logga Ut</button>
          </li>
        </ul>
      </nav>

      <section id="landingPageHero" className="flex-grow flex flex-col justify-center items-center bg-cover">
      <div className="flex flex-col  w-full bg-slate-800/80 flex-grow">
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-5xl text-white text-center ">Saldo</h1>

        {saldo !== null ? (
          <div className=" flex flex-col item-center">
            <h2 className="text-white">{saldo} kr</h2>
            <form onSubmit={handleTransaction}>
              <input
                type="number"
                placeholder="Belopp"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button type="submit">Flytta</button>
            </form>

            {message && <p>{message}</p>}
          </div>
        ) : (
          <p>Laddar saldo...</p>
        )}
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
