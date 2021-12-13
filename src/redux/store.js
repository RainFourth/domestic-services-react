import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authReducer";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";
import servicesReducer from "./servicesReducer";


// reducer - функция, принимающая часть state и action, изменяющая state в соответствии с action, и возвращающая его
// Создаём объект, где имя переменной является полем в state, а значение поля - reducer к переменной в store
const reducers = combineReducers({
        app: appReducer,
        auth: authReducer,
        services: servicesReducer,

        // подключение библиотечного редьюсера, хранящего данные реактовских форм
        form: formReducer, //имя именно form !!!!!!!


    }
)

// для redux расширеня хрома
const composeEnhancer = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//переменные и reducer'ы автоматически создадутся и привяжутся
/*const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware),
);*/

const store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(thunkMiddleware))
);


// для дебага, чтобы в консоли браузера смотреть чё там лежит
//window.store = store;

export default store;