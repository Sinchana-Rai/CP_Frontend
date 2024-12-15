import React from 'react'

const Footer = () => {

 let footerStyle = {
    position: "fixed",
    bottom: "0",
    width: "100%",
 }

  return (
    <footer style={footerStyle}>
        <div className="tag">
        <label>&copy; 2024</label> 
        </div>

    </footer>
  )
}

export default Footer