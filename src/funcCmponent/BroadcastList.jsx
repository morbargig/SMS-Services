import React from "react"
// import '../css/BroadcastList.css'

export const BroadcastList = ({ This, state }) => {
    let { handleChange, addNumber, addUsers, showUsers, handleFileChange } = This
    let { name, number, broadcastList, correnetUsers, listOfUsers, isShowUsers, xl } = state
    return (
        <div className="add_user_div">
            <hr className="rounded"></hr>            <h4>you are in {broadcastList} Broadcast </h4>
            <div>
                <h6> new user </h6>
                <div className="group">
                    <input className="input" name="name" type="text" value={name || ""} onChange={handleChange}  ></input>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Name</label>
                </div>

                <div className="group">
                    <input className="input" name="number" type="number" value={number || ""} onChange={handleChange}  ></input>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Phone number</label>
                </div>
                <button className="buttons" onClick={addNumber}>Add new User</button>
                <hr className="rounded"></hr>
            </div>
            <div>
                <h4> {broadcastList} users </h4>
                {correnetUsers && isShowUsers ? <div> {correnetUsers.map(n => <li key={n[1]}> <b>{n[0]}</b> {' ,0' + n[1]}  </li>)}   </div> : null}
                {listOfUsers ? <h4> to use "add new users" and "update users"
                you need to wirte you users like
         <br></br>  name , phoneNumber   <br></br>
            and separate by new line
        </h4> : null}
                <textarea className="textblock" placeholder={correnetUsers ? correnetUsers.length + ' users: \n' + correnetUsers.map(n => n[0] + '-0' + n[1] + "  ") : "users"} name='listOfUsers' value={listOfUsers} rows="4" cols="60" onChange={handleChange}>

                </textarea>
                <br></br><br></br>
                <button className="buttons" onClick={showUsers} >Show users </button>
                {listOfUsers ? <button name="addnewusers" onClick={() => addUsers(true)}>Add new users </button> : null}
                {listOfUsers ? <button name="newUsersList" onClick={() => addUsers(false)}>update users </button> : null}
            </div>

            <h5>please enter a xl file</h5><input className="input" name="inputfile" type="file" value={xl || undefined} onChange={handleFileChange}></input><br></br>
            <hr className="rounded"></hr>
        </div>
    )
}