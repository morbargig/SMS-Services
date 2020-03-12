import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import axios from 'axios'
import route from '../config/route'
import firebase from '../config/firebase'


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
        let from = prompt("Please enter from who this massage");
        let name = e.target.name
        let to = "972528612379"
        if (name === 'sendMassege') { to = 1 }
        await axios.post(`${route}sendSms/${from}/${to}`, {
            text: this.state.text
        })
    }

    showUsers = () => {
        this.setState(prevState => ({
            showUsers: !prevState.showUsers
        }))
    }

    addUsers = async (toAddOrToUpdate) => {
        let users = this.state.listOfUsers.split("\n")
        users = users.map(i => i.split(","))
        let erorrNmbers = []
        for (let i of users) {
            // let u = i[1]
            i[1] = i[1].replace("+", "").replace(/-/g, '').replace(" ", "")
            // console.log(u)
            if (i[1][0] === '+') { i[1] = i[1].slice(4, 13) }
            i[1][0] + i[1][1] + i[1][2] === '972' ? i[1] = i[1].slice(3, 12) : i[1] = i[1].slice(1, 10)
            // console.log(i[1].length, i[1])
            if (i[1][0] === "5" && i[1].length === 9) {
                i[1] = parseInt(i[1])
                // console.log(i[1])
            } else { i[1] = null; erorrNmbers.push(i) }
        }
        users = users.filter(i => i[1] !== null)
        // console.log(users)
        if (erorrNmbers === []) {
            alert(`that use problem with users ${erorrNmbers}
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


        // console.log(data)
        if (data === undefined || !toAddOrToUpdate) {

        } else {
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
        firebase.database().ref('users/sms_broadcast/' + broadcastList + "-" + uid).set({
            users: users
        });
        this.setState({ correnetUsers: users })

    }

    broadcastSearch = async (e) => {
        let broadcastList = e.target.value
        console.log(broadcastList)
        window.document.getElementById("defaultSelect").remove();
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

    addNewBroadcast = async () => {
        if (this.state.newBroadcast === "") { alert("invalid broadcast name"); return }
        let { displayName, uid } = this.props.state.user
        let data
        await firebase.database().ref('users/sms_users/').once('value').then((snap) => {
            data = snap.val()[displayName + "-" + uid]
        });

        let broadcasts
        if (data === undefined || data.broadcastLists === undefined || null) {
            data = this.props.state.user
            broadcasts = [this.state.newBroadcast]
        } else {
            let isAllreadyIn = data.broadcastLists.filter(i => i === this.state.newBroadcast)
            // console.log(isAllreadyIn)
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
            number: data.number ? data.number : (data.phoneNumber ? data.phoneNumber : 0),
            profile_picture: data.profile_picture ? data.profile_picture : data.photoURL,
            sms_number: data.sms_number ? data.sms_number : 0,
            userId: data.userId ? data.userId : data.uid,
        });
        this.setState({ broadcastLists: broadcasts })
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
        console.log("work")
        axios.get(`${route}test`)
            .then((response) => {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
            });
        return 
    }

    render() {
        return <div>
            <button onClick={this.testRequest}> click me</button>
            <div>
                <br></br>
                <div>create a new broadcast list <br></br>
                    <input name="newBroadcast" onChange={this.handleChange} value={this.state.newBroadcast || ""} placeholder="type new broadcast name" ></input>
                    <button onClick={this.addNewBroadcast}> add new broadcast </button>
                </div>
                <h4> choese broadcast list to work on </h4>
                <select onChange={this.broadcastSearch} value={this.state.broadcastList}  >
                    <option defaultValue="" id="defaultSelect" value="" key="jhgf"> choese broadcast list</option>
                    {this.state.broadcastLists ?
                        this.state.broadcastLists.map(i => <option value={i} key={i}>{i} </option>)
                        : null}
                </select>
                {this.state.broadcastList ? <h4>you are in {this.state.broadcastList} Broadcast </h4> : null}
                {this.state.broadcastList ?
                    <div>
                        <div>
                            <h6> new user </h6>
                            <input placeholder='name' name="name" type="text" value={this.state.name || ""} onChange={this.handleChange}  ></input>
                            <input placeholder='number' name="number" type="number" value={this.state.number || ""} onChange={this.handleChange}  ></input>
                            <br></br>
                            <button onClick={this.addNumber}>Add new User</button>
                        </div>
                        <div>
                            <h4> {this.state.broadcastList} users </h4>
                            {this.state.correnetUsers && this.state.showUsers ? <div> {this.state.correnetUsers.map(n => <li> {n[0] + ': 0' + n[1]}  </li>)}   </div> : null}
                            {this.state.listOfUsers ? <h4> to use "add new users" and "update users"
                            you need to wirte you users like
                             <br></br>   name , phoneNumber <br></br>
                                and separate by new line
                            </h4> : null}
                            <textarea placeholder={this.state.correnetUsers ? this.state.correnetUsers.length + ' users: ' + this.state.correnetUsers.map(n => n[0] + ' 0' + n[1]) : "users"} name='listOfUsers' value={this.state.listOfUsers} rows="4" cols="50" onChange={this.handleChange}>

                            </textarea>
                            <button onClick={this.showUsers} >Show users </button>
                            {this.state.listOfUsers ? <button name="addnewusers" onClick={() => this.addUsers(true)}>Add new users </button> : null}
                            {this.state.listOfUsers ? <button name="newUsersList" onClick={() => this.addUsers(false)}>update users </button> : null}
                        </div>
                    </div>
                    : null}
                <h4>new massage </h4>
                <textarea placeholder="text" name='text' value={this.state.text} rows="4" cols="50" onChange={this.updateInput}>
                </textarea>
                <button name="test" onClick={this.sendMassege}>Test </button>

                {this.state.broadcastList ?
                    <button name='sendMassege' onClick={this.sendMassege}> send to all users</button>
                    : null}
            </div>
        </div>
    }
}

export default Admin;
