import { Box, Center, Container, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const MotionBox = motion(Box);

const Navbar = () => {
  return (
    <Box py="4" mb="2">
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"}>
          {/* LOGO */}
          <Link to="/">
            <MotionBox
              fontSize="2xl"
              fontWeight="bold"
              color="red.500"
              letterSpacing="widest"
              fontFamily="monospace"
              px={3}
              py={1}
              borderRadius="md"
              display="inline-block"
              whileHover={{
                scaleX: 1.1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              FILM
            </MotionBox>
          </Link>
          {/* Desktop */}
          <Flex gap={4} alignItems={"center"}>
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/shows">Shows</Link>
            <Link to="/search">Search</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
