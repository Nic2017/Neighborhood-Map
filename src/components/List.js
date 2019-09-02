import React, { Component } from 'react';
import Venues from './Venues';

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      venues: []
    };
  }

  handleFilterVenues = () => {
    if (this.state.query.trim() !== '') {
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return venues;
    }
    return this.props.venues;
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers });
  };

  render() {
    return (
      <div id="list" className="col-12 col-sm-3 d-lg-block">
        <h3 className="pt-3 pl-3">List of Sushi Canteens</h3>
        <div className="pl-3">
          <label className="sr-only" htmlFor="search">
            Search for a Sushi Canteen
          </label>
          <input
            className="form-control"
            type={'search'}
            id={'search'}
            placeholder={'Filter Sushi Canteens'}
            onChange={this.handleChange}
          />
        </div>
        <Venues
          {...this.props}
          venues={this.handleFilterVenues()}
          handleListItemClick={this.props.handleListItemClick}
        />
        <div className="mb-3 col-6 col-md-12 d-lg-block">
          <a
            href="https://developer.foursquare.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="img-fluid"
              src={require('../powered-by-foursquare-blue.png')}
              alt="Powered By Foursquare API Data"
            />
          </a>
        </div>
      </div>
    );
  }
}
