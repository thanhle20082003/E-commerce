import Heading from "../../components/heading/Heading";
import chanel from "/src/assets/images/chanel.png";
import gucci from "/src/assets/images/gucci.png";
import dg from "/src/assets/images/dg.png";
import versace from "/src/assets/images/versace.png";
import zara from "/src/assets/images/zara.png";
import dior from "/src/assets/images/dior.png";

const HomeBrand = () => {
  return (
    <>
      <Heading className="mb-4 text-center">BRANDS FOR YOU</Heading>
      <div className="flex items-center justify-center gap-14">
        <img src={chanel} alt="" className="w-20 h-20" />
        <img src={gucci} alt="" className="w-20 h-20" />
        <img src={dg} alt="" className="w-20 h-20" />
        <img src={versace} alt="" className="w-20 h-20" />
        <img src={zara} alt="" className="w-20 h-20" />
        <img src={dior} alt="" className="w-20 h-20" />
      </div>
    </>
  );
};

export default HomeBrand;
