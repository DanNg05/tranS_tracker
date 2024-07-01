import React from "react";

// FUNCTION TO RETURN ICONS
export function returnIcon (category)  {
  switch (category) {
    case 'shopping':
      return <i className="fa-solid fa-bag-shopping"></i>;
    case 'transportation':
      return <i className="fa-solid fa-car"></i>;
    case 'groceries':
      return <i className="fa-solid fa-drumstick-bite"></i>;
    case 'utilities':
      return <i className="fa-solid fa-bolt"></i>;
    case 'health':
      return <i className="fa-solid fa-heart-pulse"></i>;
    case 'entertainment':
      return <i className="fa-solid fa-gamepad"></i>;
    default:
      return <i className="fa-regular fa-circle"></i>;
  }
};
