import { Container, Flex, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchShows } from "../../services/api";
import Card from "../../components/Card";
import SortMenu from "../../components/SortMenu";
import Pagination from "../../components/Pagination";

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    setLoading(true);
    fetchShows(activePage, sortBy)
      .then((res) => {
        setShows(res?.results);
        setActivePage(res?.page);
        setTotalPage(res?.total_pages);
      })
      .catch((err) => console.log(err, "err"))
      .finally(() => setLoading(false));
  }, [activePage, sortBy]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={4} my={5}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Discover Tv Shows
        </Heading>

        <SortMenu
          sortBy={sortBy}
          setSortBy={setSortBy}
          setActivePage={setActivePage}
        />
      </Flex>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={4}
      >
        {shows &&
          shows?.map((item, i) =>
            loading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <Card key={item?.id} item={item} type={"tv"} />
            )
          )}
      </Grid>
      {/* Pagination */}
      <Pagination
        activePage={activePage}
        totalPage={totalPage}
        setActivePage={setActivePage}
      />
    </Container>
  );
};

export default Shows;
