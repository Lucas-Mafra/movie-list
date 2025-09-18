import { Button, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

function Pagination({ activePage, totalPage, setActivePage }) {
  return (
    <Flex gap="2" alignItems={"center"}>
      <Flex gap={2} maxW={250} my={5}>
        <Button
          onClick={() => setActivePage((prev) => prev - 1)}
          isDisabled={activePage === 1}
        >
          Prev
        </Button>
        <Button
          onClick={() => setActivePage((prev) => prev + 1)}
          isDisabled={activePage === totalPage}
        >
          Next
        </Button>
      </Flex>
      <Flex gap={1}>
        <Text>{activePage}</Text>
        <Text>of</Text>
        <Text>{totalPage}</Text>
      </Flex>
    </Flex>
  );
}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

export default Pagination;
