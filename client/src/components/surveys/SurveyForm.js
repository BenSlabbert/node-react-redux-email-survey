import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';

const FIELDS = [
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'recipientList' }
];

/**
 * Shows for for user to add input
 */
class SurveyForm extends Component {

    renderFields() {
        return _.map(FIELDS, field => {
            return <Field key={field.name} component={SurveyField} type='text' {...field}/>
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <form
                    onSubmit={handleSubmit(values => console.log(values))}
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

    if (!values.title) errors.title = 'You must provide a title';

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);
