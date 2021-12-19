import React, { useState, useEffect } from "react";

import axios from "axios";

import { Caritem } from "./Caritem";
import styles from "../styles/carList.module.css";

const CarsList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios

      .get("https://4a4gvfykni.execute-api.us-east-1.amazonaws.com/items")

      .then(({ data }) => {
        console.log(data);
        setCars(data.Items);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h3 className={styles.header}>CAR LIST</h3>
      <div className={styles.carList}>
        {cars.map((car, index) => {
          return <Caritem car={car} key={index} />;
        })}
      </div>
      <div className={styles.center}>
        <button
          className={styles.button}
          onClick={() => {
            window.location.replace(`/add`);
          }}
        >
          {" "}
          Add New Car
        </button>
      </div>
    </div>
  );
};

export default CarsList;
