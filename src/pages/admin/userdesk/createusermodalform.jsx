import React, { useEffect, useRef } from "react";
import BasicModal from "../../../components/modal/basicmodal";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import {
  createUser,
  createUserResponse,
  getUserList,
} from "../../../store/admin/action";
import { NETWORK_STATUS_CODE } from "../../../common/constant/constant";
import FormikDynamic from "../../../components/form/forms";

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

  const newUserRoleSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("User Id is Required"),
    password: Yup.string()
      .required("Passowrd is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    firstName: Yup.string()
      .ensure()
      .required("First Name is Required!")
      .matches(/^[A-Za-z]+$/, "First Name Can only be Characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/, "Last Name Can only be Character"),
    emailId: Yup.string().email().required("Email is required"),
    mobileNumber: Yup.number().required("Contact No is Required"),
    address: Yup.string()
      .required("Address Field is Required")
      .matches(/^[#.0-9a-zA-Z\s,-]+$/, "Enter Valid Address"),
    city: Yup.string().required("City Field is Required"),
    store: Yup.string().ensure().required("Select the Store Name!"),
    roles: Yup.string().ensure().required("Select the Role!"),
  });

  const editUserField = [
    {
      type: "text",
      name: "username",
      placeholder: "UserName",
      value: "",
      label: "User ID",
      hint: "Between 2 to 50 characters.",
    },
    {
      type: "text",
      name: "password",
      placeholder: "Password",
      value: "",
      label: "Password",
      hint: " Between 5 to 50 characters, must contain at least one number,one capital letter & one special character.",
    },
    {
      type: "text",
      name: "firstName",
      placeholder: "First Name",
      value: "",
      label: "First Name",
      hint: " Between 2 to 100 characters.",
    },
    {
      type: "text",
      name: "lastName",
      placeholder: "Last Name",
      value: "",
      label: "Last Name",
      hint: " Between 2 to 100 characters.",
    },
    {
      type: "email",
      name: "emailId",
      placeholder: "Email Id",
      value: "",
      label: "Email",
    },

    {
      type: "number",
      name: "mobileNumber",
      placeholder: "Contact No",
      value: "",
      label: "Contact No",
    },
    {
      type: "textarea",
      name: "address",
      placeholder: "Address",
      value: "",
      label: "Address",
    },
    {
      type: "text",
      name: "city",
      placeholder: "City",
      value: "",
      label: "City",
    },
    {
      type: "select",
      name: "store",
      placeholder: "Store Name",
      value: "",
      option: storeList,
      label: "Store Name",
    },
    {
      type: "select",
      name: "roles",
      placeholder: "Role",
      value: "",
      option: roleList,
      label: "Role",
      hint: "If Role is not here.",
    },
  ];

  const handleSubmit = (values) => {
    console.log("Submit Values", values);
    dispatch(createUser(values));
  };
  useEffect(() => {
    if (
      addUserResponse &&
      addUserResponse?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      dispatch(getUserList());
      dispatch(createUserResponse(""));
      formRef?.current?.resetForm({ values: "" });
      toastMessage("User Desk", "User Created Successfully");
      handleCloseCreateUserModal();
    } else if (
      addUserResponse &&
      addUserResponse?.status === NETWORK_STATUS_CODE.INTERNAL_ERROR
    ) {
      dispatch(createUserResponse(""));
      toastMessage("User Desk", addUserResponse?.data?.message, "error");
    } else {
      dispatch(createUserResponse(""));
    }
  }, [addUserResponse]);
  return (
    <>
      <BasicModal
        title="Create User"
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
        <FormikDynamic
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
          inputs={editUserField}
          handleSubmit={handleSubmit}
          buttonText="Save"
          handleCancel={handleCloseCreateUserModal}
        />
      </BasicModal>
    </>
  );
};

export default CreateUserModalForm;
