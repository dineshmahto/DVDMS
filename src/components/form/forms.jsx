import { Form, Formik, Field } from "formik";
import CustomSelect from "../select/customSelect";
import CustDatepicker from "../datepicker/custDatepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import Basicbutton from "../button/basicbutton";
import RadioCheckBox from "../switch/radiocheckbox";
const FormikDynamic = ({
  initialValues,
  validationSchema,
  inputs,
  handleSubmit,
  buttonText,
}) => {
  return (
    <Formik
      validateOnMount
      {...{ initialValues, validationSchema }}
      onSubmit={(values) => {
        handleSubmit(values);
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
        <Form noValidate>
          <div className="row">
            <div className="col-10 offset-1">
              {inputs.map(({ name, type, value, label, ...props }) => {
                switch (type) {
                  case "select":
                    return (
                      <>
                        <div className="row mb-2">
                          <div className="col-3">
                            <label htmlFor={name} class="col-form-label">
                              {label}
                            </label>
                          </div>
                          <div className="col-6">
                            <CustomSelect
                              id={name}
                              key={name}
                              name={name}
                              defaultValue={values[`${name}`]}
                              value={
                                props?.option &&
                                props?.option?.find(
                                  (c) => c.value === values[`${name}`]
                                )
                              }
                              onChange={(val) => {
                                setFieldValue(name, val.value);
                              }}
                              options={
                                props?.option && props?.option?.length > 0
                                  ? props?.option
                                  : []
                              }
                              onBlur={setFieldTouched}
                            />
                          </div>
                          <div className="col-3">
                            {errors.name && touched.name ? (
                              <div className="text-danger float-end">
                                {errors.name}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </>
                    );
                  case "radio":
                    return (
                      <>
                        <div className="row mb-2">
                          <div className="col-3">
                            <label htmlFor={name} class="col-form-label">
                              {label} :
                            </label>
                          </div>
                          <div className="col-6">
                            <RadioCheckBox
                              list={[
                                {
                                  id: `${name}1`,
                                  labelText: "Yes",
                                  value: "1",
                                  name: name,
                                  checked: values[`${name}`],
                                },
                                {
                                  id: `${name}2`,
                                  labelText: "No",
                                  value: "0",
                                  name: name,
                                  checked: values[`${name}`],
                                },
                              ]}
                              onChange={(e) => {
                                console.log("val", e);
                                setFieldValue(name, e.target?.value);
                              }}
                            />
                            <div className="col-3">
                              {errors.name && touched.name ? (
                                <div className="text-danger float-end">
                                  {errors.name}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    );

                  case "date":
                    return (
                      <>
                        <div className="row mb-2">
                          <div className="col-3">
                            <label htmlFor={name} class="col-form-label">
                              {label} :
                            </label>
                          </div>
                          <div className="col-6">
                            <CustDatepicker
                              value={values[`${name}`]}
                              name={name}
                              inputFormat={
                                props?.format ? props?.format : "DD/MM/YYYY"
                              }
                              // disablePast={name === "endDate" ? true : false}
                              onChange={(newValue) => {
                                setFieldValue(name, newValue);
                              }}
                            />
                          </div>
                        </div>
                      </>
                    );

                  default:
                    return (
                      <>
                        <div className="row mb-2">
                          <div className="col-3">
                            <label htmlFor={name} className="col-form-label">
                              {label}
                            </label>
                          </div>
                          <div className="col-6">
                            <Field
                              className="form-control shadow-none"
                              value={values[`${name}`]}
                              type={type}
                              id={name}
                              name={name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder={props?.placeholder}
                            />
                          </div>
                          <div className="col-3">
                            {errors?.name && touched?.name ? (
                              <div className="text-danger float-end">
                                {errors?.name}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </>
                    );
                }
              })}

              <div className="row mt-1  mb-2">
                <div className="col-12">
                  <div className="d-flex justify-content-center">
                    <Basicbutton
                      icon={<FontAwesomeIcon icon={faXmark} className="me-1" />}
                      type="button"
                      buttonText="Cancel"
                      className="danger rounded-0"
                      outlineType={true}
                    />
                    <Basicbutton
                      icon={
                        <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                      }
                      type="submit"
                      buttonText={buttonText}
                      className="success rounded-0 ms-2"
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
  );
};

export default FormikDynamic;
