import { Outlet, Link } from "react-router-dom";
const Layout = () => {
 return (
   <>
     <nav className="text-white bg-black ">
       <ul className="flex items-center justify-center gap-5 ">
         <li><Link to="/">Home</Link></li>
         <li><Link to="/PlayerApp">PlayerApp</Link></li>
       </ul>
     </nav>
     <Outlet />
   </>
 );
};
export default Layout;