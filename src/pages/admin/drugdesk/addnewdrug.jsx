import React from "react";
import BasicModal from "../../../components/modal/basicmodal";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
const AddNewDrug = ({ openAddNewDrugModal, handleOpenAddDrugModal }) => {
  const addNewDrugSchema = Yup.object().shape({
    drugName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Drug Name is Required"),

    category: Yup.string().ensure().required("Select the Store!"),
    brandName: Yup.string().required("Select the Parent Store Type"),
    pkgDescription: Yup.string().required("Packaging Decription is Required"),
    strgthValue: Yup.string().required("Strength Value is Required"),
    strgthUnit: Yup.string().required("Strength Unit is Required"),
    manufactureName: Yup.string()
      .ensure()
      .required("Select the manufacture Name!"),
    clasName: Yup.string().ensure().required("Select the Class Name!"),
  });
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
        <Formik
          initialValues={{
            drugName: "",
            category: "",
            brandName: "",
            pkgDescription: "",
            pkgQty: "",
            strgthValue: "",
            strgthUnit: "",
            mfgName: "",
            clsName: "",
          }}
          validationSchema={addNewDrugSchema}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
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
                      <label htmlFor="category" class="col-form-label">
                        Category :
                      </label>
                    </div>
                    <div className="col-9">
                      <CustomSelect
                        value={values?.category}
                        name="category"
                        id="catgory"
                        options={[]}
                        onBlur={setFieldTouched}
                        error={errors.category}
                        touched={touched.category}
                        onChange={(choice) => {
                          console.log(choice?.value);
                        }}
                      />
                      {errors?.category && touched?.category ? (
                        <div className="text-danger float-end">
                          {errors?.category}
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
                      <label htmlFor="pkgDescription" class="col-form-label">
                        Packaging Description :
                      </label>
                    </div>
                    <div className="col-9">
                      <Field
                        className="form-control shadow-none"
                        value={values?.pkgDescription}
                        type="text"
                        placeholder="Enter Brand Name"
                        id="pkgDescription"
                        name="pkgDescription"
                      />
                      {errors.pkgDescription && touched.pkgDescription ? (
                        <div className="text-danger flaot-end">
                          {errors.pkgDescription}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="pkgQty" class="col-form-label">
                        Package Qty :
                      </label>
                    </div>
                    <div className="col-9">
                      <Field
                        className="form-control shadow-none"
                        value={values?.pkgQty}
                        type="text"
                        placeholder="e.g 10, 100"
                        id="pkgQty"
                        name="pkgQty"
                      />
                      {errors.pkgQty && touched.pkgQty ? (
                        <div className="text-danger float-end">
                          {errors.pkgQty}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="strgthValue" class="col-form-label">
                        Strength Value :
                      </label>
                    </div>
                    <div className="col-9">
                      <Field
                        className="form-control shadow-none"
                        value={values?.strgthValue}
                        type="text"
                        placeholder="e.g 250, 500, 125/5"
                        id="strgthValue"
                        name="strgthValue"
                      />
                      {errors.strgthValue && touched.strgthValue ? (
                        <div className="text-danger float-end">
                          {errors.strgthValue}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="strgthUnit" class="col-form-label">
                        Strength Unit :
                      </label>
                    </div>
                    <div className="col-9">
                      <Field
                        className="form-control shadow-none"
                        value={values?.strgthUnit}
                        type="text"
                        placeholder="e.g mg mg/ml"
                        id="strgthUnit"
                        name="strgthUnit"
                      />
                      {errors.strgthUnit && touched.strgthUnit ? (
                        <div className="text-danger float-end">
                          {errors.strgthUnit}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="mfgName" class="col-form-label">
                        Manufacture Name :
                      </label>
                    </div>
                    <div className="col-9">
                      <CustomSelect
                        value={values?.mfgName}
                        id="mfgName"
                        name="mfgName"
                        options={[]}
                        onBlur={setFieldTouched}
                        onChange={(choice) => {
                          console.log(choice?.value);
                        }}
                      />
                      {errors.mfgName && touched.mfgName ? (
                        <div className="text-danger float-end">
                          {errors.mfgName}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="clsName" class="col-form-label">
                        Class Name :
                      </label>
                    </div>
                    <div className="col-9">
                      <CustomSelect
                        value={values?.clsName}
                        name="clsName"
                        id="clsName"
                        onBlur={setFieldTouched}
                        options={[]}
                        onChange={(choice) => {
                          console.log(choice?.value);
                        }}
                      />
                      {errors.clsName && touched.clsName ? (
                        <div className="text-danger float-end">
                          {errors.clsName}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mt-1  mb-2">
                    <div className="col-12">
                      <div className="d-flex justify-content-center">
                        <Basicbutton
                          icon={
                            <FontAwesomeIcon
                              icon={faFloppyDisk}
                              className="me-1"
                            />
                          }
                          type="submit"
                          buttonText="Cancel"
                          className="secondary"
                          outlineType={true}
                          disabled={isSubmitting}
                        />
                        <Basicbutton
                          icon={
                            <FontAwesomeIcon
                              icon={faFloppyDisk}
                              className="me-1"
                            />
                          }
                          type="submit"
                          buttonText="Add Asset"
                          className="success"
                          outlineType={true}
                          disabled={isSubmitting}
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

export default AddNewDrug;
