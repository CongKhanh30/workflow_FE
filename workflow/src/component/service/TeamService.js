import axios from "axios";

const teamService = {

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
            }).catch(function (err) {
                reject(err)
            });
        })

    },

    createTeam: (team) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity, // cho phep gui du lieu lon len server
                url: 'http://localhost:8080/team/create',
                headers: {
                    "content-type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                data: team
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })

    }

};

// tao constructor


export default teamService;
