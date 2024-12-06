import React from "react";
import { StarIcon } from "@heroicons/react/solid";

const RatingComponent = ({ rating, size = "1rem" }) => {
  const maxRating = 5;
  const filledStars = Math.round(rating * 2) / 2; // Round to the nearest half star

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      if (i <= filledStars) {
        stars.push(
          <StarIcon
            key={i}
            style={{ height: size, width: size }}
            className="text-yellow-500"
          />
        );
      } else if (i === Math.ceil(filledStars) && filledStars % 1 !== 0) {
        // Render half star
        stars.push(
          <div style={{ height: size, width: size }} className="relative">
            <StarIcon
              key={`star-${i}`}
              className="h-full w-full relative z-10 text-yellow-500"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
            <StarIcon
              key={i}
              className="h-full w-full absolute top-0 left-0 text-gray-300"
            />
          </div>
        );
      } else {
        stars.push(
          <StarIcon
            key={i}
            style={{ height: size, width: size }}
            className="text-gray-300"
          />
        );
      }
    }

    return stars;
  };

  return <div className="flex items-center">{renderStars()}</div>;
};

export default RatingComponent;
