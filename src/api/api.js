import * as axios from "axios";


// todo HTTPS
const baseUrl = "http://localhost:8080/";
//const baseUrl = "http://192.168.0.50:8080/";
//const baseUrl = "";

const ax = axios.create({
    baseURL: baseUrl,
    withCredentials: true,

    //redirect: "follow",
    /*headers: {
        //"origin": ,
        //"API-KEY": "99b838ca-9fd3-46f6-b97f-38fd123a4e39",
    },*/
})


export const authApi = {
    me(){
        return ax.get(`me`);
    },

    // GET запрос
    /*login(login, password, rememberMe = false){
        return fetch("http://localhost:8080/login", {
            mode: 'no-cors',
            headers: {
                //"Authorization": 'Basic ' + window.btoa(login + ":" + password),
                login: login,
                password: password,
            }
        })
    },*/

    login(login, password, rememberMe = false){
        return ax.post(`login`, {login, password, rememberMe})
    },
    logout(){
        return ax.delete(`logout`);
    },
    signup(login, password, name){
        return ax.put(`signup`, {login, password, name});
    },
}

export const servicesApi = {
    getServices(page = 1, size = 10){
        return ax.get(`/services?page=${page}&size=${size}`);
    },
    /*getServices0(page = 1, size = 10){
        return fetch(`http://localhost:8080/services?page=${page}&size=${size}`, {
            mode: 'no-cors',
        });
    },*/
}