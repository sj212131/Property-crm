import React, { Component, useState, useEffect } from "react";
import residentData from "../residentData";
import managementData from "../managementData";
import API from "../utils/API";
import { Link } from "react-router-dom";

function PmDash() {
  const [residents, setResidents] = useState([]);
  const [management, setManagement] = useState([]);
  const [workorder, setWorkorder] = useState([]);

  function loadResident() {
    API.getResident()
      .then((res) => {
        console.log("this is Resident: ", res);
        setResidents(res.data);
      })
      .catch((err) => console.log(err));
  }

  function deleteResident(id) {
    API.deleteResident(id)
      .then((res) => loadResident())
      .catch((err) => console.log(err));
  }

  function loadManagement() {
    API.getManagement()
      .then((res) => {
        console.log("this is management: ", res);
        setManagement(res.data);
      })
      .catch((err) => console.log(err));
  }

  function deletemanagement(id) {
    API.deleteManagement(id)
      .then((res) => loadManagement())
      .catch((err) => console.log(err));
  }

  function loadWorkorder() {
    API.getWorkorder()
      .then((res) => {
        console.log("this is workorder: ", res);
        setWorkorder(res.data);
      })
      .catch((err) => console.log(err));
  }

  function deleteWorkorder(id) {
    API.deleteWorkorder(id)
      .then((res) => loadWorkorder())
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadResident();
    loadManagement();
    loadWorkorder();
  }, []);

  return (
    <section id="PmDash">
      <div className="">
        <h1>This is PmDash part， resident list</h1>
        <div
          id="Pm-resident"
          className="" //add style class here
        >
          {residents.map((item) => (
            <div key={item.id} className="">
              <div className="">
                <h2>Username is: {item.username}</h2>
                <p>Resident name is: {item.firstname + item.lastname}</p>
                <p>Resident unit number: {item.unitnumber}</p>
                <p>Resident Leasing started on : {item.leasingstart}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div id="Pm-management">
          {management.map((item) => (
            <div key={item.id} className="">
              <div className="">
                <h2>management username： {item.username}</h2>
                <p>
                  management name:
                  {item.firstname + item.lastname}
                </p>
                <p>management email:{item.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div id="Pm-workorder">
          {workorder.map((item) => (
            <div key={item.id} className="">
              <div className="">
                <p>Work order ID : {item.id}</p>
                <h2>category： {item.category}</h2>
                <p>
                  resident name:
                  {item.firstname + item.lastname}
                </p>
                <p>Unit number: {item.unitnumber}</p>
                <p>Created date: {item.createdate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// class PmDash extends Component {
//   render() {
//     //let residentData = this.props.residentData;
//     //let managementData = this.props.managementData;
//     console.log(residentData);
//     console.log(managementData);

//     return (
//       <section id="PmDash">
//         <div className="">
//           <h1>This is PmDash part， resident list</h1>
//           <div
//             id="Pm-resident"
//             className="" //add style class here
//           >
//             {residentData
//               ? residentData.map((item) => (
//                   <div key={item.id} className="">
//                     <div className="">
//                       <h2>Login as {item.username}</h2>
//                       <p>{item.firstname + item.lastname}</p>
//                       <p>{item.unitnumber}</p>
//                     </div>
//                   </div>
//                 ))
//               : null}

//             {managementData
//               ? managementData.map((item) => (
//                   <div key={item.id} className="">
//                     <div className="">
//                       <h2>Login as {item.username}</h2>
//                       <a>{item.firstname + item.lastname}</a>
//                       <a>{item.email}</a>
//                     </div>
//                   </div>
//                 ))
//               : null}
//           </div>
//         </div>
//       </section>
//     );
//   }
// }

export default PmDash;
