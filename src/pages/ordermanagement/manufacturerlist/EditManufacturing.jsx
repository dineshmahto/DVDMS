import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-awesome-modal";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { useDispatch, useSelector } from "react-redux";
import {
  getManufactureDeskList,
  updateManufacturing,
  updateManufacturingResponse,
} from "../../../store/ordermanagement/action";

const EditManufacturing = ({
  openEditMfgModal,
  handleCloseEditMfgModal,
  editData,
}) => {
  const dispatch = useDispatch();
  const manufacturingUpdateResponse = useSelector(
    (state) => state.ordermanaagement?.updateManufacturingResponse
  );

  const [newMfg, setNewMfg] = useState({
    name: "",
    remark: "",
    id: null,
  });
  const [addError, setAddError] = useState({
    name: false,
    remark: false,
  });

  useEffect(() => {
    if (editData) {
      setNewMfg({
        name: editData.name,
        remark: editData.remarks,
        id: editData.id,
      });
    }
  }, [editData]);

  useEffect(() => {
    if (
      manufacturingUpdateResponse &&
      manufacturingUpdateResponse?.status === 201
    ) {
      dispatch(getManufactureDeskList());
      dispatch(updateManufacturingResponse(""));
      handleCloseEditMfgModal();
    } else if (
      manufacturingUpdateResponse &&
      manufacturingUpdateResponse?.status === 500
    ) {
      dispatch(updateManufacturingResponse(""));
      toastMessage("ADD NEW manufacturer", "Something went wrong", "");
    }
  }, [manufacturingUpdateResponse]);

  const handleSumbit = (e) => {
    e.preventDefault();
    if (newMfg.name === "") {
      setAddError({ ...addError, name: true });
      return;
    }
    if (newMfg.remark === "") {
      setAddError({ ...addError, remark: true });
      return;
    }

    dispatch(updateManufacturing(newMfg));
  };
  const handleChangeNew = (event, property) => {
    event.preventDefault();
    setNewMfg({ ...newMfg, [property]: event.target.value });
    setAddError({ ...addError, [property]: false });
  };

  useEffect(() => {
    console.log("newMfg", newMfg);
  }, [newMfg]);

  const handleClose = () => {
    setNewMfg({
      name: "",
      remark: "",
      id: null,
    });
    setAddError({
      name: false,
      remark: false,
    });
    handleCloseEditMfgModal();
  };

  return (
    <>
      {/* <Modal visible={openAddMfgModal} width="600" height="400" effect="fadeInUp" onClickAway={handleCloseAddMfgModal}> */}
      <Modal
        visible={openEditMfgModal}
        width="500"
        height="300"
        effect="fadeInUp"
      >
        <div className="row">
          <div className="col-md-12">
            <div className="row  mt-2 mb-4">
              <div className="col-md-8  offset-3 ">
                <h4 className="text-primary">Update Manufacturing</h4>
              </div>
              <div className="col-md-1">
                <span type="button" onClick={handleClose}>
                  <FontAwesomeIcon
                    icon={faClose}
                    className="fa-2xl"
                    color="red"
                  />
                </span>
              </div>
              <hr></hr>
            </div>

            <div row offset-2>
              <div className="col-md-10">
                <form>
                  <div
                    className={`row offset-2 ${
                      !addError.name ? "mb-3" : "mb-2"
                    }`}
                  >
                    <div className="col-md-3">
                      <label htmlFor="name" className="col-form-label">
                        Name :
                      </label>
                    </div>
                    <div className="col-md-7">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control shadow-none"
                        value={newMfg.name}
                        onChange={(e) => handleChangeNew(e, "name")}
                      />
                    </div>
                  </div>
                  {addError.name && (
                    <div className="row offset-5 mb-1">
                      <div className="col-md-7">
                        <label htmlFor="error" className="text-danger">
                          name is empty
                        </label>
                      </div>
                    </div>
                  )}
                  <div
                    className={`row offset-2 ${
                      !addError.remark ? "mb-3" : "mb-2"
                    }`}
                  >
                    <div className="col-md-3">
                      <label htmlFor="remark" className="col-form-label">
                        remark :
                      </label>
                    </div>
                    <div className="col-md-7">
                      <input
                        type="text"
                        id="remark"
                        name="remark"
                        className="form-control shadow-none"
                        value={newMfg.remark}
                        onChange={(e) => handleChangeNew(e, "remark")}
                      />
                    </div>
                  </div>
                  {addError.remark && (
                    <div className="row offset-5 mb-1">
                      <div className="col-md-7">
                        <label htmlFor="error" className="text-danger">
                          remark is empty
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="row offset-5">
                    <div className="col-md-3 " style={{ marginRight: "20px" }}>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleSumbit(e)}
                        type="button"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="col-md-3 ">
                      <button
                        className="btn btn-secondary"
                        onClick={handleClose}
                        type="button"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  {/* */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditManufacturing;
