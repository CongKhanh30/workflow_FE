import axios from "axios";

const colService = {

    getCol: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity, // cho phep gui du lieu lon len server
                url: 'http://localhost:8080/col/' + id,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }
            axios.request(config).then(response => {
                resolve(response.data);
                console.log(response.data)
            }).catch(function (err) {
                reject(err)
            });
        })

    },
}
export default colService;