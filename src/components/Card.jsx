import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imgPath500w } from "../services/api";
import { StarIcon } from "@chakra-ui/icons";

const Card = ({ item, type }) => {
  return (
    <Link to={`/${type}/${item?.id}`}>
      <Box
        position="relative"
        transform="scale(1)"
        _hover={{
          transform: { base: "scale(1)", md: "scale(1.08)" },
          transition: "transform 0.2s ease-in-out",
          zIndex: 10,
          "& .overlay": {
            opacity: 1,
          },
        }}
      >
        <Image
          src={`${imgPath500w}/${item.poster_path}`}
          alt={item.title || item.name}
          height="100%"
          width="100%"
          objectFit="cover" // garante que a imagem preencha o box
        />

        {/* Overlay */}
        <Box
          className="overlay"
          position="absolute"
          top={0} // ocupa desde o topo
          left={0}
          w="100%"
          h="100%" // ocupa toda a altura
          bgGradient="linear(to-t, rgba(0,0,0,0.9), rgba(0,0,0,0))"
          opacity={0}
          transition="opacity 0.3s ease-in-out"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center" // centraliza vertical e horizontal
          textAlign="center"
          color="white"
          p={2}
        >
          <Text fontWeight="bold" fontSize="lg" fontFamily={"sans-serif"}>
            {item.title || item.name}
          </Text>
          <Text fontSize="sm" color="gray.300">
            {item?.release_date || item?.first_air_date
              ? new Date(item.release_date || item.first_air_date).getFullYear()
              : "N/A"}
          </Text>
          <Flex alignItems={"center"} justifyContent={"center"} gap={2} mt={4}>
            <StarIcon />
            <Text fontWeight={"bold"}>{item?.vote_average?.toFixed(1)}</Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default Card;
