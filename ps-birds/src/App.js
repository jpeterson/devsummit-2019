import React, { Component } from 'react';

import BirdMap from './BirdMap';

import TopNav, {
  TopNavBrand,
  TopNavTitle,
  TopNavList,
  TopNavLink,
  TopNavActionsList
} from 'calcite-react/TopNav';

import './App.css';
import EsriLogo from './images/esri-logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav>
          <TopNavBrand href="#" src={EsriLogo} />
          <TopNavTitle href="#">eBird Sightings Near Me</TopNavTitle>
          <TopNavList />
          <TopNavActionsList>
            <TopNavLink href="#">Sign In</TopNavLink>
          </TopNavActionsList>
        </TopNav>
        <BirdMap />
      </div>
    );
  }
}

export default App;
