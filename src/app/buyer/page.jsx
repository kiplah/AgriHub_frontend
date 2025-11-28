import Profile from "../../Components/ProfileCard/ProfileCard";
import DashboardCard from "../../Components/DashboardCard/DashboardCard";
import Services from "../../assets/images/services.png";
import Amenities from "../../assets/images/amenities.png";

export default function Dashboard() {
  return (
    <div
      className="relative h-screen overflow-auto sm:p-0 px-1 md:px-8 lg:px-6 xl:px-8 2xl:px-12 py-4 md:py-5 lg:py-7 xl:py-10 2xl:py-12"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/featured/agriculture-pictures-ppsj59vfqlop02h9.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10">
        <div className="px-2">
          <Profile />
        </div>
        <div className="md:px-0 max-w-screen-2xl">
          <div className="flex flex-wrap md:w-full mt-8 px-6">
            <DashboardCard
              details={{
                name: "Orders",
                src: Amenities,
                url: "/buyer/",
              }}
            />
            <DashboardCard
              details={{
                name: "Saved Addresses",
                src: Amenities,
                url: "/buyer/",
              }}
            />
          </div>
          <div className="flex flex-wrap md:w-full mt-8 px-6">
            <DashboardCard
              details={{
                name: "Purchase History",
                src: Services,
                url: "/buyer/",
              }}
            />
            <DashboardCard
              details={{
                name: "Support",
                src: Amenities,
                url: "/buyer/",
              }}
            />
          </div>
          <div className="flex flex-wrap md:w-full mt-8 px-6"></div>
        </div>
      </div>
    </div>
  );
}
