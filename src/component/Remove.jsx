import React, { Component } from 'react';
// import axios from 'axios'
// import route from '../config/route'
import firebase from '../config/firebase'

class Remove extends Component {
    constructor() {
        super()
        this.state = {
            numberInput: 0,
        }
    }

    updateInput = (e) => {
        // let value = e.target.value
        let newValue = parseInt(e.target.value)
        if (!isNaN(newValue)) {
            this.setState({ numberInput: "0" + newValue })
        }
        // console.log(typeof value)
        // console.log(value)

    }

    removeNumber = async () => {
        let { numberInput, removeList } = this.state
        let IntNumberInput = parseInt(this.state.numberInput)
        if (numberInput[0] + numberInput[1] === "05" && 500000000 < IntNumberInput && IntNumberInput < 559999999) {
            let data
            await firebase.database().ref('users/sms_broadcast/').once('value').then((snap) => {
                data = snap.val()[removeList]
            });
            // console.log(data, numberInput, removeList)
            if (data !== undefined && data !== null && data.users.length > 0) {
                this.setState({ numberInput: 0 })
                let deletedUser
                data.users.map(i => i[1] === IntNumberInput ? deletedUser = i[0] : null)
                data = data.users.filter(i => i[1] !== IntNumberInput)
                if (deletedUser !== undefined) {
                    alert(`The number of "${deletedUser}" Successfully deleted\n     המספר של "${deletedUser}" הוסר בהצלחה  `)
                    firebase.database().ref('users/sms_broadcast/' + removeList).set({
                        users: data
                    });
                } else {
                    alert("number not found")
                    // alert("something want wrong\nnumber not found\nor broadcast list doesn't exists any more")
                }
            } else { alert("broadcast list doesn't exists any more") }
        }
        else { alert("invalid number try agian || מספר לא חוקי נסה שוב") }
    }

    handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        this.setState({ [name]: value })
    }


    virefyBroadcastList = async () => {
        let broadcastList = this.state.removeList
        let data
        await firebase.database().ref('users/sms_broadcast/').once('value').then(function (snap) {
            if (snap.val() !== null) {
                data = snap.val()[broadcastList]
            }
        });
        let i = 0
        while ((data === null || data === undefined)) {
            let newBroadcastList = prompt(`we are sorry invalid remove code \npleese enter new remove code`)
            let saveReferences = false
            await firebase.database().ref('users/sms_broadcast/').once('value').then(function (snap) {
                console.log(snap.val())
                if (snap.val() !== null && snap.val()[newBroadcastList] !== undefined && snap.val()[newBroadcastList] !== null) {
                    saveReferences = true
                    return
                }
            });
            if (saveReferences) {
                broadcastList = newBroadcastList
                break
            }
            if (i >= 3) {
                alert("we are sorry invalid remove code")
                return
            }
            i++
        }
        this.setState(prevState => ({ virefyBroadcastList: !prevState.virefyBroadcastList, removeList: broadcastList }))
    }

    render() {
        return <div  data-role="page" data-url="/rm/rrHvx" tabIndex="0" className="removePage">
            {!this.state.virefyBroadcastList ?
                <div>
                    <h5> קוד הסרה </h5>
                    <input name="removeList" type="text" value={this.state.removeList || ""} onChange={this.handleChange} />
                    <button onClick={this.virefyBroadcastList}>Send </button>
                </div>
                :
                <div id="main_wrapper">
                    <h1> הסרה </h1>
                    <meta name="ROBOTS" content="NOINDEX, NOFOLLOW"></meta>
                    <div className="row"
                    >
                        <div className="page-header text-center">
                        </div>
                        <div className="control-group" id="div_phone">
                            <label htmlFor="username" className="control-label">  הכנס מספר טלפון לאימות:<br></br>  (!מספרים בלבד)</label>
                            <div className="ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c"><input value={this.state.numberInput} onChange={this.updateInput} type="tel" pattern="\d*" className="numbers-only ui-input-text ui-body-c" maxLength="10" name="phone" autoComplete="off" id="phone" ></input> </div>
                        </div>
                        <div
                        >
                            <br></br>
                            <div data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" data-disabled="false" className="ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all" aria-disabled="false"><span className="ui-btn-inner"><span className="ui-btn-text"></span></span><button onClick={this.removeNumber} className="btn btn-success ui-btn-hidden" name="submitEmail" id="submitPhone" data-disabled="false">  הסר </button></div>
                            <br></br>
                        </div>
                    </div>
                </div>
            }
        </div>
    }

}

export default Remove;
