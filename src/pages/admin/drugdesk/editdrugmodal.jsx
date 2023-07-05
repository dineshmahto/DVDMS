import React, { useEffect } from "react";
import BasicModal from "../../../components/modal/basicmodal";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrugDeksList,
  editDrug,
  editDrugResponse,
} from "../../../store/admin/action";
import toastMessage from "../../../common/toastmessage/toastmessage";

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

  const editDrugSchema = Yup.object().shape({
    drugName: Yup.string().required("Drug Name is Required"),

    categoryId: Yup.string().ensure().required("Select the Store!"),
    brandName: Yup.string(),
    packDesc: Yup.string().required("Packaging Decription is Required"),
    packQty: Yup.string().required("Package Quantity is Required"),
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
        <Formik
          validateOnMount
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
          onSubmit={async (values) => {
            console.log("values", values);
            await new Promise((r) => setTimeout(r, 500));
            dispatch(editDrug(values));
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
                  <div className="row mb-2">
                    <div className="col-3">
                      <label for="drugName" class="col-form-label">
                        Drug Name :
                      </label>
                    </div>
                    <div className="col-9">
                      <Field
                        className="form-control shadow-none"
                        type="text"
                        placeholder="Enter Drug Name"
                        id="drugName"
                        name="drugName"
                        value={values?.drugName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.drugName && touched.drugName ? (
                        <div className="text-danger float-end">
                          {errors.drugName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="categoryId" class="col-form-label">
                        Category :
                      </label>
                    </div>
                    <div className="col-9">
                      <CustomSelect
                        id="categoryId"
                        name="categoryId"
                        defaultValue={categoryList?.find(
                          (c) => c.value === values?.categoryId
                        )}
                        value={categoryList?.find(
                          (c) => c.value === values?.categoryId
                        )}
                        onChange={(val) => {
                          setFieldValue("categoryId", val.value);
                        }}
                        options={
                          categoryList && categoryList?.length > 0
                            ? categoryList
                            : []
                        }
                        onBlur={setFieldTouched}
                      />
                      {errors.categoryId && touched.categoryId ? (
                        <div className="text-danger float-end">
                          {errors.categoryId}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="brandName" class="col-form-label">
                        Brand Name :
                      </label>
                    </div>
                    <div className="col-9">
                      <Field
                        className="form-control shadow-none"
                        value={values?.brandName}
                        name="brandName"
                        type="text"
                        placeholder="Enter Brand Name"
                        id="brandName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.brandName && touched.brandName ? (
                        <div className="text-danger float-end">
                          {errors.brandName}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="packDesc" class="col-form-label">
                        Package Description :
                      </label>
                    </div>
                    <div className="col-9">
                      <Field
                        className="form-control shadow-none"
                        value={values?.packDesc}
                        type="text"
                        placeholder="Enter Brand Name"
                        id="packDesc"
                        name="packDesc"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.packDesc && touched.packDesc ? (
                        <div className="text-danger flaot-end">
                          {errors.packDesc}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="packQty" class="col-form-label">
                        Package Qty :
                      </label>
                    </div>
                    <div className="col-9">
                      <Field
                        className="form-control shadow-none"
                        value={values?.packQty}
                        type="text"
                        placeholder="e.g 10, 100"
                        id="packQty"
                        name="packQty"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.packQty && touched.packQty ? (
                        <div className="text-danger float-end">
                          {errors.packQty}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="strengthValue" class="col-form-label">
                        Strength Value :
                      </label>
                    </div>
                    <div className="col-9">
                      <Field
                        className="form-control shadow-none"
                        value={values?.strengthValue}
                        type="text"
                        placeholder="e.g 250, 500, 125/5"
                        id="strengthValue"
                        name="strengthValue"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.strengthValue && touched.strengthValue ? (
                        <div className="text-danger float-end">
                          {errors.strengthValue}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="strengthUnit" class="col-form-label">
                        Strength Unit :
                      </label>
                    </div>
                    <div className="col-9">
                      <Field
                        className="form-control shadow-none"
                        value={values?.strengthUnit}
                        type="text"
                        placeholder="e.g mg mg/ml"
                        id="strengthUnit"
                        name="strengthUnit"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.strengthUnit && touched.strengthUnit ? (
                        <div className="text-danger float-end">
                          {errors.strengthUnit}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="manufactureId" class="col-form-label">
                        Manufacture Name :
                      </label>
                    </div>
                    <div className="col-9">
                      <CustomSelect
                        id="manufactureId"
                        name="manufactureId"
                        defaultValue={manufactureList?.find(
                          (c) => c.value === values?.manufactureId
                        )}
                        value={manufactureList?.find(
                          (c) => c.value === values?.manufactureId
                        )}
                        onChange={(val) => {
                          setFieldValue("manufactureId", val.value);
                        }}
                        options={
                          manufactureList && manufactureList?.length > 0
                            ? manufactureList
                            : []
                        }
                        onBlur={setFieldTouched}
                      />
                      {errors.manufactureId && touched.manufactureId ? (
                        <div className="text-danger float-end">
                          {errors.manufactureId}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="drugClassId" class="col-form-label">
                        Class Name :
                      </label>
                    </div>
                    <div className="col-9">
                      <CustomSelect
                        name="drugClassId"
                        id="drugClassId"
                        defaultValue={classList?.find(
                          (c) => c.value === values?.drugClassId
                        )}
                        value={classList?.find(
                          (c) => c.value === values?.drugClassId
                        )}
                        onChange={(val) => {
                          setFieldValue("drugClassId", val.value);
                        }}
                        options={
                          classList && classList?.length > 0 ? classList : []
                        }
                        onBlur={setFieldTouched}
                      />
                      {errors.drugClassId && touched.drugClassId ? (
                        <div className="text-danger float-end">
                          {errors.drugClassId}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mt-1  mb-2">
                    <div className="col-12">
                      <div className="d-flex justify-content-center">
                        <Basicbutton
                          icon={
                            <FontAwesomeIcon icon={faXmark} className="me-1" />
                          }
                          type="button"
                          buttonText="Cancel"
                          className="danger rounded-0 me-2"
                          outlineType={true}
                          onClick={() => handleEditDrugModal()}
                        />
                        <Basicbutton
                          icon={
                            <FontAwesomeIcon
                              icon={faFloppyDisk}
                              className="me-1"
                            />
                          }
                          type="submit"
                          buttonText="Update"
                          className="success rounded-0"
                          outlineType={true}
                          disabled={!isValid}
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

export default EditDrugModal;
