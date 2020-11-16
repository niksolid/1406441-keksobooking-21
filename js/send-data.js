'use stict';

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
      window.pageState(false);
      window.page.append(window.templates.success);
      window.util.eventRemoveElement(window.templates.success);
    } else {
      window.page.append(window.templates.error);
      window.util.eventRemoveElement(window.templates.error);

    };

  };

  const submitHandler = (evt) => {
    sendData(new FormData(window.adForm), submitResult);
    evt.preventDefault();
  };

  window.adForm.addEventListener(`submit`, submitHandler);

})();
