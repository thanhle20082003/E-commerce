import SiteLayout from "../layout/SiteLayout";
import HomeBanner from "../module/home/HomeBanner";
import HomeBrand from "../module/home/HomeBrand";
import HomeCard from "../module/home/HomeCard";
import HomeHighlight from "../module/home/HomeHighlight";
import HomeProfile from "../module/home/HomeProfile";

const HomePage = () => {
  return (
    <>
      <SiteLayout>
        <HomeBanner></HomeBanner>
        <HomeHighlight></HomeHighlight>
        <HomeCard></HomeCard>
        <HomeBrand></HomeBrand>
        <HomeProfile></HomeProfile>
      </SiteLayout>
    </>
  );
};

export default HomePage;
