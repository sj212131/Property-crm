import React, { Component, useState, useEffect } from "react";
// import residentData from "../residentData";
// import managementData from "../managementData";
import API from "../utils/API";
import { Link } from "react-router-dom";

function PmDash() {
  const [properties, setProperties] = useState([]);
  const [units, setUnits] = useState([]);
  const [tenants, setTenants] = useState([]);

  function loadProperites() {
    API.getProperties()
      .then((res) => {
        console.log("those are all the Properites: ", res);
        setProperties(res.data);
      })
      .catch((err) => console.log(err));
  }

  function deleteProperties(id) {
    API.deleteProperties(id)
      .then((res) => {
        console.log("Property deleted");
        loadProperites();
      })
      .catch((err) => console.log(err));
  }

  function loadUnits() {
    API.getUnit()
      .then((res) => {
        console.log("this is unit: ", res);
        setUnits(res.data);
      })
      .catch((err) => console.log(err));
  }

  function deleteUnit(id) {
    API.deleteUnit(id)
      .then((res) => loadUnits())
      .catch((err) => console.log(err));
  }

  function loadTenants() {
    API.getTenant()
      .then((res) => {
        console.log("this is Resident: ", res);
        setTenants(res.data);
      })
      .catch((err) => console.log(err));
  }

  function deleteTenant(id) {
    API.deleteTenant(id)
      .then((res) => loadTenants())
      .catch((err) => console.log(err));
  }

  async function addTenant(event) {
    event.preventDefault();

    const firstName = document.querySelector("#add-firstName").value.trim();
    const lastName = document.querySelector("#add-lastName").value.trim();
    const phone = document.querySelector("#add-phoneNumber").value.trim();
    const leaseDate = document.querySelector("#add-leaseDate").value.trim();
    const leaseDuration = document
      .querySelector("#add-leaseDuration")
      .value.trim();

    if (firstName && lastName && phone && leaseDate && leaseDuration) {
      let response = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          leaseDate,
          leaseDuration,
        }),
        headers: { "Content-Type": "application/json" },
      });
      response = await response.json();

      console.log("******", response);
      return response;
    } else {
      console.log("NO data received");
    }
  }

  // function loadWorkorder() {
  //   API.getWorkorder()
  //     .then((res) => {
  //       console.log("this is workorder: ", res);
  //       setWorkorder(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }

  // function deleteWorkorder(id) {
  //   API.deleteWorkorder(id)
  //     .then((res) => loadWorkorder())
  //     .catch((err) => console.log(err));

  useEffect(() => {
    loadProperites();
    loadUnits();
    loadTenants();
  }, []);

  const logout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  };

  return (
    <section id="PmDash">
      <div>
        <div className="data-box card" id="Pm-properties">
          <h1>Properties List</h1>
          <div
            className="properties-data card-content" //add style class here
          >
            {properties.map((item) => (
              <div key={item.id} className="media-content">
                <div className="content">
                  <h2>Property address is: {item.address}</h2>
                  <p>Property City is: {item.city}</p>
                  <p>State: {item.state}</p>
                  <p>Zip Code : {item.zip}</p>
                </div>
                <button
                  id="deleteProperties"
                  type="submit"
                  onClick={() => {
                    deleteProperties(item.id);
                  }}
                >
                  Remove Properites
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="data-box card">
          <h1>Units list</h1>
          <div
            id="Pm-unit"
            className="card-content" //add style class here
          >
            {units.map((item) => (
              <div key={item.id} className="media-content">
                <div className="content">
                  <h2>Unit number is: {item.number}</h2>
                  <p>Unit Rent is: {item.rent}</p>
                  <p>Rent Due Date is : {item.rentDue}</p>
                </div>
                <button
                  id="deleteUnit"
                  type="submit"
                  onClick={() => {
                    deleteUnit(item.id);
                  }}
                >
                  Remove Unit
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="data-box card">
          <h1>Tenant list</h1>
          <div
            id="Pm-tenants"
            className="card-content" //add style class here
          >
            {tenants.map((item) => (
              <div key={item.id} className="media-content">
                <div className="content">
                  <h2>Resident firstname is: {item.firstName}</h2>
                  <p>Resident lastname is: {item.lastName}</p>
                  <p>Resident phone is: {item.phone}</p>
                  <p>Resident lease starts Date: {item.leaseDate}</p>
                  <p>Resident Duration: {item.leaseDuration} year/s</p>
                </div>
                <button
                  id="deleteTenants"
                  type="submit"
                  onClick={() => {
                    deleteTenant(item.id);
                  }}
                >
                  Remove Tenants
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="data-box card">
          <h1>function list</h1>
          <div
            id="Pm-tenants"
            className="card-content" //add style class here
          >
            <button id="logout" onClick={logout}>
              Logout
            </button>

            <input
              className="input add-input"
              style={{ width: "400px" }}
              type="text"
              placeholder="First Name"
              name="add-firstName"
              id="add-firstName"
            ></input>
            <input
              className="input add-input"
              style={{ width: "400px" }}
              type="text"
              placeholder="Last Name"
              name="add-lastName"
              id="add-lastName"
            ></input>
            <input
              className="input add-input"
              style={{ width: "400px" }}
              type="text"
              placeholder="Phone Number"
              name="add-phoneNumber"
              id="add-phoneNumber"
            ></input>
            <input
              className="input add-input"
              style={{ width: "400px" }}
              type="text"
              placeholder="lease starts Date"
              name="add-leaseDate"
              id="add-leaseDate"
            ></input>
            <input
              className="input add-input"
              style={{ width: "400px" }}
              type="text"
              placeholder="Lease Duration"
              name="add-leaseDuration"
              id="add-leaseDuration"
            ></input>
            <button
              id="addTenats"
              type="submit"
              onClick={() => {
                addTenant();
              }}
            >
              Add New Tenants
            </button>
            {/* 
            <button id="addUnit">Add New Unit</button>

            <button id="addProperty">Add New Properties</button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PmDash;
