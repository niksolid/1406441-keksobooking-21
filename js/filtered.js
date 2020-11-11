'use strict';

(() => {
    const housingType = window.mapFilters.querySelector(`#housing-type`);

    const pinVerify = (pinsObjects, i) => {
      if (housingType.value !== `any` && pinsObjects[i].offer.type !== housingType.value) {
        pinsObjects.splice(i, 1);
      }
    };

    window.filteredPins = (pinsObjects) => {
      for (let i = pinsObjects.length - 1; i >= 0; i--) {
        pinVerify(pinsObjects, i);
      }
      return pinsObjects;
    };

})();
