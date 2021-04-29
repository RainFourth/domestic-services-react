import React from "react";
import css from "./Service.module.scss";
import {connect} from "react-redux";

let Service = (props) => {
    return <div className={css.serviceContainer}>
        <div className={css.title}>{props.title}</div>
        <div className={css.content}>
            <div className={css.img}><img src={"data:image/jpg;charset=utf-8;base64,"+props.image}/></div>
            <div className={css.description}>{props.description}</div>
            <div className={css.price}>{props.price}</div>
        </div>
    </div>
}

/*const mapStateToProps = (state) => ({
    //services: state.services.services,
})
const mapDispatchToProps = {

}
Service = connect(mapStateToProps, mapDispatchToProps)(Service);*/
export default Service;