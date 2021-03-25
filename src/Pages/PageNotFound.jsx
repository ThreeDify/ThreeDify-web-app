import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import { asPage } from '../Middlewares/asPage';
import { HOME_URL } from '../Constants/appUrls';

export class PageNotFound extends Component {
  render() {
    return (
      <div className="col-8 my-4">
        <h1>;( Ooops!</h1>
        <p>The page you requested does not exists.</p>
        <Link className='btn btn-primary' to={HOME_URL}>Go to home</Link>
      </div>
    );
  }
}

export default asPage(PageNotFound);
