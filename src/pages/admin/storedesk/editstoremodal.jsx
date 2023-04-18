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
const EditStoreModalForm = ({
  openCreateuserModal,
  handleCloseCreateUserModal,
}) => {
  const newStoreSchema = Yup.object().shape({
    storeName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("User Id is Required"),

    storeType: Yup.string().ensure().required("Select the Store!"),
    parentStoreName: Yup.string()
      .ensure()
      .required("Select the Parent Store Type"),
    ownerType: Yup.string().ensure().required("Select the Owner Type"),
    districtName: Yup.string().ensure().required("Select the District"),
    blockName: Yup.string().ensure().required("Select the Block"),
    contactNo: Yup.number().required("Contact No is Required"),
    longitude: Yup.number().required("Longitude is Required"),
    latitude: Yup.number().required("latitude is Required"),
    ninNumber: Yup.number().required("NIN Number is Required"),
  });
  return (
    <>
      <BasicModal
        title="Create Role"
        show={openCreateuserModal}
        close={() => {
          handleCloseCreateUserModal(false);
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
            storeName: "",
            storeType: "",
            parentStoreName: "",
            ownerType: "",
            districtName: "",
            blockName: "",
            contactNo: "",
            longitude: "",
            latitude: "",
            ninNumber: "",
          }}
          validationSchema={newStoreSchema}
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
                      <label htmlFor="storeName" class="col-form-label">
                        Store Name:
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.storeName}
                        type="text"
                        id="storeName"
                        name="storeName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.userId && touched.storeName ? (
                        <div className="text-danger float-end">
                          {errors.storeName}
                        </div>
                      ) : null}
                      <span class="form-text">Between 2 to 50 characters.</span>
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div className="col-2">
                      <label htmlFor="storeType" class="col-form-label">
                        Store Type:
                      </label>
                    </div>
                    <div className="col-6">
                      <CustomSelect
                        className="form-control shadow-none"
                        name="storeType"
                        id="storeType"
                        value={values?.storeType}
                        options={[]}
                        onBlur={setFieldTouched}
                        onChange={(choice) => {
                          console.log(choice?.value);
                        }}
                      />
                    </div>
                    <div className="col-4">
                      {errors.storeType && touched.storeType ? (
                        <div className="text-danger float-end">
                          {errors.storeType}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-2 align-items-center">
                    <div class="col-2">
                      <label htmlFor="parentStoreName" class="col-form-label">
                        Parent Store Name
                      </label>
                    </div>
                    <div class="col-6">
                      <CustomSelect
                        className="form-control shadow-none"
                        name="parentStoreName"
                        id="parentStoreName"
                        value={values?.parentStoreName}
                        options={[]}
                        onBlur={setFieldTouched}
                        onChange={(choice) => {
                          console.log(choice?.value);
                        }}
                      />
                    </div>
                    <div class="col-4">
                      {errors.parentStoreName && touched.parentStoreName ? (
                        <div className="text-danger float-end">
                          {errors.parentStoreName}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div class="col-2">
                      <label htmlFor="ownerType" class="col-form-label">
                        Owner Type
                      </label>
                    </div>
                    <div class="col-6">
                      <CustomSelect
                        className="form-control shadow-none"
                        name="ownerType"
                        id="ownerType"
                        value={values?.ownerType}
                        options={[]}
                        onBlur={setFieldTouched}
                        onChange={(choice) => {
                          console.log(choice?.value);
                        }}
                      />
                    </div>
                    <div class="col-4">
                      {errors.ownerType && touched.ownerType ? (
                        <div className="text-danger float-end">
                          {errors.ownerType}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div class="col-2">
                      <label htmlFor="address" class="col-form-label">
                        Address
                      </label>
                    </div>
                    <div class="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.address}
                        type="textarea"
                        id="address"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.address && touched.address ? (
                        <div className="text-danger float-end">
                          {errors.address}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-2 align-items-center">
                    <div class="col-2">
                      <label
                        htmlFor="address"
                        className=""
                        class="col-form-label"
                      >
                        District Name
                      </label>
                    </div>
                    <div class="col-6">
                      <CustomSelect
                        className="form-control shadow-none"
                        name="districtName"
                        id="districtName"
                        value={values?.districtName}
                        options={[]}
                        onBlur={setFieldTouched}
                        onChange={(choice) => {
                          console.log(choice?.value);
                        }}
                      />
                    </div>
                    <div className="col-4">
                      {errors.districtName && touched.districtName ? (
                        <div className="text-danger float-end">
                          {errors.districtName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-2">
                      <label htmlFor="blockName" class="col-form-label">
                        Block Name:
                      </label>
                    </div>
                    <div className="col-6">
                      <CustomSelect
                        id="blockName"
                        name="blockName"
                        value={values?.blockName}
                        options={[]}
                        onChange={(choice) => {
                          console.log(choice?.value);
                        }}
                      />
                    </div>
                    <div className="col-4">
                      {errors.blockName && touched.blockName ? (
                        <div className="text-danger float-end">
                          {errors.blockName}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-2">
                      <label htmlFor="contactNo" class="col-form-label">
                        Contact No:
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.contactNo}
                        type="number"
                        id="contactNo"
                        name="contactNo"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.contactNo && touched.contactNo ? (
                        <div className="text-danger float-end">
                          {errors.contactNo}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-2">
                      <label htmlFor="longitude" class="col-form-label">
                        Longitude:
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.longitude}
                        type="number"
                        id="longitude"
                        name="longitude"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.longitude && touched.longitude ? (
                        <div className="text-danger float-end">
                          {errors.longitude}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-2">
                      <label htmlFor="latitude" class="col-form-label">
                        Latitude:
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        name="latitude"
                        id="latitude"
                        value={values?.latitude}
                        options={[]}
                        onBlur={setFieldTouched}
                        onChange={(choice) => {
                          console.log(choice?.value);
                        }}
                      />
                    </div>
                    <div className="col-4">
                      {errors.latitude && touched.latitude ? (
                        <div className="text-danger float-end">
                          {errors.latitude}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-2">
                      <label htmlFor="ninNumber" class="col-form-label">
                        NIN Number:
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        name="ninNumber"
                        id="ninNumber"
                        value={values?.ninNumber}
                        options={[]}
                        onBlur={setFieldTouched}
                        onChange={(choice) => {
                          console.log(choice?.value);
                        }}
                      />
                    </div>
                    <div className="col-4">
                      {errors.ninNumber && touched.ninNumber ? (
                        <div className="text-danger float-end">
                          {errors.ninNumber}
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
                          buttonText="Save"
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

export default EditStoreModalForm;
