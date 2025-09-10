import Navbar from "./Navbar"
import propTypes from "prop-types"

function Layout({children}) {
  return (
    <>
    <Navbar/>
    <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
    children: propTypes.node.isRequired,
}

export default Layout