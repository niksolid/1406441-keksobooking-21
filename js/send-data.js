'use strict';

(() => {
  const SEND_URL = `https://21.javascript.pages.academy/keksobooking`;

  const sendData = (data, submitResult) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      submitResult(true);
    });
    xhr.addEventListener(`error`, () => {
      submitResult(false);
    });
    xhr.addEventListener(`timeout`, () => {
      submitResult(false);
    });

    xhr.open(`POST`, SEND_URL);
    xhr.send(data);
  };

  const submitResult = (isSuccess) => {
    if (isSuccess) {
      window.activate.pageState(false);
      window.page.append(window.templates.success);
      window.templates.success.focus();
      window.util.eventRemoveElement(window.templates.success);
    } else {
      window.page.append(window.templates.error);
      window.templates.success.focus();
      window.util.eventRemoveElement(window.templates.error);
    }
  };

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    sendData(new FormData(window.adForm), submitResult);
  };

  window.adForm.addEventListener(`submit`, formSubmitHandler);

})();
