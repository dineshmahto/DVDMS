import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";

//import DashBoard from "./pages/dashboard/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import IssueList from "./pages/issues/issueList";
import Issue from "./pages/issues/issue";

import OpenIntentDesk from "./pages/openIntentDesk/intent";

import Notification from "./pages/demand/Notification";
import CentralDemand from "./pages/demand/CentralDemand";

import Pdf from "./pages/Report/Pdf";
import Csv from "./pages/Report/Csv";
import FileUpload from "./pages/Report/FIleUpload";
import Landing from "./pages/screens/Landing";
import Dashboard from "./pages/dashboard/dashboard";
import MasterLayout from "./pages/layouts/MasterLayout";

import StockEntry from "./pages/stock/stockEntry/stockEntry";
import DrugCondemnationRegister from "./pages/stock/drugCondemnation/drugCondemnation";
import ProtectedRoute from "./routes/middleware/ProtectedRoute";
import StockStatus from "./pages/Report/stockReport/StockStatus";
import StockLadger from "./pages/Report/stockReport/stockLadger";

// order management
import ManufacturerList from "./pages/ordermanagement/manufacturerlist/ManufacturerList";
import CentralPurchase from "./pages/ordermanagement/centralpurchase/CentralPurchase";
// End of order management
const OpenNotification = lazy(() => import("./pages/demand/OpenNotification"));
const DemandNotification = lazy(() => import("./pages/demand/Notification"));

const AnnualDemandNotification = lazy(() =>
  import("./pages/demand/annualDemand")
);
const OpenExtendNotification = lazy(() =>
  import("./pages/demand/extendDemandNotification")
);

const CompileDemand = lazy(() => import("./pages/demand/compile"));
// Stock Module
const StockListing = lazy(() =>
  import("./pages/stock/stockListing/stockListing")
);
const AddDrugCondemNation = lazy(() =>
  import("./pages/stock/drugCondemnation/adddrugcondemnation")
);
const UpdateStockRack = lazy(() =>
  import("./pages/stock/updateStockRack/updatestockrack")
);
const AddStockVerification = lazy(() =>
  import("./pages/stock/stockVerification/addstockverification")
);
const StockVerificationDesk = lazy(() =>
  import("./pages/stock/stockVerification/stockverification")
);
// Admin
const RoleDesk = lazy(() => import("./pages/admin/roledesk/roledesk"));
const UserDesk = lazy(() => import("./pages/admin/userdesk/userdesk"));
const ProgrameFundingSource = lazy(() =>
  import("./pages/admin/programefunding/programefundingsource")
);
const StoreTypeDrugMapping = lazy(() =>
  import("./pages/admin/edlmapping/storetypedrugmapping")
);
const BudgetListDesk = lazy(() =>
  import("./pages/admin/budgetinterface/budgetlistdesk")
);
const NewBudgetInterface = lazy(() =>
  import("./pages/admin/budgetinterface/newbudgetinterface")
);

const ProgrameDesk = lazy(() =>
  import("./pages/admin/programedesk/programedesk")
);
const StoreDesk = lazy(() => import("./pages/admin/storedesk/storedesk"));

const FundingDeskList = lazy(() =>
  import("./pages/admin/fundingsource/fundingdesk")
);
const PageNotFound = lazy(() =>
  import("../src/pages/pagenotfound/pageNotFound")
);
const DrugDesk = lazy(() => import("./pages/admin/drugdesk/drugdesk"));
const IssueList = lazy(() => import("./pages/issues/issueListMUI"));

// Issue
const IssueDesk = lazy(() => import("./pages/issue/issueDesk/issuedesk"));
const ReturnDesk = lazy(() => import("./pages/issue/returnDesk/returndesk"));
const IssueToThirdParty = lazy(() =>
  import("./pages/issue/issueDesk/issueToThirdParty/issuetothirdparty")
);
const IntentDetails = lazy(() =>
  import("./pages/issue/issueDesk/intentIssue/intentissue")
);
const IssueToCamp = lazy(() =>
  import("./pages/issue/issueDesk/campIssue/issuetocamp")
);
const OffineIssue = lazy(() =>
  import("./pages/issue/issueDesk/offlineIssue/offlineIssue")
);
const ThirdPartyReturn = lazy(() =>
  import("./pages/issue/returnDesk/thirdPartyReturn/thirdpartyreturn")
);
const SubStoreReturn = lazy(() =>
  import("./pages/issue/returnDesk/subStoreReturn/substorereturn")
);
const MiscellaneousConsumption = lazy(() =>
  import("./pages/issue/miscellaneous/stockconsumptionList")
);

