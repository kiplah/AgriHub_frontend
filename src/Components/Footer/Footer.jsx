import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
    <img className="w-[60%] py-6 md:pt-0 md:w-[100%]" src="/logo.png" alt="" />
    <h3 className="text-xl font-bold mb-4 text-green-600 transition">
              About Us
            </h3>
            <p className="text-sm">
              We aim to empower farmers with modern solutions and connect agriculture enthusiasts with valuable knowledge to grow sustainably.
            </p>
          </div>

          <div className="md:pl-8">
            <h3 className="text-xl font-bold mb-4 text-green-600  transition">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <div className="hover:text-green-600 transition">Home</div>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <div className="hover:text-green-600 transition">Products</div>
                </Link>
              </li>
              <li>
                <Link href="/seeds">
                  <div className="hover:text-green-600 transition">Seeds</div>
                </Link>
              </li>
              <li>
                <Link href="/about-us">
                  <div className="hover:text-green-600 transition">About Us</div>
                </Link>
              </li>
              <li>
                <Link href="/contact-us">
                  <div className="hover:text-green-600 transition">Contact</div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4  text-green-600 transition">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>📍 Address: 123 Green Field, Agriculture City</li>
              <li>📞 Phone: (+254) 703 924 936</li>
              <li>✉ Email: info@agriculture.com</li>
            </ul>
           
            </div>
            
          <div>
          <h3 className="text-xl font-bold mb-4 text-green-600">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank">
                <div
                  className="bg-transparent border-2 border-green-600 text-green-600 rounded-full p-2 hover:bg-green-600 hover:text-white transition"
                >
                  <FaFacebookF size={20} />
                </div>
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <div
                  className="bg-transparent border-2 border-green-600 text-green-600 rounded-full p-2 hover:bg-green-600 hover:text-white transition"
                >
                  <FaTwitter size={20} />
                </div>
              </Link>
              <Link href="https://instagram.com" target="_blank">
                <div
                  className="bg-transparent border-2 border-green-600 text-green-600 rounded-full p-2 hover:bg-green-600 hover:text-white transition"
                >
                  <FaInstagram size={20} />
                </div>
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <div
                  className="bg-transparent border-2 border-green-600 text-green-600 rounded-full p-2 hover:bg-green-600 hover:text-white transition"
                >
                  <FaLinkedinIn size={20} />
                </div>
              </Link>
           </div>
          </div>


        </div>

        <div className="text-center mt-8 text-sm">
          © {new Date().getFullYear()} Agriculture Co. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
