import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import FORM_FIELDS from './formFields';

/**
 * Shows for for user to add input
 */
class SurveyForm extends Component {

    renderFields() {
        return _.map(FORM_FIELDS, field => {
            return <Field key={field.name} component={SurveyField} type='text' {...field}/>
        });
    }

    render() {
        const {
            handleSubmit, // free from redux-form
            onSurveySubmit // provided from parent
        } = this.props;

        return (
            <div>
                <form
                    onSubmit={handleSubmit(onSurveySubmit)}
                >
                    {this.renderFields()}
                    <Link to='/surveys' className='red btn-flat left white-text'>
                        Cancel
                    </Link>
                    <button
                        className='teal btn-flat right white-text'
                        type='submit'
                    >
                        Next
                        <i className='material-icons right'>arrow_forward</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate( values ) {
    let errors = {};

    _.each(FORM_FIELDS, ( { name } ) => {
        if (!values[name]) errors[name] = `You must provide a ${name}`;
    });

    if (!errors.emails)
        errors.emails = validateEmails(values.emails);

    return errors;
}

export default reduxForm({
    validate, // validation function
    form: 'surveyForm', // namespace for this form
    destroyOnUnmount: false
})(SurveyForm);
