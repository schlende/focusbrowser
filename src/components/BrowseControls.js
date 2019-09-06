import React from 'react';

export default class BrowseControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="box">
        <span>
          <button>Back</button>
          <button>Forward</button>
          <button>Reload</button>
          <input type="text" />
        </span>
      </div>
    )
  }
}