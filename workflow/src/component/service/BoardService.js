import axios from "axios";

const boardService = {

    getAllBoardByTeamId: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity, // cho phep gui du lieu lon len server
                url: 'http://localhost:8080/board/getAllByIdTeam/' + id,
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

    createBoardByTeamId: (board, id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity, // cho phep gui du lieu lon len server
                url: 'http://localhost:8080/board/createBoard/' + id,

                headers: {
                    "content-type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                data: board,
                id: id
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    removeBoard: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity, // cho phep gui du lieu lon len server
                url: 'http://localhost:8080/board/removeBoard/' + id,
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

    editNameBoard: (board, id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/board/editNameBoard/' + id,
                headers: {
                    "content-type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                data: board,
                id: id
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    findBoardById: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/board/getBoardById/' + id,
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
    },

};

export default boardService;
