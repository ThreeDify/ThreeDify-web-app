import React from 'react';

import InputField from '../Components/InputField';
import { asPage } from '../Middlewares/asPage';

class Explore extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className='col-12'>
          <div className='search-section'>
            <div className='search-section-input'>
              <InputField
                type='text'
                name='search'
                placeholder='Search eg. Bottles, monkey'
                required='ture'
                leftIconName='search'
              />
              <p>
                You can search for publicly shared models and use for personal
                and business project for free
              </p>
            </div>
          </div>
          <div className='search-display'>
            <h2>Recently constructed models for you</h2>
            <div className=' mt-5 color-box'>
              <div className='recent-model'></div>
              <div className='recent-model'></div>
              <div className='recent-model'></div>
            </div>
            <div className=' color-box mt-3'>
              <div className='recent-model'></div>
              <div className='recent-model'></div>
              <div className='recent-model'></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default asPage(Explore);
