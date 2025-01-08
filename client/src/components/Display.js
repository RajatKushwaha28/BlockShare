import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
      return; // Exit the function if there's an error
    }

    if (dataArray.length > 0) {
      const items = dataArray.map((item, i) => {
        const isImage = item.fileName.match(/\.(jpeg|jpg|gif|png)$/i);
        const isPdf = item.fileName.match(/\.pdf$/i);

        return (
          <div key={i} className="file-item">
            {isImage ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img src={item.url} alt={item.fileName} className="image-list" />
              </a>
            ) : isPdf ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn-icons-png.freepik.com/256/16425/16425681.png?semt=ais_hybrid" 
                  alt={item.fileName}
                  className="pdf-icon"
                />
              </a>
            ) : (
              <div>
                <p>Unsupported file type: {item.fileName}</p>
              </div>
            )}
            <p>{item.fileName}</p> {/* Display the file name */}
          </div>
        );
      });
      setData(items);
    } else {
      alert("No image to display");
    }
  };

  return (
    <>
      <div className="file-list">{data}</div>
      <input type="text" placeholder="Enter Address" className="address" />
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};

export default Display;
