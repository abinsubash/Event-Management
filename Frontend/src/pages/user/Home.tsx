import Navbar from "../../components/user/Navbar";
import homeImg1 from "../../assets/Home1.jpg";

const Home = () => {
  return (
    <div>
      <div className="relative h-screen w-full">
        <img src={homeImg1} alt="Home" className="h-full w-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full">
          <Navbar />
          <section className="w-full h-96 flex items-end justify-start">
            <div className=" text-white text-xl font-extralight">
              Welcome to the Event World
            </div>
          </section>
        </div>
      </div>

      <section
        className="w-full min-h-screen flex justify-center pt-32"
        style={{ backgroundColor: "#D7C5B9" }}
      >
        <div className="w-full max-w-10/12 h-150 bg-white rounded-4xl p-8 md:p-12 shadow-lg flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-12 mt-14">
            Let’s Celebrate
          </h2>

          <p className="text-[0.7rem] md:text-xs text-gray-500 mb-6 tracking-wide">
            BASED IN CHARLESTON but travel worldwide
          </p>

          <div className="flex flex-col gap-4 w-full">
            <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
              From made-to-measure weddings to elaborate corporate events that
              nurture
            </p>
            <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
              company connections, Fox Events has a flair for transforming bespoke
              spaces
            </p>
            <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
              into unforgettable experiences.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
