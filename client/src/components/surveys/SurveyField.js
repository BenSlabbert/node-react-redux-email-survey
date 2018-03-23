import React from 'react';

/**
 * Logic to render single label and text input
 */
export default ( { input, label } ) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input}/>
        </div>
    );
}
