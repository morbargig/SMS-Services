import React from "react"
// import '../css/BroadcastList.css'

export const BroadcastList = ({ This, state }) => {
    let { handleChange, addNumber, addUsers, showUsers } = This
    let { name, number, broadcastList, correnetUsers, listOfUsers, isShowUsers } = state
    return (
        <div>
            <h4>you are in {broadcastList} Broadcast </h4>
            <div>
                <h6> new user </h6>
                <input placeholder='name' name="name" type="text" value={name || ""} onChange={handleChange}  ></input>
                <input placeholder='number' name="number" type="number" value={number || ""} onChange={handleChange}  ></input>
                <br></br>
                <button onClick={addNumber}>Add new User</button>
            </div>
            <div>
                <h4> {broadcastList} users </h4>
                {correnetUsers && isShowUsers ? <div> {correnetUsers.map(n => <li key={n[1]}> {n[0] + ': 0' + n[1]}  </li>)}   </div> : null}
                {listOfUsers ? <h4> to use "add new users" and "update users"
                you need to wirte you users like
         <br></br>   name , phoneNumber <br></br>
            and separate by new line
        </h4> : null}
                <textarea placeholder={correnetUsers ? correnetUsers.length + ' users: ' + correnetUsers.map(n => n[0] + ' 0' + n[1]) : "users"} name='listOfUsers' value={listOfUsers} rows="4" cols="50" onChange={handleChange}>

                </textarea>
                <button onClick={showUsers} >Show users </button>
                {listOfUsers ? <button name="addnewusers" onClick={() => addUsers(true)}>Add new users </button> : null}
                {listOfUsers ? <button name="newUsersList" onClick={() => addUsers(false)}>update users </button> : null}
            </div>
        </div>
    )
}