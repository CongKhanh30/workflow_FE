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
    },

    createCol:(name, boardId) =>{
        return new Promise((resolve, reject)=>{

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/col/create?name=${name}&boardId=${boardId}`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.response.data);
                });

        })
    },

    renameCol:(dataE) =>{
        return new Promise((resolve, reject)=>{
            let data = JSON.stringify(dataE);

            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/col/rn',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                data : data
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.response.data);
                });

        })
    },

    createCard:(dataC) =>{
        return new Promise((resolve, reject)=>{
            let data = JSON.stringify(dataC);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/c/create',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                data : data
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.response.data);
                });

        })
    },

    deleteColById: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/col/delete/' + id,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                data: id,
                id: id
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    }
};

export default colService;
