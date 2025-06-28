import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CetagorySection = () => {
  const navigate = useNavigate();

  const products = useSelector(state => state.customProducts.customProducts);

  

  const data = [
    {
      name: "Clothes",
      icon: `${"https://icons.veryicon.com/png/o/miscellaneous/solid-bank/clothes-27.png"}`,
    },
    {
      name: "Electronics",
      icon: `${"https://png.pngtree.com/png-clipart/20230417/original/pngtree-computer-to-mobile-line-icon-png-image_9063386.png"}`,
    },
    {
      name: "Shoes",
      icon: `${"https://cdn-icons-png.freepik.com/512/80/80807.png"}`,
    },
    {
      name: "Miscellaneous",
      icon: `${"https://cdn.creazilla.com/icons/3262943/miscellaneous-services-icon-lg.png"}`,
    },
    {
      name: "Furniture",
      icon: `${"https://cdn-icons-png.flaticon.com/512/1198/1198419.png"}`,
    },
  ];

  return (
    <section className="text-gray-600 body-font border border-gray-300">
      <div className="capitalize flex items-center justify-between px-5 pt-5">
        <h1 className="text-lg text-black font-bold ">Categories</h1>
      </div>
      <div className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full p-1 cursor-pointer"
              onClick={() => navigate(`/product/${item.name}`)}
            >
              <div className="group relative h-28 rounded overflow-hidden bg-white border border-gray-300 transition-all duration-400">
                <img
                  alt="product"
                  className="object-contain w-full h-full p-7 transition-all duration-300 group-hover:scale-160"
                  src={item.icon}
                />
                <button className="absolute bottom-0 right-0 left-0 bg-opacity-80 text-black px-2 py-2 text-xs transition-all duration-300 group-hover:text-white">
                  {item.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CetagorySection;
