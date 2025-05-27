"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    setIsLoggedIn(!!userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    location.reload();
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setShowLogin(true);
    }
  };

  return (
    <header className="w-full py-4 px-4 md:px-8 flex justify-between items-center z-10">
      <div className="logo pl-0 md:pl-20">
        <Image
          src="/logo.png"
          alt="Coopers Logo"
          width={150}
          height={40}
          className="h-auto"
        />
      </div>

      <button
        onClick={handleLoginClick}
        className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 w-[120px]"
        aria-label={isLoggedIn ? "Logout" : "Login"}
      >
        {isLoggedIn ? "sair" : "entrar"}
      </button>

      {/* Dialogs */}
      {showLogin && (
        <LoginDialog
          onClose={() => {
            setShowLogin(false);
            setIsLoggedIn(true); 
          }}
          onRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterDialog
          onClose={() => setShowRegister(false)}
          onLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </header>
  );
}
