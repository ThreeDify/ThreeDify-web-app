import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class PaginationComponent extends Component {
  render() {
    let pageList = [];

    for (let i = 1; i <= this.props.total; i++) {
      pageList.push(
        <Pagination.Item
          active={i === this.props.page}
          key={i}
          onClick={() => this.props.pageChangeHandler(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return (
      <div>
        <Pagination>
          <Pagination.Prev
            disabled={this.props.disablePrevious}
            onClick={() => {
              this.props.pageChangeHandler(this.props.page - 1);
            }}
          />
          {pageList}
          <Pagination.Next
            disabled={this.props.disableNext}
            onClick={() => {
              this.props.pageChangeHandler(this.props.page + 1);
            }}
          />
        </Pagination>
      </div>
    );
  }
}

PaginationComponent.propTypes = {
  total: PropTypes.number,
  page: PropTypes.number,
  pageChangeHandler: PropTypes.func,
  disablePrevious: PropTypes.bool,
  disableNext: PropTypes.bool,
};

export default PaginationComponent;
