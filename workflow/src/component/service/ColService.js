import axios from "axios";

const colService = {

    getAllColByIdBoard: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/col/' + id,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                data: id,
                id: id
            }
            axios.request(config).then(response => {
               // console.log("response.data sau khi get all col = ", response.data);
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    }


};

export default colService;
