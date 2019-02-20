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
    // this is set up as an arrow function so the context is bound to the component. 
    onAuthChange = () => { 
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    onSignIn = () => {
        this.auth.signIn();
    };

    onSignOut = () => {
        this.auth.signOut()
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null){
            return null;
        }else if (this.state.isSignedIn){
            return <button className="ui red google button" onClick={this.onSignOut}><i className="google icon"/>Sign Out</button>
        } else {
            return <button className="ui red google button" onClick={this.onSignIn}><i className="google icon"/>Sign In With Google</button>
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
