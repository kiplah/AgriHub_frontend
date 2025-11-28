import Link from "next/link";
import {
  FaSeedling,
  FaLeaf,
  FaMapMarkerAlt,
  FaRecycle,
  FaClipboardList,
  FaHeartbeat,
} from "react-icons/fa";

const Benefits = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white py-20 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-green-200 rounded-full blur-[150px] opacity-30"></div>
      <div className="absolute bottom-0 -right-32 w-80 h-80 bg-green-300 rounded-full blur-[150px] opacity-20"></div>

      <div className="max-w-screen-xl mx-auto text-center px-6 relative z-10">
        <h2 className="text-2xl md:text-5xl font-extrabold text-gray-800 mb-8 leading-snug">
          Why Choose <span className="text-green-600">AgroMart?</span>
        </h2>
        <p className="text-md:text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Experience the best in organic farming, fresh produce, and sustainable
          practices with AgroMart. Here&rsquo;s why we&rsquo;re your trusted
          choice.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: <FaSeedling size={50} />,
              title: "Fresh from Farms",
              text: "Daily harvested products straight from the farm to your table, ensuring quality and taste you can trust.",
            },
            {
              icon: <FaLeaf size={50} />,
              title: "100% Organic",
              text: "Pure organic produce with no pesticides or artificial additives—just natural, wholesome goodness.",
            },
            {
              icon: <FaMapMarkerAlt size={50} />,
              title: "Locally Sourced",
              text: "Supporting local farmers, we bring you fresh, sustainably grown produce with every purchase.",
            },
            {
              icon: <FaRecycle size={50} />,
              title: "Eco-Friendly Packaging",
              text: "Sustainable and eco-friendly packaging to reduce waste and promote a greener planet.",
            },
            {
              icon: <FaClipboardList size={50} />,
              title: "Farm-to-Table Traceability",
              text: "Full transparency and traceability, ensuring the quality and origins of every product.",
            },
            {
              icon: <FaHeartbeat size={50} />,
              title: "Healthy & Nutrient-Rich",
              text: "Packed with essential nutrients, our produce promotes a healthy lifestyle for you and your family.",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-transparent opacity-40 group-hover:opacity-60 transition duration-300 rounded-2xl"></div>

              <div className="relative z-10 w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-6 mx-auto group-hover:bg-green-500 group-hover:text-white transition-colors duration-300 shadow-lg">
                {benefit.icon}
              </div>

              <h3 className="relative z-10 text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
                {benefit.title}
              </h3>

              <p className="relative z-10 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {benefit.text}
              </p>

              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-200 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        <div className="mt-16" 
            onClick={() => window.location.href = '/products'}
        
        >
          <button
            className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-12 rounded-full text-sm md:text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            Shop Fresh Produce
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
