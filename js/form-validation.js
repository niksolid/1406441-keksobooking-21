'use strict';

(() => {
  window.adForm = document.querySelector(`.ad-form`);
  window.roomNumber = window.adForm.querySelector(`#room_number`);

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

  const validCapacitySelection = (roomValue) => {
    capacity.appendChild(capacityFragment);
    const options = capacity.querySelectorAll(`option`);
    options.forEach((item) => {
      transferCapacityItem(item, roomValue);
    });
  };

  window.roomNumber.addEventListener(`input`, () => {
    const value = window.roomNumber.value;
    window.formValid.capacitySelection(value);
  });

  window.formValid = {
    capacitySelection: validCapacitySelection,
    getAddress: getAddressForm,
  };

})();
