import { Box } from "@chakra-ui/react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import propTypes from "prop-types";

function Layout({ children }) {
  return (
    <Box minH={"100vh"} display={"flex"} flexDirection={"column"}>
      <Navbar />
      <Box flex={1} as="main">
        <main>{children}</main>
      </Box>
      <Footer />
    </Box>
  );
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
};

export default Layout;
