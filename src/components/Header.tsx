"use client"


interface HeaderProps {
  onLoginClick: () => void
}

export default function Header({ onLoginClick }: HeaderProps) {
  const user = true 
  function logout() {return true}

  return (
    <header className="py-4 md:py-6 relative z-10">
      <div className="container-custom flex justify-between items-center">
        <div className="logo">
          <a href="/" aria-label="Coopers Home">
            <img src="/Logo.png" className="h-8 md:h-10 w-auto" alt="Coopers logo"/>
          </a>
        </div>

        <div>
          {user ? (
            <button 
              className="bg-black text-white px-4 py-1 text-sm lowercase"
              onClick={logout} 
              aria-label="Sair da conta"
            >
              sair
            </button>
          ) : (
            <button 
              className="bg-black text-white px-4 py-1 text-sm lowercase"
              onClick={onLoginClick} 
              aria-label="Entrar na conta"
            >
              entrar
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
