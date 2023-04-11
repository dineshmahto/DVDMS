import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { Paper } from "@mui/material";
import { TableBody, TableRow, TableCell } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import Basicbutton from "../../../components/button/basicbutton";
import BasicModal from "../../../components/modal/basicmodal";
import SearchField from "../../../components/search/search";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
import TransferComponent from "../../../components/transfer/transferComponent";
import { Spinner } from "react-bootstrap";
import {
  faFloppyDisk,
  faList,
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import CustomSelect from "../../../components/select/customSelect";
import { getAdminService } from "../../../services/adminservice/adminservice";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../common/toastmessage/toastmessage";
import * as CONSTANTS from "../../../common/constant/constants";

const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const RoleDesk = () => {
  const showActivitityTooltipRef = useRef();
  let classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [sortedData, handleSorting] = useSortableTable();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [activityList, setActivityList] = useState([]);
  const [dropDownList, setDropDownList] = useState([]);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const [data, setData] = useState([]);
  const columns = useMemo(() => [
    {
      id: "id",
      name: "ROLE ID",
      sortable: true,
    },

    {
      id: "name",
      name: "ROLE NAME",
      sortable: true,
    },
    {
      id: "remark",
      name: "ROLE DESCRIPTION",
      sortable: true,
    },
    {
      id: "activities",
      name: "ACTIVITIES",
      sortable: false,
    },
  ]);

  // Trnasfer component state declaration for adding new Role
  const [tempArray, setTempArray] = useState([]);
  const [rightTempArray, setRightTempArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeIndicies, setActiveIndicies] = useState([]);
  const [firstClick, setFirstClick] = useState(false);
  const [selectItemActiveIndices, setSelectedItemActiveIndices] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [transferableRoleList, setTransferableRoleList] = useState([]);

  // Edit Role transfer Componet st

  // edit role modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [totalRoleList, setTotalRoleList] = useState([]);
  const [currentRoleList, setCurrentRoleList] = useState([]);
  const [availableRoleList, setAvailableRoleList] = useState([]);
  const handlePageChange = (newPage) => {
    console.log("newPage", newPage);
    setLoading(true);
    setController({
      ...controller,
      page: newPage - 1,
    });
  };
  const handleChangeRowsPerPage = (current, pageSize) => {
    console.log(current, pageSize);
    setController({
      ...controller,
      rowsPerPage: pageSize,
      page: 0,
    });
  };
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    console.log("tableData", tableData);
    handleSorting(accessor, sortOrder, tableData);
    console.log("sortedData", sortedData);
    setTableData(sortedData);
  };

  const callApi = async () => {
    await getAdminService(CONSTANTS.ROLE_LISTING, {
      pageNumber: controller.page,
      pageSize: controller.rowsPerPage,
    })
      .then((r) => {
        console.log(r?.data);
        console.log(r?.data?.content);
        setTotalRoleList(r?.data?.activityList);
        setActivityList(r?.data?.activityTypeList);
        setData(r?.data?.activityList);
        setTotalPages(r?.data?.totalPages);
        setTotalRows(r?.data?.totalElements);
        setTableData(r?.data?.content);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        toastMessage("Role List", "Server can't respon", "error");
        console.log("Error", e);
      });
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      callApi();
    }
    return () => {
      isApiSubcribed = false;
    };
  }, [controller]);

  const callActivityListApiByCode = async (code) => {
    await getAdminService(`admin/getActivityListByType/${code}`)
      .then((r) => {
        console.log("typeCodeResponse", r?.data);
        console.log(r?.data?.data);
        setSelectedItem([]);
        setRightTempArray([]);
        setFirstClick(false);
        setSelectedItemActiveIndices([]);
        setTempArray([]);
        setActiveIndicies(r?.data?.data?.map(() => false));
        setTransferableRoleList(r?.data?.data);
        setCopyData(r?.data?.data);
      })
      .catch((e) => {
        setLoading(false);
        toastMessage("Activity List Code", "Server can't respon", "error");
        console.log("Error", e);
      });
  };

  const handleRightListItemClick = (e, id, element, index) => {
    const elementExist = rightTempArray?.filter((item) => {
      return item.id === id;
    });
    if (elementExist.length === 0) {
      setRightTempArray([...rightTempArray, element]);
    } else {
      for (let [i, item] of rightTempArray.entries()) {
        if (item.id === id) {
          rightTempArray.splice(i, 1);
        }
      }
    }

    if (firstClick) {
      setSelectedItemActiveIndices(
        selectItemActiveIndices.map((bool, j) => (j === index ? true : false))
      );
      setFirstClick(false);
    } else {
      const t = [...selectItemActiveIndices];
      const ut = t.map((elem, i) => {
        if (i === index) {
          if (elem) {
            return (t[index] = false);
          } else if (!elem) {
            return (t[index] = true);
          }
        } else {
          return elem;
        }
      });
      setSelectedItemActiveIndices(ut);
    }
  };

  const handleLeftListItemClick = (e, id, element, index) => {
    const elementExist = tempArray?.filter((item) => {
      return item.id === id;
    });
    if (elementExist.length === 0) {
      setTempArray([...tempArray, element]);
    } else {
      for (let [i, item] of tempArray?.entries()) {
        if (item.id === id) {
          tempArray.splice(i, 1);
        }
      }
    }
    if (!activeIndicies.at(index)) {
      setActiveIndicies(
        activeIndicies.map((bool, j) => (j === index ? true : bool))
      );
    } else {
      setActiveIndicies(
        activeIndicies.map((bool, j) => (j === index ? false : bool))
      );
    }
  };

  const handleMoveSelectedItemToRight = (
    tempArray,
    setFirstClick,
    copyiedData,
    setSelectedItemActiveIndices,
    setRightTempArray,
    setActiveIndicies,
    activeIndicies,
    setSelectedItem,
    setData
  ) => {
    if (tempArray?.length > 0) {
      setFirstClick(true);
      const cloneData = [...copyiedData];
      setSelectedItemActiveIndices(tempArray?.map(() => true));
      setRightTempArray([]);
      setActiveIndicies(activeIndicies.map((bool, j) => false));
      const rightDispalyList = cloneData.filter((elem) => {
        return tempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setSelectedItem(rightDispalyList);
      const leftRearrangedList = cloneData.filter((elem) => {
        return !tempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setData(leftRearrangedList);
    }
  };

  const handleMoveSelectedItemToLeft = (
    selectItemActiveIndices,
    rightTempArray,
    setFirstClick,
    selectedItem,
    setSelectedItemActiveIndices,
    tempArray,
    setTempArray,
    data,
    setData,
    setSelectedItem,
    setRightTempArray,
    setActiveIndicies,
    activeIndicies,
    copyiedData
  ) => {
    const allACtiveClasses = selectItemActiveIndices.every((e) => e === true);
    if (rightTempArray.length > 0) {
      setFirstClick(true);
      console.log("selectedItem", selectedItem);
      const cloneData = [...selectedItem];
      const rightDispalyList = cloneData.filter((elem) => {
        return !rightTempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      console.log("Right Display List", rightDispalyList);
      setSelectedItemActiveIndices(rightDispalyList?.map(() => true));
      const reverseBackElements = cloneData.filter((elem) => {
        return rightTempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      console.log("ReverseBackElements", reverseBackElements);
      const updateTempArray = tempArray.filter((elem) => {
        return !reverseBackElements.find((ele) => {
          return ele.id === elem.id;
        });
      });
      console.log("TempArray", updateTempArray);
      setTempArray(updateTempArray);
      console.log("copiedData", data);
      const storeIntoOne = [...data];
      reverseBackElements.map((elem) => {
        storeIntoOne.push(elem);
      });
      console.log("storeIntoOne", storeIntoOne);
      setData(storeIntoOne);
      setSelectedItem(rightDispalyList);
      setRightTempArray([]);
      // update the selected List
    } else if (allACtiveClasses) {
      handleShiftAllElementToLeft(
        copyiedData,
        setSelectedItemActiveIndices,
        setData,
        setRightTempArray,
        setTempArray,
        setSelectedItem,
        setActiveIndicies,
        activeIndicies
      );
    }
  };

  const handleShiftAllElementToRight = (
    copyiedData,
    setFirstClick,
    setSelectedItemActiveIndices,
    setSelectedItem,
    setRightTempArray,
    setTempArray,
    setData
  ) => {
    const cloneData = [...copyiedData];
    setFirstClick(true);
    setSelectedItemActiveIndices(cloneData?.map(() => true));
    setSelectedItem(cloneData);
    setRightTempArray([]);
    setTempArray(cloneData);
    setData([]);
  };

  const handleShiftAllElementToLeft = (
    copyiedData,
    setSelectedItemActiveIndices,
    setData,
    setRightTempArray,
    setTempArray,
    setSelectedItem,
    setActiveIndicies,
    activeIndicies
  ) => {
    const cloneData = [...copyiedData];
    console.log("cloneData", cloneData);

    setSelectedItemActiveIndices([]);
    setData(cloneData);
    setRightTempArray([]);
    setTempArray([]);
    setSelectedItem([]);
    setActiveIndicies(activeIndicies.map((bool) => false));
  };

  const createRoleForm = () => {
    return (
      <div className="row">
        <div className="col-10 offset-1">
          <div className="row mb-2">
            <div className="col-3">
              <label for="inputPassword6" class="col-form-label">
                Role Name :
              </label>
            </div>
            <div className="col-9">
              <BasicInput
                type="text"
                placeholder="Role Name is between 6 to 50 character"
                labelText="Role Name"
                id="roleName"
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-3">
              <label for="inputPassword6" class="col-form-label">
                Role Description :
              </label>
            </div>
            <div className="col-9">
              <BasicInput
                type="text"
                placeholder="Enter Role Description"
                labelText="Role Name"
                id="roleDescription"
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-3">
              <label for="inputPassword6" class="col-form-label">
                Activity Type :
              </label>
            </div>
            <div className="col-9">
              <CustomSelect
                options={dropDownList}
                onChange={(choice) => {
                  console.log(choice?.value);
                  callActivityListApiByCode(choice?.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const showActivitiesModal = () => {
    return (
      <BasicModal
        title="List of Activities"
        show={showActivityModal}
        close={() => setShowActivityModal(false)}
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
    );
  };

  const addRoleModal = () => {
    return (
      <>
        <BasicModal
          title="Create Role"
          show={showModal}
          close={() => {
            setTransferableRoleList([]);
            setSelectedItem([]);
            setRightTempArray([]);
            setFirstClick(false);
            setSelectedItemActiveIndices([]);
            setTempArray([]);
            setShowModal(false);
          }}
          isStatic={false}
          scrollable={true}
          isCenterAlign={false}
          fullScreen={false}
          size="lg"
          key="create_role"
        >
          {createRoleForm()}
          <div className="row m-1">
            <TransferComponent
              apiData={transferableRoleList}
              activeIndicies={activeIndicies}
              handleMoveSelectedItemToLeft={() => {
                handleMoveSelectedItemToLeft(
                  selectItemActiveIndices,
                  rightTempArray,
                  setFirstClick,
                  selectedItem,
                  setSelectedItemActiveIndices,
                  tempArray,
                  setTempArray,
                  transferableRoleList,
                  setTransferableRoleList,
                  setSelectedItem,
                  setRightTempArray,
                  setActiveIndicies,
                  activeIndicies,
                  copyData
                );
              }}
              handleMoveSelectedItemToRight={() => {
                handleMoveSelectedItemToRight(
                  tempArray,
                  setFirstClick,
                  copyData,
                  setSelectedItemActiveIndices,
                  setRightTempArray,
                  setActiveIndicies,
                  activeIndicies,
                  setSelectedItem,
                  setTransferableRoleList
                );
              }}
              handleShiftAllElementToRight={() => {
                handleShiftAllElementToRight(
                  copyData,
                  setFirstClick,
                  setSelectedItemActiveIndices,
                  setSelectedItem,
                  setRightTempArray,
                  setTempArray,
                  setTransferableRoleList
                );
              }}
              handleShiftAllElementToLeft={() => {
                handleShiftAllElementToLeft(
                  copyData,
                  setSelectedItemActiveIndices,
                  setTransferableRoleList,
                  setRightTempArray,
                  setTempArray,
                  setSelectedItem,
                  setActiveIndicies,
                  activeIndicies
                );
              }}
              handleLeftListItemClick={handleLeftListItemClick}
              handleRightListItemClick={handleRightListItemClick}
              selectedItem={selectedItem}
              selectItemActiveIndices={selectItemActiveIndices}
            />
          </div>
          <div className="row mt-1  mb-2">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <Basicbutton
                  icon={
                    <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                  }
                  type="button"
                  buttonText="Save"
                  className="primary"
                  outlineType={true}
                />
              </div>
            </div>
          </div>
        </BasicModal>
      </>
    );
  };

  const EditRoleModal = () => {
    return (
      <>
        <BasicModal
          title="Edit Role"
          show={showEditModal}
          close={() => {
            setShowEditModal(false);
          }}
          isStatic={false}
          scrollable={true}
          isCenterAlign={false}
          fullScreen={false}
          size="lg"
          key="create_role"
        >
          <div className="row m-1">
            <TransferComponent
              apiData={availableRoleList}
              activeIndicies={activeIndicies}
              handleMoveSelectedItemToLeft={() => {
                handleMoveSelectedItemToLeft(
                  selectItemActiveIndices,
                  rightTempArray,
                  setFirstClick,
                  selectedItem,
                  setSelectedItemActiveIndices,
                  tempArray,
                  setTempArray,
                  data,
                  setData,
                  setSelectedItem,
                  setRightTempArray,
                  setActiveIndicies,
                  activeIndicies,
                  copyData
                );
              }}
              handleMoveSelectedItemToRight={() => {
                handleMoveSelectedItemToRight(
                  tempArray,
                  setFirstClick,
                  copyData,
                  setSelectedItemActiveIndices,
                  setRightTempArray,
                  setActiveIndicies,
                  activeIndicies,
                  setSelectedItem,
                  setData
                );
              }}
              handleShiftAllElementToRight={() => {
                handleShiftAllElementToRight(
                  copyData,
                  setFirstClick,
                  setSelectedItemActiveIndices,
                  setSelectedItem,
                  setRightTempArray,
                  setTempArray,
                  setData
                );
              }}
              handleShiftAllElementToLeft={() => {
                handleShiftAllElementToLeft(
                  copyData,
                  setSelectedItemActiveIndices,
                  setData,
                  setRightTempArray,
                  setTempArray,
                  setSelectedItem,
                  setActiveIndicies,
                  activeIndicies
                );
              }}
              handleLeftListItemClick={handleLeftListItemClick}
              handleRightListItemClick={handleRightListItemClick}
              selectedItem={selectedItem}
              selectItemActiveIndices={selectItemActiveIndices}
            />
          </div>
          <div className="row mt-1  mb-2">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <Basicbutton
                  icon={
                    <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                  }
                  type="button"
                  buttonText="Save"
                  className="primary"
                  outlineType={true}
                />
              </div>
            </div>
          </div>
        </BasicModal>
      </>
    );
  };
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">ROLE LIST</p>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Role List" />
      </div>
      <Paper>
        <div className="row ">
          <div className="d-flex flex-row justify-content-end">
            <Basicbutton
              buttonText="Add New Role"
              outlineType={true}
              className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
              onClick={() => {
                setSelectedItem([]);
                setRightTempArray([]);
                setFirstClick(false);
                setSelectedItemActiveIndices([]);
                setTempArray([]);
                setActiveIndicies(data?.map(() => false));
                setTransferableRoleList(data);
                setCopyData(data);
                setDropDownList(activityList);
                setShowModal(true);
              }}
            />
          </div>
        </div>
        <div className="row mb-1">
          <div className="d-flex justify-content-end">
            <SearchField
              className="me-1 "
              iconPosition="end"
              iconName={faSearch}
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              page={controller.page + 1}
              count={totalRows}
              rowsPerPage={controller.rowsPerPage}
              order={order}
              paginationRequired={true}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              handleSorting={handleSortingChange}
              checkBoxRequired={false}
            >
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell className="text-center" colSpan={12}>
                      <Spinner />
                    </TableCell>
                  </TableRow>
                ) : (
                  tableData &&
                  tableData.length > 0 &&
                  tableData.map((data, index) => {
                    return (
                      <TableRow key={data.id}>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data.id}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data.name}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.remark}
                        </TableCell>

                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.activityList &&
                          data?.activityList.length > 0 ? (
                            <>
                              <span
                                className="text-decoration-underline me-2"
                                onClick={() => {
                                  console.log("clicked");
                                  setActivityList(data?.activityList);
                                  setShowActivityModal(true);
                                }}
                                style={{
                                  fontSize: "0.8rem",
                                  cursor: "pointer",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faList}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="SHOW ACTIVITIES"
                                />
                              </span>
                              <span className="m-1"> |</span>
                            </>
                          ) : (
                            ""
                          )}

                          <span
                            className="text-decoration-underline ms-1"
                            style={{ fontSize: "0.8rem", cursor: "pointer" }}
                            onClick={() => {
                              let list = [];
                              data?.activityList.forEach((element) => {
                                let ele = {};
                                ele["id"] = element?.id;
                                ele["name"] = element?.activityName;
                                list.push(ele);
                              });
                              console.log("list", list);
                              setCurrentRoleList(list);

                              const availableRoleLists = [
                                ...totalRoleList,
                              ]?.filter((elem) => {
                                return !list?.find((ele) => {
                                  return ele.id === elem.id;
                                });
                              });
                              setAvailableRoleList(availableRoleLists);

                              setShowEditModal(true);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="me-2"
                            />
                          </span>
                          <span className="m-1"> |</span>

                          <span
                            className="text-decoration-underline"
                            style={{ fontSize: "0.8rem", cursor: "pointer" }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="ms-2"
                              color="red"
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
                {!loading && tableData && tableData.length === 0 && (
                  <TableRow>
                    <TableCell className="text-center" colSpan={12}>
                      <p style={{ fontSize: "0.8rem" }}>
                        NO DATA AVAILABE IN TABLE
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </TableComponent>
          </div>
        </div>
      </Paper>
      {addRoleModal()}
      {showActivitiesModal()}
      {EditRoleModal()}
    </>
  );
};

export default RoleDesk;
