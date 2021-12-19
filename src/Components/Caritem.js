import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/carList.module.css";


const CarDetails = () => {
  // Make the Backend request, to find the specific car
  const [car, setCar] = React.useState(<></>);
  const { id } = useParams();
  //console.log("CarDetails id", id)
  React.useEffect(() => {
    axios
      .get(`https://4a4gvfykni.execute-api.us-east-1.amazonaws.com/items/${id}`)
      .then((carResponse) => {
        setCar(<Caritem car={carResponse.data.Item} />);
      });
  }, [id])
  return (
    <div className="carDetails">
      {car}
      <div>
      <button className={styles.button} onClick={() => { window.location.replace( `/update/${id}`);}}> Update</button>
      <button className={styles.button}
          onClick={() => {
            console.log({id});
            axios
            .delete(`https://4a4gvfykni.execute-api.us-east-1.amazonaws.com/items/${id}`)
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                window.location.replace(
                  `/`
                );
              }
            });
            }}
            > 
          Delete
      </button>
      </div>
    </div>
  );
};


const Caritem = ({ car }) => {
  const numberFormat = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 9
  }).format(value);

  return (
    <div className={styles.carItem} id={car.id}>
      <Link to={`/car/${car.id}`}>
        <img src={car.imgurl} width="200" height="200" alt="" />
      </Link>
      <p>
        {car.make} {car.model}
      </p>
      <p>{numberFormat(car.price)}</p>
      {/* <button onClick={saveCarData}></button> */}
    </div>
  );
};



export { Caritem, CarDetails };
