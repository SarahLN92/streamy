import React, { Component } from 'react';

class GoogleAuth extends Component {
    state= { isSignedIn: null };
    componentDidMount(){
        window.gapi.load('client:auth2', () => {  //the gapi variable is only available on wondow scope** 
            window.gapi.client.init({
                clientId: '907377835913-737ek7nat4cri5lcj49qn7llblmh0g3i.apps.googleusercontent.com',
                scope: 'email',
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    // this is set up as an arrow function so the callback is bound to the component. 
    onAuthChange = () => { 
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null){
            return <div>Sign up? or Log in?</div>
        }else if (this.state.isSignedIn){
            return <div>Sign out?</div>
        } else {
            return <div>Sign in?</div>
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

export default GoogleAuth;
