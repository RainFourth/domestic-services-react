import {servicesApi} from "../api/api";
import {utils} from "../utils/utils";


const SET_SERVICES = "SET_SERVICES";
const SET_PAGE_AND_SIZE = "SET_PAGE_AND_SIZE";
const SET_IS_FETCHING = "SET_IS_FETCHING";


const testService = {
    title: "Test title",
    image: undefined,
    description: "Test description",
    price: "Test price",
}

const pagination = {
    selected: 1,
    total: 1,
    size: 3,
}

const initState = {
    loaded: false,
    isFetching: false,
    page: 1,
    size: 3,

    services: [testService],
    pagination: pagination,
}

const servicesReducer = (state = initState, action) => {
    let newState;
    switch (action.type) {
        case SET_PAGE_AND_SIZE:
            newState = {
                ...state,
                loaded: false,
                page: action.page,
                size: action.size,
            }
            return newState;
        case SET_SERVICES:
            newState = {
                ...state,
                loaded: true,
                isFetching: false,
                services: [...action.services],
                pagination: {...action.pagination},
            }
            return newState;
        case SET_IS_FETCHING:
            newState = {
                ...state,
                isFetching: action.isFetching,
            }
            return newState;
        default: return state;
    }
}

export default servicesReducer;


// Action Creators
export const setPageAndSizeAC = (page, size) => ({type: SET_PAGE_AND_SIZE, page, size});
const setServicesAC = (services, pagination) => ({type: SET_SERVICES, services, pagination});
export const setIsFetchingAC = (isFetching = true) => ({type: SET_IS_FETCHING, isFetching});

// Thunk Creators
export const loadServicesTC = (page, size) => (dispatch) => {
    //console.log(page); console.log(size);
    dispatch(setIsFetchingAC());

    const getActionMap = (response) => new Map([
        [200, ()=>dispatch(setServicesAC(
           response.data.content,
           {
               selected: response.data.selectedPage,
               total: response.data.totalPages,
               size: response.data.pageSize,
           }
        ))],
        ["any-err", ()=>dispatch(setServicesAC(
            [],
            {
                selected: undefined,
                total: undefined,
                size: undefined,
            }
        ))],
    ]);
    servicesApi.getServices(page, size).then(response => {
        utils.onResponse("services", response, getActionMap(response));
    }).catch(err => {
        utils.onErr("services", err, getActionMap(err.response));
    });

    /*servicesApi.getServices(page, size).then(response => {
        console.log(20000);
        dispatch(setServicesAC(
            response.data.content,
            {
                selected: response.data.selectedPage,
                total: response.data.totalPages,
                size: response.data.pageSize,
            }
        ));
    }).catch(err => {
        dispatch(setServicesAC(
            [],
            {
                selected: undefined,
                total: undefined,
                size: undefined,
            }
        ));
    });*/
}
