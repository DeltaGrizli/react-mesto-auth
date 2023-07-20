import success from '../images/Form_Ok.svg'
import fail from '../images/Form_Err.svg'


function InfoTooltip(props) {

    return (
      <div className={`popup popup_backblack ${props.isOpen ? `popup_opened` : ''}`} id={`${props.name}`} >
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={props.onClose}></button>
          <img src={props.isRightRegistration ? `${success}`:`${fail}`} alt="Статус проверки" className="popup__validation-auth" />
          <h2 className="popup__title">{props.isRightRegistration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!Попробуйте ещё раз.'}</h2>
        </div>
      </div>
    )
  }

  export default InfoTooltip;