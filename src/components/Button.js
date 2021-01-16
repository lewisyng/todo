import React from 'react';
import './Button.sass';

function Button(props) {
    const {children, value} = props;

    return (
        <button className="customButton">
            {value}
        </button>
    )
}

export default Button
