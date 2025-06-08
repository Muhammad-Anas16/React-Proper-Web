import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const AboutTeamCard = () => {
  const teamInfo = [
    {
      name: "Tom Cruise",
      image:
        "https://parade.com/.image/t_share/MTkwNTc4NzcwMDEwOTczMzA5/tom-cruise-net-worth.jpg",
      title: "Founder & Chairman",
    },
    {
      name: "Emma Watson",
      image:
        "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
      title: "Managing Director",
    },
    {
      name: "Will Smith",
      image:
        "https://img.freepik.com/free-photo/horizontal-portrait-handsome-unshaven-male-with-stubble-dressed-casual-white-t-shirt-points-blank-copy-space-your-design-wears-spectacles-serious-man-seller-clothes_273609-16083.jpg",
      title: "Product Designer",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {teamInfo.map((info, i) => (
        <div
          key={i}
          className="text-center bg-gray-100 rounded-lg overflow-hidden shadow-sm"
        >
          <img
            src={info.image}
            alt={info.name}
            className="w-full h-80 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-black">{info.name}</h3>
            <p className="text-sm text-gray-700 mt-1">{info.title}</p>
            <div className="flex justify-center gap-4 mt-3 text-black text-lg">
              <a href="#" aria-label="Twitter">
                <XIcon />
              </a>
              <a href="#" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutTeamCard;
