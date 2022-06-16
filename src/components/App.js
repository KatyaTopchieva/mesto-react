import React, { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from "./Card";
import { api } from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup' 

class App extends React.Component{
  
  constructor(props){
    super(props);

    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      currentUser: null
    }
  }

  handleUpdateUser = (currentUser) => {
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
    api.getUserInfo()//,
    //api.getCard()
  ])
  .then((values) => {
        const res = values[0];
        //this.setUserInfo(res.name, res.about, res.avatar);
        const userId = res._id;
        //res.cards =  values[1];
        this.handleUpdateUser(res);
        //const cards = values[1];
        //this.setCards(userId, cards);
      })
  
  .catch((err)=>{
    console.log(err);
  })
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
      />
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        buttonSecondText="Сохранение..."  
        isOpen={this.state.isEditAvatarPopupOpen}
        onClose={this.closeAllPopups}
        >
            <div className="popup__input-container">
              <input type="url" className="popup__input popup__input-edit-avatar"
                id="link-avatar-input" name="linkAvatar" placeholder ="Ссылка на аватар" required />
              <span className="popup__error link-avatar-input-error"></span>
            </div>
        </PopupWithForm>
        <EditProfilePopup 
          isOpen={this.state.isEditProfilePopupOpen} 
          onClose={this.closeAllPopups}
          onUpdateUser={this.handleUpdateUser} />
        <PopupWithForm
          name="card"
          title="Новое место"
          buttonText="Сохранить"
          buttonSecondText="Сохранение..."  
          isOpen={this.state.isAddPlacePopupOpen}
          onClose={this.closeAllPopups}>    
            <div className="popup__input-container">
              <input type="text" className="popup__input popup__input_card-name"
                id="card-name-input" name="card-name" placeholder="Название"
                required minLength="2" maxLength="30" />
              <span className="popup__error card-name-input-error"></span>
              <input type="url" className="popup__input popup__input_card-image"
                id="link-input" name="link" placeholder ="Ссылка на картинку" required />
              <span className="popup__error link-input-error"></span>
            </div>
        </PopupWithForm>
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
