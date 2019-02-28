import popupTemplate from '../config/popupTemplate.json';

function createBirdGraphics(birds, Graphic) {
  const graphics = birds.map(ebird => {
    const imgNum = getRandomInt(1, 16);

    const popupMedia = {
      title: ebird.comName,
      type: 'image',
      caption: ebird.sciName,
      value: {
        sourceURL: ebird.photo
      }
    };

    popupTemplate.content[1].mediaInfos = [popupMedia];

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

  return graphics;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export { createBirdGraphics };
