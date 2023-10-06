import axios from "axios";


const Service = {

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
                data : formData
            };

            axios.request(config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err)
                });
        });
    }
    // profile: () => {
    //     return new Promise((resolve, reject) => {
    //         axios.get(USER_PROFILE_API+localStorage.getItem("idAccount"), {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'Accept': 'application/json',
    //                 "Authorization": "Bearer " + localStorage.getItem('token'),
    //             }
    //         })
    //             .then(response => {
    //                 // console.log(response)
    //                 resolve(response);
    //             })
    //             .catch(function (err) {
    //                 reject(err)
    //             });
    //     });
    // },
};

export default Service;
