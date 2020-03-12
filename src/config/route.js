import axios from 'axios'

isItOnline = () => {
    const route = '/'
    axios.get(`${route}isItOnline`)
        .then((response) => {
            console.log(response.data);
        });
}


// const route = 'http://localhost:3030/'
// if (process.env.PORT) {
// }
// alert(route,process.env.PORT)


export default route