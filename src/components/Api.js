export class Api{
    constructor(adress, token, id){
        this._adress = adress;
        this._token = token;
        this._id = id;
    }

    getProfileInfo(){
        return fetch(`${this._adress}`,{
            method: 'GET',
            headers:{
                authorization: `${this._token}`
            }
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
        })
            .catch((err) => {
                console.log(err); 
        }); 
        
    }

    patchProfileInfo(name, about){
        fetch(`${this._adress}`,{
            method: 'PATCH',
            headers:{
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
              })
        });
    }

    patchProfileAvatar(link){
        fetch(`${this._adress}/avatar`,{
            method: 'PATCH',
            headers:{
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: `${link}`
              })
        });
    }

    getCards(){
        return fetch(`${this._adress}`,{
            method: 'GET',
            headers:{
                authorization: `${this._token}`
            }
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
    })
        .catch((err) => {
            console.log(err); 
    }); 
    }

    postCards(name, link){
        fetch(`${this._adress}`,{
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
    }

    deleteCard(id){
        fetch(`https://mesto.nomoreparties.co/v1/cohort-19/cards/${id}`,{
                    method: 'DELETE',
                    headers:{
                        authorization: `99cf486b-e575-4fd7-a9fa-cafa2239ffe6`
                    }
                });
        if(document.getElementById(id)){
            document.getElementById(id).remove();
        }
    }

    getCountLike(id){
        return fetch(`${this._adress}`,{
            method: 'GET',
            headers:{
                authorization: `${this._token}`
            }
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
    })
        .catch((err) => {
            console.log(err); 
    }); 
    } 
}