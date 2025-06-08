const CetagorySection = () => {
  const data = [
    {
      Qty: "10.5k",
      icon: "https://png.pngtree.com/png-clipart/20230504/original/pngtree-store-line-icon-png-image_9137769.png",
      subTitle: "Sellers active our site",
    },
    {
      Qty: "33k",
      icon: "https://icons.veryicon.com/png/o/photographic/ant-design-official-icon-library/dollar-11.png",
      subTitle: "Monthly Product Sale",
    },
    {
      Qty: "45.5k",
      icon: "https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-bag-icon-symbol-isolated-png-image_1727847.jpg",
      subTitle: "Customer active in our site",
    },
    {
      Qty: "25k",
      icon: "https://cdn-icons-png.flaticon.com/512/245/245904.png",
      subTitle: "Annual gross sale in our site",
    },
  ];

  return (
    <section className="text-gray-600 body-font p-4">
      <div className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full p-6 text-center border rounded-md shadow-sm bg-white transition-all duration-300 group hover:bg-red-500"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black group-hover:bg-white transition-colors duration-300">
                  <img
                    src={item.icon}
                    alt="icon"
                    className="w-6 h-6 object-contain invert group-hover:invert-0 transition-all duration-300"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-1 text-black group-hover:text-white transition-colors duration-300">
                {item.Qty}
              </h2>
              <p className="text-sm text-gray-600 group-hover:text-white transition-colors duration-300">
                {item.subTitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CetagorySection;
