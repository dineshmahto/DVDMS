import React, { useState, useEffect } from "react";
import Basicbutton from "../../../components/button/basicbutton";
import BasicModal from "../../../components/modal/basicmodal";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      "& .MuiButtonBase-root": {},
      "& .MuiInputBase-input": {
        padding: 8,
      },
    },
  },
});
const CreateUserModalForm = ({
  openNewFundinngModal,
  handleNewFundingModal,
}) => {
  const classes = useStyles();
  const createFundingSchema = Yup.object().shape({
    fundingSrcName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    code: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  return (
    <>
      <BasicModal
        title="Create New Funding"
        show={openNewFundinngModal}
        close={() => {
          handleNewFundingModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="create_new_funding"
      >
        <Formik
          initialValues={{
            fundingSrcName: "",
            code: "",
            effectiveDate: "",
          }}
          validationSchema={createFundingSchema}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row">
                <div className="col-10 offset-1">
                  <div className="row mb-2 align-items-center">
                    <div className="col-2">
                      <label htmlFor="fundingSrcName">
                        Funding Source Name
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        name="fundingSrcName"
                        type="text"
                        className="form-control shadow-none"
                        placeholder="Funding Source Name"
                      />
                    </div>
                    <div className="col-4">
                      {errors.fundingSrcName && touched.fundingSrcName ? (
                        <div className="text-danger float-end">
                          {errors.fundingSrcName}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div className="col-2">
                      <label htmlFor="fundingSrcName">Code</label>
                    </div>
                    <div className="col-6">
                      <Field
                        name="code"
                        type="text"
                        className="form-control shadow-none"
                        placeholder="Code"
                      />
                    </div>
                    <div className="col-4">
                      {errors.code && touched.code ? (
                        <div className="text-danger float-end">
                          {errors.code}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div className="col-2">
                      <label htmlFor="effectiveDate">Effective Date</label>
                    </div>
                    <div className="col-6">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          className={classes.root}
                          name="effectiveDate"
                          onChange={(newValue) => {
                            console.log("NewValue", newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-4">
                      {errors.effectiveDate && touched.effectiveDate ? (
                        <div className="text-danger float-end">
                          {errors.effectiveDate}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <div>
                      <Basicbutton
                        className="success me-1"
                        type="submit"
                        buttonText="Add Funding"
                      />
                      <Basicbutton
                        className="info me-1"
                        type="reset"
                        buttonText="Reset"
                      />
                      <Basicbutton
                        className="danger"
                        type="button"
                        buttonText="Cancel"
                      />
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

export default CreateUserModalForm;
