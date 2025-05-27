export default function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-8" style={{
      clipPath: 'polygon(0 10%, 100% 0%, 100% 100%, 0% 100%)'
    }}>
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">Need help?</p>
        <p className="mb-4 font-bold">coopers@coopers.pro</p>
        <p className="text-sm">© 2023 Coopers. All rights reserved.</p>
        <div className="w-full flex justify-center align-bottom mt-4">
        <div className=" w-1/3 h-10 bg-green-500" style={{
      clipPath: 'polygon(0 10%, 100% 0%, 100% 100%, 0% 100%)'
    }}></div>
        </div>
      </div>
    </footer>
  )
}
