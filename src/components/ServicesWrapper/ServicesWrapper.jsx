import React from "react";
import {connect} from "react-redux";
import {setPageAndSizeAC} from "../../redux/servicesReducer";
import {Redirect, useLocation} from "react-router-dom";
import queryString from 'query-string';
import Services from "./Services/Services";

let ServicesWrapper = (props) => {


    const location = useLocation();
    let {page: urlPage, size: urlSize} = queryString.parse(location.search);
    urlPage = Number(urlPage);
    urlSize = +urlSize; //urlSize = Number(urlSize);

    if (!urlPage || !urlSize) {
        if (!urlPage) urlPage = props.page;
        if (!urlSize) urlSize = props.size;
        /*debugger*/
        //console.log(1)
        return <Redirect to={`/services?page=${urlPage}&size=${urlSize}`}/>
    }

    return <Services/>
}

const mapStateToProps = (state) => ({
    page: state.services.page,
    size: state.services.size,
})
const mapDispatchToProps = {
    setPageAndSize: setPageAndSizeAC,
}
ServicesWrapper = connect(mapStateToProps, mapDispatchToProps)(ServicesWrapper);
export default ServicesWrapper;