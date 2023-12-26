import imgBanner from "/src/assets/images/imagebanner.png";
import eclipBanner from "/src/assets/images/eclipsebanner.png";
const HomeBanner = () => {
  return (
    <div className="flex w-full">
      <div className="bg-[#1C2333] basis-3/5 flex justify-center items-center">
        <div className="flex flex-col items-start p-5 lg:w-[500px] md:w-[380px] sm:w-[250px] gap-12 bg-[#1F2937]">
          <div className="flex flex-col items-start gap-4">
            <h1 className="flex flex-col text-[#FAFAFA] font-semibold not-italic font-eculid lg:text-[50px] md:text-[30px] sm:text-[20px]">
              Get up to 30% off
              <span className="text-[#F7C59F] font-eculid">New Arrivals</span>
            </h1>
            <p className="lg:text-lg md:text-base sm:text-sm font-eculid text-[#F3F4F6] not-italic font-semibold">
              Introducing our latest collection of products
            </p>
          </div>
          <button className="px-4 py-3 border lg:w-[210px] md:w-[180px] sm:w-[120px]">
            <p className="font-semibold text-white lg:text-base md:text-sm sm:text-[8px] font-eculid">
              PLACE YOUR ORDER
            </p>
          </button>
        </div>
      </div>
      <div className="basis-2/5 bg-[#F7C59F] relative">
        <img
          src={eclipBanner}
          alt="eclipse"
          className="absolute inset-0 m-auto"
        />
        <img
          src={imgBanner}
          alt="Img banner"
          className="relative z-0 mx-auto mt-4"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
