export class Api{
    constructor(token, addressCard, addressInfo){
        this._token = token;
        this._addressCard = addressCard;
        this._addressInfo = addressInfo;
    }
    
    getProfileInfo(){
        return fetch(`${this._addressInfo}`,{
            method: 'GET',
            headers:{
                authorization: `${this._token}`
            }
        })
            .then(res => {
                return this._getResponseData(res);
        })
    }

    patchProfileInfo(name, about){
        return fetch(`${this._addressInfo}`,{
            method: 'PATCH',
            headers:{
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
              })
        })
            .then(res => {
                return this._getResponseData(res);
        })
    }

    patchProfileAvatar(link){
        return fetch(`${this._addressInfo}/avatar`,{
            method: 'PATCH',
            headers:{
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: `${link}`
              })
        })
        .then(res => {
            return this._getResponseData(res)
        })
    }

    getCards(){
        return fetch(`${this._addressCard}`,{
            method: 'GET',
            headers:{
                authorization: `${this._token}`
            }
        })
        .then(res => {
            return this._getResponseData(res)
        })
    }

    postCards(name, link){
        return fetch(`${this._addressCard}`,{
            method: 'POST',
            headers:{
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`
            })
        })
        .then(res => {
            return this._getResponseData(res)
        })
    }

    deleteCard(id){
        return fetch(`${this._addressCard}/${id}`,{
                    method: 'DELETE',
                    headers:{
                        authorization: `99cf486b-e575-4fd7-a9fa-cafa2239ffe6`
                    }
                })
    }

    getCountLike(){
        return fetch(`${this._addressCard}`,{
            method: 'GET',
            headers:{
                authorization: `${this._token}`
            }
        })
        .then(res => {
            return this._getResponseData(res)
    })
        .catch((err) => {
            console.log(err); 
    }); 
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    putLike(id){
        fetch(`${this._addressCard}/likes/${id}`,{
            method: 'PUT',
            headers:{
                authorization: `${this._token}`
            }
        });
    }

    deleteLike(id){
        fetch(`${this._addressCard}/likes/${id}`,{
            method: 'DELETE',
            headers:{
                authorization: `${this._token}`
            }
        });
    }
}