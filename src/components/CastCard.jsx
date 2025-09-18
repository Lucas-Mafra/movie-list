import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const CastCard = ({ name, character, img }) => {
  return (
    <Box
      minW={150}
      position="relative"
      borderRadius="sm"
      overflow="hidden"
      role="group"
    >
      <Image
        src={img}
        w="100%"
        h={225}
        objectFit="cover"
        transition="0.3s"
        // _groupHover={{ transform: "scale(1.05)" }}
      />

      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bgGradient="linear(to-t, rgba(0,0,0,0.85), rgba(0,0,0,0.2))"
        opacity={0}
        transition="all 0.3s ease-in-out"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-end"
        textAlign="center"
        color="white"
        p={3}
        _groupHover={{ opacity: 1 }}
      >
        <Text fontWeight="bold" fontSize="lg" mb={1}>
          {name}
        </Text>
        <Text fontWeight="light" fontSize="sm" opacity={0.85}>
          {character}
        </Text>
      </Box>
    </Box>
  );
};

export default CastCard;
