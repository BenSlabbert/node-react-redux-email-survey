import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import SurveyField from './SurveyField';

/**
 * Shows for for user to add input
 */
class SurveyForm extends Component {

    renderFields() {
        return (
            <div>
                <Field
                    type='text'
                    name='title'
                    component={SurveyField}
                />
            </div>
        );
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
