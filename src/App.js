import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/home";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";

//import DashBoard from "./pages/dashboard/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgramList from "./pages/program/programlist/programlist";
import Programme from "./pages/program/programme";
import IssueList from "./pages/issues/issueList";
import Issue from "./pages/issues/issue";
import TransferComponent from "./pages/drugList/transferComponent";
import Test from "./pages/drugList/test";
import OpenIntentDesk from "./pages/openIntentDesk/intent";

import Notification from "./pages/demand/Notification";
import CentralDemand from "./pages/demand/CentralDemand";
import PurchaseOrderList from "./pages/demand/PurchaseOrderList";
import OpenNotification from "./pages/demand/OpenNotification";
import Pdf from "./pages/Report/Pdf";
import Csv from "./pages/Report/Csv";
import FileUpload from "./pages/Report/FIleUpload";
import Landing from "./pages/screens/Landing";
import Dashboard from "./pages/dashboard/dashboard";
import MasterLayout from "./pages/layouts/MasterLayout";
import DemandNotification from "./pages/demand/Notification";
// Stock Module
import StockListing from "./pages/stock/stockListing";
import StockEntry from "./pages/stock/stockEntry";
import DrugCondemnationRegister from "./pages/stock/drugCondemnation";
// Admin
import RoleDesk from "./pages/admin/roledesk";
import UserDesk from "./pages/admin/userdesk";
import ProtectedRoute from "./routes/middleware/ProtectedRoute";
import PageNotFound from "./pages/pagenotfound/pageNotFound";
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
              {/* admin */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="annualdemand" element={<Notification />} />
              <Route path="stocklisting" element={<StockListing />} />
              <Route path="openstockentry" element={<StockEntry />} />
              <Route
                path="openCondeminationRegister"
                element={<DrugCondemnationRegister />}
              />
              <Route
                path="demandnotification"
                element={<DemandNotification />}
              />
              <Route path="purchaseorderlist" element={<PurchaseOrderList />} />
              <Route path="intent" element={<OpenIntentDesk />} />
              <Route path="pdf" element={<Pdf />} />
              <Route path="csv" element={<Csv />} />
              <Route path="openNotification" element={<OpenNotification />} />
              <Route path="programmeList" element={<ProgramList />} />
              <Route path="TransferComponent" element={<TransferComponent />} />
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
