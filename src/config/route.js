
let port = 3030
function isonline(port) {
    var uri = `/isItOnline`
    var xhr = new XMLHttpRequest();
    console.log(process.env.REACT_APP_PORT,process.env.PORT,process.env.NODE_ENV,process.env.REACT_APP_NOT_SECRET_CODE)
    xhr.open("GET", uri, false);
    xhr.send(null);
    if (xhr.status === 200 && xhr.response === "server is online") {
        return '/';
    }
    else {
        return `http://localhost:${port}/`;
    }
}

const route = isonline(port)
export default route 