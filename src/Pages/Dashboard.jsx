import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import Icon from '../Components/Icon';
import { asPage } from '../Middlewares/asPage';
import Pagination from '../Components/Pagination';
import { getAxiosInstance } from '../Utils/axios';
import authenticate from '../Middlewares/authenticate';
import { USER_RECONSTRUCTIONS_API } from '../Constants/apiUrls';
import ReconstructionCard from '../Components/ReconstructionCard';
import withAuthenticatedUser from '../Middlewares/withAuthenticatedUser';

const SORT_ORDER = 'DESC';
const NUM_RECONSTRUCTIONS = 6;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      reconstructions: [],
      key: 'all',
      total: 0,
      page: 1,
    };

    this.tabChangeHandler = this.tabChangeHandler.bind(this);
    this.pageChangeHandler = this.pageChangeHandler.bind(this);
  }

  tabChangeHandler(k) {
    if (k === this.state.key) return;
    this.setState(
      {
        key: k,
        reconstructions: [],
        total: 0,
        page: 1,
      },
      () => this.fetchModels()
    );
  }

  pageChangeHandler(value) {
    if (value === this.state.page) return;
    this.setState(
      {
        page: value,
        reconstructions: [],
      },
      () => this.fetchModels()
    );
  }

  async fetchModels() {
    this.setState({
      loading: true,
    });

    const axios = await getAxiosInstance();
    try {
      let filters = this.state.key === 'all' ? '' : this.state.key;
      let resp = await axios.get(
        USER_RECONSTRUCTIONS_API.replace('{userId}', this.props.user.id),
        {
          params: {
            page: this.state.page,
            size: NUM_RECONSTRUCTIONS,
            order: SORT_ORDER,
            filters: 'orderByCreatedAt' + (filters ? `,${filters}` : ''),
          },
        }
      );
      this.setState({
        reconstructions: resp.data.data,
        loading: false,
        total: resp.data.total,
      });
    } catch (err) {
      this.setState({
        reconstructions: [],
        total: 0,
        loading: false,
      });
    }
  }

  componentDidMount() {
    this.fetchModels();
  }

  getTabContent(eventKey, title, cards) {
    const isActive = this.state.key == eventKey;
    return (
      <Tab eventKey={eventKey} title={title}>
        {this.state.loading ? (
          <div className="loading">
            <Icon name="spinner" size="3x" spin={true} />
          </div>
        ) : (
          isActive && <div className="d-flex flex-wrap">{cards}</div>
        )}
      </Tab>
    );
  }

  render() {
    const selectedList = this.state.reconstructions;
    let cards =
      selectedList.length > 0 ? (
        selectedList.map((reconstruction, index) => (
          <div key={index} className="m-2">
            <ReconstructionCard
              reconstruction={reconstruction}
              small
              showState
            />
          </div>
        ))
      ) : (
        <p className="reconstruction-not-found">
          <i>
            <Icon
              className="exclamation-circle"
              name={['fas', 'exclamation-circle']}
              size="1x"
            />
          </i>
          Reconstructions not found!
        </p>
      );

    return (
      <div className="col-12 my-5">
        <h3>Dashboard</h3>

        <div>
          <Tabs
            defaultActiveKey="all"
            activeKey={this.state.key}
            onSelect={this.tabChangeHandler}
          >
            {this.getTabContent('all', 'All', cards)}
            {this.getTabContent('completed', 'Completed', cards)}
            {this.getTabContent('inProgress', 'In Process', cards)}
            {this.getTabContent('inQueue', 'In Queue', cards)}
            {this.getTabContent('failed', 'Failed', cards)}
          </Tabs>

          {this.state.total > NUM_RECONSTRUCTIONS && (
            <Pagination
              total={this.state.total}
              onPageChange={this.pageChangeHandler}
              page={this.state.page}
              pageSize={NUM_RECONSTRUCTIONS}
            />
          )}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
};

export default asPage(
  withRouter(withAuthenticatedUser(authenticate(Dashboard)))
);
