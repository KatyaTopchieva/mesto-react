import React from "react";
import Card from "./Card";
import { api } from '../utils/api.js';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '', 
      userDescription: '',
      userAvatar: '',
      cards: [],
      userId: '',
      selectedCard: null 
    }
  }

  setCards(userId, cards) {
    this.setState({
      userId: userId,
      cards: cards
    })
  }

  setUserInfo(userName, userDescription, userAvatar) {
    this.setState({
      userName: userName, 
      userDescription: userDescription,
      userAvatar: userAvatar
    })
  }

  componentDidMount() {
    Promise.all([
      api.getProfile(),
      api.getCard()
    ])
    .then((values) => {
          const res = values[0];
          this.setUserInfo(res.name, res.about, res.avatar);
          const userId = res._id;
    
          const cards = values[1];
          this.setCards(userId, cards);
        })
    
    .catch((err)=>{
      console.log(err);
    })
  }
  
  render(){
    return(
            <div className="content">
              <section className="profile">
                <div className="profile__avatar-container">
                <button className="profile__avatar-button" type="button" onClick={this.props.onEditAvatar}></button>
                  <img className="profile__avatar" src={this.state.userAvatar} alt="Аватарка" />
                </div>
                <div className="profile__info">
                  <h1 className="profile__info-name">{this.state.userName}</h1>
                  <button className="profile__edit-button" type="button" onClick={this.props.onEditProfile}></button>
                  <p className="profile__info-job">{this.state.userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={this.props.onAddPlace}></button>
              </section>
              <section className="elements">
              {this.state.cards.map((card, _id) => (
                    <Card 
                     key = {_id}
                     name = {card.name}
                     link = {card.link}
                     likes = {card.likes}
                     handleCardClick = {this.props.handleCardClick}
                  />
                )
              )}
              </section>
            </div>      
    )
  }
}

export default Main;