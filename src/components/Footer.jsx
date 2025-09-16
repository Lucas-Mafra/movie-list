import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="black" color="white" py={4} mt={10} textAlign="center">
      <Flex justifyContent="center" gap={6} alignItems="center">
        {/* GitHub */}
        <Link
          href="https://github.com/Lucas-Mafra"
          target="_blank"
          aria-label="GitHub"
        >
          <FaGithub size={24} />
        </Link>

        {/* Email */}
        <Link href="mailto:lucas.lima.nave@gmail.com" aria-label="Email">
          <FaEnvelope size={24} />
        </Link>
      </Flex>

      <Text mt={2} fontSize="sm">
        © {new Date().getFullYear()} Lucas de Lima Mafra
      </Text>
    </Box>
  );
};

export default Footer;
