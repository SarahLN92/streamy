import React, { Component } from 'react';
import { connect } from 'react-redux';
import {signIn, signOut } from '../Actions';

class GoogleAuth extends Component {
    componentDidMount(){
        window.gapi.load('client:auth2', () => {  //the gapi variable is only available on wondow scope** 
            window.gapi.client.init({
                clientId: '907377835913-737ek7nat4cri5lcj49qn7llblmh0g3i.apps.googleusercontent.com',
                scope: 'email',
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();

                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    // this is set up as an arrow function so the context is bound to the component. 
    onAuthChange = (isSignedIn) => { 
        if(isSignedIn){
            this.props.signOut();
        } else {
            this.props.signIn();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut()
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null){
            return null;
        }else if (this.props.isSignedIn){
            return <button className="ui red google button" onClick={this.onSignOutClick}><i className="google icon"/>Sign Out</button>
        } else {
            return <button className="ui red google button" onClick={this.onSignInClick}><i className="google icon"/>Sign In With Google</button>
        }
    }

    render() {
        return (
            <div>
              <div>{this.renderAuthButton()}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth }
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
