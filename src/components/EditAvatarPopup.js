import React from "react";
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { api } from '../utils/api.js';

function EditAvatarPopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setAvatar(currentUser?.avatar);
      }, [currentUser]);

      const [avatar, setAvatar] = React.useState('');

      let handleInputAvatar = (e) => {
        setAvatar(e.target.value)
    }

    const avatarRef = React.useRef();
    
    let submit = (event) =>{
        event.preventDefault();
        api.editAvatar(avatar)
           .then(value => {
              setAvatar(' ');
              props.onUpdateAvatar(value);
              props.onClose();
        })
    }
       
return (
    <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        buttonSecondText="Сохранение..."  
        isOpen={props.isOpen}
        onClose={props.onClose}
        submit={submit}
        >
            <div className="popup__input-container">
              <input 
                value={avatar||' '}
                onChange={handleInputAvatar}
                type="url" 
                className="popup__input popup__input-edit-avatar"
                id="link-avatar-input" 
                name="linkAvatar" 
                placeholder ="Ссылка на аватар" required />
              <span className="popup__error link-avatar-input-error"></span>
            </div>
    </PopupWithForm>
)
}

export default EditAvatarPopup;