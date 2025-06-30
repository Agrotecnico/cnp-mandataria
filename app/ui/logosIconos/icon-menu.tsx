import React from "react"

const IconMenu = ({ width = "24", heightx = "24", className="" }) => {
  return (
    <div  className={className}>
      <svg
        width={width}
        height={heightx}
        viewBox="0 0 24 24"
        fill="inherit"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="3" width="24" height="3" fill="inherit" />
        <rect y="11" width="24" height="3" fill="inherit" />
        <rect y="19" width="24" height="3" fill="inherit" />
      </svg>
    </div>
  );
};

export default IconMenu;