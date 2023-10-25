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
    },

    removeTeam: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity, // cho phep gui du lieu lon len server
                url: 'http://localhost:8080/team/deleteTeamById/' + id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    "content-type": "application/json",
                }
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    addMember: (member) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/team/add',
                headers: {
                    "content-type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                data: member,
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    findTeamById: (idTeam) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity, // cho phep gui du lieu lon len server
                url: 'http://localhost:8080/team/' + idTeam,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Accept': 'application/json'

                }
            }

            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    removeMember: (id,username) => {

        return new Promise((resolve, reject) => {
            let config = {
                method: 'delete',
                maxBodyLength: Infinity, // cho phep gui du lieu lon len server
                url: 'http://localhost:8080/team/kick',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    "content-type": "application/json",
                },
                data: {
                    teamId: id,
                    username: username
                }

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
