
let port = 3030
function isonline(port) {
    var uri = `/isItOnline`
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, false);
    xhr.send(null);
    console.log("route")
    if (xhr.status == 200 && xhr.response > 0) {
        return '/';
    }
    else {
        return `http://localhost:${port}/`;
    }
}

const route = isonline(port)
export default route 