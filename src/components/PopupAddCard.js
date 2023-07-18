import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function PopupAddCard({ isOpen, onClose, onAddPlace }) {
  const nameRef = useRef();
  const linkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault()

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    })
  }

  return (
    <PopupWithForm
      name={'popupAddCard'}
      title='Новое место'
      onClose={onClose}
      isOpen={isOpen}
      textButton='Создать'
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
                  id="editTitle"
                  minLength="2"
                  maxLength="30"
                  ref={nameRef}
                />
                <span className="form__input-error editTitle-error" />
              </div>
              <div className="form__section">
                <input
                  required
                  type="url"
                  name="link"
                  placeholder="Ссылка на картинку"
                  className="form__input form__input_format_subtitle"
                  id="editSubtitle"
                  ref={linkRef}
                />
                <span className="form__input-error editSubtitle-error" />
              </div>
        </>
      }
    />
  )
}

export default PopupAddCard