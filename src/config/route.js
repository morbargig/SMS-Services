import axios from 'axios'

const isItOnline = async function () {
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
if (typeof (isItOnline()) === 'string'){  const route = '/'}
else { const route = 'http://localhost:3030/' }
    export default route