import React, {useMemo} from 'react'
import BasicModal from '../../../components/modal/basicmodal';
const UserActivityListModal = ({
  showActivityModal,
  handleCloseActivityListModal,
  activityList,
}) => {
  return (
    <>
      <BasicModal
        title="List of Activities"
        show={showActivityModal}
        close={() => handleCloseActivityListModal()}
        isStatic={false}
        scrollable={true}
        isCenterAlign={true}
        fullScreen={false}
        key="list_Activity"
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

export default UserActivityListModal;