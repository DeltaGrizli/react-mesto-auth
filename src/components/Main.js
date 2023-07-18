import React, { useContext } from "react";
import { api } from "../utils/Api.js";
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';

function Main({ onAddPlaceClick, onEditAvatar, onCardClick, onEditProfile, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardContext);


  return (
    <main className="content">
      <section className="profile">
        <button type="button" className="profile__content" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title" >{currentUser.name}</h1>
          <button className="profile__button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile} />
          <p className="profile__subtitle" >{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlaceClick} />
      </section>
      <section className="elements">
        {cards.map(item => {
          return (
            <Card
              link={item.link}
              key={item._id}
              name={item.name}
              likesCount={item.likes.length}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              item={item}
            />)
        })}
      </section>
    </main>
  );
}

export default Main;