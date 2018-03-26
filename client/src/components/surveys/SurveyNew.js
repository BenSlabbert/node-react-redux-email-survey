import React, { Component } from 'react';

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

/**
 * Shows SurveyForm and SurveyReview
 * @see SurveyForm, SurveyReview
 */
class SurveyNew extends Component {

    // equivalent to classical constructor initialization
    state = { showReview: false };

    renderContent() {
        if (this.state.showReview) {
            return <SurveyFormReview
                onCancel={() => this.setState({ showReview: false })}
            />;
        } else {
            return <SurveyForm
                onSurveySubmit={() => this.setState({ showReview: true })}
            />;
        }
    }

    render() {
        return this.renderContent();
    }
}

export default SurveyNew;
