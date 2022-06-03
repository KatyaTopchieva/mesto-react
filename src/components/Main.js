import React from "react";
import Card from "./Card";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return(
            <div className="content">
              <section className="profile">
                <div className="profile__avatar-container">
                <button className="profile__avatar-button" type="button" onClick={this.props.onEditAvatar}></button>
                  <img className="profile__avatar" src={this.props.userAvatar} alt="Аватарка" />
                </div>
                <div className="profile__info">
                  <h1 className="profile__info-name">{this.props.userName}</h1>
                  <button className="profile__edit-button" type="button" onClick={this.props.onEditProfile}></button>
                  <p className="profile__info-job">{this.props.userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={this.props.onAddPlace}></button>
              </section>
              <section className="elements">
              {this.props.cards.map((card, i) => (
                    <Card 
                     key = {i}
                     name = {card.name}
                     link = {card.link}
                     handleCardClick = {this.props.handleCardClick}
                  />
              ))}

              </section>
            </div>      
    )
  }
}

export default Main;