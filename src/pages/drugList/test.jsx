import { React, useState } from "react";
import BasicButton from "../../components/button/basicbutton";
import BasicModal from "../../components/modal/basicmodal";
import TransferComponent from "./transferComponent";
import SelectOption from "../../components/option/option";
const data = [
  {
    id: 2016,
    genericName: "Paracetamol Tab. 500mg",
    drugClassId: "10",
    status: "1",
    packingDescription: "1",
    brandId: 0,
    packingQuantity: "1",
    brandName: null,
    manufacturerId: null,
    strengthUnit: "mg",
    strengthValue: "500",
    vital: false,
    drugEdit: null,
    hstnumEdlFlag: 1,
    equipmentCategoryId: 1,
    edlEntryDate: "2022-06-27",
  },
  {
    id: 2044,
    genericName: "Ampicillin Cap. 500mg",
    drugClassId: "11",
    status: "1",
    packingDescription: "1",
    brandId: 0,
    packingQuantity: "1",
    brandName: null,
    manufacturerId: null,
    strengthUnit: "mg",
    strengthValue: "500",
    vital: false,
    drugEdit: null,
    hstnumEdlFlag: 1,
    equipmentCategoryId: 2,
    edlEntryDate: "2022-06-27",
  },

  {
    id: 2049,
    genericName: "Cloxacillin+Ampicillin Tab. 250mg",
    drugClassId: "10",
    status: "1",
    packingDescription: "1",
    brandId: 0,
    packingQuantity: "1",
    brandName: null,
    manufacturerId: null,
    strengthUnit: "mg",
    strengthValue: "250",
    vital: false,
    drugEdit: null,
    hstnumEdlFlag: 1,
    equipmentCategoryId: 2,
    edlEntryDate: "2022-06-27",
  },
  {
    id: 2050,
    genericName: "Cloxacillin+Ampicillin Dry Syrup 125mg(60ml)",
    drugClassId: "17",
    status: "1",
    packingDescription: "1",
    brandId: 0,
    packingQuantity: "1",
    brandName: null,
    manufacturerId: null,
    strengthUnit: "mg",
    strengthValue: "125",
    vital: false,
    drugEdit: null,
    hstnumEdlFlag: 1,
    equipmentCategoryId: 2,
    edlEntryDate: "2022-06-27",
  },

  {
    id: 2075,
    genericName: "Nitrofurantion Tab. 100mg",
    drugClassId: "10",
    status: "1",
    packingDescription: "1",
    brandId: 0,
    packingQuantity: "1",
    brandName: null,
    manufacturerId: null,
    strengthUnit: "mg",
    strengthValue: "100",
    vital: false,
    drugEdit: null,
    hstnumEdlFlag: 1,
    equipmentCategoryId: 2,
    edlEntryDate: "2022-06-27",
  },
];

const Test = () => {
  const [show, setShow] = useState(false);
  const [tempArray, setTempArray] = useState([]);
  const [rightTempArray, setRightTempArray] = useState([]);
  const [apiData, setApiData] = useState(data);
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeIndicies, setActiveIndicies] = useState(() =>
    apiData.map(() => false)
  );

  const [selectItemActiveIndices, setSelectedItemActiveIndices] = useState();

  const handleRightListItemClick = (e, id, element, index) => {
    console.log("clicked Item id", id);
    console.log("clicked Element", element);
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
      console.log("DineshModified", rightTempArray);
    }
    console.log("Index", index);
    console.log("seelctedItemActiveIndices", selectItemActiveIndices);
    if (!selectItemActiveIndices.at(index)) {
      setSelectedItemActiveIndices(
        selectItemActiveIndices.map((bool, j) => (j === index ? true : bool))
      );
    } else {
      setSelectedItemActiveIndices(
        selectItemActiveIndices.map((bool, j) => (j === index ? false : bool))
      );
    }

    console.log(
      "ElementExist",
      elementExist.length === 0 ? "Does not Exist" : "Exist"
    );
    console.log("RightTempArray", rightTempArray);
  };

  const handleLeftListItemClick = (e, id, element, index) => {
    console.log("initial tempArray", tempArray);
    console.log("selectedItem", selectedItem);

    const elementExist = tempArray?.filter((item) => {
      return item.id === id;
    });
    console.log("ElementExist", elementExist);
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
    console.log("ActiveIndicies", activeIndicies);
    console.log(tempArray);
  };

  const handleMoveSelectedItemToRight = () => {
    console.log("Move Element to Right");

    // setSelectedItem(tempArray);
    console.log("Dinesh tempArray", tempArray.length);
    if (tempArray?.length > 0) {
      const cloneData = [...data];
      console.log("cloneData", cloneData);
      console.log("tempArray", tempArray);
      //adding acticve class to right side selected list
      setSelectedItemActiveIndices(tempArray?.map(() => true));
      // correct
      setRightTempArray([]);

      setActiveIndicies(activeIndicies.map((bool, j) => false));

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
      setApiData(leftRearrangedList);
      console.log("leftRearrangedList", leftRearrangedList);
    }
  };

  const handleMoveSelectedItemToLeft = () => {
    console.log("Move Element to Left");
    console.log("Temp Array lenght", tempArray.length);

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
    // update the selected List
  };

  const handleShiftAllElementToRight = () => {
    const cloneData = [...data];
    setSelectedItemActiveIndices(cloneData?.map(() => true));
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
  const dummySelectData = [
    {
      id: 1,
      value: "January",
    },
    {
      id: 2,
      value: "February",
    },
    {
      id: 3,
      value: "March",
    },
  ];
  // const searchDrugFromList = (e) => {
  //   const searchData = [...apiData];
  //   console.log("Searched List", e.target.value);
  //   if (e.target.value != "") {
  //     const searchedResult = searchData?.filter(({ genericName }) => {
  //       return genericName.toLowerCase().includes(e.target.value.toLowerCase());
  //     });
  //     console.log("Search Result", searchedResult);
  //     setApiData(searchedResult);
  //   } else {
  //     console.log("cloneData", cloneData);
  //     console.log("enter");
  //     setApiData(cloneData);
  //   }
  // };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <SelectOption
              data={dummySelectData}
              label="Select the Drug"
              onChange={(e) => console.log(e.target.value)}
              className="mb-2 "
            />
          </div>
          <div className="col-6"></div>
        </div>
        <div className="row">
          <BasicModal
            title="Transfer"
            show={show}
            close={() => setShow(false)}
            isStatic={false}
            scrollable={true}
            isCenterAlign={true}
            fullScreen={true}
          >
            <TransferComponent
              apiData={apiData}
              activeIndicies={activeIndicies}
              handleMoveSelectedItemToLeft={handleMoveSelectedItemToLeft}
              handleMoveSelectedItemToRight={handleMoveSelectedItemToRight}
              handleShiftAllElementToRight={handleShiftAllElementToRight}
              handleShiftAllElementToLeft={handleShiftAllElementToLeft}
              handleLeftListItemClick={handleLeftListItemClick}
              handleRightListItemClick={handleRightListItemClick}
              selectedItem={selectedItem}
              selectItemActiveIndices={selectItemActiveIndices}
            />
          </BasicModal>
        </div>
        <div className="row">
          <div className="col-6 offset-3">
            <BasicButton
              type="button"
              className="secondary"
              buttonText="Open Modal"
              onClick={() => setShow(true)}
              outlineType={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
