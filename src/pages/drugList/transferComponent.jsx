import { React, useMemo, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faAngleRight,
  faAngleLeft,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./drug.css";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import BasicModal from "../../components/modal/basicmodal";
import BasicButton from "../../components/button/basicbutton";
import "react-perfect-scrollbar/dist/css/styles.css";
import SearchField from "../../components/search/search";

const useStyles = makeStyles({
  active: {
    background: "#595757",
    color: "white",
  },
});

function TransferComponent() {
  const classes = useStyles();
  const data = [
    {
      id: 1000000788,
      name: "Inj. Ampicillin",
    },
    {
      id: 1000000796,
      name: "Tab. Amoxycillin, Dispersible",
    },
    {
      id: 1000000797,
      name: "Cap. Chloramphenicol",
    },
    {
      id: 1000000798,
      name: "Tab. Erythromycin Stearate",
    },
  ];
  const [tempArray, setTempArray] = useState([]);
  const [rightTempArray, setRightTempArray] = useState([]);
  const [apiData, setApiData] = useState(data);
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeIndicies, setActiveIndicies] = useState([]);

  const [selectItemActiveIndices, setSelectedItemActiveIndices] = useState();
  const [show, setShow] = useState(false);
  const [cloneData, setCloneData] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const [firstClick, setFirstClick] = useState(false);

  const handleRightListItemClick = (e, id, element, index) => {
    console.log("clicked Item id", id);
    console.log("clicked Element", element);
    if (!rightTempArray.some((u) => u.id === id)) {
      setRightTempArray([...rightTempArray, element]);
    } else {
      for (let [i, item] of rightTempArray.entries()) {
        if (item.id === id) {
          rightTempArray.splice(i, 1);
        }
      }
      console.log("DineshModified", rightTempArray);
    }
    if (firstClick) {
      setSelectedItemActiveIndices(
        selectItemActiveIndices.map((bool, j) => (j === index ? true : false))
      );
      setFirstClick(false);
    } else {
      const t = [...selectItemActiveIndices];
      const ut = t.map((elem, i) => {
        if (i == index) {
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
    // Remember when we started
    var start = new Date().getTime();
    if (!tempArray.some((u) => u.id === id)) {
      setTempArray([...tempArray, element]);
    } else {
      for (let [i, item] of tempArray?.entries()) {
        if (item.id === id) {
          tempArray.splice(i, 1);
        }
      }
    }

    const selectedIndex = activeIndicies.indexOf(id);
    console.log("Selectedindex", selectedIndex);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(activeIndicies, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(activeIndicies.slice(1));
    } else if (selectedIndex === activeIndicies.length - 1) {
      newSelected = newSelected.concat(activeIndicies.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        activeIndicies.slice(0, selectedIndex),
        activeIndicies.slice(selectedIndex + 1)
      );
    }
    var end = new Date().getTime();
    console.log("NewSelected", newSelected);
    setActiveIndicies(newSelected);
    console.log("ActiveIndicies", activeIndicies);
    // if (!activeIndicies.at(index)) {
    //   setActiveIndicies(
    //     activeIndicies.map((bool, j) => (j === index ? true : bool))
    //   );
    // } else {
    //   setActiveIndicies(
    //     activeIndicies.map((bool, j) => (j === index ? false : bool))
    //   );
    // }

    // Now calculate and output the difference
    console.log(end - start);
  };

  const handleMoveSelectedItemToRight = () => {
    console.log("Move Element to Right");

    if (tempArray?.length > 0) {
      setFirstClick(true);
      const cloneData = [...data];
      console.log("cloneData", cloneData);
      console.log("tempArray", tempArray);
      //adding acticve class to right side selected list
      setSelectedItemActiveIndices(tempArray?.map(() => true));
      // correct
      setRightTempArray([]);

      setActiveIndicies(activeIndicies.map((bool, j) => false));
      console.log("Right Display", tempArray);
      const rightDispalyList = cloneData.filter((elem) => {
        return tempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      console.log("Right Display List", rightDispalyList);
      setSelectedItem(rightDispalyList);
      const leftRearrangedList = cloneData.filter((elem) => {
        return !tempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setCloneData(leftRearrangedList);
      setApiData(leftRearrangedList);

      console.log("leftRearrangedList", leftRearrangedList);
    }
  };

  const handleMoveSelectedItemToLeft = () => {
    console.log("Move Element to Left");
    console.log("Temp Array lenght", tempArray.length);
    const allACtiveClasses = selectItemActiveIndices.every((e) => e == true);
    if (rightTempArray.length > 0) {
      setFirstClick(true);
      const cloneData = [...selectedItem];
      console.log("RightCloneData", cloneData);
      console.log("SelectedItem", selectedItem);
      console.log("RightTempArray", rightTempArray);
      const rightDispalyList = cloneData.filter((elem) => {
        return !rightTempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setSelectedItemActiveIndices(rightDispalyList?.map(() => true));
      const reverseBackElements = cloneData.filter((elem) => {
        return rightTempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });

      const updateTempArray = tempArray.filter((elem) => {
        return !reverseBackElements.find((ele) => {
          return ele.id === elem.id;
        });
      });
      console.log("Right Display List", rightDispalyList);
      console.log("reverseElement", reverseBackElements);
      console.log("updateTempArray", updateTempArray);
      setTempArray(updateTempArray);
      console.log("ApiData", apiData);
      const storeIntoOne = [...apiData];
      console.log("Store", storeIntoOne);
      reverseBackElements.map((elem) => {
        storeIntoOne.push(elem);
      });
      console.log("Dinesh", storeIntoOne);
      setApiData(storeIntoOne);
      setSelectedItem(rightDispalyList);
      setRightTempArray([]);
      // update the selected List
    } else if (allACtiveClasses) {
      handleShiftAllElementToLeft();
    }
  };

  const handleShiftAllElementToRight = () => {
    const cloneData = [...data];
    setFirstClick(true);
    // setSelectedItemActiveIndices(cloneData?.map(() => true));
    setSelectedItem(cloneData);
    setRightTempArray([]);
    setTempArray(cloneData);
    setApiData([]);
  };

  const handleShiftAllElementToLeft = () => {
    const cloneData = [...data];

    setSelectedItemActiveIndices([]);
    setApiData(cloneData);
    setRightTempArray([]);
    setTempArray([]);
    setSelectedItem([]);
    setActiveIndicies(activeIndicies.map((bool) => false));
  };
  const isSelected = (name) => activeIndicies.indexOf(name) !== -1;
  useMemo(() => {
    const searchData = [...apiData];
    if (searchValue != "") {
      const searchedResult = searchData?.filter(({ name }) => {
        if (searchValue === "") {
          return;
        }
        return name?.toLowerCase()?.indexOf(searchValue.toLowerCase()) > -1;
      });
      setApiData(searchedResult);
    } else {
      setApiData(cloneData);
    }
  }, [searchValue]);

  useEffect(() => {
    setActiveIndicies(apiData.map(() => false));
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-5">
          <SearchField
            placeholder="Search for Drug Name..."
            fullWidth
            iconName={faSearch}
            position="start"
            inputProps={true}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="col-7"></div>
      </div>
      <div className="row">
        <div
          className="col-5"
          style={{
            height: "300px",
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          {/* <List key="initail"> */}
          {apiData &&
            apiData.length > 0 &&
            apiData.map((elem, i) => {
              const isItemSelected = isSelected(elem.id);
              return (
                <>
                  <li
                    class={`list-group-item ${
                      isItemSelected ? classes.active : ""
                    }`}
                    onClick={(e) =>
                      handleLeftListItemClick(e, elem?.id, elem, i)
                    }
                    key={elem.id}
                  >
                    {elem.name}
                  </li>
                  {/* <ListItem
                      disablePadding
                      key={`${elem?.id}`}
                      className={`${isItemSelected ? classes.active : ""}`}
                      onClick={(e) =>
                        handleLeftListItemClick(e, elem?.id, elem, i)
                      }
                    >
                      <ListItemButton key={elem}>
                        <ListItemText key={elem?.name} primary={elem?.name} />
                      </ListItemButton>
                    </ListItem>
                    <Divider
                      light
                      style={{ backgroundColor: "black", width: "100%" }}
                    /> */}
                </>
              );
            })}
          {/* </List> */}
        </div>

        <div className="col-2 d-flex flex-column justify-content-center">
          <button
            className="btn btn-secondary btn-sm mb-1"
            onClick={handleMoveSelectedItemToRight}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button
            className="btn btn-secondary btn-sm mb-1"
            onClick={handleMoveSelectedItemToLeft}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            className="btn btn-secondary btn-sm mb-1"
            onClick={handleShiftAllElementToRight}
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
          <button
            className="btn btn-secondary btn-sm mb-1"
            onClick={handleShiftAllElementToLeft}
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>
        </div>
        <div
          className="col-5"
          style={{
            height: "300px",
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          {/* <List key="selected"> */}
          {selectedItem &&
            selectedItem.length > 0 &&
            selectedItem.map((elem, i) => {
              return (
                <>
                  <li
                    class={`list-group-item `}
                    onClick={(e) =>
                      handleRightListItemClick(e, elem?.id, elem, i)
                    }
                    key={elem.id}
                  >
                    {elem.name}
                  </li>
                  {/* <ListItem
                      disablePadding
                      key={`${elem?.id}`}
                      // className={`${
                      //   selectItemActiveIndices[i] ? classes.active : ""
                      // }`}
                      onClick={(e) =>
                        handleRightListItemClick(e, elem?.id, elem, i)
                      }
                    >
                      <ListItemButton key={elem}>
                        <ListItemText key={elem?.name} primary={elem?.name} />
                      </ListItemButton>
                    </ListItem>
                    <Divider
                      light
                      style={{ backgroundColor: "black", width: "100%" }}
                    /> */}
                </>
              );
            })}
          {/* </List> */}
        </div>
      </div>

      <BasicModal
        title="Transfer"
        size=""
        className="modal-fullscreen"
        show={show}
      />
    </div>
  );
}

export default TransferComponent;
