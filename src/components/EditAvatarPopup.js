import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { api } from '../utils/api.js';

class EditAvatarPopup extends React.Component {
    static contextType = CurrentUserContext;
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

}