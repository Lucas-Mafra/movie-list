import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import theme from "../theme.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
      {
        path: "/movies",
        element: <h1>Movies</h1>,
      },
      {
        path: "/shows",
        element: <h1>Tv Shows</h1>,
      },
      {
        path: "/search",
        element: <h1>Search</h1>,
      },
    ],
  },
]);

// forçar o darkTheme
const customStorageManager = {
  get: () => "dark",
  set: () => {},
  type: "localStorage",
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme} colorModeManager={customStorageManager}>
      <RouterProvider router={router}/>
    </ChakraProvider>
  </StrictMode>
);
