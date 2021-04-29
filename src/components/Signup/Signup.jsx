import React from "react";
import {signupTC} from "../../redux/authReducer";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import ElemInForm from "../common/FormControls/ElemInForm";
import formCss from "../common/FormControls/ElemInForm.module.scss";
import {validators} from "../../utils/validators/validatrors";

// todo Check immediately if login is taken

const minLen5 = validators.minLen(5);

let SignupForm = (props) => {
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
                        validate={minLen5}
                    />
                </div>
                <div>
                    <Field name={"name"} element={"input"} component={ElemInForm} placeholder={"name"}
                           validate={validators.required}
                    />
                </div>
                {/*<div>
                    <div style={{display: "flex"}}>
                        <Field name={"rememberMe"} component={PageSelection} element={"checkbox"} id={"cb1"}/>
                        <label htmlFor={"cb1"}>Remember me</label>
                    </div>
                </div>*/}

                {props.error && <div className={formCss.formSummaryError}>{props.error}</div>}

                <button>Register</button>
            </div>
        </form>
    </div>
}
SignupForm = reduxForm({
    form: "signup", //unique form name
})(SignupForm);


let Signup = (props) => {
    const onSubmit = (formData) => {
        const {login, password, name} = formData;
        props.signup(login, password, name);
    }
    return <div>
        Signup page
        <SignupForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state) => ({

})
const mapDispatchToProps = {
    signup: signupTC,
}
Signup = connect(mapStateToProps, mapDispatchToProps)(Signup);
export default Signup;