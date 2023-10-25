import axios from "axios";

const cardService = {

    getAllCardByIdCol: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/c/getAllCardByColId/' + id,
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

    getCardById: (idCard) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/c/' + idCard,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                data: idCard,
                idCard: idCard
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    editCard: (card) => {
        console.log(card.id)
        return new Promise((resolve, reject) => {
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/c/edit',
                headers: {
                    "content-type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                data: card,
            }
            axios.request(config).then(response => {
                resolve(response.data);
                console.log("response.data sau khi edit = ", response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    }

};

export default cardService;
