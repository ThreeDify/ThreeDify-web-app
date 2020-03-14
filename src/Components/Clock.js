import React from 'react';

import '../Themes/Clock.css';

function twoDigits(num) {
  return num.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
}

export default class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date() };
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  componentWillMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let hours = this.state.date.getHours();
    let minutes = twoDigits(this.state.date.getMinutes());
    let seconds = twoDigits(this.state.date.getSeconds());
    let meridiem = hours > 12 ? 'AM' : 'PM';

    hours = twoDigits(hours != 12 ? hours % 12 : hours);
    return (
      <div className='clock'>
        <span className='hours'>{hours}</span>
        <span className='minutes'>{minutes}</span>
        <span className='seconds'>{seconds}</span>
        <span className='meridiem'>{meridiem}</span>
      </div>
    );
  }
}
