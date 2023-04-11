import React, { useState } from "react";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateUserform = () => {
  const [createUserData, setCreateUSerData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
  });
  return (
    <>
      <div className="row">
        <div className="col-10 offset-1">
          <div className="row mb-2 align-items-center">
            <div className="col-2">
              <label htmlFor="userId" class="col-form-label">
                User ID:
              </label>
            </div>
            <div className="col-6">
              <BasicInput
                value={createUserData?.userId}
                type="text"
                placeholder="Role Name"
                id="userId"
              />
            </div>
            <div className="col-4">
              <span class="form-text">Between 2 to 50 characters.</span>
            </div>
          </div>
          <div className="row mb-2 align-items-center">
            <div class="col-2">
              <label htmlFor="firstName" class="col-form-label">
                First Name
              </label>
            </div>
            <div class="col-6">
              <BasicInput
                value={createUserData?.firstName}
                type="text"
                placeholder="First Name"
                id="firstName"
              />
            </div>
            <div class="col-4">
              <span class="form-text">Between 2 to 100 characters.</span>
            </div>
          </div>

          <div className="row mb-2 align-items-center">
            <div class="col-2">
              <label htmlFor="lastName" class="col-form-label">
                Last Name
              </label>
            </div>
            <div class="col-6">
              <BasicInput
                value={createUserData?.lastName}
                type="text"
                placeholder="Last Name"
                id="lastName"
              />
            </div>
            <div class="col-4">
              <span class="form-text">Between 2 to 100 characters.</span>
            </div>
          </div>

          <div className="row mb-2 align-items-center">
            <div class="col-2">
              <label htmlFor="email" class="col-form-label">
                Email
              </label>
            </div>
            <div class="col-6">
              <BasicInput
                value={createUserData?.email}
                type="email"
                placeholder="Email"
                id="email"
              />
            </div>
          </div>
          <div className="row mb-2 align-items-center">
            <div class="col-2">
              <label htmlFor="address" className="" class="col-form-label">
                Address
              </label>
            </div>
            <div class="col-6">
              <textarea
                value={createUserData?.address}
                rows="2"
                className="form-control shadow-none"
                cols="50"
              ></textarea>
            </div>
          </div>
          {/* <div className="row mb-2">
            <div className="col-2">
              <label htmlFor="userType" class="col-form-label">
                User Type:
              </label>
            </div>
            <div className="col-6">
              <CustomSelect
                id="userType"
                options={dropDwonRoleList}
                onChange={(choice) => {
                  console.log(choice?.value);
                }}
              />
            </div>
          </div> */}

          <div className="row mb-2">
            <div className="col-2">
              <label htmlFor="city" class="col-form-label">
                City:
              </label>
            </div>
            <div className="col-6">
              <BasicInput
                value={createUserData?.city}
                type="text"
                placeholder="City"
                id="city"
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-2">
              <label htmlFor="storeName" class="col-form-label">
                Store Name:
              </label>
            </div>
            <div className="col-6">
              <CustomSelect
                id="storeName"
                options={dropDownStoreList}
                onChange={(choice) => {
                  console.log(choice?.value);
                }}
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-2">
              <label htmlFor="role" class="col-form-label">
                Role:
              </label>
            </div>
            <div className="col-6">
              <CustomSelect
                id="role"
                options={dropDwonRoleList}
                onChange={(choice) => {
                  console.log(choice?.value);
                }}
              />
            </div>
            <div className="col-4">
              <span class="form-text">
                If Role is not here. Create the Role
              </span>
            </div>
          </div>
          <div className="row  mb-2">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <Basicbutton
                  icon={
                    <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                  }
                  type="button"
                  buttonText="Save"
                  className="primary"
                  outlineType={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUserform;
