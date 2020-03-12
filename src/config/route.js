
let port = 3030
function isonline(port) {
    var uri = `/isItOnline`
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, false);
    xhr.send(null);
    console.log("route")
    // console.log(xhr.status, xhr.response)
    // console.log("3030" > 0)
    if (xhr.status == 200 && xhr.response == "server is online") {
        return '/';
    }
    else {
        return `http://localhost:${port}/`;
    }
}

const route = isonline(port)
export default route 