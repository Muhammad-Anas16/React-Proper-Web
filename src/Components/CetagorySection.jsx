const CetagorySection = () => {
  const data = [
    {
      name: "Phones",
      icon: `${"https://www.iconpacks.net/icons/2/free-mobile-phone-icon-2636-thumb.png"}`,
    },
    {
      name: "Computer",
      icon: `${"https://images.vexels.com/media/users/3/157318/isolated/preview/2782b0b66efa5815b12c9c637322aff3-desktop-computer-icon-computer.png"}`,
    },
    {
      name: "Smart Watch",
      icon: `${"https://cdn-icons-png.flaticon.com/512/883/883377.png"}`,
    },
    {
      name: "Camera",
      icon: `${"https://www.freeiconspng.com/uploads/camera-icon-21.png"}`,
    },
    // {
    //   name: "HeadPhones",
    //   icon: `${"https://cdn-icons-png.flaticon.com/512/5219/5219441.png"}`,
    // },
    {
      name: "Gaming",
      icon: `${"https://cdn-icons-png.flaticon.com/512/7708/7708371.png"}`,
    },
  ];

  return (
    <section className="text-gray-600 body-font border border-gray-300">
      <div className="capitalize flex items-center justify-between px-5 pt-5">
        <h1 className="text-lg text-black font-bold ">Categories</h1>
      </div>
      <div className="container px-4 py-6 mx-auto">
        {/* Grid with 3 columns starting from smallest screen */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {data.map((item, index) => (
            <div key={index} className="w-full p-1">
              <div className="group relative h-28 rounded overflow-hidden bg-white border border-gray-300 hover:bg-red-500 transition-all duration-300">
                <img
                  alt="product"
                  className="object-contain w-full h-full p-7 transition-all duration-300 group-hover:scale-110"
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
