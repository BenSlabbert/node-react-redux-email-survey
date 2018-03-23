import React from 'react';

/**
 * Logic to render single label and text input
 */
export default ( { input, label, meta: { error, touched } } ) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input}/>
            {touched && error}
        </div>
    );
};
