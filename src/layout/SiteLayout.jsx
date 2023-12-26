import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import propTypes from "prop-types";

const SiteLayout = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </>
  );
};

SiteLayout.propTypes = {
  children: propTypes.any,
};

export default SiteLayout;
