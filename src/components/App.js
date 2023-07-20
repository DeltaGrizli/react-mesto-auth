import React, { useEffect, useState } from 'react';
// import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupAddCard from './PopupAddCard';
//import PopupDeleteCard from './PopupDeleteCard';
import PopupEditAvatar from './PopupEditAvatar';
import PopupEditProfile from './PopupEditProfile';
//import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { auth } from '../utils/Auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState(false)
  const [width, setWidth] = React.useState(window.innerWidth);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRightRegistration, setRightRegistration] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = (e) => {
      setWidth(e.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then(res => setCurrentUser(res))
        .catch(err =>
          console.log('Error :', err))
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then(res => setCards(res))
        .catch(err =>
          console.log('Error :', err))
    }
  }, [loggedIn])

  useEffect(() => {
    tokenCheck();
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
    setInfoTooltipOpen(false);
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

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        auth.checkToken(jwt).then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email)
          }
        })
          .catch(err =>
            console.log('Error :', err));
      };
    }
  }

  function handleActiveMenu() {
    setActiveMenu(!activeMenu);
  }

  function handleSubmitRegister(dataReg) {
    auth.register(dataReg)
      .then((data) => {
        setRightRegistration(true);
        setInfoTooltipOpen(true);
        navigate("/sign-in", { replace: true })
      })
      .catch((err) => {
        console.log(`Ошибка. Запрос не выполнен ${err}`);
        setRightRegistration(false);
        setInfoTooltipOpen(true);
      })
  }

  function handleSubmitLogin(data1) {
    auth.login(data1)
      .then((data) => {
        setLoggedIn(true)
        setEmail(data1.email)
        localStorage.setItem('jwt', data.token)
      })
      .catch((err) => {
        console.log(`Ошибка. Запрос не выполнен ${err}`);
        setRightRegistration(false);
        setInfoTooltipOpen(true);
      })
  }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className="page">
          {loggedIn ? <Header
            email={email}
            link={"/sign-in"}
            textLink={"Выйти"}
            isMobile={width <= 580}
            handleActiveMenu={handleActiveMenu}
            activeMenu={activeMenu}
            loggedIn={loggedIn}
            onLogOut={handleLogOut}
          /> : ''}
          <Routes>
            <Route path="/" element={<ProtectedRoute element={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn} />} />
            <Route path="/sign-in" element={loggedIn ? <Navigate to="/" replace /> : <Login onLoginUser={handleSubmitLogin} />} />
            <Route path="/sign-up" element={loggedIn ? <Navigate to="/" replace /> : <Register onRegisterUser={handleSubmitRegister} />} />
          </Routes>
          {loggedIn ? <Footer /> : ''}
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          {/* <PopupWithForm /> */}
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
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isRightRegistration={isRightRegistration}
          />
          {/* <PopupDeleteCard
            onClose={closeAllPopups}
          /> */}
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>

  );
}

export default App;