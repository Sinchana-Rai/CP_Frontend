import React from 'react'

const Services = () => {

  const options = [
    {
      id: 1,
      url: "/Birthday.jpg",
      title: "Birthday Decors",
    },
    {
      id: 2,
      url: "/Wedding.jpg",
      title: "Wedding Decors",
    },
    {
      id: 3,
      url: "/genderreveal.jpg",
      title: "Gender Reveal Decors",
    },
    {
      id: 4,
      url: "/Babyshower.jpg",
      title: "Baby Shower Decors",
    },
    {
      id: 4,
      url: "/DesiDecor.jpg",
      title: "Indian Festival Decors",
    },
  ];

  return (
    <>
      <div className="services container">
        <h2>OUR SERVICES</h2>
        <div className="displayInfo">
          {options.map((el) => {
            return (
              <div className="item" key={el.id}>
                <h3>{el.title}</h3>
                <img src={el.url} alt={el.title} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default Services