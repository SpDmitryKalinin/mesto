export class UserInfo{
    constructor(userName, userAbout){
        this.userName = userName;
        this.userAbout = userAbout;
        this.setName = document.querySelector(this.userName);
        this.setAbout = document.querySelector(this.userAbout)
        this.objUserInfo = {user: document.querySelector(this.userName).textContent, 
            about: document.querySelector(this.userAbout).textContent};

    }
    setUserInfo(name, about){
        this.setName.textContent = name;
        this.setAbout.textContent = about;
    }
    getUserInfo() {
        return {user: document.querySelector(this.userName).textContent, 
            about: document.querySelector(this.userAbout).textContent};
    } 
}