import React, { useState, useEffect } from "react";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faRefresh } from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../../components/modal/basicmodal";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
const EditProgramDeskForm = ({
  openEditProgrmModal,
  handleCloseEditProgrmModal,
}) => {
  const editProgramSchema = Yup.object().shape({
    programName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Program Name is Required"),
    prgCode: Yup.string().required("Program Code is required"),
    startDate: Yup.string().ensure().required("Start Date is Required!"),
    endDate: Yup.string().required("End Date is required"),
    remarks: Yup.string().email().required("Remarks is required"),
    status: Yup.number().required("Status Field is Required"),
  });
  return (
    <>
      <BasicModal
        title="Edit Program"
        show={openEditProgrmModal}
        close={() => {
          handleCloseEditProgrmModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="create_user"
      >
        <Formik
          validateOnMount
          initialValues={{
            programName: "",
            prgCode: "",
            startDate: "",
            endDate: "",
            remarks: "",
            status: "",
          }}
          validationSchema={editProgramSchema}
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
                      <label htmlFor="programName" class="col-form-label">
                        Program Name:
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.programName}
                        type="text"
                        id="programName"
                        name="programName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.programName && touched.programName ? (
                        <div className="text-danger float-end">
                          {errors.programName}
                        </div>
                      ) : null}
                      <span class="form-text">Between 2 to 50 characters.</span>
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div className="col-2">
                      <label htmlFor="prgCode" class="col-form-label">
                        Program Code:
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.prgCode}
                        type="prgCode"
                        id="prgCode"
                        name="prgCode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.prgCode && touched.prgCode ? (
                        <div className="text-danger float-end">
                          {errors.prgCode}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-2 align-items-center">
                    <div class="col-2">
                      <label htmlFor="startDate" class="col-form-label">
                        Start Date
                      </label>
                    </div>
                    <div class="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.startDate}
                        type="text"
                        id="startDate"
                        name="startDate"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div class="col-4">
                      {errors.startDate && touched.startDate ? (
                        <div className="text-danger float-end">
                          {errors.startDate}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div class="col-2">
                      <label htmlFor="endDate" class="col-form-label">
                        End Date
                      </label>
                    </div>
                    <div class="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.endDate}
                        type="text"
                        id="endDate"
                        name="endDate"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div class="col-4">
                      {errors.endDate && touched.endDate ? (
                        <div className="text-danger float-end">
                          {errors.endDate}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div class="col-2">
                      <label htmlFor="remarks" class="col-form-label">
                        Remarks
                      </label>
                    </div>
                    <div class="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.remarks}
                        type="remarks"
                        id="remarks"
                        name="remarks"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.remarks && touched.remarks ? (
                        <div className="text-danger float-end">
                          {errors.remarks}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-2 align-items-center">
                    <div class="col-2">
                      <label
                        htmlFor="status"
                        className=""
                        class="col-form-label"
                      >
                        Status
                      </label>
                    </div>
                    <div class="col-6">
                      <CustomSelect
                        className="form-control shadow-none"
                        name="status"
                        id="status"
                        value={values?.status}
                        options={[]}
                        onBlur={setFieldTouched}
                        onChange={(choice) => {
                          console.log(choice?.value);
                        }}
                      />
                    </div>
                    <div className="col-4">
                      {errors.status && touched.status ? (
                        <div className="text-danger float-end">
                          {errors.status}
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

export default EditProgramDeskForm;
