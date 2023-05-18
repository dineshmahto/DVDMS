import React, { useState, useEffect } from "react";
import BasicModal from "../../../components/modal/basicmodal";

import * as Yup from "yup";
import FormikDynamic from "../../../components/form/forms";
import { useDispatch, useSelector } from "react-redux";
import {
  createFundingSource,
  createFundingSourceResponse,
} from "../../../store/admin/action";
import toastMessage from "../../../common/toastmessage/toastmessage";

const CreateUserModalForm = ({
  openNewFundinngModal,
  handleNewFundingModal,
}) => {
  const dispatch = useDispatch();
  const createFundingSrcResp = useSelector(
    (state) => state?.admin?.createFundingSrcResp
  );
  console.log("createFundingSrcResp", createFundingSrcResp);
  const createFundingSchema = Yup.object().shape({
    fundingSrcName: Yup.string().required("Funding Source Name is Required"),
    code: Yup.string().required("Code is Required"),
    effectiveDate: Yup.string().required("Effective Date is Required"),
  });
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
  const handleSubmit = (values) => {
    dispatch(createFundingSource(values));
  };
  useEffect(() => {
    if (createFundingSrcResp && createFundingSrcResp?.status === 201) {
      toastMessage("Create New Funding", "Successfully Created");
      dispatch(createFundingSourceResponse(""));
    } else if (createFundingSrcResp && createFundingSrcResp?.status === 500) {
      toastMessage("Create New Funding", "Something went wrong");
      dispatch(createFundingSourceResponse(""));
    }
  }, [createFundingSrcResp]);
  return (
    <>
      <BasicModal
        title="Create New Funding"
        show={openNewFundinngModal}
        close={() => {
          handleNewFundingModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="create_new_funding"
      >
        <FormikDynamic
          initialValues={{
            fundingSrcName: "",
            code: "",
            effectiveDate: null,
          }}
          validationSchema={createFundingSchema}
          inputs={fundingFields}
          handleSubmit={handleSubmit}
          buttonText="Add Funding"
        />
      </BasicModal>
    </>
  );
};

export default CreateUserModalForm;
