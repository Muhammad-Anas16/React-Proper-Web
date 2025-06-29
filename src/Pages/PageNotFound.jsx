import { Link } from "react-router";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";

const Page404 = () => {
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen text-center ${
        mode === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-700"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center h-[85vh] text-center px-4 ${
          mode === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        <h1
          className={`text-6xl font-bold mb-4 ${
            mode === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          404 Not Found
        </h1>
        <p
          className={`text-sm mb-6 ${
            mode === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Your visited page not found. You may go home page.
        </p>
        <Link
          to={"/"}
          className="bg-red-500 text-white text-sm px-5 py-2 rounded hover:bg-red-600 transition"
        >
          Back to home page
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Page404;
