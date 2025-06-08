import { useParams } from "react-router";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const BillingDetail = () => {
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products);

  const { id } = useParams();
  const checkData = products.find((data) => data.id == id);

  return (
    <section className="text-gray-700 body-font">
      <form className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/*  */}
          <div className="w-full lg:w-2/5 bg-white p-6 rounded shadow">
            <h2 className="text-gray-900 text-xl font-semibold mb-6">
              Billing Details
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm mb-1">
                  Complete Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>
          </div>

          {/*  */}
          <div className="w-full lg:w-3/5 bg-white p-6 rounded shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={checkData?.images[0]}
                  alt="Product"
                  className="w-12 h-12 object-cover rounded"
                />
                <span className="font-medium">{checkData?.title}</span>
              </div>
              <span className="text-lg font-semibold">
                ${checkData?.price}.00
              </span>
            </div>

            <div className="border-t border-b py-4 mb-6">
              <div className="flex justify-between mb-2 text-sm">
                <span>Subtotal:</span>
                <span>${checkData?.price}.00</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-semibold text-base">
                <span>Total:</span>
                <span>${checkData?.price}.00</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Payment Method</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    className="mr-2"
                  />
                  <span>Bank</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    defaultChecked
                    className="mr-2"
                  />
                  <span>Cash on delivery</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                placeholder="Coupon Code"
                className="border border-gray-300 rounded px-4 py-2 w-full sm:flex-1"
              />
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Apply Coupon
              </button>
            </div>

            <button
              onClick={() => {
                toast("Thank you! Your payment is being processed");
                navigate("/");
              }}
              className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition"
            >
              Place Order
            </button>

            <ToastContainer
              position="top-center"
              type="success"
              transition={"zoom"}
              theme="dark"
            />
          </div>
        </div>
      </form>

      <Footer />
    </section>
  );
};

export default BillingDetail;
