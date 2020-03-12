import axios from 'axios'

const route = function () {
    const route = '/'
    axios.get(`${route}isItOnline`)
        .then((response) => {
            console.log(response.data);
        });
    return route
}

export default route()