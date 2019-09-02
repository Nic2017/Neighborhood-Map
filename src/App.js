import React, { Component } from 'react';
import SquareAPI from './API/helperAPI';
import Map from './components/Map';
import List from './components/List';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });//close all the markers; this.state.markers的值不变，markers变量作为中间变量
    this.setState({ markers: Object.assign(this.state.markers, markers) });//第一个markers是this.state的数组
  };

  handleMarkerClick = marker => {
    this.closeAllMarkers();//close all except one
    marker.isOpen = true;//open this marker
    this.setState({ markers: Object.assign(this.state.markers, marker) });//要用source值覆盖，所以marker在后

    const venue = this.state.venues.find(venue => venue.id === marker.id);//从API找到对应地点及地点信息
    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
    });
  };

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);//使得点击list等价于点击marker
  };

//初始化
  componentDidMount() {
    SquareAPI.search({
      query: 'sushi',
      near: 'Pudong,Shanghai',
      limit: 20
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({ venues, markers, center });
    });
  }

  render() {
    return (
      <main>
        <header id="title">
          <h1><strong>Welcome to the Neighborhood Map</strong></h1>
          <h2><i>This map shows Sushi Canteens in Pudong, Shanghai</i></h2>
        </header>
        <section>
          <div className="row">
            <List {...this.state} handleListItemClick={this.handleListItemClick} />
            <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />
          </div>
        </section>
      </main>
    );
  }
}

export default App;
