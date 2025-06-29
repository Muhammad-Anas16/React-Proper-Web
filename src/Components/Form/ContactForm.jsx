import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";

const ContactForm = () => {
  const schema = yup.object({
    userName: yup.string().required().min(3, "atleast 3 charectors required"),
    email: yup
      .string()
      .required()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email"),
    subject: yup.string().required(),
    message: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  const mode = useSelector((state) => state.theme.mode);

  return (
    <section
      className={`w-full min-h-[90vh] flex items-center justify-center px-4 ${
        mode === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md shadow-lg border px-6 md:px-8 py-10 rounded-xl ${
          mode === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="mb-6 text-center">
          <h1
            className={`font-bold text-3xl mb-2 ${
              mode === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Contact Us
          </h1>
          <p
            className={`text-sm ${
              mode === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            We’d love to hear from you!
          </p>
        </div>

        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            className={`w-full py-2.5 px-4 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500 ${
              mode === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border border-gray-300"
            }`}
            {...register("userName")}
          />

          <input
            type="text"
            name="email"
            id="email"
            placeholder="Your Email"
            className={`w-full py-2.5 px-4 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500 ${
              mode === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border border-gray-300"
            }`}
            {...register("email")}
          />

          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
            className={`w-full py-2.5 px-4 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500 ${
              mode === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border border-gray-300"
            }`}
            {...register("subject")}
          />

          <textarea
            name="message"
            id="message"
            rows="4"
            placeholder="Your Message"
            className={`w-full py-2.5 px-4 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500 ${
              mode === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border border-gray-300"
            }`}
            {...register("message")}
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#DB4444] text-white font-semibold text-sm py-2.5 rounded-md hover:bg-red-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
