import React from 'react'
import { Link } from "react-router-dom";

const MainInfo = () => {
  return (
    <section className="mainInfo">
    <img src="/mainimage.jpg" alt="Decor Image" />
    <div className="item">
      <div>
        <h3>
        Crafting unforgettable experiences...
        </h3>
        <Link to="/contactus">
          CONTACT NOW
        </Link>
      </div>
    </div>
  </section>
  )
}

export default MainInfo