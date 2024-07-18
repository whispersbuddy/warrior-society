import React from "react";
import Carousel from "react-elastic-carousel";

import "./SliderComponent.css";

export default function SliderComponent({ children }) {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 1 },
    { width: 600, itemsToShow: 1 },
    { width: 1000, itemsToShow: 1 },
  ];
  return (
    <>
      <Carousel
        itemPadding={[0, 10, 0, 0]}
        itemsToShow={1}
        pagination={false}
        breakPoints={breakPoints}
      >
        {children}
      </Carousel>
    </>
  );
}
