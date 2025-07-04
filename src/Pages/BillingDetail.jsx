import { useParams, useNavigate } from "react-router";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const billingSchema = yup.object({
  name: yup.string().required("First name is required"),
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10,14}$/, "Enter a valid phone number"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  payment: yup.string().required("Please select a payment method"),
});

const BillingDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const products = useSelector((state) => state.products.products);
  const custom = useSelector((state) => state.customProducts.customProducts);
  const checkData =
    products.find((data) => data.id == id) ||
    custom.find((data) => data.id == id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(billingSchema),
    mode: "onSubmit",
  });

  const onSubmit = (formData) => {
    const paymentMethodFull =
      formData.payment === "cod" ? "Cash on Delivery" : "Bank Transfer";

    const finalOrderData = {
      ...formData,
      productId: checkData?.id,
      productTitle: checkData?.title,
      productPrice: checkData?.price,
      payment: paymentMethodFull,
    };

    console.log("🧾 Final Order Data:", finalOrderData);

    // toast.success("🎉 Thank you! Your order has been placed.", {
    //   position: "top-center",
    //   autoClose: 2500,
    //   theme: "colored",
    //   onClose: () => navigate("/"),
    // });

    toast.custom(
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          color: "white",
          padding: "12px 20px",
          borderRadius: "10px",
          fontSize: "14px",
        }}
      >
        🎉 Thank you! Your order has been placed.
      </div>,
      {
        position: "top-center",
        duration: 2500,
        onClose: () => navigate("/"),
      }
    );
  };

  const mode = useSelector((state) => state.theme.mode);

  return (
    <section
      className={`body-font ${
        mode === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-700"
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Billing Form */}
          <div
            className={`w-full lg:w-2/5 p-6 rounded shadow ${
              mode === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-6 ${
                mode === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Billing Details
            </h2>

            <div className="space-y-4">
              {[
                { id: "name", label: "First Name" },
                { id: "address", label: "Complete Address" },
                { id: "phone", label: "Phone Number" },
                { id: "email", label: "Email" },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-sm mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.id === "email" ? "email" : "text"}
                    id={field.id}
                    {...register(field.id)}
                    className={`w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${
                      mode === "dark"
                        ? "bg-gray-700 text-white border border-gray-600 placeholder:text-gray-400"
                        : "bg-gray-100 text-gray-900 border border-gray-300 placeholder:text-gray-500"
                    }`}
                  />
                  {errors[field.id] && (
                    <p className="text-sm text-red-500">
                      {errors[field.id].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div
            className={`w-full lg:w-3/5 p-6 rounded shadow ${
              mode === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
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

            <div
              className={`py-4 mb-6 border-t border-b ${
                mode === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
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
                    value="bank"
                    {...register("payment")}
                    className="mr-2"
                  />
                  <span>Bank Transfer</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="cod"
                    defaultChecked
                    {...register("payment")}
                    className="mr-2"
                  />
                  <span>Cash on Delivery</span>
                </label>
                {errors.payment && (
                  <p className="text-sm text-red-500">
                    {errors.payment.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                placeholder="Coupon Code"
                className={`rounded px-4 py-2 w-full sm:flex-1 ${
                  mode === "dark"
                    ? "bg-gray-700 text-white border border-gray-600 placeholder:text-gray-400"
                    : "bg-white text-gray-900 border border-gray-300 placeholder:text-gray-500"
                }`}
              />
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Apply Coupon
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition"
            >
              Place Order
            </button>

            <ToastContainer />
          </div>
        </div>
      </form>

      <Footer />
    </section>
  );
};

export default BillingDetail;
