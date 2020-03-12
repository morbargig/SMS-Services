import axios from 'axios'

alert("port")
// const route = function () {
const route = 'http://localhost:3030/'
axios.get(`${route}isItOnline`)
    .then((response) => {
        console.log(response.data, "data");
        alert(response.data, "data")
        console.log(typeof (response.data))
        if (response.data > 0) {
            route = "/"
        }
    });
    // return route
// }

export default route