import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import axios from 'axios'
import route from '../config/route'
import firebase from '../config/firebase'
import { BroadcastList } from '../funcCmponent/BroadcastList'
import readXlsxFile from 'read-excel-file'
import '../CSS/workPage.css'

class Admin extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount = async () => {
        firebase.database().ref('users/sms_users/').on('value', (snap) => {
            // console.log(snap.val());
            let { displayName, uid } = this.props.state.user
            // console.log(user)
            if (snap.val() !== null && snap.val()[displayName + "-" + uid] !== null && snap.val()[displayName + "-" + uid] !== undefined) {
                this.setState({
                    broadcastLists: snap.val()[displayName + "-" + uid].broadcastLists
                })
            }
        });
    }

    sendMassege = async (e) => {
        let { displayName, uid } = this.props.state.user
        let data
        let name = e.target.name
        let broadcastListName = this.state.broadcastList
        await firebase.database().ref('users/sms_users/').once('value').then(function (snap) {
            if (snap.val() !== null) {
                data = snap.val()[displayName + "-" + uid]
            }
        });
        if (name === "test") {
            if (data !== undefined && data !== null) {
                console.log(data, data.lastTest)
                if (data.lastTest !== new Date().toString().slice(0, 15)) {
                    firebase.database().ref('users/sms_users/' + displayName + "-" + uid).set({
                        email: data.email,
                        broadcastLists: data.broadcastLists ? data.broadcastLists : null,
                        name: data.name,
                        number: data.number,
                        profile_picture: data.profile_picture,
                        sms_number: data.sms_number,
                        userId: data.userId,
                        lastTest: new Date().toString().slice(0, 15),
                    });
                } else { alert("we sorry only one test allowed per day"); return }
            }
            let from = prompt("Please enter from who this message");
            let to = ("972" + parseInt(data.number).toString()).toString()
            // function to send one sms to here
            await axios.post(`${route}sendSms/${from}/${to}`, {
                text: this.state.text + "\nRemove cod:\n" + broadcastListName + "-" + uid + "\nRemove link:\n http://bit.ly/2v5ZFFA"
            })
            alert("send massage from " + from + " to " + to)
        } else {


            let broadcastList
            await firebase.database().ref('users/sms_broadcast/').once('value').then(function (snap) {
                if (snap.val() !== null) {
                    broadcastList = snap.val()[broadcastListName + "-" + uid]
                }
            });
            console.log(broadcastList)
            console.log(data.sms_number, broadcastList.users.length)
            if (broadcastList !== undefined && data.sms_number > broadcastList.users.length) {
                alert("send " + broadcastList.users.length + " massages")
                let from = prompt("Please enter from who this message");
                for (let i of broadcastList.users) {
                    let to = ("972" + parseInt(i[1]).toString()).toString()
                    await axios.post(`${route}sendSms/${from}/${to}`, {
                        text: this.state.text + "\nRemove cod:\n" + broadcastListName + "-" + uid + "\nRemove link:\n http://bit.ly/2v5ZFFA"
                    })
                }
                firebase.database().ref('users/sms_users/' + displayName + "-" + uid).set({
                    email: data.email,
                    broadcastLists: data.broadcastLists,
                    name: data.name,
                    number: data.number,
                    profile_picture: data.profile_picture,
                    sms_number: data.sms_number -= broadcastList.users.length,
                    userId: data.userId,
                    lastTest: data.lastTest ? data.lastTest : null,
                });
            } else { alert("we are sorry you dont have enough messages") }
        }
    }

    showUsers = () => {
        this.setState(prevState => ({
            isShowUsers: !prevState.isShowUsers
        }))
    }

    isValidnNumber = (number) => {
        let i = number
        if (i[1] > 500000000 && i[1] < 599999999) { i[1] = parseInt(i[1]); return i }
        i[1] = i[1].replace("+", "").replace(/-/g, '').replace(" ", "")
        i[1] = parseInt(i[1])
        if ((i[1] > 500000000 && i[1] < 599999999) || (i[1] > 972500000000 && i[1] < 972599999999)) {
            if (i[1] > 972500000000) {
                i[1] = i[1] - 972000000000
                return i
            }
        }
        else { i[1] = null; return i }
    }

    addUsers = async (toAddOrToUpdate, listOfUsers = this.state.listOfUsers.split("\n").map(i => i.split(","))) => {
        let oldUsers = listOfUsers
        let erorrNmbers = []
        let users = []
        console.log(oldUsers)
        for (let i = 0; i < oldUsers.length; i++) {
            let u = oldUsers[i]
            let res
            // console.log(typeof(parseInt(u[0])) )
            if (typeof (parseInt(u[0])) === 'number') {
                res = this.isValidnNumber([u[1], u[0].toString()])
            } else {
                res = this.isValidnNumber(u)
            }
            if (res[1] === null) { erorrNmbers.push(u) } else { users.push(res); }
        }
        console.log(users)
        if (erorrNmbers.length !== 0) {
            alert(`there was problem with users ${erorrNmbers}
            \n saved ${users.length} users`)
        }
        let data
        let { uid } = this.props.state.user
        let broadcastList = this.state.broadcastList
        await firebase.database().ref('users/sms_broadcast/').once('value').then(function (snap) {
            if (snap.val() !== null) {
                data = snap.val()[broadcastList + "-" + uid]
            }
        });


        console.log(users)
        if (data !== undefined && toAddOrToUpdate) {
            let isAllreadyIn
            for (let u of users) {
                isAllreadyIn = data.users.filter(i => i[1] === u[1])
                if (isAllreadyIn.length > 0) {
                    u[1] = null
                }
            }
            // console.log(users)
            users = users.filter(i => i[1] !== null)
            // console.log(users)
            users = users.concat(data.users)
            // console.log(users)
        }
        console.log(users)
        firebase.database().ref('users/sms_broadcast/' + broadcastList + "-" + uid).set({
            users: users
        });
        this.setState({ correnetUsers: users })
    }

    broadcastSearch = async (e) => {
        let broadcastList = e.target.value
        console.log(broadcastList)
        let defaultSelect = window.document.getElementById("defaultSelect");
        if (defaultSelect) {
            defaultSelect.remove()
        }
        let { uid } = this.props.state.user
        let data

        await firebase.database().ref('users/sms_broadcast/').once('value').then((snap) => {
            data = snap.val()
            if (data !== undefined && data !== null) {
                data = data[broadcastList + "-" + uid]
            } else {
                this.setState({ broadcastList: broadcastList, correnetUsers: undefined }); return
            }
            // console.log(data)
        })
        if (data !== null && data !== undefined) {
            this.setState({
                broadcastList: broadcastList, correnetUsers: data.users
            })
        } else { this.setState({ broadcastList: broadcastList, correnetUsers: undefined }) }
    }

    addNewBroadcast = async (isCallback = false) => {
        if (this.state.newBroadcast === "") { alert("invalid broadcast name"); return }
        let { displayName, uid } = this.props.state.user
        let data
        await firebase.database().ref('users/sms_users/').once('value').then((snap) => {
            data = snap.val()[displayName + "-" + uid]
        });

        let broadcasts
        if (data === undefined) { if (!isCallback) { this.addNewBroadcast(true) } return }
        if (data.broadcastLists === undefined || null) {
            broadcasts = [this.state.newBroadcast]
        } else {
            let isAllreadyIn = data.broadcastLists.filter(i => i === this.state.newBroadcast)
            if (isAllreadyIn.length > 0) {
                alert(`this broadcast alredy in the database`)
                return
            }
            broadcasts = data.broadcastLists
            broadcasts.push(this.state.newBroadcast)
        }
        firebase.database().ref('users/sms_users/' + displayName + "-" + uid).set({
            email: data.email,
            broadcastLists: broadcasts,
            name: data.name ? data.name : data.displayName,
            number: data.number ? data.number : (data.phoneNumber !== null ? data.phoneNumber : 0),
            profile_picture: data.profile_picture ? data.profile_picture : data.photoURL,
            sms_number: data.sms_number ? data.sms_number : 0,
            userId: data.userId ? data.userId : data.uid,
            lastTest: data.lastTest ? data.lastTest : null,
        });
        this.setState({ broadcastLists: broadcasts, newBroadcast: undefined })
    }

    handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        this.setState({ [name]: value })
    }

    addNumber = async () => {
        let { uid } = this.props.state.user
        let broadcastList = this.state.broadcastList

        let data
        let name = this.state.name
        let number = parseInt(this.state.number)
        let users
        if ((number > 500000000 && number < 599999999) || (number > 972500000000 && number < 972599999999)) {
            if (number >= 972500000000) { number = number - 972000000000 }
            await firebase.database().ref('users/sms_broadcast/').once('value').then(function (snap) {

                if (snap.val() !== null) {
                    data = snap.val()[broadcastList + "-" + uid]
                }
            });

            // console.log(data)
            if (data === undefined) {
                users = [[name, number]]
            } else {
                let isAllreadyIn = data.users.filter(i => i[1] === number)
                if (isAllreadyIn.length > 0) {
                    alert(`this number alredy in the database with name of ${isAllreadyIn[0]}`)
                    return
                }
                users = data.users
                users.push([name, number])
            }
            firebase.database().ref('users/sms_broadcast/' + broadcastList + "-" + uid).set({
                users: users
            });
            this.setState({ name: undefined, number: undefined, correnetUsers: users })
        } else { alert("invalid phone number please send agin") }
    }

    testRequest = () => {
        console.log(route)
        axios.get(`${route}test`)
            .then((response) => {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
            });

    }

    getFile = (filePath) => {
        return filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[0];
    }

    handleFileChange = (e) => {
        let file = e.target.files[0]
        if (file === undefined) { return }
        let fileName = file.name
        let fileType = fileName.split('.')[1]
        if (fileType !== "xlsx") { alert("xls only!"); this.setState({ xl: "" }); e.target.value = null; }
        else {
            readXlsxFile(file).then((rows) => {
                console.log(rows)
                let res = window.confirm("do you want to update your broadcast?\nyes to update\nno to regular add")
                this.addUsers(res, rows)
            })
        }
    }

    render() {
        let rootStyle = document.getElementById("root").style
        rootStyle.background = "linear-gradient(45deg, #4267b2, #00e676, #6742bf, #dd286e, #efa03b)"
        rootStyle['min-height'] = "100vh"
        rootStyle.width = "100%"
        return <div className="main_form">

            <div className="welcome_div">
                Welcome {this.props.state.user.displayName} <button className="log_out_btn" onClick={() => firebase.auth().signOut()}> log out</button>
                {/* {this.props.state.user.displayName === "Mor Bargig" ?
                    <button className="test_btn" onClick={this.testRequest}> test</button>
                    : null} */}
            </div>
            <div>
                <br></br>
                <h4>you are in boys Broadcast </h4>
                <div className="group">
                    <input className="input" name="newBroadcast" onChange={this.handleChange} value={this.state.newBroadcast || ""}
                    // placeholder="type new broadcast name"
                    ></input>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>type new broadcast name</label>
                    <button className="buttons" onClick={this.addNewBroadcast}> add new broadcast </button>
                </div>
            </div>
            <h4> choose broadcast list to work on </h4>
            <select className="sel_option" onChange={this.broadcastSearch} value={this.state.broadcastList}  >
                <option defaultValue="" id="defaultSelect" key="jhgf"> choese broadcast list</option>
                {this.state.broadcastLists ?
                    this.state.broadcastLists.map(i => <option value={i} key={i}>{i} </option>)
                    : null}
            </select>
            {this.state.broadcastList ?
                <BroadcastList state={this.state} This={this}  ></BroadcastList>
                : null}



            <h4>new message </h4>
            <textarea className="textblock2" placeholder="text" name='text' value={this.state.text} rows="4" cols="50" onChange={this.handleChange}>
            </textarea>
            <button className="buttons" name="test" onClick={this.sendMassege}>Test </button>

            {this.state.broadcastList ?
                <button className="buttons" name='sendMassege' onClick={this.sendMassege}> send to all users</button>
                : null}
        </div>
    }
}

export default Admin;
