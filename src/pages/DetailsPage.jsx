import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCredits,
  fetchDetails,
  fetchVideos,
  imgPath500w,
  imgPathOriginal,
} from "../services/api";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  AddIcon,
  CalendarIcon,
  CheckCircleIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  minutesToHours,
  ratingToPercentage,
  resolveRatingColor,
} from "../utils/helpers";
import Video from "../components/Video";
import { useAuth } from "../context/useAuth";
import { useFirestore } from "../services/firestore";
import CastCard from "../components/CastCard";

function DetailsPage() {
  const router = useParams();
  const { type, id } = router;

  const { user } = useAuth();
  const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } =
    useFirestore();
  const toast = useToast();

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState({});
  const [video, setVideo] = useState();
  const [videos, setVideos] = useState([]);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ]);
        setDetails(detailsData);
        setCast(creditsData?.cast?.slice(0, 10));
        const video = videosData?.results?.find(
          (video) => video?.type === "Trailer" && video?.site === "YouTube"
        );
        setVideo(video);
        const videos = videosData?.results
          ?.filter(
            (video) => video?.type !== "Trailer" && video?.site === "YouTube"
          )
          ?.slice(0, 10);
        setVideos(videos);
      } catch (error) {
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  console.log(cast, "cast");

  const handleSaveToWatchlist = async () => {
    if (!user) {
      toast({
        title: "Login to add to Watchlist",
        status: "error",
        isClosable: true,
      });
      return;
    }
    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path: details?.poster_path,
      release_date: details?.release_date || details?.first_air_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    };

    const dataId = data?.id?.toString();
    await addToWatchlist(user?.uid, dataId, data);
    const saveInWatchlist = await checkIfInWatchlist(user?.uid, dataId);
    setInWatchlist(saveInWatchlist);
  };

  useEffect(() => {
    if (!user) {
      setInWatchlist(false);
      return;
    }
    checkIfInWatchlist(user?.uid, id).then((data) => setInWatchlist(data));
  }, [id, user, checkIfInWatchlist]);

  const handleRemoveFromWatchlist = async () => {
    await removeFromWatchlist(user?.uid, id);
    const saveInWatchlist = await checkIfInWatchlist(user?.uid, id);
    setInWatchlist(saveInWatchlist);
  };

  if (loading) {
    return (
      <Flex justify={"center"}>
        <Spinner size={"xl"} color="red" />
      </Flex>
    );
  }

  const title = details?.title || details?.name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;

  return (
    <Box>
      <Box
        background={`linear-gradient(rgba(0,0,0,.87), rgba(0,0,0,.87)), url( ${imgPathOriginal}/${details?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        w={"100%"}
        h={{ base: "auto", md: "500px" }}
        py={2}
        zIndex={"-1"}
        display={"flex"}
        alignItems={"center"}
      >
        <Container maxW={"container.xl"}>
          <Flex
            alignItems={"center"}
            gap={10}
            flexDirection={{ base: "column", md: "row" }}
          >
            {/* Poster */}
            <Image
              height={450}
              borderRadius={"sm"}
              src={`${imgPath500w}/${details?.poster_path}`}
            />

            <Box>
              {/* Nome + Ano */}
              <Heading fontSize={"3xl"} fontFamily={"sans-serif"}>
                {title}{" "}
                <Text
                  as="span"
                  fontWeight={"normal"}
                  color={"gray.400"}
                  fontFamily={"heading"}
                >
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>
              {/* ------------- */}

              {/* Data */}
              <Flex alignItems={"center"} gap={4} mt={1} mb={5}>
                <Flex alignItems={"center"}>
                  <CalendarIcon mr={2} color={"gray.400"} />
                  <Text fontSize={"small"}>
                    {new Date(releaseDate).toLocaleDateString("pt-BR")} (BR)
                  </Text>
                </Flex>
                {type === "movie" && (
                  <>
                    <Box>·</Box>
                    <Flex alignItems={"center"}>
                      <TimeIcon mr={2} color={"gray.400"} />
                      <Text fontSize={"small"}>
                        {minutesToHours(details?.runtime)}
                      </Text>
                    </Flex>
                  </>
                )}
              </Flex>
              {/* ------------- */}

              {/* Notas dos usuários + Watchlist */}
              <Flex alignItems={"center"} gap={4}>
                <CircularProgress
                  value={ratingToPercentage(details?.vote_average)}
                  bg={"gray.800"}
                  borderRadius={"full"}
                  p={0.5}
                  size={70}
                  color={resolveRatingColor(details?.vote_average)}
                  thickness={6}
                >
                  <CircularProgressLabel fontSize={"large"}>
                    {ratingToPercentage(details?.vote_average)}
                    <Box as="span" fontSize={10}>
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text display={{ base: "none", md: "initial" }}>
                  Users Score
                </Text>
                {inWatchlist ? (
                  <Button
                    leftIcon={<CheckCircleIcon />}
                    colorScheme="green"
                    variant={"outline"}
                    onClick={handleRemoveFromWatchlist}
                  >
                    In Watchlist
                  </Button>
                ) : (
                  <Button
                    leftIcon={<AddIcon />}
                    variant={"outline"}
                    onClick={handleSaveToWatchlist}
                  >
                    Add to Watchlist
                  </Button>
                )}
              </Flex>
              {/* ---------- */}

              {/* Detalhes adicionais  */}
              <Text
                color={"gray.400"}
                fontSize={"small"}
                fontStyle={"italic"}
                my={5}
              >
                {details?.tagline}
              </Text>
              <Heading fontSize={"xl"} mb={3}>
                Overview
              </Heading>
              <Text fontSize={"medium"} mb={3}>
                {details?.overview}
              </Text>
              <Flex mt={6} gap={2}>
                {details?.genres?.map((genre) => (
                  <Badge key={genre?.id} p={1}>
                    {genre?.name}
                  </Badge>
                ))}
              </Flex>
              {/* ---------------- */}
            </Box>
          </Flex>
        </Container>
      </Box>
      {/* Credits */}
      <Container maxW={"container.xl"} pb={10}>
        <Heading
          as="h2"
          fontSize={"medium"}
          textTransform={"uppercase"}
          mt={10}
        >
          Cast
        </Heading>
        <Flex mt={5} mb={10} overflowX={"scroll"} gap={5}>
          {cast?.length === 0 && <Text>No cast found</Text>}
          {cast &&
            cast?.map((item) => (
              <CastCard
                key={item?.id}
                name={item?.name}
                character={item?.character}
                img={`${imgPath500w}/${item?.profile_path}`}
              />
            ))}
        </Flex>

        <Heading
          as={"h2"}
          fontSize={"medium"}
          textTransform={"uppercase"}
          mt={10}
          mb={5}
        >
          Videos
        </Heading>
        <Video id={video?.key} />
        <Flex mt={5} mb={10} overflowX={"scroll"} gap={5}>
          {videos &&
            videos?.map((item) => (
              <Box key={item?.id} minW={290}>
                <Video id={item?.key} small />
                <Text
                  fontSize={"small"}
                  fontWeight={"bold"}
                  mt={2}
                  noOfLines={2}
                >
                  {item?.name}
                </Text>
              </Box>
            ))}
        </Flex>
      </Container>
    </Box>
  );
}

export default DetailsPage;
