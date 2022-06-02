import React from "react";

class PopupWithForm extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
        return (
        <div className={`popup ${this.props.isOpen ? 'popup_opened' : '' } popup_type_${this.props.name}` }>
        <div className="popup__container">
         <button className="popup__close-button" type="button" onClick={this.props.onClose}></button>
          <form method="get" className="popup__form" name={this.props.name} noValidate>
            <h2 className="popup__form-title">{this.props.title}</h2>
            <fieldset className="popup__fieldset">
              {this.props.children}
            </fieldset>
          </form>
        </div>
      </div>      
    )
  }
}

export default PopupWithForm;
