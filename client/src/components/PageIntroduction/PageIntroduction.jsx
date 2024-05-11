// PageIntroduction.jsx
import React from "react";

function PageIntroduction({ heading, btname, handleClick }) {
  return (
    <div className="introductionSection">
      <p className="heading">{heading}</p>
      <button className="button" onClick={handleClick}>
        {btname}
      </button>
    </div>
  );
}

export default PageIntroduction;
