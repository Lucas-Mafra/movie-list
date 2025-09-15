import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { searchData } from "../../services/api";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [tempSearchValue, setTempSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    searchData(searchValue, activePage)
      .then((res) => {
        console.log(res, "res");
        setData(res?.results);
        setActivePage(res?.page);
        setTotalPage(res?.total_pages);
      })
      .catch((err) => console.log(err, "err"))
      .finally(() => setLoading(false));
  }, [searchValue, activePage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
  };

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={4} my={5}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Search
        </Heading>
      </Flex>

      <form onSubmit={handleSearch}>
        <Input
          placeholder="Search Movies, Tv Shows..."
          _placeholder={{ color: "gray.100" }}
          value={tempSearchValue}
          onChange={(e) => setTempSearchValue(e.target.value)}
        />
      </form>

      {loading && (
        <Flex justifyContent={"center"} mt={10}>
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}

      {data?.length === 0 && !loading && (
        <Heading textAlign={"center"} as={"h3"} fontSize={"small"} mt={10}>
          No resutls found
        </Heading>
      )}

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        mt={5}
        gap={4}
      >
        {data?.length > 0 &&
          !loading &&
          data?.map((item, i) =>
            loading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <Card key={item?.id} item={item} type={item?.media_type} />
            )
          )}
      </Grid>
      {data?.length > 0 && !loading && (
        <Pagination
          activePage={activePage}
          totalPage={totalPage}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
}

export default Search;
