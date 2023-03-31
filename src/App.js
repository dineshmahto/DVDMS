import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import Dash from "./pages/dashboard/dash";
import DashBoard from "./pages/dashboard/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgramList from "./pages/program/programlist/programlist";
import Programme from "./pages/program/programme";
import IssueList from "./pages/issues/issueList";
import Issue from "./pages/issues/issue";
import TransferComponent from "./pages/drugList/transferComponent";
import Test from "./pages/drugList/test";
import OpenIntentDesk from "./pages/openIntentDesk/intent";
import StockEntry from "./pages/stockEntryDesk/stockEntry";
import Notification from "./pages/demand/Notification";
import CentralDemand from "./pages/demand/CentralDemand";
import PurchaseOrderList from "./pages/demand/PurchaseOrderList";
import OpenNotification from "./pages/demand/OpenNotification";
import Pdf from "./pages/Report/Pdf";
import Csv from "./pages/Report/Csv";
import FileUpload from "./pages/Report/FIleUpload";
import Landing from "./pages/screens/Landing";
import Dashboard from "./dashboard/pages/Dashboard";
import MasterLayout from "./dashboard/components/layouts/MasterLayout";
import Annualdemand from "./dashboard/pages/demand/AnnualDemand";
import DemandNotification from "./dashboard/pages/demand/DemandNotification";
//test
function App() {
  return (
    <div className="dvdms-root">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="" element={<MasterLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="annualdemand" element={<Annualdemand />} />
            <Route path="demandnotification" element={<DemandNotification />} />
            <Route path="purchaseorderlist" element={<PurchaseOrderList />} />
            <Route path="intent" element={<OpenIntentDesk />} />
            <Route path="pdf" element={<Pdf />} />
            <Route path="csv" element={<Csv />} />
            <Route path="openNotification" element={<OpenNotification />} />
            <Route path="programmeList" element={<ProgramList />} />
          </Route>
        </Routes>
      </Provider>
      //Dinesh
      <ToastContainer newestOnTop={true} />
    </div>
  );
}

export default App;
