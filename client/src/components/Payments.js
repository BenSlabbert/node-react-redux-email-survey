import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name="Email Survey"
                description="$5 for 5 email credits"
                amount={500}
                token={token => this.props.handleStripeToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_PK}
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);
