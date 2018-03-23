import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';

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
                    <button className='btn' type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
