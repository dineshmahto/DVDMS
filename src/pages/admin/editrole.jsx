import React from "react";

const EditRole = () => {
  return (
    <>
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
    </>
  );
};

export default EditRole;
