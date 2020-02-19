import React from "react";
import Loader from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="w-full flex justify-center ">
      <Loader type="TailSpin" color="#ed64a6" height={40} width={40} />
    </div>
  );
};
export default LoadingSpinner;
