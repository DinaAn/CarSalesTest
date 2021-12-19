import React, { useEffect } from "react";
import axios from "axios";
import styles from "../styles/addForm.module.css";
import { useParams } from "react-router-dom";

function addCar(carData, setErrorState) {
  console.log("carData:", carData);
  return axios({
    method: "PUT",
    url: "https://4a4gvfykni.execute-api.us-east-1.amazonaws.com/items",
    data: carData,
  }).then((response) => {
    console.log("Request response:", response);
    if (response.status === 200) {
      alert("Car added succesfully");
      return 0;
    } else {
      return 1;
    }
  });
}

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}
function isPositiveInteger(str) {
  if (typeof str !== "string") {
    return false;
  }

  const num = Number(str);

  if (Number.isInteger(num) && num > 0) {
    return true;
  }

  return false;
}

// Type can have values {'add', 'update'}
function AddForm() {
  // console.log(type);
  const [carId, setCarId] = React.useState("");
  return (
    <div>
      <div className={styles.addForm}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Make</label>
              </td>
              <td>
                <input
                  type="text"
                  id="carMake"
                  placeholder="Type your car make"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Model</label>
              </td>
              <td>
                <input
                  type="text"
                  id="carModel"
                  placeholder="Type your car model"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Price</label>
              </td>
              <td>
                <input
                  type="text"
                  id="carPrice"
                  placeholder="Type your car price"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Image URL</label>
              </td>
              <td>
                <input
                  type="text"
                  id="carImgUrl"
                  placeholder="Type your car ImgUrl"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            const make = document.getElementById("carMake").value;
            const price = document.getElementById("carPrice").value;
            const id =
              document.getElementById("carMake").value +
              "_" +
              document.getElementById("carModel").value +
              "_" +
              document.getElementById("carPrice").value;
            setCarId(id);
            console.log(carId);
            const model = document.getElementById("carModel").value;
            const imgurl = document.getElementById("carImgUrl").value;

            const putcar = {
              id,
              price,
              make,
              model,
              imgurl,
            };
            // Validation code
            if (isEmptyOrSpaces(price) || !isPositiveInteger(price)) {
              alert("Please enter a positive integer for price");
              return;
            }
            if (
              isEmptyOrSpaces(make) ||
              isEmptyOrSpaces(model) ||
              isEmptyOrSpaces(imgurl)
            ) {
              alert("Please enter values for the missing fields");
              return;
            }
            console.log(putcar);
            console.log(
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(price)
            );
            addCar(putcar).then((response) => {
              if (response === 0) {
                window.location.replace(`/car/${putcar.id}`);
              }
            });
          }}
        >
          Save
        </button>
        <button
          className={styles.button}
          onClick={() => {
            window.location.replace(`/`);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

//Try React version
function UpdateForm() {
  const { id } = useParams();
  const [caritem, setCaritem] = React.useState({});

  useEffect(() => {
    axios
      .get(`https://4a4gvfykni.execute-api.us-east-1.amazonaws.com/items/${id}`)
      .then(({ data }) => {
        setCaritem(data.Item);
      });
  }, [id]);

  const handleChange = (evt) => {
    setCaritem({ ...caritem, [evt.target.name]: evt.target.value });
  };

  return (
    <div>
      <div className={styles.addForm}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Make</label>
              </td>
              <td>
                <input
                  type="text"
                  id="make"
                  name="make"
                  placeholder="Type your car make"
                  value={caritem.make}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Model</label>
              </td>
              <td>
                <input
                  type="text"
                  id="model"
                  name="model"
                  placeholder="Type your car model"
                  value={caritem.model}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Price</label>
              </td>
              <td>
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="Type your car price"
                  value={caritem.price}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Image URL</label>
              </td>
              <td>
                <input
                  type="text"
                  id="imgurl"
                  name="imgurl"
                  placeholder="Type your car ImgUrl"
                  value={caritem.imgurl}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            // const make = document.getElementById("carMake").value;
            // const price = document.getElementById("carPrice").value;
            // const id =
            //   document.getElementById("carMake").value +
            //   "_" +
            //   document.getElementById("carModel").value +
            //   "_" +
            //   document.getElementById("carPrice").value;
            // const model = document.getElementById("carModel").value;
            // const imgurl = document.getElementById("carImgUrl").value;

            // const putcar = {
            //   id,
            //   price,
            //   make,
            //   model,
            //   imgurl,
            // };
            console.log("Price", parseInt(caritem.price));
            // Validation code
            if (
              isEmptyOrSpaces(caritem.price) ||
              !isPositiveInteger(caritem.price)
            ) {
              alert("Please enter a positive integer for price");
              return;
            }
            if (
              isEmptyOrSpaces(caritem.make) ||
              isEmptyOrSpaces(caritem.model) ||
              isEmptyOrSpaces(caritem.imgurl)
            ) {
              alert("Please enter values for the missing fields");
              return;
            }
            // } else {
            console.log(caritem);
            // TODO Use the correct backend request
            addCar(caritem).then((response) => {
              if (response === 0) {
                window.location.replace(`/car/${caritem.id}`);
              }
            });
            // }
          }}
        >
          Save
        </button>
        <button
          className={styles.button}
          onClick={() => {
            window.location.replace(`/`);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export { AddForm, UpdateForm };
