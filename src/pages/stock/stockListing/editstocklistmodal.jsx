import React from "react";
import BasicModal from "../../../components/modal/basicmodal";
import * as Yup from "yup";
import moment from "moment";
import FormikDynamic from "../../../components/form/forms";

const EditStockListModal = ({
  openEditStockListModal,
  handleEditStockListModal,
  data,
}) => {
  console.log(data);
  const editStockListSchema = Yup.object().shape({
    storeName: Yup.string().required("Enter the Store Name"),
    drugName: Yup.string().required("Drug Name is Required"),
    batchNo: Yup.string().required("BatchNo is Required"),
    mfgDate: Yup.string()
      // .nullable()
      // .test("dateOfBirth", "You must be 18 years or older", function (value) {
      //   return moment().diff(moment(value, "YYYY-MM-DD"), "years") >= 18;
      // })
      .required("Select the Manufacture Date"),
    expDate: Yup.string().required("Select the Expiry Date!"),
  });

  const editStockField = [
    {
      type: "text",
      name: "storeName",
      placeholder: "Store Name",
      value: "",
      label: "Store Name",
      required: true,
    },
    {
      type: "text",
      name: "drugName",
      placeholder: "Drug Name",
      value: "",
      label: "Drug Name",
      required: true,
    },
    {
      type: "text",
      name: "batchNo",
      placeholder: "Batch No",
      value: "",
      label: "Batch No",
      required: true,
    },
    {
      type: "date",
      name: "mfgDate",
      placeholder: "Manufacture Date",
      value: "",
      format: "DD/MM/YYYY",
      label: "Manufacture Date",
      required: true,
    },
    {
      type: "date",
      name: "expDate",
      placeholder: "Expiry Date",
      value: "",
      format: "DD/MM/YYYY",
      label: "Expiry Date",
      required: true,
    },
  ];
  const handleSubmit = (values) => {
    console.log("values", values);
  };
  return (
    <>
      <BasicModal
        title="Stock Edit Expiry/Manufacture Date Desk"
        show={openEditStockListModal}
        close={() => {
          handleEditStockListModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="edit_stock_list"
      >
        <FormikDynamic
          initialValues={{
            storeName: data?.storeName,
            drugName: data?.drugName,
            batchNo: data?.batchNo,
            mfgDate: data?.manufactureDate,
            expDate: data?.expiryDate,
          }}
          validationSchema={editStockListSchema}
          inputs={editStockField}
          handleSubmit={handleSubmit}
          buttonText="Update"
          handleCancel={handleEditStockListModal}
        />
      </BasicModal>
    </>
  );
};

export default EditStockListModal;
