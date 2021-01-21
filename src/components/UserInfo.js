export class UserInfo{
    constructor(userName, userAbout, userAvatar){
        this.userName = userName;
        this.userAbout = userAbout;
        this.userAvatar = userAvatar;
        this.setName = document.querySelector(this.userName);
        this.setAbout = document.querySelector(this.userAbout);
        this.setAvatar = document.querySelector(this.userAvatar);
        this.objUserInfo = {user: document.querySelector(this.userName).textContent, 
            about: document.querySelector(this.userAbout).textContent};
    }
    setUserInfo(name, about){
        this.setName.textContent = name;
        this.setAbout.textContent = about;
    }
    setUserAvatar(avatar){
        this.setAvatar.src = avatar;
    }
    getUserInfo() {
        return {user: document.querySelector(this.userName).textContent, 
            about: document.querySelector(this.userAbout).textContent};
    } 
}