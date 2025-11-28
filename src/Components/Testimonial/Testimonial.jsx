import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Health Enthusiast",
      feedback:
        "AgroMart has completely redefined my approach to healthy living. The organic fruits and vegetables are always fresh, and the delivery service is seamless!",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-iQOSjEHvkWlDyRSHHVW3sBuYxBEXGZomLdgxPi68oI7Bzxmta2D_S3KuU4o6p-wWTqQ&usqp=CAU",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Lee",
      role: "Chef & Restauranteur",
      feedback:
        "AgroMart has become my go-to source for top-quality ingredients. Their commitment to sustainable farming is reflected in the unbeatable taste of their produce.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNR7FvvC_9X1l2xqi2rdkStAHaSRMmg89O_g&s",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Watson",
      role: "Eco-Conscious Shopper",
      feedback:
        "I love how AgroMart combines convenience with sustainability. Their eco-friendly packaging and locally sourced products are a win for my family and the environment.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcrIPUVHe81YZpOiRUNwRq32b7QEpEVP6YeuAImz3FaOtVYPTNNkRveATsieLpH2_kr4g&usqp=CAU",
      rating: 4.5,
    },
  ];

  return (
    <section
      className="relative py-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-green-900 via-green-700 to-transparent opacity-90"></div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-12 text-center">
        <h2 className="text-2xl md:text-4xl md:text-5xl font-extrabold text-white mb-12">
          Hear From Our Happy Customers
        </h2>
        <p className="text-md md:text-lg text-green-200 mb-16">
          At AgroMart, we&rsquo;re proud to deliver fresh, organic, and
          sustainable products that delight our customers. Here&rsquo;s what
          they have to say.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <FaQuoteLeft className="text-green-500 text-4xl mb-4 mx-auto" />
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                &ldquo;{testimonial.feedback}&rdquo;
              </p>
              <div className="flex items-center justify-center mb-4">
                {Array(Math.floor(testimonial.rating))
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl" />
                  ))}
                {testimonial.rating % 1 !== 0 && (
                  <FaStar className="text-yellow-400 text-xl opacity-50" />
                )}
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4 border-4 border-green-500 shadow-md"
                />
                <h3 className="text-lg font-bold text-gray-800">
                  {testimonial.name}
                </h3>
                <span className="text-sm text-gray-500">
                  {testimonial.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
