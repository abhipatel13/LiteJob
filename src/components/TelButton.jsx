import React, { useState } from "react";

// icons
import { PhoneIcon } from "@heroicons/react/outline";

const TelButton = ({ phoneNumber, onClick }) => {
  const [telShow, setTelShow] = useState(false);
  return (
    <>
      {telShow ? (
        <a
          href={`tel:+${phoneNumber}`}
          className="w-full p-2 flex items-center justify-center gap-1 text-center transition-all duration-300 bg-primary/5 text-primary hover:bg-primary/80 hover:text-white rounded-lg active:scale-105"
        >
          <PhoneIcon className="h-4 w-4" />
          <span className="text-sm font-semibold capitalize">
            +{phoneNumber}
          </span>
        </a>
      ) : (
        <button
          type="button"
          onClick={() => {
            onClick() || setTelShow(true);
          }}
          className="w-full p-2 flex items-center justify-center gap-1 text-center transition-all duration-300 bg-primary/5 text-primary hover:bg-primary/80 hover:text-white rounded-lg active:scale-105"
        >
          <PhoneIcon className="h-4 w-4" />
          <span className="text-sm font-semibold capitalize">
            Message Business
          </span>
        </button>
      )}
    </>
  );
};

export default TelButton;
