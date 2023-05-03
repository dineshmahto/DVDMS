import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";

//import DashBoard from "./pages/dashboard/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import IssueList from "./pages/issues/issueList";
import Issue from "./pages/issues/issue";
import TransferComponent from "./pages/drugList/transferComponent";

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
const OpenNotification = lazy(() => import("./pages/demand/OpenNotification"));
const DemandNotification = lazy(() => import("./pages/demand/Notification"));
const OpenExtendNotification = lazy(() =>
  import("./pages/demand/extendDemandNotification")
);

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
// End of Issue

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

const Test = lazy(() => import("./pages/drugList/test"));
const DynamicRow = lazy(() => import("./pages/stock/stockEntry/stock"));
function App() {
  return (
    <div className="dvdms-root">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="" element={<MasterLayout />}>
            <Route element={<ProtectedRoute isAllowed={true} />}>
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
              {/* End of Stock */}
              {/* Issue */}
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
                path="openNotificationDesk"
                element={<DemandNotification />}
              />

              <Route
                path="openExtendNotificationForm"
                element={<OpenExtendNotification />}
              />

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
                path="openTransferApprovalDesk"
                element={<ApprovalTransferList />}
              />
              <Route
                path="openTransferManagerforHQ"
                element={<ApprovalTransferListHq />}
              />
              {/* End of Order Management Module */}

              <Route path="intent" element={<OpenIntentDesk />} />
              <Route path="pdf" element={<Pdf />} />
              <Route path="csv" element={<Csv />} />
              <Route path="openNotification" element={<OpenNotification />} />
              {/* <Route path="programmeList" element={<ProgramList />} /> */}
              <Route path="TransferComponent" element={<TransferComponent />} />

              <Route path="test" element={<Test />} />
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
