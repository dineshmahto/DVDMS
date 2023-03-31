import moment from "moment";
import { Component } from "react";
import GenericButton from "../../../components/button/GenericButton";
import DataTable from "../../../components/tables/datatable/datatable";
import programlistservice from "../../../services/programservice/programlistservice";

class ProgramList extends Component {
  state = {
    dataCall: false,
    tableDataLoading: false,
    tableHeader: [],
    tableData: [],
    totalData: 0,
    currentPage: 1,
    pageSize: 10,
  };

  /*constructor(props) {
    super(props);
  }*/

  componentDidMount() {
    if (!this.state.dataCall) {
      let copyData = { ...this.state };
      copyData.dataCall = true;
      copyData.tableDataLoading = true;
      this.setState(copyData);
      this.tableHeaderSetup();
      //this.callApi();
    }
  }
  componentDidUpdate() {
    if (!this.state.dataCall) {
      let copyData = { ...this.state };
      copyData.dataCall = true;
      copyData.tableDataLoading = true;
      this.setState(copyData);
      this.callApi();
    }
  }

  async callApi() {
    //let loginResp = await programlistservice("programme/programmeList", {
    await programlistservice("programme/programmeList", {
      pageNumber: this.state.currentPage,
      pageSize: this.state.pageSize,
    })
      .then((r) => {
        //console.log("API DATA", loginResp.data.content.length);
        let copydata = { ...this.state };
        let tableDataApi = r.data.data.content;

        tableDataApi.map((data, key) => {
          tableDataApi[key].startDate = moment(
            tableDataApi[key].startDate
          ).format("DD-MM-YYYY");
          tableDataApi[key].endDate = moment(tableDataApi[key].endDate).format(
            "DD-MM-YYYY"
          );
          return (tableDataApi[key].action = (
            <div className="gap-2">
              <GenericButton.EditLinkButton text="Edit" navLink="edit/2" />
              ||
              <GenericButton.DeleteLinkButton text="Delete" />
              {/* <BasicButton
                className="btn btn-warning btn-sm me-md-2"
                text="Edit"
              />
              <BasicButton className="btn btn-danger btn-sm" text="Cancel" /> */}
            </div>
          ));
        });
        copydata.tableData = tableDataApi;
        copydata.totalData = r.data.data.totalElements;
        copydata.tableDataLoading = false;
        this.setState(copydata);
      })
      .catch((e) => {
        let copydata = { ...this.state };
        copydata.tableDataLoading = false;
        this.setState(copydata);
      });
  }

  tableHeaderSetup() {
    const tableHeader = [
      {
        id: "programmeCode",
        name: "Programme Code",
        sort: true,
        order_asc: true,
      },
      {
        id: "programmeName",
        name: "Programme Name",
        sort: true,
        order_asc: true,
      },
      {
        id: "remarks",
        name: "Remarks",
        sort: false,
      },
      {
        id: "startDate",
        name: "Start Date",
        sort: true,
        order_asc: true,
      },
      {
        id: "endDate",
        name: "End Date",
        sort: false,
      },
      {
        id: "id",
        name: "Id",
        sort: true,
        order_asc: true,
      },
      {
        id: "action",
        name: "Action",
        sort: false,
      },
    ];

    let copydata = { ...this.state };
    copydata.tableHeader = tableHeader;
    this.setState(copydata);
  }

  changePage(e) {
    let copyData = { ...this.state };
    copyData.currentPage = e;
    copyData.dataCall = false;
    this.setState(copyData);
    //this.callApi();
  }

  changePageLength(e) {
    let copyData = { ...this.state };
    copyData.pageSize = e.target.value;
    copyData.dataCall = false;
    this.setState(copyData);
    //this.callApi();
  }

  changeOrderHandler(colNo) {
    let copyData = { ...this.state };
    copyData.tableHeader[colNo].order_asc =
      !copyData.tableHeader[colNo].order_asc;
    copyData.tableData.sort((d1, d2) =>
      copyData.tableHeader[colNo].order_asc
        ? d1[copyData.tableHeader[colNo].id] >
          d2[copyData.tableHeader[colNo].id]
          ? 1
          : d1[copyData.tableHeader[colNo].id] <
            d2[copyData.tableHeader[colNo].id]
          ? -1
          : 0
        : d1[copyData.tableHeader[colNo].id] <
          d2[copyData.tableHeader[colNo].id]
        ? 1
        : d1[copyData.tableHeader[colNo].id] >
          d2[copyData.tableHeader[colNo].id]
        ? -1
        : 0
    );
    this.setState(copyData);
  }

  render() {
    /**
     * Table data like [
     * {row 1 hole data},
     * {row 2 hole data},
     * ]
     */

    return (
      <>
        <div className="d-flex justify-content-end">
          <GenericButton.SubmitButton text="Add new Program" />
        </div>

        <DataTable
          tableHeader={this.state.tableHeader}
          tableData={this.state.tableData}
          totalData={this.state.totalData}
          currentPage={this.state.currentPage}
          pageChange={(e) => this.changePage(e)}
          blankData="No Data Found From Server"
          tableDataLoading={this.state.tableDataLoading}
          pageSizeList={[
            { value: 10, text: 10 },
            { value: 30, text: 30 },
            { value: 50, text: 50 },
            { value: 70, text: 70 },
            { value: 90, text: 90 },
          ]}
          pageSizeChnageHandler={(e) => this.changePageLength(e)}
          filterChangeHandler={(key) => this.changeOrderHandler(key)}
        />
      </>
    );
  }
}

export default ProgramList;
