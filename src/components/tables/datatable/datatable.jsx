import {
  faArrowUpShortWide,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "antd";
import InputFieldFloatLebel from "../../inputbox/floatlabel/InputFieldFloatLabel";
import Option from "../../option/option";

const DataTable = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="col-2">
            <Option
              list={props.pageSizeList}
              onChange={props.pageSizeChnageHandler}
            />
          </div>
        </div>
        <div className="col-6 d-flex flex-row-reverse">
          <InputFieldFloatLebel.BasicField
            type="text"
            id="search"
            placeholder="Search"
          />
        </div>
      </div>
      <table className={"table table-bordered"}>
        <thead>
          <tr>
            <th>
              Sl No.
              {/* <FontAwesomeIcon icon={faArrowUpWideShort} />
              <FontAwesomeIcon icon={faArrowUpShortWide} />
              <FontAwesomeIcon icon={faArrowDownUpAcrossLine} /> */}
            </th>
            {props.tableHeader.map((data, key) => {
              return (
                <th key={key} scope="col">
                  {data.name}
                  {data.sort ? (
                    data.order_asc ? (
                      <FontAwesomeIcon
                        style={{ float: "right" }}
                        icon={faArrowUpWideShort}
                        onClick={() => props.filterChangeHandler(key)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        style={{ float: "right" }}
                        icon={faArrowUpShortWide}
                        onClick={() => props.filterChangeHandler(key)}
                      />
                    )
                  ) : (
                    ``
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.tableDataLoading ? (
            <tr>
              <td
                colSpan={props.tableHeader.length + 1}
                className="text-center"
              >
                Loading...
              </td>
            </tr>
          ) : props.tableData.length > 0 ? (
            props.tableData.map((data, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  {props.tableHeader.map((d, k) => (
                    <td key={k}>{data[d.id]}</td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={props.tableHeader.length + 1}
                className="text-center"
              >
                {props.blankData}
              </td>
            </tr>
          )}
          {}
        </tbody>
      </table>
      <div className="row">
        <div className="col-6">
          {/* Showing 1 to {props.tableData.length} of {props.totalData} entries */}
          Total {props.totalData} entries
        </div>
        <div className="col-6 d-flex flex-row-reverse">
          <Pagination
            current={props.currentPage}
            total={props.totalData}
            showSizeChanger={true}
            onChange={props.pageChange}
          />
        </div>
      </div>
    </>
  );
};

export default DataTable;
