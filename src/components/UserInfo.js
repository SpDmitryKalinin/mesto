export class UserInfo{
    constructor(userName, userAbout, userAvatar){
        this._userName = userName;
        this._userAbout = userAbout;
        this._userAvatar = userAvatar;
        this._setName = document.querySelector(this._userName);
        this._setAbout = document.querySelector(this._userAbout);
        this._setAvatar = document.querySelector(this._userAvatar);
        this._objUserInfo = {user: document.querySelector(this._userName).textContent, 
            about: document.querySelector(this._userAbout).textContent};
    }
    setUserInfo(name, about){
        if(name){
            this._setName.textContent = name;
        }
        if(about){
            this._setAbout.textContent = about;
        }
        
    }
    setUserAvatar(avatar){
        this._setAvatar.src = avatar;
    }
    getUserInfo() {
        return {user: this._setName.textContent, 
            about: this._setAbout.textContent};
    } 
}