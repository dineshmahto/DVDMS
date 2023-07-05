import React from "react";

import BasicModal from "../../../components/modal/basicmodal";
import * as Yup from "yup";
import FormikDynamic from "../../../components/form/forms";
const EditUserModalForm = ({
  openEdituserModal,
  handleCloseEditUserModal,
  editData,
  roleList,
  storeList,
}) => {
  const newUserRoleSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("User Id is Required"),
    firstName: Yup.string()
      .ensure()
      .required("First Name is Required!")
      .matches(/^[A-Za-z]+$/, "First Name Can only be Characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/, "Last Name Can only be Character"),
    emailId: Yup.string().email().required("Email is required"),
    address: Yup.string().required("Address Field is Required"),
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
      required: true,
    },
    {
      type: "text",
      name: "firstName",
      placeholder: "First Name",
      value: "",
      label: "First Name",
      required: true,
    },
    {
      type: "text",
      name: "lastName",
      placeholder: "Last Name",
      value: "",
      label: "Last Name",
      required: true,
    },
    {
      type: "email",
      name: "emailId",
      placeholder: "Email Id",
      value: "",
      label: "Email",
      required: true,
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
      required: true,
    },
    {
      type: "select",
      name: "store",
      placeholder: "Store Name",
      value: "",
      option: storeList,
      label: "Store Name",
      required: true,
    },
    {
      type: "select",
      name: "roles",
      placeholder: "Role",
      value: "",
      option: roleList,
      label: "Role",
      required: true,
    },
  ];

  const handleSubmit = (values) => {
    console.log("Submit Values", values);
    //  dispatch(createNewDrug(values));
  };

  return (
    <>
      <BasicModal
        title="Edit User"
        show={openEdituserModal}
        close={() => {
          handleCloseEditUserModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="edit_user"
      >
        <FormikDynamic
          initialValues={{
            username: editData?.username,
            firstName: editData?.firstName,
            lastName: editData?.lastName === null ? "" : editData?.lastName,
            emailId: editData?.emailId,
            address: editData?.address,
            city: editData?.city,
            store: editData?.storeId,
            roles: editData?.roleId,
          }}
          validationSchema={newUserRoleSchema}
          inputs={editUserField}
          handleSubmit={handleSubmit}
          buttonText="Update"
          handleCancel={handleCloseEditUserModal}
        />
      </BasicModal>
    </>
  );
};

export default EditUserModalForm;
