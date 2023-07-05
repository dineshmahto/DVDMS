//useeffect of edit model is automatically called when i render funding desk  --note fro Dinesh sir

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BasicModal from "../../../components/modal/basicmodal";
import * as Yup from "yup";
import dayjs from "dayjs";

import { makeStyles } from "@mui/styles";
import {
  editFundingSource,
  editFundingSourceResponse,
  getFundingSourceList,
  updateFundingRecord,
  updateFundingRecordResponse,
} from "../../../store/admin/action";
import FormikDynamic from "../../../components/form/forms";
import toastMessage from "../../../common/toastmessage/toastmessage";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      "& .MuiButtonBase-root": {},
      "& .MuiInputBase-input": {
        padding: 8,
      },
    },
  },
});
const CreateUserModalForm = ({
  openNewFundingModal,
  handleEditFundingModal,
  editdata,
  resetPageDetails,
}) => {
  console.log("editData", editdata);
  const dispatch = useDispatch();
  const editFundingResponse = useSelector(
    (state) => state?.admin?.updateFundingRcrdResp
  );

  useEffect(() => {
    if (editFundingResponse && editFundingResponse?.status === 201) {
      if (editFundingResponse?.data?.status === 1) {
        handleEditFundingModal();
        toastMessage("UPDATE Funding", editFundingResponse?.data?.message);
        resetPageDetails();
        dispatch(getFundingSourceList());
        dispatch(updateFundingRecordResponse(""));
      } else if (editFundingResponse?.data?.status === 0) {
        toastMessage("UPDATE Funding", editFundingResponse?.data?.message);
        dispatch(updateFundingRecordResponse(""));
      }
    } else if (editFundingResponse && editFundingResponse?.status === 500) {
      dispatch(updateFundingRecordResponse(""));
      toastMessage("UPDATE Funding", "Something went wrong", "");
    }
  }, [editFundingResponse]);

  const [isFundDataSet, setIsFundDataSet] = useState(false);

  const [updating, setUpdating] = useState(false);

  const [fundData, setFundData] = useState({
    fundingSrcName: "",
    code: "",
    effectiveDate: "",
    Id: "",
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  const handleChange = (event, property) => {
    localStorage.removeItem("editData");
    console.log(fundData);
    setFundData({ ...fundData, [property]: event.target.value });
  };

  const handleEditFunding = () => {
    dispatch(editFundingSource(fundData));
  };
  const handleReset = () => {
    setFundData({
      fundingSrcName: "",
      code: "",
      effectiveDate: "",
      id: "",
    });
    setSelectedDate(null);
    localStorage.removeItem("editData");
  };

  const handleCancel = () => {
    localStorage.removeItem("editData");
    setSelectedDate(null);
    //window.location.reload();
    handleEditFundingModal();
  };
  const fundingFields = [
    {
      type: "text",
      name: "fundingSrcName",
      placeholder: "Enter Funding Source Name",
      value: "",
      label: "Funding Source Name",
    },
    {
      type: "text",
      name: "code",
      placeholder: "Enter Funding Source Short Name",
      value: "",
      label: "Code",
    },

    {
      type: "date",
      name: "effectiveDate",
      format: "DD/MM/YYYY",
      value: "",

      label: "Effective Date",
    },
  ];
  const classes = useStyles();
  const createFundingSchema = Yup.object().shape({
    fundingSrcName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    code: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    effectiveDate: Yup.string().required("Effective Date is Required"),
  });
  const handleSubmit = (values) => {
    console.log("values", values?.effectiveDate);

    dispatch(
      updateFundingRecord({
        ...values,
        id: editdata?.id,
        effectiveDate: formatDate(values?.effectiveDate),
      })
    );
  };
  return (
    <>
      <BasicModal
        title="Edit Funding"
        show={openNewFundingModal}
        close={() => {
          handleEditFundingModal();
        }}
        isStatic={true}
        scrollable={true}
        isCenterAlign={true}
        fullScreen={false}
        size="lg"
        key="edit_new_funding"
      >
        <FormikDynamic
          initialValues={{
            id: editdata?.id,
            fundingSrcName: editdata?.name,
            code: editdata?.code,
            effectiveDate: editdata?.effectiveDate,
          }}
          validationSchema={createFundingSchema}
          inputs={fundingFields}
          handleSubmit={handleSubmit}
          buttonText="Edit Funding"
          handleCancel={handleEditFundingModal}
        />
      </BasicModal>
    </>
  );
};

export default CreateUserModalForm;
