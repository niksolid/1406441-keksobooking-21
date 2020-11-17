'use strict';

(() => {
  window.renderPinPopup = (pin) => {
    const popup = window.templates.cardPopup.cloneNode(true);
    const popupAvatar = popup.querySelector(`.popup__avatar`);
    const popupTitle = popup.querySelector(`.popup__title`);
    const popupAddress = popup.querySelector(`.popup__text--address`);
    const popupPrice = popup.querySelector(`.popup__text--price`);
    const popupType = popup.querySelector(`.popup__type`);
    const popupCapacity = popup.querySelector(`.popup__text--capacity`);
    const popupTime = popup.querySelector(`.popup__text--time`);
    const popupFeatures = popup.querySelector(`.popup__features`);
    const popupDescription = popup.querySelector(`.popup__description`);
    const popupPhotos = popup.querySelector(`.popup__photos`);

    const replaceFeature = (popupChild) => {
      pin.offer.features.forEach((item) => {
        popupChild.append(popupFeatures.querySelector(`.popup__feature--${item}`));
      });
      return popupChild;
    };
    const replacePhoto = (popupChild) => {
      pin.offer.photos.forEach((item) => {
        const popupPhoto = popupPhotos.querySelector(`.popup__photo`).cloneNode(true);
        popupPhoto.src = item;
        popupChild.append(popupPhoto);
      });
      return popupChild;
    };

    const replaceChildrens = (popupParent, replaceFunction) => {
      const popupChild = popupParent.cloneNode(false);
      replaceFunction(popupChild);
      popupParent.replaceWith(popupChild);
    };

    popupAvatar.src = pin.author.avatar;
    popupTitle.textContent = pin.offer.title;
    popupAddress.textContent = pin.offer.address;
    popupPrice.textContent = `${pin.offer.price}₽/ночь`;
    switch (pin.offer.type) {
      case window.pinType.value.flat:
        popupType.textContent = window.pinType.content.flat;
        break;
      case window.pinType.value.bungalow:
        popupType.textContent = window.pinType.content.bungalow;
        break;
      case window.pinType.value.house:
        popupType.textContent = window.pinType.content.house;
        break;
      case window.pinType.value.palace:
        popupType.textContent = window.pinType.content.palace;
        break;
    }
    popupCapacity.textContent = `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостей`;
    popupTime.textContent = `Заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`;
    replaceChildrens(popupFeatures, replaceFeature);
    replaceChildrens(popupPhotos, replacePhoto);
    popupDescription.textContent = pin.offer.description;

    return popup;
  };
})();
