'use strict';

(() => {
  const housingType = window.mapFilters.querySelector(`#housing-type`);
  const housingPrice = window.mapFilters.querySelector(`#housing-price`);
  const housingRooms = window.mapFilters.querySelector(`#housing-rooms`);
  const housingGuests = window.mapFilters.querySelector(`#housing-guests`);
  const housingFeatures = window.mapFilters.querySelectorAll(`.map__checkbox`);
  const lowPrice = 10000;
  const highPrice = 50000;
  const featuresQuantity = 6;

  const standartVerify = (domElement, offerOption) => {
    return (domElement.value !== `any` && `${offerOption}` !== domElement.value) ? true : false;
  };

  const priceVerify = (domElement, offerOption) => {
    return ((domElement.value !== `any`) &&
      !((offerOption <= lowPrice && domElement.value === `low`) ||
        (offerOption >= lowPrice && offerOption <= highPrice && domElement.value === `middle`) ||
        (offerOption >= highPrice && domElement.value === `high`))
    ) ? true : false;
  }

  const featuresVerify = (domElements, offerOptions) => {
    const checkedElements = [];
    domElements.forEach((element) => {
      if (element.checked) {
        checkedElements.push(element.value)
      }
    })

    console.log(checkedElements)
    if (checkedElements.length === 0) {
      return false;
    }

    let isAss = false
    let count = 0;
    let ct = 0;
    checkedElements.forEach((element) => {
      // console.log('offerElement')
      // console.log(element)ооо
      if (offerOptions.indexOf(element) !== -1) {
        return count++
      } else {
        // console.log('kill!')
        return ct++
      };
    })
    console.log(`count === ${count}`)
    console.log(`ANTIcount === ${ct}`)

    // return (count <= checkedElements.length)
    return (ct === 0) ? false : true

    // let isAss = false
    // offerOptions.forEach((offerElement) => {
    //   console.log('offerElement')
    //   console.log(offerElement)
    //   if (checkedElements.indexOf(offerElement)) {
    //     return isAss = true
    //   };
    // })


    // console.log('false')
    // return isAss;d
  }


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
      // console.log(pinsObjects[i])
      pinsObjects.splice(i, 1);
    }

    // if (housingFeatures[0].checked) {
    // console.log(offerFeatures.length)
    // }
  };

  window.filteredPins = (pinsObjects) => {
    // console.log(pinsObjects)
    for (let i = pinsObjects.length - 1; i >= 0; i--) {
      pinVerify(pinsObjects, i);
    }
    console.log('цикол все')
    return pinsObjects;
  };

})();
