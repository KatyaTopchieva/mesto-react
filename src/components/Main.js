import React from "react";
import Card from "./Card";
import { api } from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

class Main extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {
    super(props);

    this.state = {
      userName: '', 
      userDescription: '',
      userAvatar: '',
      cards: [],
      selectedCard: null 
    }
  }

  setCards(cards) {
    this.setState({
      cards: cards
    })
  }

  handleCardDelete(id) {
    api.deleteCard(id)
    .then(value => {
      const cards = this.state.cards.filter(x => x._id !== id);
      this.setCards(cards);
    })
  }

  handleCardLike = (id, isLiked) => {
   
    const card = this.state.cards.find(x => x._id === id);
    if(isLiked){
        api.deleteLike(id); 
    }else
    {
        api.addLike(id);    
        card.likes.push(this.context);        
    }

    //this.setCards(this.state.cards);
    this.cardsRefresh();
  }

  cardsRefresh(){
        Promise.all([
      //api.getUserInfo(),
      api.getCard()
    ])
    .then((values) => {
        //  const res = values[0];
          //this.setUserInfo(res.name, res.about, res.avatar);
          //const userId = res._id;
    
          //this.props.handleUserInfo(res);
          const cards = values[0];
          this.setCards(cards);
        })
    
    .catch((err)=>{
      console.log(err);
    })
  }

  componentDidMount() {
    this.cardsRefresh();
  }
  
  
  render(){
    return(
            <div className="content">
              <section className="profile">
                <div className="profile__avatar-container">
                <button className="profile__avatar-button" type="button" onClick={this.props.onEditAvatar}></button>
                  <img className="profile__avatar" src={this.context?.avatar} alt="Аватарка" />
                </div>
                <div className="profile__info">
                  <h1 className="profile__info-name">{this.context?.name}</h1>
                  <button className="profile__edit-button" type="button" onClick={this.props.onEditProfile}></button>
                  <p className="profile__info-job">{this.context?.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={this.props.onAddPlace}></button>
              </section>
              <section className="elements">
              {this.state?.cards.map((card, _id) => (
                    <Card 
                     key = {card._id}
                     id = {card._id}
                     name = {card.name}
                     link = {card.link}
                     ownerId = {card.owner._id}
                     likes = {card.likes}
                     handleCardClick = {this.props.handleCardClick}
                     onCardDelete = {this.handleCardDelete}
                     onCardLike = {this.handleCardLike}
                  />
                )
              )}
              </section>
            </div>      
    )
  }
}

export default Main;