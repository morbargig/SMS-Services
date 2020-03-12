import axios from 'axios'

const route = function () {
    let url
    axios.get(`/isItOnline`)
        .then((response) => {
            console.log(response.data, "data");
            alert(response.data, "data")
            console.log(typeof (response.data))
            return '/'
        });
    return 'http://localhost:3030/'
}

export default route()