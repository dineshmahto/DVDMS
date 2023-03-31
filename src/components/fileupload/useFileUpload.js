import { useCallback, useState } from "react";
import Papa from "papaparse";
const useFileUpload = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const fileReader = new FileReader();
  const handleFileChange = useCallback((e) => {
    setFile(e.target.files[0]);
    const filePath = e.target.files[0].name;
    console.log(e.target.files);
    // Allowing file type
    const allowedExtensions = /(\.csv|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
    }
    console.log(e.target.files[0].fileName);
    console.log(e.target.files[0].size);
    const fileSize = Math.round(e.target.files[0].size / 1024);
  }, []);
  const handleFileUpload = useCallback(
    (e) => {
      e.preventDefault();
      if (file) {
        fileReader.onload = async ({ target }) => {
          const csv = Papa.parse(target.result, { header: true });
          const parsedData = csv?.data;
          setData(parsedData);
          const columns = Object.keys(parsedData[0]);
          const temp = [];
          columns.forEach((col) => {
            let ele = {};
            ele["id"] = col;
            ele["name"] = col;
            ele["sortable"] = false;
            temp.push(ele);
          });
          setColumns(temp);
        };
        fileReader.readAsText(file);
      }
    },
    [file]
  );
  return {
    values: {
      file,
      data,
      columns,
    },
    actions: {
      handleFileChange,
      handleFileUpload,
    },
  };
};

export default useFileUpload;
