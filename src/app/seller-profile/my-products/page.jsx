import ProductTable from "@/Components/ProductTableSeller/ProductTable";
import Profile from "@/Components/ProfileCard/ProfileCard";

export default function Dashboard() {
  return (
    <div
      className="relative h-screen overflow-auto p-4 md:px-8 lg:px-6 xl:px-8 2xl:px-12 py-4 md:py-5 lg:py-7 xl:py-10 2xl:py-12"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20241115/pngtree-happy-vietnamese-farmers-planting-rice-paddy-in-lush-green-field-image_16603887.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10">
        <Profile />
        <ProductTable/>
    </div>
    </div>
  );
}
