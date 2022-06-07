import React from "react";

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    showImage = ()=>{
        this.props.handleCardClick(this.props.link);
    }

    render() {
        return(
            <div className="elements__card">
                <img className="elements__image" src={this.props.link} onClick={this.showImage} alt={this.props.name} />
                <button className="elements__del" type="button"></button>
                <div className="elements__card-name">
                    <h2 className="elements__name">{this.props.name}</h2>
                    <div className="elements__like-container">
                    <button className="elements__button-like" type="button"></button>
                    <span className="elements__like-count"></span>
                    </div>
                </div>
            </div>       
        )
    };
}

export default Card;