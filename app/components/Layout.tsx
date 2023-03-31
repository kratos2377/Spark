import Navbar from "./Navbar"

const Layout = (props: any) => {
return (
    <>
    <Navbar/>
    {props.children}
    </>
)
}

export default Layout