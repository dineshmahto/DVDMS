import React, { useEffect } from "react";
import BasicModal from "../../../components/modal/basicmodal";
import Basicbutton from "../../../components/button/basicbutton";
import API from "../../../config/config";
const DeleteRoleModal = ({ showDeleteModal, handleDeleteShowModal, id }) => {
  const handelAction = () => {
    API.post("", { id: id })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <BasicModal
        title="Confirm Delete"
        show={showDeleteModal}
        close={() => handleDeleteShowModal()}
        isStatic={false}
        scrollable={true}
        isCenterAlign={true}
        fullScreen={false}
        key="list_role_Activity"
      >
        <div className="row">
          <div className="col-12">
            <p>
              You are about to delete one record, this procedure is
              irreversible.
            </p>
            <p> Do you want to proceed?</p>
          </div>
        </div>
        <div className="row d-flex justify-content-end">
          <Basicbutton
            buttonText="Yes"
            type="button"
            className="me-1"
            onClick={handelAction}
          />
          <Basicbutton
            buttonText="No"
            type="button"
            className="me-1"
            onClick={() => handleDeleteShowModal()}
          />
        </div>
      </BasicModal>
    </>
  );
};

export default DeleteRoleModal;
