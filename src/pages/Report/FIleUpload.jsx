import React, { useEffect } from "react";
import TableComponent from "../../components/tables/datatable/tableComponent";
import CommonTableBody from "../../components/tables/datatable/commonTableBody";
import useFileUpload from "../../components/fileupload/useFileUpload";
import { showLoader } from "../../store/loader/actions";
import { useDispatch } from "react-redux";
const FileUpload = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(showLoader());
    }, 5000);
  }, []);
  const fileUploadState = useFileUpload();
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 offset-3">
          <div style={{ textAlign: "center" }}>
            <form>
              <input
                className="form-control"
                type={"file"}
                id={"csvFileInput"}
                accept={".csv"}
                onChange={(e) => fileUploadState.actions.handleFileChange(e)}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={(e) => fileUploadState.actions.handleFileUpload(e)}
              >
                IMPORT CSV
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="row">
        <TableComponent
          columns={fileUploadState?.values?.columns}
          checkBoxRequired={false}
          tableTitle="Preview CSV Upload Data"
          overFlow={true}
        >
          <CommonTableBody
            data={fileUploadState?.values?.data}
            columns={fileUploadState?.values?.columns}
          />
        </TableComponent>
      </div>
    </div>
  );
};

export default FileUpload;
