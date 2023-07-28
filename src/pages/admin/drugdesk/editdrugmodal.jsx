import React, { useEffect } from "react";
import BasicModal from "../../../components/modal/basicmodal";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrugDeksList,
  editDrug,
  editDrugResponse,
} from "../../../store/admin/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
import FormikDynamic from "../../../components/form/forms";

const EditDrugModal = ({
  openEditDrugModal,
  handleEditDrugModal,
  editData,
  classList,
  manufactureList,
  categoryList,
}) => {
  const dispatch = useDispatch();
  const editDrugResponses = useSelector((state) => state?.admin?.editDrugResp);
  console.log("editDrugResponse", editDrugResponses);
  console.log("editData", editData, editData?.classList);
  const editUserField = [
    {
      type: "text",
      name: "drugName",
      placeholder: "Drug Name",
      value: "",
      label: "Drug Name",
      required: true,
    },
    {
      type: "select",
      name: "categoryId",
      placeholder: "Category Id",
      value: "",
      label: "Category Id",
      option: categoryList,
      required: true,
    },
    {
      type: "text",
      name: "brandName",
      placeholder: "Brand Name",
      value: "",
      label: "Brand Name",
      required: true,
    },
    {
      type: "text",
      name: "packDesc",
      placeholder: "Package Description",
      value: "",
      label: "Package Description",
      required: true,
    },
    {
      type: "number",
      name: "packQty",
      placeholder: "e.g 10, 100",
      value: "",
      label: "Package Qty",
      required: true,
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
      placeholder: "e.g mg mg/ml",
      value: "",
      label: "Strength Unit",
      required: true,
    },
    {
      type: "select",
      name: "manufactureId",
      value: "",
      option: manufactureList,
      label: "Manufacture Name",
      required: true,
    },
    {
      type: "select",
      name: "drugClassId",
      value: "",
      option: classList,
      label: "Class Name",
      required: true,
    },
  ];
  const editDrugSchema = Yup.object().shape({
    drugName: Yup.string().required("Drug Name is Required"),
    categoryId: Yup.string().ensure().required("Select the Store!"),
    brandName: Yup.string().matches(
      /^[A-Za-z]+$/,
      "Brand Name Can only be Characters"
    ),
    packDesc: Yup.string()
      .required("Packaging Decription is Required")
      .matches(/^[A-Za-z0-9]+$/, " Name Can only be Characters"),
    packQty: Yup.string()
      .required("Package Quantity is Required")
      .matches(/^[1-9]\d*$/, "Package Qty can only be positive number"),
    strengthValue: Yup.string().required("Strength Value is Required"),
    strengthUnit: Yup.string().required("Strength Unit is Required"),
    manufactureId: Yup.string()
      .ensure()
      .required("Select the manufacture Name!"),
    drugClassId: Yup.string().ensure().required("Select the Class Name!"),
  });
  useEffect(() => {
    if (editDrugResponses && editDrugResponses?.status === 201) {
      if (editDrugResponses?.data?.status === 1) {
        console.log("Dinesh");
        handleEditDrugModal();
        toastMessage("DRUG DESK", editDrugResponses?.data?.message);
        dispatch(editDrugResponse(""));
        dispatch(getDrugDeksList());
      } else if (editDrugResponses?.data?.status === 0) {
        console.log("Kumar");
        toastMessage("DRUG DESK", editDrugResponses?.data?.message);
        dispatch(editDrugResponse(""));
      }
    } else if (
      (editDrugResponses && editDrugResponses?.status === 500) ||
      editDrugResponses?.status === 404
    ) {
      handleEditDrugModal();
      toastMessage("DRUG DESK", "Something went wrong");
    }
  }, [editDrugResponses]);

  const handleSubmit = (values) => {
    console.log("values", values);
    //dispatch(editDrug(values));
  };

  return (
    <>
      <BasicModal
        title="Edit Drug Record"
        show={openEditDrugModal}
        close={() => {
          handleEditDrugModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={true}
        fullScreen={false}
        size="lg"
        key="edit_new_drug"
      >
        <FormikDynamic
          initialValues={{
            id: editData?.id,
            drugName: editData?.name,
            categoryId: editData?.categoryId,
            brandName: editData?.brandName === null ? "" : editData?.brandName,
            packDesc: editData?.packDesc,
            packQty: editData?.packQty,
            strengthValue: editData?.strengthValue,
            strengthUnit: editData?.unit,
            manufactureId: editData?.manuId,
            drugClassId: editData?.drugClassId,
          }}
          validationSchema={editDrugSchema}
          inputs={editUserField}
          handleSubmit={handleSubmit}
          buttonText="Update"
          handleCancel={handleEditDrugModal}
        />
      </BasicModal>
    </>
  );
};

export default EditDrugModal;
