import React from "react";
import loadingImg from "../../assets/loading.png";
import { useAppContext } from "../../context/AppContext";
import './loading.css';

const Loading = () => {
  const { isNavAnimationComplete, loading } = useAppContext();

  if (isNavAnimationComplete || loading) {
    return (
      <div className="loadingPosition">
        <img src={loadingImg} alt="loading" className="loading-rotate-animation" />
      </div>
    );
  }

  return null;
};

export default Loading;
