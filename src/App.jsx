import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/authProvider";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Outlet />
      </Layout>
    </AuthProvider>
  );
}

export default App;
