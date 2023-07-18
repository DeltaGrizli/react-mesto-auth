import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function PopupEditAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef()

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={'popupEditAvatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      textButton={'Сохранить'}
      handleSubmit={handleSubmit}
      children={
        <>
          <div className="form__section">
                <input
                  ref={inputRef}
                  type="url"
                  name="avatar"
                  placeholder="Ссылка на новый аватар"
                  className="form__input"
                  id="avatar"
                  minLength="2"
                  required
                />
                <span className="form__input-error avatar-error" />
              </div>
        </>
      }
    />
  )
}

export default PopupEditAvatar