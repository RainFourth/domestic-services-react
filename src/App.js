
import React, {useEffect} from "react";
import './App.scss';
import Header from "./components/Header/Header";
import {Redirect, Route, Switch} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Signup from "./components/Signup/Signup";
import {connect} from "react-redux";
import Login from "./components/Login/Login";
import {initAppTC} from "./redux/appReducer";
import {compose} from "redux";
import ServicesWrapper from "./components/ServicesWrapper/ServicesWrapper";


// todo изучить useState useMemo useReducer useCallback useContext useHistory
// todo основные хуки https://ru.reactjs.org/docs/hooks-reference.html

let App = (props) => {


    useEffect(()=>{
        if(!props.inited) props.initApp();
    });


    return <div>
        <Header />
        <div>
            {/*работает как switch-case-break-default в коде - рендерит первый подходящий*/}
            <Switch>
                <Route path="/services" render={()=><ServicesWrapper />} />
                <Route path="/profile" component={Profile} />
                {/*с exact например http://localhost:3000/signup/1 не пройдёт
                пройдёт только http://localhost:3000/signup*/}
                <Route path="/signup" exact>
                    <Signup />
                </Route>
                <Route path="/login" render={()=><Login />}/>
                {/*default statement*/}
                <Redirect to={"/services"} />
            </Switch>

        </div>
    </div>
}
const mapStateToProps = (state) => ({
    inited: state.app.inited,
})
const mapDispatchToProps = {
    initApp: initAppTC,
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

/*
withRouter нужен, если обращаемся к URL (непример с помощью useLocation).
withRouter должен быть первее connect, иначе лишний рендер.
Нужно применять withRouter ко всем компонентам сверху до нужной вниз по дереву компонент до той,
где используется информация из URL.
*/
/*App = compose(
    //withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    //withAuthRedirect,
)(App);*/


export default App;
