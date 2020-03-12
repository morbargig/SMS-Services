
// let port = 3030
// function isonline(port) {
//     var uri = `/isItOnline`
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", uri, false);
//     xhr.send(null);
//     if (xhr.status === 200 && xhr.response === "server is online") {
//         return '/';
//     }
//     else {
//         return `http://localhost:${port}/`;
//     }
// }
// const route = isonline(port)

let route = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/`
if (process.env.NODE_ENV === "production") {
    route = '/'
}
console.log(route)

export default route 