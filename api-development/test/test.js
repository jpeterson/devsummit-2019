require('dotenv').config()
const assert = require('assert');
import { getBirdSightings, getTopPhoto } from '../api';
import { expect } from 'chai';

describe('API', function() {
  describe('eBird', async function () {

    it('should return valid array', async function () {
      const birds = await getBirdSightings();
      expect(birds).to.be.an('array');
    });

    it('should have valid properties', async function () {
      const birds = await getBirdSightings();
      expect(birds[0]).to.include.keys(['speciesCode', 'lat', 'lng']);
    });
  });


  describe('getTopPhoto', async function() {

    it('should return valid JSON', async function() {
      const photo = await getTopPhoto('smile');
      expect(photo).to.be.an('object');
    });

    it('should have valid properties', async function () {
      const photo = await getTopPhoto('smile');
      expect(photo).to.include.keys(['contentUrl']);
    });
  });
});
