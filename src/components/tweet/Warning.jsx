import React from "react";
import { GoAlert } from "react-icons/go";


export const Warning = ({classname,language}) => {
  return (
    <div className={`errorMessage${classname || ""}`}>
      <div className="errorIcon">
        <GoAlert />
      </div>
      <div className="errorText">{language.warning}</div>
    </div>
  );
};
