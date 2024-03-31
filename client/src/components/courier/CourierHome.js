import "../../styles/CourierHome.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourierHome = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Hello, welcome to CampusCousine</h1>
    </div>
  );
};

export default CourierHome;
