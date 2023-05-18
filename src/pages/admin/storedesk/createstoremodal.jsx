import React, { useState, useEffect } from "react";
import BasicModal from "../../../components/modal/basicmodal";
import * as Yup from "yup";
import FormikDynamic from "../../../components/form/forms";
import { useDispatch, useSelector } from "react-redux";
import {
  createStore,
  createStoreResponse,
  getStoreDeskList,
} from "../../../store/admin/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
const CreateStoreModalForm = ({
  openCreateStoreModal,
  handleCloseCreateStoreModal,
  blockList,
  districtList,
  ownerList,
  storeList,
  storeTypeList,
}) => {
  const dispatch = useDispatch();
  const createStoreResp = useSelector((state) => state?.admin?.createStoreResp);
  console.log("createStoreResp", createStoreResp);
  const newStoreSchema = Yup.object().shape({
    storeName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("User Id is Required"),

    storeTypeId: Yup.string().ensure().required("Select the Store Type!"),
    toStoreId: Yup.string().ensure().required("Select the Parent Store Type"),
    ownerTypeId: Yup.string().ensure().required("Select the Owner Type"),
    address: Yup.string().required("Address is Required"),
    opd: Yup.string().required("Check the OPD Field"),
    districtId: Yup.string().ensure().required("Select the District"),
    blockId: Yup.string().ensure().required("Select the Block"),
    contactNo: Yup.number().required("Contact No is Required"),
    longitude: Yup.number().required("Longitude is Required"),
    latitude: Yup.number().required("latitude is Required"),
    ninNo: Yup.number().required("NIN Number is Required"),
  });

  const addStoreField = [
    {
      type: "text",
      name: "storeName",
      placeholder: "Enter Store Name",
      value: "",
      label: "Store Name",
    },
    {
      type: "select",
      name: "storeTypeId",
      placeholder: "Full Name",
      value: "",
      option: storeList,
      label: "Store Type",
    },
    {
      type: "select",
      name: "toStoreId",

      value: "",
      option: storeTypeList,
      label: "Parent Store Name",
    },
    {
      type: "select",
      name: "ownerTypeId",

      value: "",
      option: ownerList,
      label: "Owner Type",
    },
    {
      type: "text",
      name: "address",
      value: "",
      label: "Address",
    },
    {
      type: "radio",
      name: "opd",
      list: [
        { labelText: "Yes", value: "1" },
        {
          labelText: "No",
          value: "2",
        },
        {
          labelText: "Others",
          value: "3",
        },
      ],
      label: "Is this an OPD/DEPT/WARD of a Hospital?",
      value: "",
    },
    {
      type: "select",
      name: "districtId",

      value: "",
      option: districtList,
      label: "District Name",
    },
    {
      type: "select",
      name: "blockId",

      value: "",
      option: blockList,
      label: "Block Name",
    },
    {
      type: "number",
      name: "contactNo",
      placeholder: "Enter Contact No",
      value: "",
      label: "Contact No",
    },
    {
      type: "number",
      name: "longitude",
      placeholder: "Enter the Longitude",
      value: "",
      label: "Longitude",
    },
    {
      type: "number",
      name: "latitude",
      placeholder: " Enter the Latitude",

      value: "",
      label: "Latitude",
    },
    {
      type: "number",
      name: "ninNo",
      placeholder: "Enter NIN Number",

      value: "",
      label: "NIN Number",
    },
  ];
  const handleSubmit = (values) => {
    console.log("values", values);
    dispatch(createStore(values));
  };

  useEffect(() => {
    if (createStoreResp && createStoreResp?.status === 201) {
      dispatch(getStoreDeskList());
      dispatch(createStoreResponse(""));
      // formRef?.current?.resetForm({ values: "" });
      handleCloseCreateStoreModal();
    } else if (createStoreResp && createStoreResp?.status === 500) {
      dispatch(createStoreResponse(""));
      toastMessage("STORE DESK", "Something went wrong", "error");
    }
  }, [createStoreResp]);
  return (
    <>
      <BasicModal
        title="Create Store"
        show={openCreateStoreModal}
        close={() => {
          handleCloseCreateStoreModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="create_store"
      >
        <FormikDynamic
          initialValues={{
            storeName: "",
            storeTypeId: "",
            toStoreId: "",
            ownerTypeId: "",
            address: "",
            districtId: "",
            blockId: "",
            contactNo: "",
            longitude: "",
            latitude: "",
            ninNo: "",
            opd: "",
          }}
          buttonText="Save"
          validationSchema={newStoreSchema}
          inputs={addStoreField}
          handleSubmit={handleSubmit}
        />
      </BasicModal>
    </>
  );
};

export default CreateStoreModalForm;
