import React from 'react';
import { WebMap, loadModules } from '@esri/react-arcgis';

import { getBirdSightings, getTopPhoto } from './lib/api';
import { createBirdGraphics } from './lib/utils';
import { mapConfig } from './config/defaults.json';

export class BirdMap extends React.Component {
  handleMapLoad = async (map, view) => {
    // Fetch bird sightings from eBird
    const response = await getBirdSightings();

    // Fetch bird photos of birds
    const birdPics = await Promise.all(
      response.map(ebird => getTopPhoto(ebird.sciName))
    );

    // Join birds and photos into objects
    const birdsWithPics = response.map((bird, i) => {
      return {
        ...bird,
        photo: birdPics[i].thumbnailUrl
      };
    });

    // Create JSAPI Graphics
    const [Graphic] = await loadModules(['esri/Graphic']);
    const graphics = createBirdGraphics(birdsWithPics, Graphic);

    // Add graphics to the map
    view.graphics.addMany(graphics);
  };

  render() {
    return (
      <div className="map-container">
        <WebMap
          className="map"
          id="50c28540c43947e6bb182821bf76d682"
          viewProperties={mapConfig}
          onLoad={this.handleMapLoad}
        />
      </div>
    );
  }
}

export default BirdMap;
