import React from 'react';

export function asPage(WrappedComponent) {
  return class BasePage extends React.Component {
    render() {
      return (
        <div className='container'>
          <div className='row justify-content-center'>
            <WrappedComponent></WrappedComponent>
          </div>
        </div>
      );
    }
  };
}
