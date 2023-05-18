import React, { useState, useEffect, useRef } from "react";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faRefresh } from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../../components/modal/basicmodal";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import {
  createUser,
  createUserResponse,
  getUserList,
} from "../../../store/admin/action";

const CreateUserModalForm = ({
  openCreateuserModal,
  handleCloseCreateUserModal,
  roleList,
  storeList,
}) => {
  const formRef = useRef();
  const dispatch = useDispatch();

  const addUserResponse = useSelector(
    (state) => state?.admin?.createUserResponse
  );
  console.log("createUserResponse", addUserResponse);
  console.log("roleList", roleList);
  const newUserRoleSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("User Id is Required"),
    password: Yup.string().required("Passowrd is required"),
    firstName: Yup.string().ensure().required("First Name is Required!"),
    lastName: Yup.string().required("Last Name is required"),
    emailId: Yup.string().email().required("Email is required"),
    mobileNumber: Yup.number().required("Contact No is Required"),
    address: Yup.string().required("Address Field is Required"),
    city: Yup.string().required("City Field is Required"),
    store: Yup.string().ensure().required("Select the Store Name!"),
    roles: Yup.string().ensure().required("Select the Role!"),
  });

  useEffect(() => {
    if (addUserResponse && addUserResponse?.status === 200) {
      dispatch(getUserList());
      dispatch(createUserResponse(""));
      formRef?.current?.resetForm({ values: "" });
      toastMessage("User Desk", "User Created Successfully");
      handleCloseCreateUserModal();
    } else if (addUserResponse && addUserResponse?.status === 500) {
      dispatch(createUserResponse(""));
      toastMessage("User Desk", "Something went wrong try again", "error");
    } else {
      dispatch(createUserResponse(""));
    }
  }, [addUserResponse]);
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
          innerRef={formRef}
          validateOnMount
          initialValues={{
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            emailId: "",
            mobileNumber: "",
            address: "",
            city: "",
            store: "",
            roles: "",
          }}
          validationSchema={newUserRoleSchema}
          onSubmit={async (values, { resetForm }) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
            console.log("values", values);
            dispatch(createUser(values));
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
            setFieldValue,
            isValid,
          }) => (
            <Form>
              <div className="row">
                <div className="col-10 offset-1">
                  <div className="row mb-2 align-items-center">
                    <div className="col-2">
                      <label htmlFor="username" class="col-form-label">
                        User ID:
                      </label>
                    </div>
                    <div className="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.username}
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.username && touched.username ? (
                        <div className="text-danger float-end">
                          {errors.username}
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
                        autoComplete="new-password"
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
                      <label htmlFor="emailId" class="col-form-label">
                        Email
                      </label>
                    </div>
                    <div class="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.emailId}
                        type="email"
                        id="emailId"
                        name="emailId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.emailId && touched.emailId ? (
                        <div className="text-danger float-end">
                          {errors.emailId}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div class="col-2">
                      <label htmlFor="mobileNumber" class="col-form-label">
                        Contact No
                      </label>
                    </div>
                    <div class="col-6">
                      <Field
                        className="form-control shadow-none"
                        value={values?.mobileNumber}
                        type="number"
                        id="mobileNumber"
                        name="mobileNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-4">
                      {errors.mobileNumber && touched.mobileNumber ? (
                        <div className="text-danger float-end">
                          {errors.mobileNumber}
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
                        name="store"
                        id="store"
                        value={
                          storeList &&
                          storeList?.find((c) => c.value === values?.store)
                        }
                        onChange={(val) => {
                          setFieldValue("store", val.value);
                        }}
                        options={
                          storeList && storeList?.length > 0 ? storeList : []
                        }
                        onBlur={setFieldTouched}
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
                        value={
                          roleList &&
                          roleList?.find((c) => c.value === values?.roles)
                        }
                        onChange={(val) => {
                          setFieldValue("roles", val.value);
                        }}
                        options={
                          roleList && roleList?.length > 0 ? roleList : []
                        }
                        onBlur={setFieldTouched}
                      />
                    </div>
                    <div className="col-4">
                      {errors.roles && touched.roles ? (
                        <div className="text-danger float-end">
                          {errors.roles}
                        </div>
                      ) : null}
                      <span class="form-text">
                        If Role is not here.
                        <Link to={"/listRole"}>Create the Role</Link>
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
