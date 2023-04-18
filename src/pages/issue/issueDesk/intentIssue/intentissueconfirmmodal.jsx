import React from "react";
import BasicModal from "../../../../components/modal/basicmodal";
import Basicbutton from "../../../../components/button/basicbutton";
const IntentIssueConfirmModal = ({
  showIssueRejectModal,
  handleIssueRejectModal,
}) => {
  return (
    <>
      <BasicModal
        title="Intent Issue/Reject Confirm"
        show={showIssueRejectModal}
        close={() => handleIssueRejectModal()}
        isStatic={false}
        scrollable={true}
        isCenterAlign={true}
        fullScreen={false}
        key="issue_reject_modal"
        size="md"
      >
        <div className="row">
          <div className="col-12">Are you sure?</div>
        </div>

        <div className="row  mb-2">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <Basicbutton
                type="button"
                buttonText="ISSUE"
                className="primary rounded-0 me-1"
                outlineType={true}
              />

              <Basicbutton
                type="button"
                buttonText="REJECT"
                className="danger rounded-0 me-1"
                outlineType={true}
              />
              <Basicbutton
                type="button"
                buttonText="CANCEL"
                className="secondary rounded-0"
                outlineType={true}
                onClick={handleIssueRejectModal}
              />
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default IntentIssueConfirmModal;
