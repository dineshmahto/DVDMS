// import React, { useState } from "react";
// import BasicButton from "../../components/button/basicbutton";
// const data = [
//   {
//     id: 1,
//     name: "Caitlyn",
//     surname: "Kerluke",
//     age: 24,
//   },
//   {
//     id: 2,
//     name: "Rowan ",
//     surname: "Nikolaus",
//     age: 45,
//   },
//   {
//     id: 3,
//     name: "Kassandra",
//     surname: "Haley",
//     age: 32,
//   },
//   {
//     id: 4,
//     name: "Rusty",
//     surname: "Arne",
//     age: 58,
//   },
// ];
// const Csv = () => {
//   const [userData, setUserData] = useState(data);
//   const downloadFile = ({ data, fileName, fileType }) => {
//     const blob = new Blob([data], { type: fileType });
//     const a = document.createElement("a");
//     a.download = fileName;
//     a.href = window.URL.createObjectURL(blob);
//     const clickEvt = new MouseEvent("click", {
//       view: window,
//       bubbles: true,
//       cancelable: true,
//     });
//     a.dispatchEvent(clickEvt);
//     a.remove();
//   };
//   const exportToCsv = (e) => {
//     e.preventDefault();
//     let headers = ["Id,Name,Surname,Age"];

//     let usersCsv = userData.reduce((acc, user) => {
//       const { id, name, surname, age } = user;
//       acc.push([id, name, surname, age].join(","));
//       return acc;
//     }, []);

//     downloadFile({
//       data: [...headers, ...usersCsv].join("\n"),
//       fileName: "users.xlsx",
//       fileType: "text/excel",
//     });
//   };
//   return (
//     <div>
//       <BasicButton
//         type="button"
//         className="primary"
//         buttonText="Export To CSV"
//         onClick={exportToCsv}
//       />
//     </div>
//   );
// };

// export default Csv;

// import React, { useState } from "react";
// import BasicButton from "../../components/button/basicbutton";
// const data = [
//   {
//     id: 1,
//     name: "Caitlyn",
//     surname: "Kerluke",
//     age: 24,
//   },
//   {
//     id: 2,
//     name: "Rowan ",
//     surname: "Nikolaus",
//     age: 45,
//   },
//   {
//     id: 3,
//     name: "Kassandra",
//     surname: "Haley",
//     age: 32,
//   },
//   {
//     id: 4,
//     name: "Rusty",
//     surname: "Arne",
//     age: 58,
//   },
// ];
// const Csv = () => {
//   const [userData, setUserData] = useState(data);
//   const downloadFile = ({ data, fileName, fileType }) => {
//     const blob = new Blob([data], { type: fileType });
//     const a = document.createElement("a");
//     a.download = fileName;
//     a.href = window.URL.createObjectURL(blob);
//     const clickEvt = new MouseEvent("click", {
//       view: window,
//       bubbles: true,
//       cancelable: true,
//     });
//     a.dispatchEvent(clickEvt);
//     a.remove();
//   };
//   const exportToCsv = (e) => {
//     e.preventDefault();
//     let headers = ["Id,Name,Surname,Age"];

//     let usersCsv = userData.reduce((acc, user) => {
//       const { id, name, surname, age } = user;
//       acc.push([id, name, surname, age].join(","));
//       return acc;
//     }, []);

//     downloadFile({
//       data: [...headers, ...usersCsv].join("\n"),
//       fileName: "users.xlsx",
//       fileType: "text/excel",
//     });
//   };
//   return (
//     <div>
//       <BasicButton
//         type="button"
//         className="primary"
//         buttonText="Export To CSV"
//         onClick={exportToCsv}
//       />
//     </div>
//   );
// };

// export default Csv;

import React, { useState } from "react";
import BasicButton from "../../components/button/basicbutton";

const CSV = ({ csvData }) => {
  const [userData, setUserData] = useState(csvData);

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToCsv = async (e) => {
    e.preventDefault();

    const csvContent = [];
    csvContent.push(Object.keys(userData[0]).join(",")); // Add headers to the CSV content

    for (const user of userData) {
      const row = Object.values(user).join(",");
      csvContent.push(row);
    }

    const csvData = csvContent.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });

    downloadFile({
      data: blob,
      fileName: "reports.csv",
      fileType: "text/csv",
    });
  };

  return (
    <div>
      <BasicButton
        type="button"
        className="primary"
        buttonText="Download as CSV"
        onClick={exportToCsv}
      />
    </div>
  );
};

export default CSV;
