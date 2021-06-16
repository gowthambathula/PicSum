import React from "react";
import axios from "axios";

export default function ImageHost(props) {
  const imageLoad = (x) => {
    axios
      .get(x)
      .then((res) => {
        return (
          <div>
            <img src={`${res.data}`} />
          </div>
        );
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => props.func(props.id.download_url)}
      >
        {/* `${props.id.download_url}/200/300` */}
        <img
          style={{ width: "200px", height: "200px" }}
          alt={`${props.id.download_url}`}
          src={`${props.id.download_url}`}
        />
      </span>
    </>
  );
}
