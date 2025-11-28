import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import Newsletter from "@/Components/NewsLetter/Newsletter";
import React from "react";
import Rental1 from "../../Assets/images/rent1.jpg";

const RentalDetails = () => {
  console.log(Rental1);

  return (
    <>
      <Navbar />
      <div className=" text-black shadow-lg bg-gradient-to-tr from-green-600 via-green-200 to-green-100 pb-14">
        <div>
          <div
            style={{
              backgroundImage: `url(${Rental1.src})`,
              width: "100%",
              height: "700px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
            }}
          >
            <h1 className="absolute left-8 bottom-14 text-3xl font-bold font-serif text-white bg-green-500 hover:bg-green-400 p-5 rounded-xl transition-transform transform hover:scale-105 ">
              NEW HOLLAND RENTAL EQUIPMENT
            </h1>
          </div>
          <div className=" bg-gradient-to-tr to-green-400 via-white  from-green-100  p-14  text-lg font-serif leading-relaxed z-20 border rounded-xl m-14">
            <div>
              <p className="text-sm md:text-lg">
                Farming and agricultural operations often require versatile,
                high-performance equipment that delivers efficiency and
                reliability. Whether you're planting, harvesting, or preparing
                the land, the right tools make all the difference. <br />
                <b>New Holland Machines</b> provide a comprehensive solution to
                meet the diverse needs of modern agriculture. At Agro Mart, we
                offer a selection of New Holland equipment for rent, empowering
                farmers to maximize productivity and maintain cost-effective
                operations. With flexible rental terms — daily, weekly, monthly,
                and long-term — you can find the perfect solution that aligns
                with your agricultural needs.
              </p>
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-bold p-3 text-green-700">
                About New Holland Machines
              </h1>
              <p className="text-sm md:text-lg">
                With a legacy dating back to 1895, New Holland has been a leader
                in providing innovative and reliable agricultural and
                construction machinery. Their equipment is built to empower
                farmers with cutting-edge technology, precision engineering, and
                sustainable practices. From tractors and harvesters to advanced
                precision farming tools, New Holland continues to redefine
                productivity and efficiency in agriculture. <br />
                <br />
                New Holland Machines are designed with ease of use in mind,
                helping farmers save time and reduce operational complexities.
                These dependable tools are built to handle the rigorous demands
                of farming while maintaining top-tier performance.
              </p>
              <h1 className="text-xl md:text-3xl font-bold p-3 text-green-700">
                Our New Holland Equipment Rentals
              </h1>
              <p className="text-sm md:text-lg">
                {" "}
                At <b>Agro Mart</b>, we feature a range of New Holland machinery
                available for rent, designed to meet your agricultural needs:
              </p>
              <br />
              <ul className="list-disc pl-8">
                <li className="text-sm md:text-lg">
                  <b>Tractors:</b> New Holland tractors are built for
                  versatility and power, enabling seamless field operations.
                  Whether you’re working on crop preparation, tillage, or
                  hauling, these tractors deliver unmatched performance.
                </li>
                <li className="text-sm md:text-lg">
                  <b>Harvesters:</b> Maximize efficiency during harvest season
                  with New Holland harvesters. These machines combine precision
                  and durability, ensuring you achieve optimal yields with
                  minimal effort
                </li>
                <li className="text-sm md:text-lg">
                  <b>Seeders and Planters:</b> New Holland seeders and planters
                  offer accuracy in seed placement, leading to improved crop
                  uniformity and yield potential.
                </li>
                <li className="text-sm md:text-lg">
                  <b>Precision Farming Tools:</b> Take advantage of New
                  Holland’s advanced technology to enhance farming productivity
                  through precision tools designed to minimize waste and improve
                  efficiency.
                </li>
              </ul>

              <h1 className="text-xl md:text-3xl font-bold p-3 text-green-700">
                Why Choose for New Holland Rentals?
              </h1>
              <p className="text-sm md:text-lg">
                When you rent from <b>Agro Mart</b>, you gain access to
                exceptional products and services designed to support your
                success.
              </p>
              <ul className="list-disc pl-8">
                <li className="text-sm md:text-lg">
                  <b>Late-Model Equipment:</b> We provide the latest,
                  technologically advanced New Holland machines to ensure
                  superior performance
                </li>
                <li className="text-sm md:text-lg">
                  <b>Thorough Inspections:</b> Every machine is expertly
                  maintained and inspected for reliability.
                </li>
                <li className="text-sm md:text-lg">
                  <b>Flexible Rental Options:</b> Choose from daily, weekly,
                  monthly, or long-term rental agreements to suit your needs.
                </li>
                <li className="text-sm md:text-lg">
                  <b>On-Site Support:</b> We offer on-site maintenance and
                  24-hour emergency service to minimize downtime.
                </li>
                <li className="text-sm md:text-lg">
                  <b> Prompt Delivery:</b> Get your equipment delivered directly
                  to your location, ready for action.
                </li>
              </ul>
              <h1 className="text-xl md:text-3xl font-bold p-3 text-green-700">
                The Benefits of Renting
              </h1>
              <p className="text-sm md:text-lg">
                Renting New Holland machines gives you the flexibility to scale
                your operations without the financial burden of ownership.
                Renting is a smart choice for.
              </p>
              <ul className="list-disc pl-8">
                <li className="text-sm md:text-lg">
                  <b>Reducing Costs:</b> Save on maintenance, storage, and
                  upfront purchase costs
                </li>
                <li className="text-sm md:text-lg">
                  <b>Increasing Flexibility:</b> Access the equipment you need
                  only when you need it.
                </li>
                <li className="text-sm md:text-lg">
                  <b>Testing Before Buying:</b> Try out the latest New Holland
                  models before committing to a purchase.
                </li>
              </ul>
              <h1 className="text-xl md:text-3xl font-bold p-3 text-green-700">
                Contact Us Today to Rent New Holland Equipment!
              </h1>
              <p className="text-sm md:text-lg">
                Explore our range of New Holland machinery and find the perfect
                equipment for your next agricultural project. Reach out to Agro
                Mart today and let’s cultivate success together!
              </p>
            </div>
          </div>
          <div>
            <div>
              <h1> </h1>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default RentalDetails;
