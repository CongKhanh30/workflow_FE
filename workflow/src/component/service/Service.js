import axios from "axios";

const service = {

    register: (formData) => {
        console.log(formData);
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/register',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: formData
            };

            axios.request(config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err)
                });
        });
    },

    getAllTeam: () => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity, // cho phep gui du lieu lon len server
                url: 'http://localhost:8080/team',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }
            axios.request(config).then(response => {
                resolve(response.data);
                console.log(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })

    }
};

// tao constructor


export default service;
