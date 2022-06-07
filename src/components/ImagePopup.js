import React from "react";

class ImagePopup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`popup popup-image popup_theme-dark ${this.props.card ? 'popup_opened' : '' } `} >
                <div className="popup__container popup__container_image">
                <button className="popup__close-button button-close-image" type="button" onClick={this.props.onClose}></button>
                <figure className="popup__figure">
                    <img className="popup__image-card" src={this.props.card } alt={this.props.name} />
                    <figcaption className="popup__caption">{this.props.name}</figcaption>
                </figure>
                </div>
            </div>
        )
    }
}

export default ImagePopup