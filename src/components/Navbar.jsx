import {
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { SearchIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("sucess");
    } catch (error) {
      console.log(error, "error");
    }
  };
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
            <Link to="/search">
              <SearchIcon fontSize={"xl"} />
            </Link>
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"red.500"}
                    color={"white"}
                    size={"sm"}
                    name={user?.email}
                    src={user?.photoURL}
                  />
                </MenuButton>
                <MenuList>
                  <Link to={"/"}>
                    <MenuItem>Watchlist</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}

            {!user && (
              <Avatar
                size={"sm"}
                bg={"gray.800"}
                as={"button"}
                onClick={handleGoogleLogin}
              />
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
