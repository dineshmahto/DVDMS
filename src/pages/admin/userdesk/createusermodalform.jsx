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
const CreateUserModalForm = ({
  openCreateuserModal,
  handleCloseCreateUserModal,
}) => {
  const newUserRoleSchema = Yup.object().shape({
    userId: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("User Id is Required"),
    password: Yup.string().required("Passowrd is required"),
    firstName: Yup.string().ensure().required("First Name is Required!"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email().required("Email is required"),
    address: Yup.number().required("Address Field is Required"),
    city: Yup.number().required("City Field is Required"),
    storeName: Yup.string().ensure().required("Select the Store Name!"),
    role: Yup.string().ensure().required("Select the Role!"),
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
            userId: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            city: "",
            storeName: "",
            role: "",
          }}
          validationSchema={newUserRoleSchema}
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
                      <label htmlFor="userId" class="col-form-label">
                        User ID:
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.userId}
                        type="text"
                        id="userId"
                        name="userId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.userId && touched.userId ? (
                        <div className="text-danger float-end">
                          {errors.userId}
                        </div>
                      ) : null}
                      <span class="form-text">Between 2 to 50 characters.</span>
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div className="col-2">
                      <label htmlFor="userId" class="col-form-label">
                        Password:
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.password}
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.password && touched.password ? (
                        <div className="text-danger float-end">
                          {errors.password}
                        </div>
                      ) : null}
                      <span class="form-text">
                        Between 5 to 50 characters, must contain at least one
                        number,one capital letter & one special character.
                      </span>
                    </div>
                  </div>
                  <div className="row mb-2 align-items-center">
                    <div class="col-2">
                      <label htmlFor="firstName" class="col-form-label">
                        First Name
                      </label>
                    </div>
                    <div class="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.firstName}
                        type="text"
                        id="firstName"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div class="col-4">
                      {errors.firstName && touched.firstName ? (
                        <div className="text-danger float-end">
                          {errors.firstName}
                        </div>
                      ) : null}
                      <span class="form-text">
                        Between 2 to 100 characters.
                      </span>
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div class="col-2">
                      <label htmlFor="lastName" class="col-form-label">
                        Last Name
                      </label>
                    </div>
                    <div class="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.lastName}
                        type="text"
                        id="lastName"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div class="col-4">
                      {errors.lastName && touched.lastName ? (
                        <div className="text-danger float-end">
                          {errors.lastName}
                        </div>
                      ) : null}
                      <span class="form-text">
                        Between 2 to 100 characters.
                      </span>
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div class="col-2">
                      <label htmlFor="email" class="col-form-label">
                        Email
                      </label>
                    </div>
                    <div class="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.email}
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.email && touched.email ? (
                        <div className="text-danger float-end">
                          {errors.email}
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
                        Address
                      </label>
                    </div>
                    <div class="col-6">
                      <Field
                        value={values?.address}
                        type="textarea"
                        rows="2"
                        className="form-control shadow-none"
                        cols="50"
                        name="address"
                        id="address"
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
                  {/* <div className="row mb-2">
            <div className="col-2">
              <label htmlFor="userType" class="col-form-label">
                User Type:
              </label>
            </div>
            <div className="col-6">
              <CustomSelect
                id="userType"
                options={dropDwonRoleList}
                onChange={(choice) => {
                  console.log(choice?.value);
                }}
              />
            </div>
          </div> */}

                  <div className="row mb-2">
                    <div className="col-2">
                      <label htmlFor="city" class="col-form-label">
                        City:
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.city}
                        type="text"
                        placeholder="City"
                        id="city"
                        name="city"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.city && touched.city ? (
                        <div className="text-danger float-end">
                          {errors.city}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-2">
                      <label htmlFor="storeName" class="col-form-label">
                        Store Name:
                      </label>
                    </div>
                    <div className="col-6">
                      <CustomSelect
                        className="form-control shadow-none"
                        name="storeName"
                        id="storeName"
                        value={values?.storeName}
                        options={[]}
                        onBlur={setFieldTouched}
                        onChange={(choice) => {
                          console.log(choice?.value);
                        }}
                      />
                    </div>
                    <div className="col-4">
                      {errors.storeName && touched.storeName ? (
                        <div className="text-danger float-end">
                          {errors.storeName}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-2">
                      <label htmlFor="role" class="col-form-label">
                        Role:
                      </label>
                    </div>
                    <div className="col-6">
                      <CustomSelect
                        className="form-control shadow-none"
                        name="role"
                        id="role"
                        value={values?.role}
                        options={[]}
                        onBlur={setFieldTouched}
                        onChange={(choice) => {
                          console.log(choice?.value);
                        }}
                      />
                    </div>
                    <div className="col-4">
                      {errors.role && touched.role ? (
                        <div className="text-danger float-end">
                          {errors.role}
                        </div>
                      ) : null}
                      <span class="form-text">
                        If Role is not here. Create the Role
                      </span>
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

export default CreateUserModalForm;
