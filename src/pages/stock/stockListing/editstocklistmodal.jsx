import React, { useState, useEffect } from "react";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faRefresh,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../../components/modal/basicmodal";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      "& .MuiButtonBase-root": {},
      "& .MuiInputBase-input": {
        padding: 8,
        border: "none",
      },
    },
  },
});
const EditStockListModal = ({
  openEditStockListModal,
  handleEditStockListModal,
  data,
}) => {
  console.log(data);
  const classes = useStyles();
  const editStockListSchema = Yup.object().shape({
    mfgDate: Yup.string()
      .nullable()
      .test("dateOfBirth", "You must be 18 years or older", function (value) {
        return moment().diff(moment(value, "YYYY-MM-DD"), "years") >= 18;
      })
      .required("Please enter your age"),
    expDate: Yup.string().required("Select the Expiry Date!"),
  });
  return (
    <>
      <BasicModal
        title="Stock Edit Expiry/Manufacture Date Desk"
        show={openEditStockListModal}
        close={() => {
          handleEditStockListModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="edit_stock_list"
      >
        <Formik
          validateOnMount
          initialValues={{
            storeName: data?.storeName,
            drugName: data?.drugName,
            batchNo: data?.batchNo,
            mfgDate: "",
            expDate: "",
          }}
          validationSchema={editStockListSchema}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({
            errors,
            touched,
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            setFieldTouched,
            isValid,
          }) => (
            <Form>
              <div className="row">
                <div className="col-10 offset-1">
                  <div className="row mb-2 align-items-center">
                    <div className="col-2">
                      <label htmlFor="storeName" className="col-form-label">
                        Stock Name:
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.storeName}
                        type="text"
                        id="storeName"
                        name="storeName"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div className="col-2">
                      <label htmlFor="drugName" className="col-form-label">
                        Drug Name:
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.drugName}
                        type="text"
                        id="drugName"
                        name="drugName"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row mb-2 align-items-center">
                    <div className="col-2">
                      <label htmlFor="batchNo" className="col-form-label">
                        Batch No
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        disabled
                        value={values?.batchNo}
                        type="text"
                        id="batchNo"
                        name="batchNo"
                      />
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div className="col-2">
                      <label htmlFor="lastName" className="col-form-label">
                        Manufacture Date
                      </label>
                    </div>
                    <div className="col-6">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          className={classes.root}
                          value={values?.mfgDate}
                          onChange={handleChange}
                          renderInput={(params) => (
                            <TextField
                              name="mfgDate"
                              id="mfgDate"
                              autoComplete="bday"
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-4">
                      {errors.lastName && touched.lastName ? (
                        <div className="text-danger float-end">
                          {errors.lastName}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div className="col-2">
                      <label htmlFor="expDate" className="col-form-label">
                        Expiry Date
                      </label>
                    </div>
                    <div className="col-6">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          className={classes.root}
                          value={values?.expDate}
                          onChange={handleChange}
                          renderInput={(params) => (
                            <TextField
                              name="expDate"
                              id="expDate"
                              autoComplete="bday"
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-4">
                      {errors.expDate && touched.expDate ? (
                        <div className="text-danger float-end">
                          {errors.expDate}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row  mb-2">
                    <div className="col-12">
                      <div className="d-flex justify-content-center">
                        <Basicbutton
                          icon={
                            <FontAwesomeIcon
                              icon={faRefresh}
                              className="me-1"
                            />
                          }
                          type="button"
                          buttonText="Reset"
                          className="secondary rounded-0 me-1"
                          outlineType={true}
                        />
                        <Basicbutton
                          icon={
                            <FontAwesomeIcon
                              icon={faFloppyDisk}
                              className="me-1"
                            />
                          }
                          type="submit"
                          buttonText="Update"
                          className="success rounded-0 me-1"
                          outlineType={true}
                          disabled={!isValid}
                        />
                        <Basicbutton
                          type="button"
                          buttonText="Close"
                          className="danger rounded-0"
                          outlineType={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </BasicModal>
    </>
  );
};

export default EditStockListModal;
