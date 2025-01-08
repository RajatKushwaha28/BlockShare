import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `8c1e13692b8e9a6b9aef`,
            pinata_secret_api_key: `993584c4f6547e2d232df5392549123b31ba1baebbdb3c8cacee12ca5554f0fb`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        
        // Call the add function with both IPFS hash and file name
        await contract.add(account, ImgHash, file.name);

        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
        console.error(e);
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; // files array of files object
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(data); // Set the file correctly
    };
    setFileName(data.name); // Correctly set the file name
    e.preventDefault();
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;

// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";
// const FileUpload = ({ contract, account, provider }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const resFile = await axios({
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           headers: {
//             pinata_api_key: `8c1e13692b8e9a6b9aef`,
//             pinata_secret_api_key: `993584c4f6547e2d232df5392549123b31ba1baebbdb3c8cacee12ca5554f0fb`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
//         contract.add(account,ImgHash);
//         alert("Successfully Image Uploaded");
//         setFileName("No image selected");
//         setFile(null);
//       } catch (e) {
//         alert("Unable to upload image to Pinata");
//       }
//     }
//     alert("Successfully Image Uploaded");
//     setFileName("No image selected");
//     setFile(null);
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0]; //files array of files object
//     // console.log(data);
//     const reader = new window.FileReader();
//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           Choose Image
//         </label>
//         <input
//           disabled={!account}
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         <button type="submit" className="upload" disabled={!file}>
//           Upload File
//         </button>
//       </form>
//     </div>
//   );
// };
// export default FileUpload;
// // import { useState } from "react";
// // import axios from "axios";
// // import "./FileUpload.css";

// // const FileUpload = ({ contract, account, provider }) => {
// //   const [file, setFile] = useState(null);
// //   const [fileName, setFileName] = useState("No image selected");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!contract || !account) {
// //       alert("Contract or account is not loaded. Please check your connection.");
// //       return;
// //     }

// //     if (file) {
// //       try {
// //         const formData = new FormData();
// //         formData.append("file", file);

// //         const resFile = await axios({
// //           method: "post",
// //           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
// //           data: formData,
// //           headers: {
// //             pinata_api_key: `8c1e13692b8e9a6b9aef`,
// //             pinata_secret_api_key: `993584c4f6547e2d232df5392549123b31ba1baebbdb3c8cacee12ca5554f0fb`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         });

// //         const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

// //         // Ensure contract methods are available before calling
// //         await contract.methods.add(account, ImgHash, file.name).send({ from: account });

// //         alert("Successfully Image Uploaded");
// //         setFileName("No image selected");
// //         setFile(null);
// //       } catch (e) {
// //         alert("Unable to upload image to Pinata");
// //         console.error(e);
// //       }
// //     }
// //   };

// //   const retrieveFile = (e) => {
// //     const data = e.target.files[0];
// //     const reader = new window.FileReader();
// //     reader.readAsArrayBuffer(data);
// //     reader.onloadend = () => {
// //       setFile(e.target.files[0]);
// //     };
// //     setFileName(e.target.files[0].name);
// //     e.preventDefault();
// //   };

// //   return (
// //     <div className="top">
// //       <form className="form" onSubmit={handleSubmit}>
// //         <label htmlFor="file-upload" className="choose">
// //           Choose Image
// //         </label>
// //         <input
// //           disabled={!account}
// //           type="file"
// //           id="file-upload"
// //           name="data"
// //           onChange={retrieveFile}
// //         />
// //         <span className="textArea">Image: {fileName}</span>
// //         <button type="submit" className="upload" disabled={!file}>
// //           Upload File
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default FileUpload;