const OpenIssueIntent = lazy(() =>
  import("./pages/issue/issueDesk/intentIssue/openissueintent")
);
// End of Issue
const AddMisscellaneousConsumption = lazy(() =>
  import("./pages/issue/miscellaneous/addmiscellanousConsumption")
);
// Order Management
const PurchaseOrderList = lazy(() =>
  import("./pages/ordermanagement/purchaseorderlist/purchaseorderlist")
);
const SupplierList = lazy(() =>
  import("./pages/ordermanagement/supplierlist/supplierlist")
);
const RateContractList = lazy(() =>
  import("./pages/ordermanagement/ratecontract/ratecontractdesk")
);

const ApprovalDeskList = lazy(() =>
  import("./pages/ordermanagement/approvals/annualdemand/annulademand")
);
const OpenDemandApprovalForm = lazy(() =>
  import(
    "./pages/ordermanagement/approvals/annualdemand/openDemandApprovalForm"
  )
);
const ApprovalPurchaseOrderList = lazy(() =>
  import("./pages/ordermanagement/approvals/purchaseorder/purchaseorder")
);
const ApprovalIntentApprovalList = lazy(() =>
  import("./pages/ordermanagement/approvals/intentapproval/intentapproval")
);
const ApprovalTransferList = lazy(() =>
  import("./pages/ordermanagement/approvals/transferapproval/transferapproval")
);
const ApprovalTransferListHq = lazy(() =>
  import(
    "./pages/ordermanagement/approvals/transferapprovalhq/transferapprovalhq"
  )
);

const AddNewRateContract = lazy(() =>
  import("./pages/ordermanagement/ratecontract/newRateContract")
);
const RenewRateContract = lazy(() =>
  import("./pages/ordermanagement/ratecontract/renewRateContract")
);
const OpenNotificationDetails = lazy(() =>
  import("./pages/ordermanagement/centralpurchase/createPo")
);
const GeneratePurchaseOrder = lazy(() =>
  import("./pages/ordermanagement/centralpurchase/generatePurchaseOrder")
);
const LocalPoForm = lazy(() =>
  import("./pages/ordermanagement/localpurchase/createPo")
);
// end of Order Management

//Requistion Module Import
const IntentDrug = lazy(() =>
  import("./pages/requisition/intentDrugs/intentdrug")
);
const TransferList = lazy(() =>
  import("./pages/requisition/transferList/transferlist")
);
// end of Requistion module

