import React from "react";

import BasicModal from "../../../components/modal/basicmodal";
const DrugListModal = ({
  showDrugListModal,
  handleDrugListModal,
  drugList,
}) => {
  return (
    <>
      <BasicModal
        title="Drug List"
        show={showDrugListModal}
        close={() => handleDrugListModal(false)}
        isStatic={false}
        scrollable={true}
        isCenterAlign={true}
        fullScreen={false}
        key="list_role_Activity"
      >
        {drugList &&
          drugList.length > 0 &&
          drugList.map((element, index) => {
            return (
              <>
                <p key={element?.id}>
                  {" "}
                  <span>{index + 1}. </span> {element?.name}
                </p>
              </>
            );
          })}
      </BasicModal>
    </>
  );
};

export default DrugListModal;
