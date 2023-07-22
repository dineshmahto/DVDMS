import React from "react";
import BasicModal from "../../../components/modal/basicmodal";
const ActivityList = ({
  showActivityModal,
  handleActivityShowModal,
  activityList,
  title,
  colKey,
}) => {
  console.log("activityList", activityList, title, colKey);
  return (
    <>
      <BasicModal
        title={title}
        show={showActivityModal}
        close={() => handleActivityShowModal(false)}
        isStatic={false}
        scrollable={true}
        isCenterAlign={true}
        fullScreen={false}
        key={colKey}
      >
        {activityList &&
          activityList.length > 0 &&
          activityList.map((element, index) => {
            return (
              <p key={element?.id}>
                {" "}
                <span key={index}>{index + 1}. </span> {element[`${colKey}`]}
              </p>
            );
          })}
      </BasicModal>
    </>
  );
};

export default ActivityList;
