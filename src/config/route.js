import axios from 'axios'

route = () => {
    const route = '/'
    axios.get(`${route}isItOnline`)
        .then((response) => {
            console.log(response.data);
        });
    return route
}


// const route = 'http://localhost:3030/'
// if (process.env.PORT) {
// }
// alert(route,process.env.PORT)


export default route()