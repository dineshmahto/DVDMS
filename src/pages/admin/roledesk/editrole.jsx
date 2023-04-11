import React, { useState } from "react";
import BasicModal from "../../../components/modal/basicmodal";
import TransferComponent from "../../../components/transfer/transferComponent";
const EditRole = ({
  data,
  handleRightListItemClick,
  handleLeftListItemClick,
}) => {
  return (
    <>
      <BasicModal
        title="Edit Role"
        show={show}
        close={() => setShowEditModal(false)}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="create_role"
      >
        <div className="row m-1">
          <TransferComponent
            apiData={data}
            activeIndicies={activeIndicies}
            handleMoveSelectedItemToLeft={() => {
              handleMoveSelectedItemToLeft(
                selectItemActiveIndices,
                rightTempArray,
                setFirstClick,
                selectedItem,
                setSelectedItemActiveIndices,
                tempArray,
                setTempArray,
                data,
                setData,
                setSelectedItem,
                setRightTempArray,
                setActiveIndicies,
                activeIndicies,
                copyData
              );
            }}
            handleMoveSelectedItemToRight={() => {
              handleMoveSelectedItemToRight(
                tempArray,
                setFirstClick,
                copyData,
                setSelectedItemActiveIndices,
                setRightTempArray,
                setActiveIndicies,
                activeIndicies,
                setSelectedItem,
                setData
              );
            }}
            handleShiftAllElementToRight={() => {
              handleShiftAllElementToRight(
                copyData,
                setFirstClick,
                setSelectedItemActiveIndices,
                setSelectedItem,
                setRightTempArray,
                setTempArray,
                setData
              );
            }}
            handleShiftAllElementToLeft={() => {
              handleShiftAllElementToLeft(
                copyData,
                setSelectedItemActiveIndices,
                setData,
                setRightTempArray,
                setTempArray,
                setSelectedItem,
                setActiveIndicies,
                activeIndicies
              );
            }}
            handleLeftListItemClick={handleLeftListItemClick}
            handleRightListItemClick={handleRightListItemClick}
            selectedItem={selectedItem}
            selectItemActiveIndices={selectItemActiveIndices}
          />
        </div>
        <div className="row mt-1  mb-2">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <Basicbutton
                icon={<FontAwesomeIcon icon={faFloppyDisk} className="me-1" />}
                type="button"
                buttonText="Save"
                className="primary"
                outlineType={true}
              />
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default EditRole;
