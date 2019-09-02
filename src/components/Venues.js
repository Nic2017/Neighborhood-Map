import React, { Component } from 'react';
import ListItem from './ListItem';

export default class List extends Component {
  render() {
    return (
      <div className="accordion pl-3" id="accordionList">
        <div className="card mb-3">
          <div id="listItem1" className="card-body">
            {this.props.venues &&
              this.props.venues.map((venue, index) => (
                <ListItem key={index} {...venue} handleListItemClick={this.props.handleListItemClick} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}
