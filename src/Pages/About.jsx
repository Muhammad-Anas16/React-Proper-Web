import StorySection from "../Components/StorySection";
import AboutInfo from "../Components/AboutInfo";
import AboutTeamCard from "../Components/AboutTeamCard";
import NewArrival from "../Components/NewArrival";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <div className="flex flex-col gap-6">
      <StorySection />
      <AboutInfo />
      <AboutTeamCard />
      <NewArrival />
      <Footer />
    </div>
  );
};

export default About;
