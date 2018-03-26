import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import FORM_FIELDS from './formFields';

/**
 * Show inputs for form
 */
const SurveyFormReview = ( { onCancel, formValues } ) => {

    const reviewFields = _.map(FORM_FIELDS, ( { name, label } ) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Confirm inputs</h5>
            <div>
                {reviewFields}
            </div>
            <button
                className='yellow darken-3 btn-flat'
                onClick={onCancel}
            >
                Back
                <i className='material-icons left'>arrow_back</i>
            </button>
        </div>
    );
};

function mapStateToProps( state ) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyFormReview);
