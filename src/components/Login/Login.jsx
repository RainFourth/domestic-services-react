import React from "react";
import {Field, reduxForm} from "redux-form";
import ElemInForm from "../common/FormControls/ElemInForm";
import {connect} from "react-redux";
import {loginTC} from "../../redux/authReducer";
import css from "./Login.module.scss";
import formCss from "../common/FormControls/ElemInForm.module.scss";
import {validators} from "../../utils/validators/validatrors";



let LoginForm = (props) => {
    //console.log(props);
    return <div>
        {/*
        Про Warning в консоли - косяк в либе форм
        https://stackoverflow.com/questions/62202890/how-can-i-fix-using-unsafe-componentwillmount-in-strict-mode-is-not-recommended
        */}
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field name={"login"} element={"input"} component={ElemInForm} placeholder={"login (email)"}
                           validate={validators.required}
                        /*someProp={"AAAA"} - любые атрибуты, не перехваченные в Field, прокинутся дальше в component (прокинутся element, placeholder) */
                    />
                </div>
                <div>
                    <Field name={"password"} element={"input"} type={"password"} component={ElemInForm} placeholder={"password"}
                           validate={validators.required}
                        /*validate={}*/
                    />
                </div>
                {/*<div>
                    <div style={{display: "flex"}}>
                        <Field name={"rememberMe"} component={PageSelection} element={"checkbox"} id={"cb1"}/>
                        <label htmlFor={"cb1"}>Remember me</label>
                    </div>
                </div>*/}

                {props.error && <div className={formCss.formSummaryError}>{props.error}</div>}

                <button>Login</button>
            </div>
        </form>
    </div>
}
LoginForm = reduxForm({
    form: "login", //unique form name
})(LoginForm);



let Login = (props) => {

    const onLoginSubmit = (formData) => {
        //console.log(formData);
        const {login, password, rememberMe} = formData;
        props.login(login, password, rememberMe);
    }

    return <div>
        Login page
        <LoginForm onSubmit={onLoginSubmit}/>
    </div>
}
const mapStateToProps = (state) => ({

})
const mapDispatchToProps = {
    login: loginTC,
}
Login = connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;