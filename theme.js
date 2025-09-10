import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: {
    body: {
      bg: "blackAlpha.900",
      color: "whiteAlpha.900",
    },
  },
};


const theme = extendTheme({ config, styles });

export default theme;
