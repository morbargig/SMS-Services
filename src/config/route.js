import axios from 'axios'

const route = async function () {
    let url = 'http://localhost:3030/'
    await axios.get(`/isItOnline`)
        .then((response) => {
            console.log(response.data, "data");
            alert(response.data, "data")
            console.log(typeof (response.data))
            url = '/'
        });
    return url
}

export default route()