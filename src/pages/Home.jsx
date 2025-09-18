import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTrending } from "../services/api";
import Card from "../components/Card";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err, "err"))
      .finally(() => setLoading(false));
  }, [timeWindow]);

  console.log(data, "data");

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={4} my={5}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Trending
        </Heading>
        <Flex
          alignItems={"center"}
          gap={2}
          border={"1px solid"}
          borderRadius={20}
          borderColor={"red"}
        >
          <Box
            as="button"
            px={3}
            py={1}
            borderRadius={20}
            bg={timeWindow === "day" ? "gray.900" : "transparent"}
            color={timeWindow === "day" ? "white" : "gray.600"}
            onClick={() => setTimeWindow("day")}
            transition="all 0.3s ease"
          >
            Today
          </Box>
          <Box
            as="button"
            px={3}
            py={1}
            borderRadius={20}
            bg={timeWindow === "week" ? "gray.900" : "transparent"}
            color={timeWindow === "week" ? "white" : "gray.600"}
            onClick={() => setTimeWindow("week")}
            transition="all 0.3s ease"
          >
            This Week
          </Box>
        </Flex>
      </Flex>
      {/*loading && <div>Loading...</div>*/}
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={4}
      >
        {data &&
          data?.map((item, i) =>
            loading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <Card key={item?.id} item={item} type={item?.media_type} />
            )
          )}
      </Grid>
    </Container>
  );
};

export default Home;
