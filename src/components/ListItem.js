import React, { Component } from 'react';

export default class ListItem extends Component {
  render() {
    return (
      <div className="listItem" onClick={() => this.props.handleListItemClick(this.props)}>
        <h6
          className="card-title pointer font-weight-bold"
          data-toggle="collapse"
          data-target={`#a${this.props.id}`}
          aria-expanded="false"
          aria-controls="collapseCardText"
        >
          {this.props.name}
        </h6>
        <div
          id={`a${this.props.id}`}
          className="collapse"
          aria-labelledby="listItem1"
          data-parent="#accordionList"
        >
          <p className="card-text">
            {this.props.location.formattedAddress[0]}
            <br />
            {this.props.location.formattedAddress[1]}
          </p>
        </div>
        <hr/>
      </div>
    );
  }
}