// Receiving Module
const ChallanList = lazy(() =>
  import("./pages/receiving/challanlist/challanlist")
);
const ReceivedDrug = lazy(() =>
  import("./pages/receiving/receiveofdrugs/receiveofdrug")
);
const ReceivePoChallan = lazy(() =>
  import("./pages/receiving/receivepochallan/receivepochallan")
);
const ReceiveChallanForm = lazy(() =>
  import("./pages/receiving/receivepochallan/receivechallan")
);
const DispatchForm = lazy(() => import("./pages/supplier/dispatchdesk"));
// End of Receiving
// Supplier
const SupplierPoApporovedList = lazy(() =>
  import("./pages/supplier/supplierList")
);
const AcceptanceForm = lazy(() => import("./pages/supplier/acceptanceForm"));
const DynamicRow = lazy(() => import("./pages/stock/stockEntry/stock"));
function App() {
  return (
    <div className="dvdms-root">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="" element={<MasterLayout />}>
            <Route
              element={
                <ProtectedRoute
                  totalActivity={[
                    {
                      id: 1,
                    },
                    {
                      id: 2,
                    },
                    {
                      id: 3,
                    },
                    {
                      id: 4,
                    },
                    {
                      id: 6,
                    },
                    {
                      id: 7,
                    },
                    {
                      id: 11,
                    },
                    {
                      id: 12,
                    },
                    {
                      id: 13,
                    },
                    {
                      id: 14,
                    },
                    {
                      id: 50,
                    },
                    {
                      id: 58,
                    },
                    {
                      id: 62,
                    },
                    {
                      id: 63,
                    },
                    {
                      id: 64,
                    },
                    {
                      id: 67,
                    },
                    {
                      id: 68,
                    },
                    {
                      id: 71,
                    },
                    {
                      id: 72,
                    },
                    {
                      id: 73,
                    },
                    {
                      id: 74,
                    },
                    {
                      id: 82,
                    },
                    {
                      id: 85,
                    },
                    {
                      id: 95,
                    },
                    {
                      id: 101,
                    },
                    {
                      id: 102,
                    },
                    {
                      id: 103,
                    },
                    {
                      id: 104,
                    },
                    {
                      id: 105,
                    },
                    {
                      id: 106,
                    },
                    {
                      id: 121,
                    },
                    {
                      id: 122,
                    },
                    {
                      id: 123,
                    },
                    {
                      id: 131,
                    },
                    {
                      id: 132,
                    },
                    {
                      id: 134,
                    },
                    {
                      id: 140,
                    },
                    {
                      id: 141,
                    },
                    {
                      id: 142,
                    },
                    {
                      id: 150,
                    },
                    {
                      id: 151,
                    },
                    {
                      id: 152,
                    },
                    {
                      id: 153,
                    },
                    {
                      id: 154,
                    },
                    {
                      id: 161,
                    },
                    {
                      id: 171,
                    },
                    {
                      id: 172,
                    },
                    {
                      id: 173,
                    },
                    {
                      id: 201,
                    },
                    {
                      id: 59,
                    },
                    {
                      id: 81,
                    },
                    {
                      id: 999,
                    },
                    {
                      id: 202,
                    },
                    {
                      id: 203,
                    },
                  ]}
                  activityList={[
                    {
                      id: 1,
                    },
                    {
                      id: 2,
                    },
                    {
                      id: 3,
                    },
                    {
                      id: 4,
                    },
                    {
                      id: 6,
                    },
                    {
                      id: 7,
                    },
                    {
                      id: 11,
                    },
                    {
                      id: 12,
                    },
                    {
                      id: 13,
                    },
                    {
                      id: 14,
                    },
                    {
                      id: 50,
                    },
                    {
                      id: 58,
                    },
                    {
                      id: 62,
                    },
                    {
                      id: 63,
                    },
                    {
                      id: 64,
                    },
                    {
                      id: 67,
                    },
                    {
                      id: 68,
                    },
                    {
                      id: 71,
                    },
                    {
                      id: 72,
                    },
                    {
                      id: 73,
                    },
                    {
                      id: 74,
                    },
                    {
                      id: 82,
                    },
                    {
                      id: 85,
                    },
                    {
                      id: 95,
                    },
                    {
                      id: 101,
                    },
                    {
                      id: 102,
                    },
                    {
                      id: 103,
                    },
                    {
                      id: 104,
                    },
                    {
                      id: 105,
                    },
                    {
                      id: 106,
                    },
                    {
                      id: 121,
                    },
                    {
                      id: 122,
                    },
                    {
                      id: 123,
                    },
                    {
                      id: 131,
                    },
                    {
                      id: 132,
                    },
                    {
                      id: 134,
                    },
                    {
                      id: 140,
                    },
                    {
                      id: 141,
                    },
                    {
                      id: 142,
                    },
                    {
                      id: 150,
                    },
                    {
                      id: 151,
                    },
                    {
                      id: 152,
                    },
                    {
                      id: 153,
                    },
                    {
                      id: 154,
                    },
                    {
                      id: 161,
                    },
                    {
                      id: 171,
                    },
                    {
                      id: 172,
                    },
                    {
                      id: 173,
                    },
                    {
                      id: 201,
                    },
                    {
                      id: 59,
                    },
                    {
                      id: 81,
                    },
                    {
                      id: 999,
                    },
                    {
                      id: 202,
                    },
                    {
                      id: 203,
                    },
                  ]}
                  isAllowed={true}
                />
              }
            >
              {/* admin */}
              <Route path="listrole" element={<RoleDesk />} />
              <Route path="listuser" element={<UserDesk />} />
              <Route
                path="openProgramFundingInterface"
                element={<ProgrameFundingSource />}
              />
              <Route
                path="storetypedrugmapping"
                element={<StoreTypeDrugMapping />}
              />
              <Route
                path="openBudgetListingInterface"
                element={<BudgetListDesk />}
              />
              <Route
                path="openBudgetInterface"
                element={<NewBudgetInterface />}
              />
              <Route path="openFundingList" element={<FundingDeskList />} />
              <Route path="listDrug" element={<DrugDesk />} />
              <Route path="programpage" element={<ProgrameDesk />} />
              <Route path="listStore" element={<StoreDesk />} />
              {/* admin */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="annualdemand" element={<Notification />} />
              {/* Stock */}
              <Route path="stocklisting" element={<StockListing />} />
              <Route path="openstockentry" element={<DynamicRow />} />
              <Route
                path="openVerificationDesk"
                element={<AddDrugCondemNation />}
              />
              <Route
                path="openCondeminationRegister"
                element={<DrugCondemnationRegister />}
              />
              <Route path="updateStockRackDesk" element={<UpdateStockRack />} />
              <Route
                path="openStockVerification"
                element={<AddStockVerification />}
              />
              <Route
                path="openStockVerificationDeck"
                element={<StockVerificationDesk />}
              />
              {/* End of Stock */}

              {/* Demand */}
              <Route
                path="openNotificationDesk"
                element={<DemandNotification />}
              />

              <Route
                path="generateAnnualDemand"
                element={<AnnualDemandNotification />}
              />

              <Route path="openAnnualCompileForm" element={<CompileDemand />} />
              {/* End of Demand */}
              {/* Issue */}
              <Route path="issuess" element={<Issue />} />
              <Route path="openIssueDesk" element={<IssueDesk />} />
              <Route path="openReturnDesk" element={<ReturnDesk />} />
              <Route
                path="openIssueToThirdparty"
                element={<IssueToThirdParty />}
              />
              <Route path="issueList" element={<IssueList />} />
              <Route path="openIssueToSubstore" element={<IntentDetails />} />
              <Route path="openIssueToCamp" element={<IssueToCamp />} />
              <Route path="openOfflineIssue" element={<OffineIssue />} />

              <Route
                path="openExtendNotificationForm"
                element={<OpenExtendNotification />}
              />
              <Route
                path="openReturnFromThirdparty"
                element={<ThirdPartyReturn />}
              />
              <Route path="openOfflineReturn" element={<SubStoreReturn />} />
              <Route
                path="openStockForMisConsumptionDesk"
                element={<MiscellaneousConsumption />}
              />
              <Route
                path="openStockForMisConsumption"
                element={<AddMisscellaneousConsumption />}
              />
              <Route path="openIssueIndent" element={<OpenIssueIntent />} />
              {/* End of Issue */}
              {/* Order Management Module */}
              <Route
                path="openPurchaseOrderList"
                element={<PurchaseOrderList />}
              />
              <Route path="supplierpage" element={<SupplierList />} />
              <Route
                path="openRateContractListing"
                element={<RateContractList />}
              />
              <Route path="openDemandApproval" element={<ApprovalDeskList />} />
              <Route
                path="openPurchaseOrderForApprovalList"
                element={<ApprovalPurchaseOrderList />}
              />
              <Route
                path="openApprovalDesk"
                element={<ApprovalIntentApprovalList />}
              />
              <Route
                path="openDemandApprovalForm"
                element={<OpenDemandApprovalForm />}
              />
              <Route
                path="openTransferApprovalDesk"
                element={<ApprovalTransferList />}
              />
              <Route
                path="openTransferManagerforHQ"
                element={<ApprovalTransferListHq />}
              />
              <Route path="openCentralPurchase" element={<CentralPurchase />} />
              <Route path="manufecturingList" element={<ManufacturerList />} />
              <Route
                path="openAddRateContract"
                element={<AddNewRateContract />}
              />
              <Route path="openRateContract" element={<RenewRateContract />} />
              <Route
                path="openNotificationDetails"
                element={<OpenNotificationDetails />}
              />
              <Route
                path="generatePurchaseOrder"
                element={<GeneratePurchaseOrder />}
              />
              <Route path="openLocalPOForm" element={<LocalPoForm />} />
              {/* End of Order Management Module */}
              {/* Requition Module */}
              <Route path="openIndentDesk" element={<IntentDrug />} />
              <Route path="transferList" element={<TransferList />} />
              {/* End of Requistion Module */}
              {/* Reveiving Module */}
              <Route path="openChallanDesk" element={<ChallanList />} />
              <Route path="openIndentReceiveDesk" element={<ReceivedDrug />} />
              <Route
                path="updateChallanStatus"
                element={<ReceivePoChallan />}
              />
              <Route
                path="receiveChallanForm"
                element={<ReceiveChallanForm />}
              />
              {/* End of Receiving Module */}

              {/* start of Supplier module */}
              <Route
                path="supplierInterface"
                element={<SupplierPoApporovedList />}
              />
              <Route path="openAcceptanceForm" element={<AcceptanceForm />} />
              <Route path="openDispatchForm" element={<DispatchForm />} />
              {/* End of Supplier */}
              <Route path="intent" element={<OpenIntentDesk />} />
              <Route path="pdf" element={<Pdf />} />
              <Route path="csv" element={<Csv />} />
              {/* Report */}
              <Route path="stockledger" element={<StockLadger />} />
              <Route path="stockstatus" element={<StockStatus />} />
              {/* <Route path="stockexpirereport" element={<StockExpiry />} />
              <Route path="stockzeroreport" element={<StockZeroReport />} />
              <Route
                path="stockstatuspgmwise"
                element={<StockStatusProgramwise />}
              /> */}
              {/* End of Report */}
              <Route path="openNotification" element={<OpenNotification />} />
              {/* <Route path="programmeList" element={<ProgramList />} /> */}

              <Route path="stock" element={<DynamicRow />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Provider>

      <ToastContainer newestOnTop={true} />
    </div>
  );
}

export default App;
