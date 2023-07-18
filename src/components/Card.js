import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.item.owner._id === currentUser._id;
  const isLiked = props.item.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`elements__like ${isLiked && 'elements__like_active'}`);

  function handleClick() {
    props.onCardClick(props.item);
  }

  function handleLikeClick() {
    props.onCardLike(props.item)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.item)
  }


  return (
    <div className="elements__item">
      {isOwn && <button type="button" aria-label="Удалить" className="elements__trash" onClick={handleDeleteClick}></button>}
      <img className="elements__image" src={props.item.link} alt={props.item.name} onClick={handleClick} />
      <div className="elements__container">
        <h2 className="elements__title">{props.item.name}</h2>
        <div className="elements__container_group">
          <button type="button" aria-label="Нравится" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <div className="elements__like_count">{props.item.likes.length}</div>
        </div>
      </div>
    </div>
  )
}
export default Card