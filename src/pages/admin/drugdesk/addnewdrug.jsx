import React, { useEffect, useRef } from "react";
import BasicModal from "../../../components/modal/basicmodal";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createNewDrug,
  createNewDrugResponse,
  getDrugDeksList,
} from "../../../store/admin/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
import FormikDynamic from "../../../components/form/forms";
import { CREATE_DRUG } from "../../../common/constant/constants";
const AddNewDrug = ({
  openAddNewDrugModal,
  handleOpenAddDrugModal,
  categoryList,
  manufactureList,
  classList,
}) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const addDrugResponse = useSelector((state) => state?.admin?.createDrugResp);
  console.log("list", categoryList);
  console.log("addDrugResp", addDrugResponse);
  const addNewDrugSchema = Yup.object().shape({
    drugName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Drug Name is Required"),

    categoryId: Yup.string().ensure().required("Select the Store!"),
    brandName: Yup.string().required("Select the Parent Store Type"),
    packDesc: Yup.string().required("Packaging Decription is Required"),
    packQty: Yup.number().required("package Qty is Required"),
    strengthValue: Yup.string().required("Strength Value is Required"),
    strengthUnit: Yup.string().required("Strength Unit is Required"),
    manufactureId: Yup.string()
      .ensure()
      .required("Select the manufacture Name!"),
    drugClassId: Yup.string().ensure().required("Select the Class Name!"),
  });

  const addDrugField = [
    {
      type: "text",
      name: "drugName",
      placeholder: "Enter Drug Name",
      value: "",
      label: "Drug Name",
    },
    {
      type: "select",
      name: "categoryId",
      placeholder: "Full Name",
      value: "",
      option: categoryList,
      label: "Category",
    },
    {
      type: "text",
      name: "brandName",
      placeholder: "Enter Brand Name",
      value: "",
      label: "Brand Name",
    },
    {
      type: "text",
      name: "packDesc",
      placeholder: "e.g 1X10, 1X100",
      value: "",
      label: "Packaging Description",
    },
    {
      type: "text",
      name: "packQty",
      placeholder: "e.g 10, 100",
      value: "",
      label: "Package Qty",
    },
    {
      type: "text",
      name: "strengthValue",
      placeholder: "e.g 250, 500, 125/5",
      value: "",
      label: "Strength Value",
    },
    {
      type: "text",
      name: "strengthUnit",
      placeholder: "e.g mg. mg/ml",
      value: "",
      label: "Strength Unit",
    },
    {
      type: "select",
      name: "manufactureId",
      placeholder: " ",
      option: manufactureList,
      value: "",
      label: "Manufacture Name",
    },
    {
      type: "select",
      name: "drugClassId",
      placeholder: " ",
      option: classList,
      value: "",
      label: "Class Name",
    },
  ];

  useEffect(() => {
    if (addDrugResponse && addDrugResponse?.status === 201) {
      dispatch(getDrugDeksList());
      dispatch(createNewDrugResponse(""));
      formRef?.current?.resetForm({ values: "" });
      handleOpenAddDrugModal();
    } else if (addDrugResponse && addDrugResponse?.status === 500) {
      dispatch(createNewDrugResponse(""));
      toastMessage("ADD NEW DRUG", "Something went wrong", "");
    }
  }, [addDrugResponse]);
  const handleSubmit = (values) => {
    console.log("Submit Values", values);
    dispatch(createNewDrug(values));
  };
  return (
    <>
      <BasicModal
        title="Create New Drug Record"
        show={openAddNewDrugModal}
        close={() => {
          handleOpenAddDrugModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="create_new_drug"
      >
        <FormikDynamic
          initialValues={{
            drugName: "",
            categoryId: "",
            brandName: "",
            packDesc: "",
            packQty: "",
            strengthValue: "",
            strengthUnit: "",
            manufactureId: "",
            drugClassId: "",
          }}
          validationSchema={addNewDrugSchema}
          inputs={addDrugField}
          handleSubmit={handleSubmit}
          buttonText="Add Drug"
          handleCancel={handleOpenAddDrugModal}
        />
      </BasicModal>
    </>
  );
};

export default AddNewDrug;
