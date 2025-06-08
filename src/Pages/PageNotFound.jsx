import { Link } from "react-router";
import Footer from "../Components/Footer";

const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <div className="flex flex-col items-center justify-center h-[85vh] bg-white text-center px-4">
        <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
        <p className="text-sm text-gray-600 mb-6">
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
