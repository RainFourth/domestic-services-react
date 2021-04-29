import React from "react";
import css from "./Profile.module.scss"
import {connect} from "react-redux";

let Profile = (props) => {
    //console.log(props);
    return <div className={css.profile}>
        <div>Profile</div>
        <div>{"isAuth: " + props.isAuth}</div>
        <div>{"userId: " + props.userId}</div>
        <div>{"login: " + props.login}</div>
        <div>{"name: " + props.name}</div>
        {/*<button>Удалить аккаунт</button>*/}
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    login: state.auth.login,
    name: state.auth.name,
})
const mapDispatchToProps = {

}
Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default Profile;