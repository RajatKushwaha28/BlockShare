// import { useEffect } from "react";
// import "./Modal.css";
// const Modal = ({ setModalOpen, contract }) => {
//   const sharing = async () => {
//     const address = document.querySelector(".address").value;
//     await contract.allow(address);
//     setModalOpen(false);
//   };
//   useEffect(() => {
//     const accessList = async () => {
//       const addressList = await contract.shareAccess();
//       let select = document.querySelector("#selectNumber");
//       const options = addressList;

//       for (let i = 0; i < options.length; i++) {
//         let opt = options[i];
//         let e1 = document.createElement("option");
//         e1.textContent = opt;
//         e1.value = opt;
//         select.appendChild(e1);
//       }
//     };
//     contract && accessList();
//   }, [contract]);
//   return (
//     <>
//       <div className="modalBackground">
//         <div className="modalContainer">
//           <div className="title">Share with</div>
//           <div className="body">
//             <input
//               type="text"
//               className="address"
//               placeholder="Enter Address"
//             ></input>
//           </div>
//           <form id="myForm">
//             <select id="selectNumber">
//               <option className="address">People With Access</option>
//             </select>
//           </form>
//           <div className="footer">
//             <button
//               onClick={() => {
//                 setModalOpen(false);
//               }}
//               id="cancelBtn"
//             >
//               Cancel
//             </button>
//             <button onClick={() => sharing()}>Share</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Modal;

import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };

  const disallowAccess = async () => {
    const select = document.querySelector("#selectNumber");
    const address = select.value; // Get the selected address
    if (address) {
      await contract.disallow(address);
      setModalOpen(false);
    } else {
      alert("Please select an address to disallow access.");
    }
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      select.innerHTML = ""; // Clear previous options
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i].user; // Assuming `user` is the address
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
            <button onClick={() => disallowAccess()}>Disallow</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;