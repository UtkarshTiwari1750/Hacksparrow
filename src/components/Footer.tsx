import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black/80 w-full">
      <div className="text-white w-9/12 mx-auto flex justify-center items-center flex-col py-16">
        <p className="text-4xl">
          FusionFlow
        </p>

        <div className="flex justify-between items-center w-[20%] text-2xl py-6 mt-4">
          <div className="p-2 rounded-full text-black bg-white hover:text-white hover:bg-black 
            hover:scale-110 transition-all duration-300 cursor-pointer">
            <FaFacebook />
          </div>
          <div className="p-2 rounded-full text-black bg-white hover:text-white hover:bg-black 
            hover:scale-110 cursor-pointer transition-all duration-300">
            <FaInstagram />
          </div>
          <div className="p-2 rounded-full text-black bg-white hover:text-white hover:bg-black 
            hover:scale-110 transition-all duration-300 cursor-pointer">
            <FaTwitter />
          </div>
          <div className="p-2 rounded-full text-black bg-white hover:text-white hover:bg-black
            hover:scale-110 transition-all duration-300 cursor-pointer">
            <FaYoutube />
          </div>
        </div>

        <div className="flex w-[30%] justify-between text-xl ">
          <a href="/" className="cursor-pointer hover:scale-95 transition-all duration-300">
            Home
          </a>
          <a href="/design" className="cursor-pointer hover:scale-95 transition-all duration-300">
            Design
          </a>
          <a href="/lobby" className="cursor-pointer hover:scale-95 transition-all duration-300">
            Conference
          </a>
        </div>


      </div>
      <div className="bg-black/40 w-full text-white text-center py-6 font-serif text-lg">
        Copyright ©2024; Designed by CodeDev
      </div>
    </div>
  );
}

export default Footer;
