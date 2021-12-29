import React from 'react';

const calcStarImg = (numStars) => {
  let starImg = [];
  let wholeStars = Math.floor(numStars);
  let fractionStar = numStars - Math.floor(numStars);
  let emptyStars = 5 - wholeStars;

  // whole stars
  for(let i = 1; i <= wholeStars; i++) {
    starImg.push('./images/small/fullstar.png');
  }

  // fractional stars
  if (fractionStar >= 0.75) {
    starImg.push('./images/small/threequarterstar.png');
  } else if (fractionStar >= 0.5) {
    starImg.push('./images/small/halfstar.png');
  } else if (fractionStar >= 0.25) {
    starImg.push('./images/small/quarter.png');
  }

  // empty stars
  for(let i = 1; i <= emptyStars; i++) {
    starImg.push('./images/small/emptystar.png');
  }

  return (
    <span>
      {starImg.map(img => (
        <img src={img}></img>
      ))}
    </span>
  )
}

export default calcStarImg;