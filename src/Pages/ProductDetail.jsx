import { useParams, Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.IsLogin.IsLogin);

  const item = useSelector((state) => state.products.products);
  const cutom = useSelector((state) => state.customProducts.customProducts);

  const currentData =
    item.find((data) => data.id == id) || cutom.find((data) => data.id == id);

const mode = useSelector((state) => state.theme.mode);

return (
  <section
    className={`body-font overflow-hidden ${
      mode === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-600"
    }`}
  >
    <div className="container px-5 py-7 mx-auto">
      <div className="lg:w-3/3 mx-auto flex items-center flex-wrap">
        <img
          alt="ecommerce"
          className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
          src={currentData?.images[0]}
        />
        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h1
            className={`text-3xl title-font font-medium mb-1 ${
              mode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {currentData?.title}
          </h1>
          <div className="flex mb-4"></div>
          <p className="leading-relaxed">{currentData?.description}</p>
          <div
            className={`flex mt-6 items-center pb-5 mb-5 ${
              mode === "dark" ? "border-b border-gray-700" : "border-b-3 border-gray-200"
            }`}
          >
            <div className="flex ml-6 items-center">
              <span className="mr-3">Size</span>
              <div className="relative">
                <select
                  className={`rounded appearance-none py-2 text-base pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 ${
                    mode === "dark"
                      ? "bg-gray-700 text-white border border-gray-600"
                      : "bg-white text-gray-900 border border-gray-300"
                  }`}
                >
                  <option>SM</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
                <span
                  className={`absolute right-0 top-0 h-full w-10 text-center pointer-events-none flex items-center justify-center ${
                    mode === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="flex mt-4">
            <span
              className={`title-font font-medium text-2xl ${
                mode === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              ${currentData?.price}.00
            </span>
            <button
              onClick={() => {
                if (userLogin == false) {
                  navigate("/auth");
                } else {
                  navigate(`/${id}/billing`);
                }
              }}
              className="ml-auto text-white bg-[#DB4444] border-0 py-2 px-6 focus:outline-none rounded cursor-pointer text-center capitalize"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

};

export default ProductDetail;
