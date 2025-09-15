import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

function SortMenu({ sortBy, setSortBy, setActivePage }) {
  const labels = {
    "popularity.desc": "Popular",
    "vote_average.desc&vote_count.gte=1000": "Top Rated",
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant={"outline"}
      >
        {labels[sortBy] || "Ordenar"}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            setSortBy("popularity.desc");
            setActivePage(1);
          }}
        >
          Popular
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSortBy("vote_average.desc&vote_count.gte=1000");
            setActivePage(1);
          }}
        >
          Top Rated
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

SortMenu.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default SortMenu;
