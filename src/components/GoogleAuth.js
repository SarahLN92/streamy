import React, { Component } from 'react';

class GoogleAuth extends Component {
    componentDidMount(){
        window.gapi.load('client:auth2', () => {  //the gapi variable is only available on wondow scope** 
            window.gapi.client.init({
                clientId: '907377835913-737ek7nat4cri5lcj49qn7llblmh0g3i.apps.googleusercontent.com',
                scope: 'email',
            });
        });
    }
    render() {
        return (
            <div>
                GoogleAuth 
            </div>
        );
    }
}

export default GoogleAuth;
