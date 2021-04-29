import {meTC} from "./authReducer";


const SET_INITED = "SET_INITED";

const initState = {
    inited: false,
}

const appReducer = (state = initState, action) => {
    let newState;
    switch (action.type) {
        case SET_INITED:
            newState = {
                ...state,
                inited: action.inited,
            };
            return newState;
        default: return state;
    }
}

// Action Creators
export const setInitedAC = (inited = true) => ({type: SET_INITED, inited});

// Thunk Creators
export const initAppTC = () => (dispatch) => {
    const authPromise = dispatch(meTC());
    Promise.all([authPromise]).then(()=>dispatch(setInitedAC()));
}

export default appReducer;