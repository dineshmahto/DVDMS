import { React, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Paper from "@mui/material/Paper";
import issueListService from "../../services/issuelistservice/issueListService";
import toastMessage from "../../common/toastmessage/toastmessage";
import * as Constant from "../../utils/constant";
import SearchField from "../../components/search/search";
import { faAdd, faSearch } from "@fortawesome/free-solid-svg-icons";
import BasicInput from "../../components/inputbox/floatlabel/basicInput";
import BasicButton from "../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IssueList = () => {
  const [toggleCleared, setToggleCleared] = useState(false);
  const [cloneData, setCloneData] = useState([]);
  const [issueList, setIssueList] = useState([]);
  const [currentPage, setCurrentpage] = useState(1);
  const [selectedData, setSelectedData] = useState([]);
  const [displayData, setDisplayData] = useState("");
  const [showIssuePreviewModal, setIssuePreviewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");

  //   Search filter logic
  useMemo(() => {
    const searchData = [...issueList];
    if (search !== "") {
      const searchedResult = searchData?.filter(
        ({ storeName, toStoreId, tostoreTypeId, tostoreName }) => {
          return (
            storeName.toLowerCase().includes(search.toLowerCase()) ||
            tostoreName.toLowerCase().includes(search.toLowerCase())
          );
          // return Object.values(issueItem)
          //   .join("")
          //   .toLowerCase()
          //   .includes(search.toLowerCase());
          //return issueItem.id === search || issueItem.storeName.match(search);
        }
      );
      setIssueList(searchedResult);
    } else {
      setSearch("");
      setIssueList(cloneData);
    }
  }, [search]);

  //   getting the value of Issued Amount amd mapping it correctly to respective Id
  const handleUserName = (rowId, event) => {
    issueList?.filter((issueItem) => {
      if (issueItem.id === rowId)
        return (issueItem.issuedAmnt = event.target.value);
    });
  };

  // getting the value of Issued Quantity and mapping it correctly to respective Id
  const handleQunatity = (rowId, event) => {
    issueList?.filter((issueItem) => {
      if (issueItem.id === rowId)
        return (issueItem.requestQty = event.target.value);
    });
  };

  //   Gettting the selected list by handling listner to checkbox click
  const handleChange = (rows) => {
    console.log(rows);
    console.log(rows?.selectedRows);
    const addSelectBtn = document.getElementById("addSelectedListButton");
    if (rows?.selectedRows?.length > 0) {
      if (addSelectBtn != null) {
        if (addSelectBtn.hasAttribute("disabled")) {
          addSelectBtn.removeAttribute("disabled");
        }
      }
    } else {
      if (addSelectBtn != null) {
        addSelectBtn.setAttribute("disabled", true);
      }
    }

    let temp = [];
    rows &&
      rows?.selectedRows?.map((row, i) => {
        temp.push(row);
      });
    setSelectedData(temp);
  };

  //   Add Button event Listner to show selected List
  const handleSelectedList = () => {
    if (selectedData && selectedData.length > 0) {
      const isEmpty = selectedData?.some(function (object) {
        return object.issuedAmnt == "" || object.requestQty == "";
      });
      if (!isEmpty) {
        const newIssueList = issueList.filter((elem) => {
          return !selectedData.find((ele) => {
            return ele.id === elem.id;
          });
        });
        console.log("selected", selectedData);
        setDisplayData(selectedData);
        setIssueList(newIssueList);
      } else {
        toastMessage(
          "Issue List",
          "Fill up the selected List to Transfer",
          "error"
        );
      }
    }
  };
  //   Preview Modal
  const handlePreviewModal = () => {
    setIssuePreviewModal(true);
  };
  // Cancel button Call back fucntion
  const handleCancel = () => {
    setToggleCleared(true);
    setSelectedData([]);
    setDisplayData([]);
    setIssueList(cloneData);
  };

  const fetchIssueList = async (pageNumber, pageSize) => {
    await issueListService("issue/issueList", {
      pageNumber: pageNumber,
      pageSize: pageSize,
    })
      .then((res) => {
        console.log("callApi Response", res);
        const { status, data } = res;

        if (status === Constant.SUCCESS) {
          console.log("entered");
          console.log("DestructureData", destructureData(data));
          setIssueList(destructureData(data));
          setCloneData(destructureData(data));
          setTotalRows(data?.data?.totalElements);
          setLoading(false);
        } else if (status === 403 || status === 404) {
          toastMessage("Issule List", data?.response?.message, "error");
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const handlePageChange = (page) => {
    console.log("Page", page);
    setLoading(true);
    fetchIssueList(page, perPage);
  };

  const handlePerRowsChange = async (newPerPage) => {
    if (!issueList.length) return;
    console.log("Called");
    fetchIssueList(0, newPerPage);
    setPerPage(newPerPage);
    setLoading(true);
    setCurrentpage(0);
  };

  const destructureData = (apiResponse) => {
    if (apiResponse && apiResponse?.data && apiResponse?.data?.content) {
      let tempArray = [];
      apiResponse?.data?.content.map((data, i) => {
        let tempData = {};
        tempData["id"] = data?.id;
        tempData["fromStoreId"] = data?.fromStore?.id;
        tempData["storeName"] = data?.fromStore?.storeName;
        tempData["address"] = data?.fromStore?.address;
        tempData["storeTypeId"] = data?.fromStore?.storeTypeId;
        tempData["toStoreId"] = data?.toStore?.id;
        tempData["tostoreTypeId"] = data?.toStore?.storeTypeId;
        tempData["tostoreName"] = data?.toStore?.storeName;
        tempData["requestQty"] = "";
        tempData["issuedAmnt"] = "";
        tempArray.push(tempData);
      });
      return tempArray;
    }
  };

  const columns = useMemo(() => [
    {
      id: "id",
      name: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "fromStoreId",
      name: "From Store ID",
      selector: (row) => row.id,
      omit: true,
    },

    {
      id: "storeName",
      name: "Store Name",
      selector: (row) => row.storeName,
      sortable: true,
    },
    {
      id: "toStoreId",
      name: "To StoreID",
      selector: (row) => row.toStoreId,
      sortable: true,
    },
    {
      id: "tostoreTypeId",
      name: "To StoreType ID",
      selector: (row) => {
        if (row.tostoreTypeId != null) {
          return row.tostoreTypeId;
        }
      },
      sortable: true,
    },
    {
      id: "tostoreName",
      name: "To Store Name",
      selector: (row) => {
        if (row.tostoreName != null) {
          return row.tostoreName;
        }
      },
      sortable: true,
    },
    {
      id: "requestQty",
      name: "Request Qty",
      width: "150px",
      cell: (row) => (
        <>
          <BasicInput
            id={row.id + `requestQty`}
            placeholder="Req Qty"
            type="text"
            className="shadow-none"
            onChange={(event) => {
              handleQunatity(row.id, event);
            }}
          />
        </>
      ),
    },
    {
      id: "issuedAmnt",
      name: "Issued Amount",
      width: "150px",
      cell: (row) => (
        <>
          <BasicInput
            id={row.id + `issuedAmnt`}
            placeholder="Issued Amnt"
            onChange={(event) => handleUserName(row.id, event)}
            type="text"
            className="shadow-none"
          />
        </>
      ),
    },
  ]);

  const selectColumns = useMemo(() => [
    {
      id: "id",
      name: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "fromStoreId",
      name: "From Store ID",
      selector: (row) => row.id,
      omit: true,
    },

    {
      id: "storeName",
      name: "Store Name",
      selector: (row) => row.storeName,
      sortable: true,
      omit: true,
    },
    {
      id: "toStoreId",
      name: "To StoreID",
      selector: (row) => row.toStoreId,
      sortable: true,
    },
    {
      id: "tostoreTypeId",
      name: "To StoreType ID",
      selector: (row) => {
        if (row.tostoreTypeId != null) {
          return row.tostoreTypeId;
        }
      },
      sortable: true,
    },
    {
      id: "tostoreName",
      name: "To Store Name",
      selector: (row) => {
        if (row.tostoreName != null) {
          return row.tostoreName;
        }
      },
      sortable: true,
    },
    {
      id: "issuedAmnt",
      name: "Request Amount",
      selector: (row) => row.issuedAmnt,
    },

    {
      id: "requestQty",
      name: "Request Quantity",
      selector: (row) => row.requestQty,
    },
  ]);

  const selectedListView = () => {
    return (
      <>
        <div className="row">
          <div className="col-12">
            <DataTable
              columns={selectColumns}
              title="Selected List"
              fixedHeader
              data={displayData}
            />
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-warning m-2"
              onClick={() => {
                handlePreviewModal();
              }}
            >
              Preview
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            {PreviewModal()}
          </div>
        </div>
      </>
    );
  };

  const PreviewModal = () => {
    return (
      <Modal
        size="lg"
        show={showIssuePreviewModal}
        onHide={() => setIssuePreviewModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Preview Issue List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <DataTable
                  columns={selectColumns}
                  title="Selected List"
                  fixedHeader
                  data={displayData}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };
  return (
    <>
      <Paper elevation={3}>
        <div className="container-fluid">
          <div className="row">
            {displayData && displayData.length > 0 && selectedListView()}

            <div className="col-12">
              <DataTable
                title="Issue List"
                columns={columns}
                data={issueList}
                selectableRows={true}
                onSelectedRowsChange={handleChange}
                persistTableHead={true}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationDefaultPage={currentPage}
                paginationPerPage={perPage}
                onChangeRowsPerPage={() => handlePerRowsChange()}
                onChangePage={handlePageChange}
                progressPending={loading}
                progressComponent={<Spinner />}
                fixedHeader
                highlightOnHover
                subHeader
                clearSelectedRows={toggleCleared}
                noDataComponent="Opps No Record Found"
                subHeaderComponent={
                  <div className="d-flex justify-content-end">
                    <SearchField
                      placeholder="Search Here"
                      onChange={(event) => {
                        setSearch(event.target.value);
                      }}
                      iconPosition="start"
                      iconName={faSearch}
                    />
                  </div>
                }
              />
            </div>
            {!loading && (
              <div className="row">
                <div className="d-flex justify-content-center">
                  <BasicButton
                    type="button"
                    id="addSelectedListButton"
                    outlineType={true}
                    className="success"
                    buttonText="ADD"
                    icon={<FontAwesomeIcon icon={faAdd} className="me-1" />}
                    onClick={() => {
                      handleSelectedList();
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Paper>
    </>
  );
};

export default IssueList;
