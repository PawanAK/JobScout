import React, { useState } from "react";
import "./FileUpload.css";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Please select a PDF file");
    }
  };

  const handleUploadClick = async () => {
    if (file) {
      setIsLoading(true);

      // Call API to upload file and get job results
      const url = "https://linkedin-jobs-search.p.rapidapi.com/";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "eebf81b82bmsh65f31753950f55bp133c48jsn1fee64e7ff75",
          "X-RapidAPI-Host": "linkedin-jobs-search.p.rapidapi.com",
        },
        body: JSON.stringify({
          search_terms: searchTerm,
          location: "Bengaluru",
          page: "20",
        }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);

        setIsLoading(false);

        // Reset form fields
        setFile(null);
        setError(null);
        setSearchTerm("");
      } catch (error) {
        console.error(error);

        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`upload-box ${isLoading ? "loading" : ""}`}>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {error && <div className="error-message">{error}</div>}

      <input
        type="text"
        placeholder="Search term"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

      <button className="upload-button" onClick={handleUploadClick}>
        {isLoading ? "Uploading..." : "Upload"}
      </button>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-message">Uploading...</div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
// import React, { useState } from "react";
// import "./FileUpload.css";

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [jobResults, setJobResults] = useState(null); // New state variable to hold API response data

//   const handleSearchTermChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile && selectedFile.type === "application/pdf") {
//       setFile(selectedFile);
//       setError(null);
//     } else {
//       setFile(null);
//       setError("Please select a PDF file");
//     }
//   };

//   const handleUploadClick = async () => {
//     if (file) {
//       setIsLoading(true);

//       // Call API to upload file and get job results
//       const url = "https://linkedin-jobs-search.p.rapidapi.com/";
//       const options = {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//           "X-RapidAPI-Key":
//             "eebf81b82bmsh65f31753950f55bp133c48jsn1fee64e7ff75",
//           "X-RapidAPI-Host": "linkedin-jobs-search.p.rapidapi.com",
//         },
//         body: JSON.stringify({
//           search_terms: searchTerm,
//           location: "Chicago, IL",
//           page: "1",
//         }),
//       };

//       try {
//         const response = await fetch(url, options);
//         const result = await response.json(); // Parse the JSON data

//         setIsLoading(false);

//         // Update the state variable with the job results
//         setJobResults(result.jobs);

//         // Reset form fields
//         setFile(null);
//         setError(null);
//         setSearchTerm("");
//       } catch (error) {
//         console.error(error);

//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className={`upload-box ${isLoading ? "loading" : ""}`}>
//       <input type="file" accept=".pdf" onChange={handleFileChange} />
//       {error && <div className="error-message">{error}</div>}

//       <input
//         type="text"
//         placeholder="Search term"
//         value={searchTerm}
//         onChange={handleSearchTermChange}
//       />

//       <button className="upload-button" onClick={handleUploadClick}>
//         {isLoading ? "Uploading..." : "Upload"}
//       </button>

//       {isLoading && (
//         <div className="loading-overlay">
//           <div className="loading-spinner"></div>
//           <div className="loading-message">Uploading...</div>
//         </div>
//       )}

//       {/* Display the job results */}
//       {jobResults && (
//         <ul>
//           {jobResults.map((job) => (
//             <li key={job.id}>
//               <h3>{job.title}</h3>
//               <p>{job.description}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default FileUpload;
