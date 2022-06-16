import React, { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup' 
import AddPlacePopup from './AddPlacePopup';

class App extends React.Component{
  
  constructor(props){
    super(props);

    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      currentUser: null,
      cards: []
    }
  }

  setCards(cards) {
    this.setState({
      cards: cards
    })
  }

  handleCardDelete = (id) => {
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
  }

  handleUpdateUser = (currentUser) => {
    this.setState( {currentUser: currentUser} );
  }

  handleUpdateAvatar = (currentUser) => {
    this.setState( {currentUser: currentUser} );
  }
  
  handleEditAvatarClick = () => {
  this.setState({isEditAvatarPopupOpen: true});
}

 handleEditProfileClick = () => {
  this.setState({isEditProfilePopupOpen: true});
}

  handleAddPlaceClick = () => {
    this.setState({isAddPlacePopupOpen: true});
}

handleCardClick = (selectedCard) => {
  this.setState({selectedCard: selectedCard});
}
  
closeAllPopups = () => {
  this.setState({isEditAvatarPopupOpen: false});
  this.setState({isEditProfilePopupOpen: false});
  this.setState({isAddPlacePopupOpen: false});
  this.setState({selectedCard: null});
}

componentDidMount() {
  Promise.all([
    api.getUserInfo(),
    api.getCard()
  ])
  .then((values) => {
        const res = values[0];
        const userId = res._id;
        this.handleUpdateUser(res);        
        this.handleUpdateAvatar(res);
        const cards = values[1];
        this.setCards(cards);
      })
  
  .catch((err)=>{
    console.log(err);
  })
}

handlerAddCard = (newCard) =>{
  this.setCards([newCard, ...this.state.cards]); 
}

render() {
  return (
    <CurrentUserContext.Provider value={this.state.currentUser}>
      <div className="App page">
      <Header />
      <Main 
          onEditAvatar={this.handleEditAvatarClick}
          onEditProfile={this.handleEditProfileClick}
          onAddPlace={this.handleAddPlaceClick}
          userName={this.state.userName}
          userDescription={this.state.userDescription}
          userAvatar={this.state.userAvatar}
          cards={this.state.cards}
          userId={this.state.userId}
          handleCardClick={this.handleCardClick}
          handleCardDelete={this.handleCardDelete}
          handleCardLike={this.handleCardLike}
      />
        <EditAvatarPopup 
          isOpen={this.state.isEditAvatarPopupOpen}
          onClose={this.closeAllPopups}
          onUpdateAvatar={this.handleUpdateAvatar} /> 
        <EditProfilePopup 
          isOpen={this.state.isEditProfilePopupOpen} 
          onClose={this.closeAllPopups}
          onUpdateUser={this.handleUpdateUser} />
        <AddPlacePopup 
          isOpen={this.state.isAddPlacePopupOpen} 
          onClose={this.closeAllPopups}
          onAddCard={this.handlerAddCard}
          />
        <PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonText="Да"
        buttonSecondText=" "  
        isOpen={false}
        onClose={this.closeAllPopups}>
        </PopupWithForm>
        <ImagePopup
        card={this.state.selectedCard} 
        onClose={this.closeAllPopups}/>
        <Footer />         
        </div>    
    </CurrentUserContext.Provider>
  );
 }
}

export default App;
