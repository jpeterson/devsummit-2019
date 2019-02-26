import React, { Component } from 'react';
import { get } from 'axios';
import { uniqBy } from 'lodash';

import { WebMap, loadModules } from '@esri/react-arcgis';
import popupTemplate from './config/popupTemplate.json';

export class BirdMap extends Component {
  state = {
    birds: []
  };

  handleMapLoad = async (map, view) => {
    console.log({ map, view });
    window.map = map;
    window.view = view;

    const [Graphic] = await loadModules(['esri/Graphic']);
    const response = await get(
      `https://ebird.org/ws2.0/data/obs/geo/recent?lat=33.8303&lng=-116.5453&back=7&dist=5`,
      {
        headers: {
          'X-eBirdApiToken': process.env.REACT_APP_EBIRD_API_KEY
        }
      }
    );

    const birds = uniqBy(response.data, 'locId').map(ebird => {
      const imgNum = getRandomInt(1, 15);
      return new Graphic({
        geometry: { type: 'point', longitude: ebird.lng, latitude: ebird.lat },
        symbol: {
          type: 'picture-marker',
          url: `/birds/${imgNum}.svg`,
          height: '75',
          width: '63'
        },
        popupTemplate,
        attributes: { ...ebird }
      });
    });

    view.graphics.addMany(birds);
  };

  render() {
    return (
      <div className="map-container">
        <WebMap
          className="map"
          id="50c28540c43947e6bb182821bf76d682"
          onLoad={this.handleMapLoad}
        />
      </div>
    );
  }
}

export default BirdMap;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
