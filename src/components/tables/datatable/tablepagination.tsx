import React from "react";
import { Pagination } from "antd";
import { Select } from "antd";
interface paginationProps {
  onPageChange: () => void;
  page: number;
  count: number;
  rowsPerPage: number;
  onRowsPerPageChange: (e: any) => void;
}
const TablePagination: React.FC<paginationProps> = ({
  page,
  count,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <div className="row">
      <div className="d-flex justify-content-end">
        <Pagination
          current={page}
          total={count}
          pageSize={rowsPerPage}
          showTotal={(count, range) =>
            `${range[0]}-${range[1]} of ${count} items`
          }
          onChange={onPageChange}
          showSizeChanger={false}
          className="mb-2 me-2"
          responsive
        />
        <Select
          className="me-1"
          defaultValue="10"
          style={{ width: 120 }}
          onChange={(e) => onRowsPerPageChange(e)}
          options={[
            { value: "10", label: "10 / page" },
            { value: "20", label: "20 / page" },
            { value: "50", label: "50 / page" },
            { value: "100", label: "100 / page" },
          ]}
          disabled={count === 0 ? true : false}
        />
      </div>
    </div>
  );
};

export default TablePagination;
