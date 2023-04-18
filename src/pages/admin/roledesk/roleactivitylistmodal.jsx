import React from "react";
import BasicModal from "../../../components/modal/basicmodal";
const RoleActivityListModal = ({
  showActivityModal,
  handleActivityShowModal,
  activityList,
}) => {
  return (
    <>
      <BasicModal
        title="List of Activities"
        show={showActivityModal}
        close={() => handleActivityShowModal(false)}
        isStatic={false}
        scrollable={true}
        isCenterAlign={true}
        fullScreen={false}
        key="list_role_Activity"
      >
        {activityList &&
          activityList.length > 0 &&
          activityList.map((element, index) => {
            return (
              <>
                <p key={index}>
                  {" "}
                  <span>{index + 1}. </span> {element?.activityName}
                </p>
              </>
            );
          })}
      </BasicModal>
    </>
  );
};

export default RoleActivityListModal;
