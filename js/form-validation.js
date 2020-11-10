'use strict';

(() => {
  const PIN_MAIN_SIZE = 65;
  const PIN_MAIN_SIZE_TIP = 22;

  const addressInput = window.adForm.querySelector(`#address`);
  const capacity = window.adForm.querySelector(`#capacity`);
  const capacityFragment = document.createDocumentFragment();

  const getAddressForm = (isActive) => {
    let axisX = parseInt(window.pinMain.style.left, 10);
    let axisY = parseInt(window.pinMain.style.top, 10);
    axisX = Math.floor(axisX + PIN_MAIN_SIZE / 2);
    if (isActive) {
      axisY = Math.floor(axisY + (PIN_MAIN_SIZE + PIN_MAIN_SIZE_TIP));
    } else {
      axisY = Math.floor(axisY + (PIN_MAIN_SIZE / 2));
    }
    addressInput.value = (`${axisX}, ${axisY}`);
  };

  const transferCapacityItem = (item, roomValue) => {
    if (+roomValue === 100 && +item.value !== 0) {
      capacityFragment.append(item);
    } else if (+item.value > +roomValue) {
      capacityFragment.append(item);
    } else if (+item.value === 0 && +roomValue !== 100) {
      capacityFragment.append(item);
    }
  };

  const capacitySelection = (roomValue) => {
    capacity.appendChild(capacityFragment);
    const options = capacity.querySelectorAll(`option`);
    options.forEach((item) => {
      transferCapacityItem(item, roomValue);
    });
  };

  const priceLimit = (minPrice) => {
    window.price.min = minPrice;
    window.price.placeholder = minPrice;
  };

  window.roomNumber.addEventListener(`input`, () => {
    const value = window.roomNumber.value;
    capacitySelection(value);
  });

  window.type.addEventListener(`input`, () => {
    switch (window.type.value) {
      case `bungalow`:
        priceLimit(0);
        break;
      case `flat`:
        priceLimit(1000);
        break;
      case `house`:
        priceLimit(5000);
        break;
      case `palace`:
        priceLimit(10000);
        break;
    }
  });

  window.formValid = {
    getAddress: getAddressForm
  };

  window.timein.addEventListener(`input`, () => {
    window.timeout.selectedIndex = window.timein.selectedIndex;
  });

  window.timeout.addEventListener(`input`, () => {
    window.timein.selectedIndex = window.timeout.selectedIndex;
  });

})();
