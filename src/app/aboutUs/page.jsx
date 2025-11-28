import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import Newsletter from "@/Components/NewsLetter/Newsletter";
import {
  FaTractor,
  FaSeedling,
  FaLeaf,
  FaRecycle,
  FaHandshake,
  FaTools,
  FaGlobe,
  FaBrain,
  FaShippingFast,
  FaPeopleCarry,
  FaTree,
  FaSolarPanel,
} from "react-icons/fa";

const AboutUs = () => {
  const missionCards = [
    {
      icon: <FaHandshake size={30} />,
      title: "Empowering Farmers",
      text: "Providing tools and resources to optimize farming practices.",
    },
    {
      icon: <FaGlobe size={30} />,
      title: "Sustainable Growth",
      text: "Implementing eco-friendly practices for a better planet.",
    },
    {
      icon: <FaBrain size={30} />,
      title: "Innovation at Heart",
      text: "Leveraging technology to create smarter farming solutions.",
    },
  ];

  const elementsCards = [
    {
      icon: <FaTractor size={30} />,
      title: "Precision Farming",
      text: "Using AI and data to enhance farm productivity.",
    },
    {
      icon: <FaShippingFast size={30} />,
      title: "Smart Logistics",
      text: "Efficient supply chain and transportation.",
    },
    {
      icon: <FaRecycle size={30} />,
      title: "Eco-Friendly Practices",
      text: "Promoting sustainable farming techniques globally.",
    },
    {
      icon: <FaPeopleCarry size={30} />,
      title: "Community Building",
      text: "Connecting farmers and businesses worldwide.",
    },
    {
      icon: <FaTools size={30} />,
      title: "AI-Driven Solutions",
      text: "Leveraging technology for smarter agricultural decisions.",
    },
    {
      icon: <FaTree size={30} />,
      title: "Sustainable Agriculture",
      text: "Creating long-lasting agricultural solutions.",
    },
  ];

  const offerCards = [
    {
      icon: <FaSeedling size={30} />,
      title: "Premium Products",
      text: "Top-quality seeds, tools, and supplies for optimized agriculture.",
    },
    {
      icon: <FaLeaf size={30} />,
      title: "Knowledge Hub",
      text: "Curated resources, expert guides, and actionable insights.",
    },
    {
      icon: <FaSolarPanel size={30} />,
      title: "Community Support",
      text: "Connect with farmers and businesses to grow together.",
    },
  ];

  return (
    <>
      <div className="min-h-screen relative overflow-hidden font-sans">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed filter brightness-50"
          style={{
            backgroundImage:
              "url('https://png.pngtree.com/thumb_back/fw800/background/20240610/pngtree-concept-use-of-the-smart-farmer-system-came-to-help-analysis-image_15746622.jpg')",
          }}
        ></div>

        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-800/30 to-black opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent opacity-40 animate-gradient-x"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20 animate-bounce-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-20 animate-bounce-slow-reverse"></div>
        </div>

        <div className="relative z-30">
          <Navbar  />
        </div>

        <div className="relative mt-56 z-20 flex flex-col items-center justify-center h-full text-center px-6 space-y-12">
          <div className="absolute top-10 left-10 w-12 h-12 bg-green-400 rounded-full blur-lg opacity-50 animate-ping"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-green-500 rounded-full blur-lg opacity-30 animate-pulse"></div>

          <div className="flex items-center justify-center space-x-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-400 animate-fade-in">
              About Us 🌱
            </h2>
          </div>

          <h1 className="text-[45px] sm:text-7xl lg:text-8xl font-extrabold text-white leading-tight tracking-wide drop-shadow-2xl animate-slide-in">
            Welcome to{" "}
            <span className="text-green-400 underline decoration-wavy">
              AgroMart
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-4xl leading-relaxed drop-shadow-md animate-fade-in-delayed">
            At AgroMart, we’re dedicated to transforming agriculture through
            innovation, sustainability, and technology. Our mission is to
            empower farmers, connect communities, and create a future where
            agriculture thrives in harmony with nature.
          </p>

          <p className="text-md sm:text-lg lg:text-xl text-gray-300 max-w-3xl leading-relaxed drop-shadow-md animate-fade-in-delayed">
            Since our founding, AgroMart has been at the forefront of the
            agricultural revolution, offering solutions that bridge traditional
            farming practices with cutting-edge technology. We believe in
            fostering a collaborative ecosystem for farmers, businesses, and
            consumers alike.
          </p>

          <div className="flex items-center space-x-6">
            <div className="w-16 h-1 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-bold text-lg tracking-wider uppercase animate-bounce">
              Building Sustainable Futures
            </span>
            <div className="w-16 h-1 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 mt-6 pb-8">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-16 rounded-full shadow-2xl transition-transform transform hover:scale-110 hover:shadow-green-500/50 animate-fade-up">
              Learn Our Story
            </button>
            <button className="bg-transparent border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-white font-semibold py-4 px-16 rounded-full shadow-xl transition-transform transform hover:scale-110 hover:shadow-green-600/50 animate-fade-up-delayed">
              Meet Our Team
            </button>
          </div>
        </div>

        <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="bg-gradient-to-b from-green-50 to-white">
        <section className="py-20">
          <div className="max-w-screen-xl mx-auto text-center px-6">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-8">
              Our <span className="text-green-600">Mission</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {missionCards.map((card, index) => (
                <Card key={index} card={card} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-screen-xl mx-auto text-center px-6">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-8">
              Key <span className="text-green-600">Elements</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {elementsCards.map((card, index) => (
                <Card key={index} card={card} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-screen-xl mx-auto text-center px-6">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-8">
              What We <span className="text-green-600">Offer</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {offerCards.map((card, index) => (
                <Card key={index} card={card} />
              ))}
            </div>
          </div>
        </section>
        <Newsletter />
      </div>
      <Footer />
    </>
  );
};

const Card = ({ card }) => (
  <div className="relative bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-transparent opacity-40 group-hover:opacity-60 transition duration-300 rounded-2xl"></div>
    <div className="relative z-10 w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-6 mx-auto group-hover:bg-green-500 group-hover:text-white transition-colors duration-300 shadow-lg">
      {card.icon}
    </div>
    <h3 className="relative z-10 text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
      {card.title}
    </h3>
    <p className="relative z-10 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
      {card.text}
    </p>
    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-200 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
  </div>
);

export default AboutUs;
