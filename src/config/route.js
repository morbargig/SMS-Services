
let port = 3030
function isonline(port) {
    var uri = `/isItOnline`
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.send(null);
    console.log("route")
    console.log(xhr.status, xhr.response)
    if (xhr.status == 200 && xhr.response == "server is online") {
        return `http://localhost:${port}/`;
    }
    else {
        return '/';
    }
}

const route = isonline(port)
export default route 