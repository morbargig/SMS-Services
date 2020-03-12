import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import route from '../config/route'
import firebase from '../config/firebase'
import Admin from './Admin';

class User extends Component {
    state = {
        userLogin: false
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ userLogin: !!user, user: firebase.auth().currentUser })
        })
        // this.setState({  user: firebase.auth().currentUser ,userLogin: true })
    }


    FacebookLogin = async () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        firebase.auth().useDeviceLanguage();
        provider.setCustomParameters({
            'display': 'popup'
        });
        // console.log("jhgfh")
        var user = null

        await firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // var token = result.credential.accessToken;

            // The signed-in user info.
            user = result.user
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // The email of the user's account used.
            // var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
        });
        if (user !== null) {
            // console.log(userInfo)
            firebase.database().ref('users/sms_users/').on('value', (snap) => {
                console.log(snap.val());
                if (snap.val() === null || snap.val()[user.displayName + "-" + user.uid] === undefined || snap.val()[user.displayName + "-" + user.uid] === null || snap.val()[user.displayName + "-" + user.uid].number === undefined) {
                    this.writeUserData(user)
                }
            })
        }
    }


    writeUserData = async (user) => {
        // let { displayName, uid, photoURL, email, phoneNumber } = this.state.user
        let { displayName, uid, photoURL, email, phoneNumber } = user
        let i = 0
        while (phoneNumber === null || parseInt(phoneNumber) > 599999999 || parseInt(phoneNumber) < 500000000) {
            if (i > 0) {
                phoneNumber = window.prompt("invalid phone number please try agin!")

            } else {
                phoneNumber = window.prompt("what is your phone number ?")
            }
            if (i >= 5) {
                alert("we are sorry you can't login without valid phone number")
                firebase.auth().signOut()
                return
            }
            i++
        }
        await firebase.database().ref('users/sms_users/' + displayName + "-" + uid).set({
            email: email,
            broadcastLists: [],
            name: displayName,
            number: phoneNumber,
            profile_picture: photoURL,
            sms_number: 0,
            userId: uid
        });
        this.setState({ user: user, userLogin: true });
    }



    render() {
        return <div>

            {this.state.userLogin ?
                <div>
                    Welcome {this.state.user.displayName} <button onClick={() => firebase.auth().signOut()}> log out</button>
                    <Admin state={this.state} />
                </div>
                : <div>
                    <button onClick={this.FacebookLogin}> Facebook Login</button>
                </div>}
        </div>
    }

}

export default User;
