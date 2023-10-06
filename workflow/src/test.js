// import axios from "axios";
// import {LOGIN_API, POST_API, REGISTER_API, USER_EDIT_PROFILE_API, USER_PROFILE_API} from "../api/api";
// import header from "../components/Header";
//
// const Service = {
//     login: (account) => {
//         return new Promise((resolve, reject) => {
//             axios.post(LOGIN_API,account)
//                 .then(response => {
//                     console.log(response)
//                     localStorage.setItem("idAccount",response.data.id);
//                     resolve(response.data);
//                 })
//                 .catch(function (err) {
//                     reject(err)
//                 });
//         });
//     },

// createPost: (formData) => {
//     console.log(formData);
//     return new Promise((resolve, reject) => {
//         let id = localStorage.getItem("idAccount");
//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: POST_API+"/"+id,
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//             data : formData
//         };
//         axios.request(config)
//             .then(response => {
//                 resolve(response.data);
//             })
//             .catch(function (err) {
//                 reject(err)
//             });
//     });
// },