import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

const NavLink = ({ to, children }) => (
  <Link to={to}>
    <Box
      position="relative"
      px={2}
      py={1}
      _hover={{ color: "red.500" }}
      transition="color 0.2s"
      fontWeight="medium"
      role="group"
    >
      {children}
      <Box
        as="span"
        position="absolute"
        left={0}
        bottom={0}
        h="2px"
        w="0%"
        bg="red.500"
        transition="width 0.3s"
        _groupHover={{ width: "100%" }}
      />
    </Box>
  </Link>
);

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("success");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <Box py={4} mb={2}>
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center">
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
              whileHover={{ scaleX: 1.1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              FILM
            </MotionBox>
          </Link>

          {/* LINKS DESKTOP */}
          <Flex
            gap={6}
            alignItems="center"
            display={{ base: "none", md: "flex" }}
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/shows">Shows</NavLink>
            <Link to="/search">
              <SearchIcon fontSize="xl" />
            </Link>

            {user ? (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg="red.500"
                    color="white"
                    size="sm"
                    name={user?.email}
                    src={user?.photoURL}
                  />
                </MenuButton>
                <MenuList>
                  <Link to="/watchlist">
                    <MenuItem>Watchlist</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Avatar
                size="sm"
                bg="gray.800"
                as="button"
                onClick={handleGoogleLogin}
              />
            )}
          </Flex>

          {/* MOBILE */}
          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems="center"
            gap={4}
          >
            <Link to="/search">
              <SearchIcon fontSize="xl" />
            </Link>
            <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
          </Flex>
        </Flex>
      </Container>

      {/* Drawer fora do Container */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="black">
          <DrawerHeader>
            {user ? (
              <Flex alignItems="center" gap={2}>
                <Avatar
                  bg="red.500"
                  size="sm"
                  name={user?.email}
                  src={user?.photoURL}
                />
                <Box fontSize="sm">{user?.displayName || user?.email}</Box>
              </Flex>
            ) : (
              <Avatar
                size="sm"
                bg="gray.800"
                as="button"
                onClick={handleGoogleLogin}
              />
            )}
          </DrawerHeader>

          <DrawerBody>
            <Flex flexDirection="column" gap={4} onClick={onClose}>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/movies">Movies</NavLink>
              <NavLink to="/shows">TV Shows</NavLink>
              {user && (
                <>
                  <NavLink to="/watchlist">Watchlist</NavLink>
                  <Button variant="outline" colorScheme="red" onClick={logout}>
                    Logout
                  </Button>
                </>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
