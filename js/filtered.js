'use strict';

(() => {
  const housingType = window.mapFilters.querySelector(`#housing-type`);
  const housingPrice = window.mapFilters.querySelector(`#housing-price`);
  const housingRooms = window.mapFilters.querySelector(`#housing-rooms`);
  const housingGuests = window.mapFilters.querySelector(`#housing-guests`);
  const housingFeatures = window.mapFilters.querySelectorAll(`.map__checkbox`);
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;
  const MAX_PINS = 5;

  const standartVerify = (domElement, offerOption) => {
    return (domElement.value !== `any` && `${offerOption}` !== domElement.value) ? true : false;
  };

  const priceVerify = (domElement, offerOption) => {
    return ((domElement.value !== `any`) &&
      !((offerOption <= LOW_PRICE && domElement.value === `low`) ||
        (offerOption >= LOW_PRICE && offerOption <= HIGH_PRICE && domElement.value === `middle`) ||
        (offerOption >= HIGH_PRICE && domElement.value === `high`))
    ) ? true : false;
  };

  const featuresVerify = (domElements, offerOptions) => {
    const checkedElements = [];
    domElements.forEach((element) => {
      if (element.checked) {
        checkedElements.push(element.value);
      }
    });

    if (checkedElements.length === 0) {
      return false;
    }

    let isElementNotContain = false;
    checkedElements.forEach((element) => {
      if (offerOptions.indexOf(element) === -1) {
        isElementNotContain = true;
        return;
      }
    });

    return (isElementNotContain);
  };

  const pinVerify = (pinsObjects, i) => {

    const offerType = pinsObjects[i].offer.type;
    const offrePrice = pinsObjects[i].offer.price;
    const offerRooms = pinsObjects[i].offer.rooms;
    const offerGuests = pinsObjects[i].offer.guests;
    const offerFeatures = pinsObjects[i].offer.features;

    if (standartVerify(housingType, offerType) ||
      priceVerify(housingPrice, offrePrice) ||
      standartVerify(housingRooms, offerRooms) ||
      standartVerify(housingGuests, offerGuests) ||
      featuresVerify(housingFeatures, offerFeatures)) {
      pinsObjects.splice(i, 1);
    }

  };

  window.filteredPins = (pinsObjects) => {
    for (let i = pinsObjects.length - 1; i >= 0; i--) {
      pinVerify(pinsObjects, i);
    };

    pinsObjects.splice(MAX_PINS)

    return pinsObjects;
  };

})();
