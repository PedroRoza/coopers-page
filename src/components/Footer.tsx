export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white py-8">
      <div className="container-custom text-center">
        <p className="mb-2">Need help?</p>

        <a href="mailto:coopers@coopers.pro" className="text-white font-semibold hover:underline mb-4 inline-block">
          coopers@coopers.pro
        </a>

        <p className="text-sm text-gray-400 mt-2">© {currentYear} Coopers. All rights reserved.</p>
      </div>
    </footer>
  )
}
