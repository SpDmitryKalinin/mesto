export class UserInfo{
    constructor(userName, userAbout){
        this.userName = userName;
        this.userAbout = userAbout;
    }
    setUserInfo(name, about){
        document.querySelector(this.userName).textContent = name;
        document.querySelector(this.userAbout).textContent = about;
    }
    getUserInfo(){
        const objUserInfo = {user: document.querySelector(this.userName).textContent, 
            about: document.querySelector(this.userAbout).textContent};
        return objUserInfo;
    }
}