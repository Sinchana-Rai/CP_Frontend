import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  return (
    <nav>
      <div className="logo">Book an Event Decor </div>
      
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to="home" > HOME </Link>
          <Link to="about" > ABOUT </Link>
          <Link to="contactus" > CONTACT US </Link>
          <Link to="login">LOGIN</Link>
          {/* <Link to="reviews">REVIEWS</Link> Page under construction */}
          {/* <Link to="dashboard">DASHBOARD</Link>  */}

        </div>
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;



