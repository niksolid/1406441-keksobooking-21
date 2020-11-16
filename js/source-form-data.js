'use strict';

(() => {
  const pinMainCoords = {
    top: window.pinMain.style.top,
    left: window.pinMain.style.left
  }
  const filterSelects = window.mapFilters.querySelectorAll(`select`);
  const housingFeatures = window.mapFilters.querySelectorAll(`.map__checkbox`);

  window.adForm = document.querySelector(`.ad-form`);

  window.formData = {
    title: window.adForm.querySelector(`#title`),
    price: window.adForm.querySelector(`#price`),
    type: window.adForm.querySelector(`#type`),
    roomNumber: window.adForm.querySelector(`#room_number`),
    capacity: window.adForm.querySelector(`#capacity`),
    description: window.adForm.querySelector(`#description`),
    timein: window.adForm.querySelector(`#timein`),
    timeout: window.adForm.querySelector(`#timeout`),
    features: window.adForm.querySelectorAll(`.feature__checkbox`),
  }
  window.formData.price.min = 1000;

  const sourcePageState = {
    type: window.formData.type.selectedIndex,
    price: window.formData.price.placeholder,
    roomNumber: window.formData.roomNumber.selectedIndex,
    roomNumber: window.formData.roomNumber.selectedIndex,
    capacity: window.formData.capacity.value,
    timein: window.formData.timein.selectedIndex,
    timeout: window.formData.timeout.selectedIndex,
  }

  const resetFeatures = (elements) => {
    elements.forEach((element) => {
      element.checked = (false);
    });
  };

  const timeinEvent = () => {
    window.formData.timeout.selectedIndex = window.formData.timein.selectedIndex;
  }
  const timeoutEvent = () => {
    window.formData.timein.selectedIndex = window.formData.timeout.selectedIndex;
  }

  window.timeSynсForm = () => {
    window.formData.timein.removeEventListener(`input`, timeinEvent)
    window.formData.timein.removeEventListener(`input`, timeoutEvent)

    window.formData.timein.selectedIndex = sourcePageState.timein;
    window.formData.timeout.selectedIndex = sourcePageState.timeout;

    window.formData.timein.addEventListener(`input`, timeinEvent)
    window.formData.timeout.addEventListener(`input`, timeoutEvent)
  }


  const resetFilters = () => {
    filterSelects.forEach((select) => {
      select.value = `any`;
    });

  };


  window.returnPageForm = () => {
    window.formData.title.value = ``;
    window.formData.type.selectedIndex = sourcePageState.type;
    window.formData.price.placeholder = sourcePageState.price;
    window.formData.roomNumber.selectedIndex = sourcePageState.roomNumber;
    window.capacitySelection(window.formData.roomNumber.value);
    window.formData.placeholder = 5000;
    window.formData.price.value = ``;
    window.formData.description.value = ``;
    window.pinMain.style.top = pinMainCoords.top;
    window.pinMain.style.left= pinMainCoords.left;
    window.timeSynсForm();
    resetFeatures(window.formData.features);
    resetFeatures(housingFeatures);
    resetFilters();
  };

})();
