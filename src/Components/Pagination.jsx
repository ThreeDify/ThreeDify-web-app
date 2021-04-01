import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Pagination as ReactPagination } from 'react-bootstrap';

export class Pagination extends Component {
  render() {
    const { total, page, pageSize } = this.props;
    const pageList = [];

    for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
      pageList.push(
        <ReactPagination.Item
          active={i === page}
          key={i}
          onClick={() => this.props.onPageChange(i)}
        >
          {i}
        </ReactPagination.Item>
      );
    }

    return (
      <ReactPagination>
        <ReactPagination.Prev
          disabled={page === 1}
          onClick={() => {
            this.props.onPageChange(page - 1);
          }}
        />
        {pageList}
        <ReactPagination.Next
          disabled={page >= total / pageSize}
          onClick={() => {
            this.props.onPageChange(page + 1);
          }}
        />
      </ReactPagination>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func
};

export default Pagination;
