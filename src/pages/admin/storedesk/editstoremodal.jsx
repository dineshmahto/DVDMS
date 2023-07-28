import React, { useState, useEffect } from "react";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faRefresh,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../../components/modal/basicmodal";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import RadioCheckBox from "../../../components/switch/radiocheckbox";
import { useDispatch, useSelector } from "react-redux";
import {
  editStoreRecord,
  editStoreRecordResponse,
  getStoreDeskList,
} from "../../../store/admin/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { useMediaQuery } from "react-responsive";
const EditStoreModalForm = ({
  openEditStoreModal,
  handleCloseEditStoreModal,
  storeList,
  storeTypeList,
  districtList,
  ownerList,
  blockList,
  editData,
  resetPageDetails,
}) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const dispatch = useDispatch();
  const editStoreRcrdResp = useSelector(
    (state) => state?.admin?.editStoreRecrdResp
  );
  console.log("editStoreRcrdResp", editStoreRcrdResp);
  console.log("editDataa", editData, blockList);
  const newStoreSchema = Yup.object().shape({
    storeName: Yup.string().required("Store Name is Required"),

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
    ninNo: Yup.string().required("NIN Number is Required"),
  });

  useEffect(() => {
    if (editStoreRcrdResp && editStoreRcrdResp?.status === 201) {
      if (editStoreRcrdResp?.data?.status === 1) {
        handleCloseEditStoreModal();
        toastMessage("Store Desk", editStoreRcrdResp?.data?.message);
        resetPageDetails();
        dispatch(getStoreDeskList());
        dispatch(editStoreRecordResponse(""));
      } else if (editStoreRcrdResp?.data?.status === 0) {
        toastMessage("Store Desk", editStoreRcrdResp?.data?.message);
        dispatch(editStoreRecordResponse(""));
      }
    } else if (editStoreRcrdResp && editStoreRcrdResp?.status === 500) {
      handleCloseEditStoreModal();
      dispatch(editStoreRecordResponse(""));
      toastMessage("Store Desk", "Something went wrong", "");
    }
  }, [editStoreRcrdResp]);
  return (
    <>
      <BasicModal
        title="Edit Store"
        show={openEditStoreModal}
        close={() => {
          handleCloseEditStoreModal(false);
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="create_user"
      >
        <Formik
          validateOnMount
          initialValues={{
            id: editData?.id,
            storeName: editData?.storeName,
            storeTypeId: editData?.storeTypeId,
            toStoreId: editData?.toStoreId,
            ownerTypeId: editData?.ownerTypeId,
            address: editData?.address,
            districtId: editData?.districtId,
            blockId: editData?.blockId,
            contactNo: parseInt(editData?.contactNo),
            longitude: editData?.longitude,
            latitude: editData?.latitude,
            opd: editData?.deptOpd === true ? 1 : 0,
            ninNo: editData?.nin === null ? "" : editData?.nin,
          }}
          validationSchema={newStoreSchema}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            dispatch(editStoreRecord(values));
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
            isValid,
            setFieldValue,
          }) => (
            <Form>
              <div className="row">
                <div
                  className={`${
                    isSmallScreen ? "col-sm-12" : " col-10 offset-1"
                  }`}
                >
                  <div className="row mb-2 align-items-center">
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-2"}`}
                    >
                      <label htmlFor="storeName" class="col-form-label">
                        Store Name:{" "}
                        {console.log("values", JSON.stringify(values))}
                      </label>
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-6"}`}
                    >
                      <Field
                        className="form-control shadow-none"
                        value={values?.storeName}
                        type="text"
                        id="storeName"
                        name="storeName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-4"}`}
                    >
                      {errors.userId && touched.storeName ? (
                        <div className="text-danger float-end">
                          {errors.storeName}
                        </div>
                      ) : null}
                      <span class="form-text">Between 2 to 50 characters.</span>
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-2"}`}
                    >
                      <label htmlFor="storeType" class="col-form-label">
                        Store Type:
                      </label>
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-6"}`}
                    >
                      <CustomSelect
                        className="form-control shadow-none"
                        name="storeTypeId"
                        id="storeTypeId"
                        defaultValue={storeTypeList?.find(
                          (c) => c.value === values?.storeTypeId
                        )}
                        value={storeTypeList?.find(
                          (c) => c.value === values?.storeTypeId
                        )}
                        onChange={(val) => {
                          setFieldValue("storeTypeId", val.value);
                        }}
                        options={
                          storeTypeList && storeTypeList?.length > 0
                            ? storeTypeList
                            : []
                        }
                        onBlur={setFieldTouched}
                      />
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-4"}`}
                    >
                      {errors.storeTypeId && touched.storeTypeId ? (
                        <div className="text-danger float-end">
                          {errors.storeTypeId}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-2 align-items-center">
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-2"}`}
                    >
                      <label htmlFor="parentStoreName" class="col-form-label">
                        Parent Store Name
                      </label>
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-6"}`}
                    >
                      <CustomSelect
                        className="form-control shadow-none"
                        name="toStoreId"
                        id="toStoreId"
                        defaultValue={storeList?.find(
                          (c) => c.value === values?.toStoreId
                        )}
                        value={storeList?.find(
                          (c) => c.value === values?.toStoreId
                        )}
                        onChange={(val) => {
                          setFieldValue("toStoreId", val.value);
                        }}
                        options={
                          storeList && storeList?.length > 0 ? storeList : []
                        }
                        onBlur={setFieldTouched}
                      />
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-4"}`}
                    >
                      {errors.toStoreId && touched.toStoreId ? (
                        <div className="text-danger float-end">
                          {errors.toStoreId}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-2"}`}
                    >
                      <label htmlFor="ownerType" class="col-form-label">
                        Owner Type
                      </label>
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-6"}`}
                    >
                      <CustomSelect
                        className="form-control shadow-none"
                        name="ownerTypeId"
                        id="ownerTypeId"
                        defaultValue={ownerList?.find(
                          (c) => c.value === values?.ownerTypeId
                        )}
                        value={ownerList?.find(
                          (c) => c.value === values?.ownerTypeId
                        )}
                        onChange={(val) => {
                          setFieldValue("ownerTypeId", val.value);
                        }}
                        options={
                          ownerList && ownerList?.length > 0 ? ownerList : []
                        }
                        onBlur={setFieldTouched}
                      />
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-4"}`}
                    >
                      {errors.ownerTypeId && touched.ownerTypeId ? (
                        <div className="text-danger float-end">
                          {errors.ownerTypeId}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2 align-items-center">
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-2"}`}
                    >
                      <label htmlFor="address" class="col-form-label">
                        Address
                      </label>
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-6"}`}
                    >
                      <Field
                        className="form-control shadow-none"
                        value={values?.address}
                        type="textarea"
                        id="address"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-4"}`}
                    >
                      {errors.address && touched.address ? (
                        <div className="text-danger float-end">
                          {errors.address}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="opd" class="col-form-label">
                        Is this an OPD/DEPT/WARD of a Hospital? :
                      </label>
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-6"}`}
                    >
                      <RadioCheckBox
                        list={[
                          {
                            id: "1",
                            labelText: "Yes",
                            value: "1",
                            name: "opd",
                            checked: values?.opd,
                          },
                          {
                            id: "2",
                            labelText: "No",
                            value: "0",
                            name: "opd",
                            checked: values?.opd,
                          },
                        ]}
                        onChange={(e) => {
                          console.log("val", e);
                          setFieldValue("opd", e.target?.value);
                        }}
                      />
                      <div
                        className={`${isSmallScreen ? "col-sm-12" : " col-3"}`}
                      >
                        {errors?.opd && touched?.opd ? (
                          <div className="text-danger float-end">
                            {errors.opd}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2 align-items-center">
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-2"}`}
                    >
                      <label
                        htmlFor="districtId"
                        className=""
                        class="col-form-label"
                      >
                        District Name
                      </label>
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-6"}`}
                    >
                      <CustomSelect
                        className="form-control shadow-none"
                        name="districtId"
                        id="districtId"
                        defaultValue={districtList?.find(
                          (c) => c.value === values?.districtId
                        )}
                        value={districtList?.find(
                          (c) => c.value === values?.districtId
                        )}
                        onChange={(val) => {
                          setFieldValue("districtId", val.value);
                        }}
                        options={
                          districtList && districtList?.length > 0
                            ? districtList
                            : []
                        }
                        onBlur={setFieldTouched}
                      />
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-4"}`}
                    >
                      {errors.districtId && touched.districtId ? (
                        <div className="text-danger float-end">
                          {errors.districtId}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-2"}`}
                    >
                      <label htmlFor="blockId" class="col-form-label">
                        Block Name:
                      </label>
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-6"}`}
                    >
                      <CustomSelect
                        id="blockId"
                        name="blockId"
                        defaultValue={blockList?.find(
                          (c) => c.value === values?.blockId
                        )}
                        value={blockList?.find(
                          (c) => c.value === values?.blockId
                        )}
                        onChange={(val) => {
                          setFieldValue("blockId", val.value);
                        }}
                        options={
                          blockList && blockList?.length > 0 ? blockList : []
                        }
                        onBlur={setFieldTouched}
                      />
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-4"}`}
                    >
                      {errors.blockId && touched.blockId ? (
                        <div className="text-danger float-end">
                          {errors.blockId}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-2"}`}
                    >
                      <label htmlFor="contactNo" class="col-form-label">
                        Contact No:
                      </label>
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-6"}`}
                    >
                      <Field
                        className="form-control shadow-none"
                        value={values?.contactNo}
                        type="number"
                        id="contactNo"
                        name="contactNo"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-4"}`}
                    >
                      {errors.contactNo && touched.contactNo ? (
                        <div className="text-danger float-end">
                          {errors.contactNo}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-2"}`}
                    >
                      <label htmlFor="longitude" class="col-form-label">
                        Longitude:
                      </label>
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-6"}`}
                    >
                      <Field
                        className="form-control shadow-none"
                        value={values?.longitude}
                        type="number"
                        id="longitude"
                        name="longitude"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-4"}`}
                    >
                      {errors.longitude && touched.longitude ? (
                        <div className="text-danger float-end">
                          {errors.longitude}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-2"}`}
                    >
                      <label htmlFor="latitude" class="col-form-label">
                        Latitude:
                      </label>
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-6"}`}
                    >
                      <Field
                        className="form-control shadow-none"
                        name="latitude"
                        id="latitude"
                        type="number"
                        value={values?.latitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-4"}`}
                    >
                      {errors.latitude && touched.latitude ? (
                        <div className="text-danger float-end">
                          {errors.latitude}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-2"}`}
                    >
                      <label htmlFor="ninNumber" class="col-form-label">
                        NIN Number:
                      </label>
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-6"}`}
                    >
                      <Field
                        className="form-control shadow-none"
                        name="ninNo"
                        id="ninNo"
                        type="ninNo"
                        value={values?.ninNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div
                      className={`${isSmallScreen ? "col-sm-12" : " col-4"}`}
                    >
                      {errors.ninNo && touched.ninNo ? (
                        <div className="text-danger float-end">
                          {errors.ninNo}
                        </div>
                      ) : null}
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
                          onClick={handleCloseEditStoreModal}
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

export default EditStoreModalForm;
