import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";

export const DataPaginate = ({ total, setPage, page, limit }) => {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    pageNumbers.push(i);
  }

  const paginate = async (i) => {
    await setPage(i);
  };

  return (
    <div className="w-100 d-flex justify-content-end">
      <Pagination size="md">
        <Pagination.Item
          key={0}
          active={0 === page}
          onClick={() => paginate(1)}
        >
          {"<<"}
        </Pagination.Item>
        <Pagination.Item
          key={0}
          active={0 === page}
          onClick={() => paginate(page > 1 ? page - 1 : 1)}
        >
          {"<"}
        </Pagination.Item>
        {pageNumbers.map((i) => (
          <Pagination.Item
            key={i}
            active={i === page}
            onClick={() => paginate(i)}
          >
            {i}
          </Pagination.Item>
        ))}
        <Pagination.Item
          key={0}
          active={0 === page}
          onClick={() =>
            paginate(
              page < Math.ceil(total / limit)
                ? page + 1
                : Math.ceil(total / limit)
            )
          }
        >
          {">"}
        </Pagination.Item>
        <Pagination.Item
          key={0}
          active={0 === page}
          onClick={() => paginate(Math.ceil(total / limit))}
        >
          {">>"}
        </Pagination.Item>
      </Pagination>
    </div>
  );
};

DataPaginate.propTypes = {
  total: PropTypes.number,
  setPage: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
};
