import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupEditProfile({ isOpen, onClose, onUpdate }) {
  const [userName, setNameForm] = useState('')
  const [description, setDescription] = useState('')
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setNameForm(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdate({
      name: userName,
      about: description
    })
  }

  function handleChangeName(e) {
    setNameForm(e.target.value)
  }
  function handleChangedescription(e) {
    setDescription(e.target.value)
  }

  return (
    <PopupWithForm
      name={'popupEditProfile'}
      title={'Редактировать профиль'}
      onClose={onClose}
      isOpen={isOpen}
      textButton='Сохранить'
      handleSubmit={handleSubmit}
      children={
        <>
          <div className="form__section">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Имя"
                  className="form__input form__input_format_title"
                  id="editProfileTitle"
                  minLength="2"
                  maxLength="40"
                  value={userName || ''}
                  onChange={handleChangeName}
                />
                <span className="form__input-error editProfileTitle-error" />
              </div>
              <div className="form__section">
                <input
                  required
                  type="text"
                  name="about"
                  placeholder="Профессия"
                  className="form__input form__input_format_subtitle"
                  id="editProfileSubtitle"
                  minLength="2"
                  maxLength="200"
                  value={description || ''}
                  onChange={handleChangedescription}
                />
                <span className="form__input-error editProfileSubtitle-error" />
              </div>
        </>
      }
    />
  )
}

export default PopupEditProfile