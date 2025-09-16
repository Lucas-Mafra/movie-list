import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import { imgPathOriginal } from "../services/api";
import { CloseIcon, StarIcon } from "@chakra-ui/icons";

const WatchlistCard = ({ type, item, setWatchlist }) => {
  const { removeFromWatchlist } = useFirestore();
  const { user } = useAuth();

  const handleRemoveClick = (event) => {
    event.preventDefault();
    removeFromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Link to={`/${type}/${item.id}`}>
      <Flex
        gap={4}
        p={4}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        _hover={{ boxShadow: "md", transform: "scale(1.01)" }}
        transition="all 0.2s ease-in-out"
        align="flex-start"
      >
        {/* Poster */}
        <Box position="relative" w={150} flexShrink={0}>
          <Image
            src={`${imgPathOriginal}/${item.poster_path}`}
            alt={item.title}
            h={220}
            w={150}
            objectFit="cover"
            borderRadius="md"
          />

          {/* Botão remover */}
          <Tooltip label="Remove from watchlist" hasArrow>
            <IconButton
              aria-label="Remove from watchlist"
              icon={<CloseIcon />}
              size="sm"
              colorScheme="red"
              position="absolute"
              top={2}
              left={2}
              onClick={handleRemoveClick}
              shadow="sm"
            />
          </Tooltip>
        </Box>

        {/* Infos */}
        <Box flex="1">
          <Heading
            fontSize={{ base: "lg", md: "xl" }}
            noOfLines={1}
            fontFamily={"sans-serif"}
          >
            {item?.title || item?.name}
          </Heading>

          <Flex align="center" gap={3} mt={2}>
            <Badge colorScheme="green">
              {new Date(
                item?.release_date || item?.first_air_date
              ).getFullYear() || "N/A"}
            </Badge>
            <Flex align="center" gap={1}>
              <StarIcon color="yellow.400" />
              <Text fontSize="sm" fontWeight="bold">
                {item?.vote_average?.toFixed(1)}
              </Text>
            </Flex>
          </Flex>

          <Text mt={3} fontSize={{ base: "sm", md: "md" }} noOfLines={4}>
            {item?.overview}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default WatchlistCard;
