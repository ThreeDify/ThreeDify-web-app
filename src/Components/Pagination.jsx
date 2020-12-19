import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Pagination as ReactPagination } from 'react-bootstrap';

export class Pagination extends Component {
  render() {
    let pageList = [];

    for (let i = 1; i <= this.props.total; i++) {
      pageList.push(
        <ReactPagination.Item
          active={i === this.props.page}
          key={i}
          onClick={() => this.props.pageChangeHandler(i)}
        >
          {i}
        </ReactPagination.Item>
      );
    }

    return (
      <ReactPagination>
        <ReactPagination.Prev
          disabled={this.props.disablePrevious}
          onClick={() => {
            this.props.pageChangeHandler(this.props.page - 1);
          }}
        />
        {pageList}
        <ReactPagination.Next
          disabled={this.props.disableNext}
          onClick={() => {
            this.props.pageChangeHandler(this.props.page + 1);
          }}
        />
      </ReactPagination>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number,
  page: PropTypes.number,
  pageChangeHandler: PropTypes.func,
  disablePrevious: PropTypes.bool,
  disableNext: PropTypes.bool,
};

export default Pagination;
