import React from "react";
import "./index.css";

export default function VehicleOption({ item }) {
  return (
    <div
      className={`card`}
    >
      {item.type}
    </div>
  );
}
