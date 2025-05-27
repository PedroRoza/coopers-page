import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[84vh] bg-white">
      {/* <div className="md:-top-[70px] hidden sm:block h-screen absolute right-0">
        <div className="z-0">
          <Image
            src="/BG.png"
            alt="Modern apartment interior"
            width={400}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 z-0 md:pl-24">
          <h1 className="text-4xl md:text-5xl  font-bold mb-2">
            Organize
            <span className="block text-green-500">your daily jobs</span>
          </h1>
          <p className="text-lg mb-6">The only way to get things done</p>
          <Link
            href="#todo-list"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Go to To-do list"
          >
            Go to To-do list
          </Link>
        </div>
        {/* <div className="w-full md:w-1/2 mt-8 md:mt-0 flex items-center justify-center h-1/2">
          <div className="z-0 w-full h-full flex justify-center pl-28">
            <div className="block md:hidden w-3/4 absolute right-0 ">
              <div className="z-0 relative right-0 -top-14 w-full ">
                <Image
                  src="/BG.png"
                  alt="Modern apartment interior"
                  width={400}
                  height={300}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="object-cover w-[200px] h-[200px] md:w-[400px] md:h-[300px] z-10">
              <Image
                src="/foto.png"
                alt="Modern apartment interior"
                width={400}
                height={300}
              />
            </div>
          </div>
        </div> */}
      </div>

       <div className="w-full py-6 flex justify-center absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>
    </section>
  );
}
