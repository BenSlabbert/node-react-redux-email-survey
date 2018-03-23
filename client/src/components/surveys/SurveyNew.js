import React, { Component } from 'react';

import SurveyForm from './SurveyForm';

/**
 * Shows SurveyForm and SurveyReview
 * @see SurveyForm, SurveyReview
 */
class SurveyNew extends Component {
    render() {
        return (
            <div>
                <SurveyForm/>
            </div>
        );
    }
}

export default SurveyNew;
