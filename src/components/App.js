import React, { useEffect, useState } from 'react';
// import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupAddCard from './PopupAddCard';
import PopupDeleteCard from './PopupDeleteCard';
import PopupEditAvatar from './PopupEditAvatar';
import PopupEditProfile from './PopupEditProfile';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(res => setCurrentUser(res))
      .catch(err =>
        console.log('Error :', err))
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then(res => setCards(res))
      .catch(err =>
        console.log('Error :', err))
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUserInfo(info) {
    api.patchUserInfo(info)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err =>
        console.log('Error :', err))
  }

  function handleUpdateAvatar(avatar) {
    api.patchAvatarInfo(avatar)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err =>
        console.log('Error :', err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err =>
          console.log('Error :', err))
    }
    else {
      api.putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err =>
          console.log('Error :', err))
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(res => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch(err =>
        console.log('Error :', err))
  }

  function handleAddNewPlace(newCard) {
    api.postNewCard(newCard)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err =>
        console.log('Error :', err))
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <PopupWithForm />
          <PopupEditAvatar
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupAddCard
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddNewPlace}
          />
          <PopupEditProfile
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdate={handleUpdateUserInfo}
          />
          <PopupDeleteCard
            onClose={closeAllPopups}
          />
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>

  );
}

export default App;