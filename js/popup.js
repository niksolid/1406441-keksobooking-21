'use strict';

(() => {
  const replaceFeature = (popupCollection) => {
    const popupChild = popupCollection.popupFeatures.cloneNode(false);
    popupCollection.pinObject.offer.features.forEach((item) => {
      popupChild.append(popupCollection.popupFeatures.querySelector(`.popup__feature--${item}`));
    });
    popupCollection.popupFeatures.replaceWith(popupChild);
  };
  const replacePhoto = (popupCollection) => {
    const popupChild = popupCollection.popupPhotos.cloneNode(false);
    popupCollection.pinObject.offer.photos.forEach((item) => {
      const popupPhoto = popupCollection.popupPhotos.querySelector(`.popup__photo`).cloneNode(true);
      popupPhoto.src = item;
      popupChild.append(popupPhoto);
    });
    popupCollection.popupPhotos.replaceWith(popupChild);
  };

  const replaceChildrens = (popupCollection, replaceFunction) => {
    replaceFunction(popupCollection);
  };

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

    const popupCollection = {
      pinObject: pin,
      popupFeatures: popupFeatures,
      popupPhotos: popupPhotos
    };

    const {author, offer} = pin;

    popupAvatar.src = author.avatar;
    popupTitle.textContent = offer.title;
    popupAddress.textContent = offer.address;
    popupPrice.textContent = `${offer.price}₽/ночь`;
    switch (offer.type) {
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
    replaceChildrens(popupCollection, replaceFeature);
    replaceChildrens(popupCollection, replacePhoto);
    popupDescription.textContent = pin.offer.description;

    return popup;
  };
})();
