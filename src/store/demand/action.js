import {
  CANCEL_NOTIFICATION,
  CANCEL_NOTIFICATION_RESPONSE,
  FREEZE_NOTIFICATION,
  FREEZE_NOTIFICATION_RESPONSE,
  GET_ALL_OPEN_NOTIFICATION_LIST,
  GET_ALL_OPEN_NOTIFICATION_LIST_RESPONSE,
  GET_ANNUAL_DEMAND_NOTIFICATION,
  GET_ANNUAL_DEMAND_NOTIFICATION_RESPONSE,
  GET_COMPILE_DEMAND,
  GET_COMPILE_DEMAND_REPONSE,
  GET_DRUG_BY_PROGRAMME_ID,
  GET_DRUG_BY_PROGRAMME_ID_RESPONSE,
  GET_NOTIFICATION_LIST,
  GET_NOTIFICATION_LIST_RESPONSE,
  SAVE_COMPILE_DEMAND,
  SAVE_COMPILE_DEMAND_RESPONSE,
  SAVE_DEMAND_NOTIFICATION,
  SAVE_DEMAND_NOTIFICATION_RESPONSE,
  SAVE_GENERATE_ANNUAL_DEMAND,
  SAVE_GENERATE_ANNUAL_DEMAND_RESPONSE,
  UPDATE_NOTIFICATION,
  UPDATE_NOTIFICATION_RESPONSE,
} from "./actionTypes";

export const getNotificationList = (pageDetails) => {
  return {
    type: GET_NOTIFICATION_LIST,
    payload: pageDetails,
  };
};

export const getNotificationListResponse = (notificationListResposne) => {
  return {
    type: GET_NOTIFICATION_LIST_RESPONSE,
    payload: notificationListResposne,
  };
};

export const getAllOpenNotification = (pageDetails) => {
  return {
    type: GET_ALL_OPEN_NOTIFICATION_LIST,
    payload: pageDetails,
  };
};
export const getAllOpenNotificationResponse = (allOpenNotificationResponse) => {
  return {
    type: GET_ALL_OPEN_NOTIFICATION_LIST_RESPONSE,
    payload: allOpenNotificationResponse,
  };
};

export const getDrugListByProgramId = (programId) => {
  return {
    type: GET_DRUG_BY_PROGRAMME_ID,
    payload: programId,
  };
};
export const getDrugListByProgramIdResponse = (drugListByProgramIdResponse) => {
  return {
    type: GET_DRUG_BY_PROGRAMME_ID_RESPONSE,
    payload: drugListByProgramIdResponse,
  };
};

export const saveDemandNotification = (demandDetails) => {
  return {
    type: SAVE_DEMAND_NOTIFICATION,
    payload: demandDetails,
  };
};
export const saveDemandNotificationResponse = (
  saveDemandNotificationResponse
) => {
  return {
    type: SAVE_DEMAND_NOTIFICATION_RESPONSE,
    payload: saveDemandNotificationResponse,
  };
};

export const cancelNotification = (notificationId) => {
  console.log("notificationId", notificationId);
  return {
    type: CANCEL_NOTIFICATION,
    payload: notificationId,
  };
};

export const cancelNotificationResponse = (cancelNotificationResponse) => {
  return {
    type: CANCEL_NOTIFICATION_RESPONSE,
    payload: cancelNotificationResponse,
  };
};

export const updateNotification = (updateDetails) => {
  return {
    type: UPDATE_NOTIFICATION,
    payload: updateDetails,
  };
};

export const updateNotificationResponse = (updateNotificationResponse) => {
  return {
    type: UPDATE_NOTIFICATION_RESPONSE,
    payload: updateNotificationResponse,
  };
};

export const getAnnualDemandNotification = (notificationId) => {
  return {
    type: GET_ANNUAL_DEMAND_NOTIFICATION,
    payload: notificationId,
  };
};

export const getAnnualDemandNotificationResp = (annualDemandNotResp) => {
  return {
    type: GET_ANNUAL_DEMAND_NOTIFICATION_RESPONSE,
    payload: annualDemandNotResp,
  };
};

export const saveGenerateAnnualDemand = (saveAnnualDemdDetails) => {
  return {
    type: SAVE_GENERATE_ANNUAL_DEMAND,
    payload: saveAnnualDemdDetails,
  };
};

export const saveGenerateAnnualDemandResp = (saveAnnualDemdResp) => {
  return {
    type: SAVE_GENERATE_ANNUAL_DEMAND_RESPONSE,
    payload: saveAnnualDemdResp,
  };
};

export const getCompileDemand = (notificationId) => {
  return {
    type: GET_COMPILE_DEMAND,
    payload: notificationId,
  };
};

export const getCompileDemandResp = (compileDemandResp) => {
  return {
    type: GET_COMPILE_DEMAND_REPONSE,
    payload: compileDemandResp,
  };
};

export const saveCompileDemand = (saveCompileDmdDetails) => {
  return {
    type: SAVE_COMPILE_DEMAND,
    payload: saveCompileDmdDetails,
  };
};

export const saveCompileDemandResp = (saveCompileDemdResp) => {
  return {
    type: SAVE_COMPILE_DEMAND_RESPONSE,
    payload: saveCompileDemdResp,
  };
};

export const freezeNotification = (notificationId) => {
  return {
    type: FREEZE_NOTIFICATION,
    payload: notificationId,
  };
};

export const freezeNotificationResponse = (freezeNotResp) => {
  return {
    type: FREEZE_NOTIFICATION_RESPONSE,
    payload: freezeNotResp,
  };
};
