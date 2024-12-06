import { HeartIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

const HeartComponent = () => {
  const [save, setSave] = useState(false);
  return (
    <button type="button" onClick={() => setSave(!save)}>
      <HeartIcon
        className={`h-7 w-7 ${
          save ? "text-green-500" : "text-gray-200"
        }  hover:text-green-700`}
      />
    </button>
  );
};

export default HeartComponent;
