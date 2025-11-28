import Link from "next/link";
import Image from "next/image";

const DashboardCard = ({ details }) => {
  const { name, src, url } = details;
  const dynamicLink = name
    ? `${url}${name.toLowerCase().replace(/\s+/g, "-")}`
    : "#";

  return (
    <Link href={dynamicLink} className="w-full md:w-1/2">
      <div className="group relative md:mt-0 mt-8 me-4 transition-transform duration-500 hover:scale-105 shadow-xl bg-gradient-to-t from-green-900 via-emerald-700 to-green-600 rounded-[32px] p-6 overflow-hidden border border-green-800">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-green-500 to-lime-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-[32px]"></div>

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-poppinssemibold text-xl md:text-2xl text-white group-hover:text-lime-200 transition-colors duration-300">
              {name}
            </h2>
            <div className="p-3 rounded-full bg-gradient-to-t from-lime-300 to-green-200 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Image
                src={src}
                alt={`Icon of ${name}`}
                height={64}
                width={64}
                className="w-12 h-12 md:w-14 md:h-14 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-poppinsmedium font-medium text-lg md:text-xl text-lime-300 group-hover:text-white transition-colors duration-300">
              View All
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8 text-lime-300 group-hover:text-white group-hover:translate-x-2 transition-transform duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
