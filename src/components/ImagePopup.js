function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_backblack ${card ? `popup_opened` : ''}`} id="photoImage">
            <div className="popup__container popup__container_image">
                {card && (
                    <>
                        <img src={card?.link} alt={card?.name} className="popup__photo" />
                        <p className="popup__name" >{card.name}</p>
                    </>)
                }
                <button type="button" aria-label="Закрыть" className="popup__close" onClick={onClose}/>
            </div>
        </div>
    )
}
export default ImagePopup