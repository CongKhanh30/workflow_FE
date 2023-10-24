import axios, {Axios} from "axios";

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
    editPassword:(currentPassword,newPassword)=>{
        return new Promise((resolve, reject)=>{

            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/changePassword?currentPassword=${currentPassword}&newPassword=${newPassword}`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                });

        })
    }

};

// tao constructor


export default service;
