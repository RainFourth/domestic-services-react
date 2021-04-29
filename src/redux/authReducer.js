import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";
import {utils} from "../utils/utils";


const SET_USER_DATA = "SET_USER_DATA";

const initState = {
    isAuth: false,

    userId: null,
    login: null,

    name: null,
    //avaSmallUrl: null,
}

const authReducer = (state = initState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER_DATA:
            newState = {
                ...state,
                ...action.userData,
                isAuth: Boolean(action.userData.userId),
            }
            return newState;
        default: return state;
    }
}

export default authReducer;


// Action Creators
export const setAuthUserDataAC = (userId, login, name/*, avaSmallUrl*/) => ({
    type: SET_USER_DATA,
    userData: {userId, login, name/*, avaSmallUrl*/}
});


// Thunk Creators
export const loginTC = (login, password, rememberMe) => (dispatch) => {
    /*const onResponse = (response) => {
        console.log(response);
        if(!response) {
            console.log("login request error");
            dispatch(stopSubmit("login", {_error: "Server doesn't respond"}));
        } else switch (response.status) {
            case 200:
                console.log("login success");
                dispatch(stopSubmit("login", undefined));
                dispatch(meTC());
                break;
            case 401:
                console.log("login error: unauthorized");
                let err = {
                    _error: response.data["*"],
                    login: response.data.login,
                    password: response.data.password,
                };
                //console.log(err);
                const formAction = stopSubmit("login", err);
                dispatch(formAction);
                break;
            default: console.log("login request error: " + response.status); break;
        }
    }

    authApi.login(login, password, rememberMe).then(response => {
        onResponse(response);
    }).catch(err => {
        console.log(err);
        onResponse(err.response);
    });*/

    const getActionMap = (response) => new Map([
        [-1, ()=>dispatch(stopSubmit("login", {_error: "Server doesn't respond"}))],
        [200, ()=>{
            dispatch(stopSubmit("login", undefined));
            dispatch(meTC());
        }],
        [401, ()=>{
            let err = {
                _error: response.data["*"],
                login: response.data.login,
                password: response.data.password,
            };
            const formAction = stopSubmit("login", err);
            dispatch(formAction);
        }],
    ]);
    authApi.login(login, password, rememberMe).then(response => {
        utils.onResponse("login", response, getActionMap(response));
    }).catch(err => {
        utils.onErr("login", err, getActionMap(err.response));
    });
}
export const logoutTC = () => (dispatch) => {
    /*const onResponse = (response) => {
        console.log(response);
        if(!response) console.log("logout request error");
        else switch (response.status) {
            case 200:
                console.log("logout success");
                dispatch(setAuthUserDataAC(undefined, undefined, undefined));
                break;
            case 401:
                console.log("unauthorized");
                dispatch(setAuthUserDataAC(undefined, undefined, undefined));
                break;
            default: console.log("logout request error: " + response.status); break;
        }
    }
    authApi.logout().then(response => {
        onResponse(response);
    }).catch(err => {
        console.log(err);
        onResponse(err.response);
    })*/


    const getActionMap = (response) => new Map([
        [200, ()=>dispatch(setAuthUserDataAC(undefined, undefined, undefined))],
        [401, ()=>dispatch(setAuthUserDataAC(undefined, undefined, undefined))],
    ]);
    authApi.logout().then(response => {
        utils.onResponse("logout", response, getActionMap(response));
    }).catch(err => {
        utils.onErr("logout", err, getActionMap(err.response));
    });
}
export const meTC = () => (dispatch) => {
    const getActionMap = (response) => new Map([
        [200, ()=>dispatch(setAuthUserDataAC(response.data.id, response.data.login, response.data.name))],
        [401, ()=>dispatch(setAuthUserDataAC(undefined, undefined, undefined))],
    ]);
    authApi.me().then(response => {
        utils.onResponse("me", response, getActionMap(response));
    }).catch(err => {
        utils.onErr("me", err, getActionMap(err.response));
    });
}
export const signupTC = (login, password, name) => (dispatch) => {
    /*const onResponse = (response) => {
        console.log(response);
        if(!response) {
            console.log("register request error");
            dispatch(stopSubmit("signup", {_error: "Server doesn't respond"}));
        } else switch (response.status) {
            case 200:
                console.log("register success");
                dispatch(stopSubmit("signup", undefined));
                dispatch(meTC());
                break;
            case 400:
                let err = {
                    _error: response.data["*"],
                    login: response.data.login,
                    password: response.data.password,
                    name: response.data.name,
                };
                //console.log(err);
                const formAction = stopSubmit("signup", err);
                dispatch(formAction);
                break;
            case 401:
                console.log("login error: unauthorized");
                dispatch(stopSubmit("signup", undefined));
                break;
            default: console.log("register request error: " + response.status); break;
        }
    }

    authApi.signup(login, password, name).then(response => {
            onResponse(response);
        }).catch(err => {
        console.log(err);
        onResponse(err.response);
    });*/


    const getActionMap = (response) => new Map([
        [-1, ()=>dispatch(stopSubmit("signup", {_error: "Server doesn't respond"}))],
        [200, ()=>{
            dispatch(stopSubmit("signup", undefined));
            dispatch(meTC());
        }],
        [400, ()=>{
            let err = {
                _error: response.data["*"],
                login: response.data.login,
                password: response.data.password,
                name: response.data.name,
            };
            const formAction = stopSubmit("signup", err);
            dispatch(formAction);
        }],
        [401, ()=>dispatch(stopSubmit("signup", undefined))],
    ]);
    authApi.signup(login, password, name).then(response => {
        utils.onResponse("signup", response, getActionMap(response));
    }).catch(err => {
        utils.onErr("signup", err, getActionMap(err.response));
    });
}