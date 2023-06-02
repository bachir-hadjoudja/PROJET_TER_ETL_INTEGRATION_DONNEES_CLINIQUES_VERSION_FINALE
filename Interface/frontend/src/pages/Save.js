import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import XLSX from "xlsx";

const Save = () => {
  const [fileData, setFileData] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [disableDow, setDisableDow] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the Excel file from the backend
        const response = await axios.get("http://localhost:5010", {
          responseType: "arraybuffer",
        });
        const data = new Uint8Array(response.data);
        const workbook = XLSX.read(data, { type: "array" });

        // Extract the data from the desired sheet
        const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Get the column names from the first row of jsonData
        const columnNames = jsonData[0];

        // Remove the first row (column names) from jsonData
        const dataRows = jsonData.slice(1);

        // Process the dataRows as needed and set fileData state
        const formattedData = dataRows.map((row) =>
          row.reduce(
            (acc, value, index) => ({
              ...acc,
              [columnNames[index]]: value,
            }),
            {}
          )
        );
        setFileData(formattedData);
        setDisableDow(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  
  const handleDownload = async () => {
    try {
        // Download the file from the backend
        const response = await axios.get("http://localhost:5010/file", {
            responseType: 'blob' // important
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a new anchor element
        const link = document.createElement('a');

        // Set the href and download attributes of the anchor element
        // You may want to replace 'filename.zip' with your desired filename
        link.href = url;
        link.download = 'CIUSS_TKFH_2019.zip';

        // Append the anchor element to the body and programmatically click it
        document.body.appendChild(link);
        link.click();

        // Clean up: remove the link from the body
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error:", error);
    }
};
  









  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Excel Files</h1>

      {/* Display the first file */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Information File</h2>
        <table className="w-full">
          <thead>
            <tr>
              {fileData.length > 0 &&
                Object.keys(fileData[0]).map((columnName) => (
                  <th className="border-b-2 border-gray-300" key={columnName}>
                    {columnName}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {fileData.map((row, index) => (
              <tr key={index}>
                {row &&
                  Object.values(row).map((cellValue, index) => (
                    <td className="border-b border-gray-300 py-2" key={index}>
                      {cellValue}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add a button for downloading the second file */}
      <div className="grid mt-12">
        <h2 className="text-lg font-semibold mb-2">Download File</h2>
        {downloadUrl ? (
          <a href={downloadUrl} download>
            <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed">
              Download File
            </button>
          </a>
        ) : (
          <button
            disabled={disableDow}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed"
            onClick={handleDownload}
          >
            Load File
          </button>
        )}
      </div>
    </div>
  );
};

export default Save;
