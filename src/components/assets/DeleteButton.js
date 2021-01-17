import React from 'react';
import './DeleteButton.sass';

function DeleteButton(props) {
    const {value} = props;

    return (
        <button className="deleteButton">
            {value}
        </button>
    )
}

export default DeleteButton
