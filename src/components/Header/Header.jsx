import React from "react";
import css from "./Header.module.scss"
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logoutTC} from "../../redux/authReducer";

let Header = (props) => {
    return <div className={css.headerSpace}>
        <div className={css.header}>
            <div className={css.content}>

                <div className={css.btns}>
                    {/* кнопка с редиректом по клику */}


                    <Link to={"/services"}>
                        <button>Услуги</button>
                    </Link>

                    {!props.isAuth &&
                    <Link to={"/login"}>
                        <button>Войти</button>
                    </Link>}

                    {!props.isAuth &&
                    <Link to={"/signup"}>
                        <button>Регистрация</button>
                    </Link>}


                    {props.isAuth &&
                    <button onClick={props.logout}>Выйти</button>}

                    {props.isAuth &&
                    <Link to={"/profile"}>
                        <button>Профиль</button>
                    </Link>}

                </div>

            </div>
        </div>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})
const mapDispatchToProps = {
    logout: logoutTC,
}
Header = connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;