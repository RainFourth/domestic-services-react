import React, {useEffect} from "react";
import css from "./Services.module.scss"
import {connect} from "react-redux";
import Service from "./Service/Service";
import {loadServicesTC, setIsFetchingAC, setPageAndSizeAC} from "../../../redux/servicesReducer";
import PageSelection from "../../common/PageSelection/PageSelection";
import {useLocation} from "react-router-dom";
import queryString from 'query-string';

let Services = (props) => {

    const location = useLocation();
    let {page: urlPage, size: urlSize} = queryString.parse(location.search);
    urlPage = Number(urlPage);
    urlSize = +urlSize; //urlSize = Number(urlSize);


    useEffect(()=>{
        if (props.page!==urlPage || props.size!==urlSize) {
            props.setPageAndSize(urlPage, urlSize);
        } else {
            if (!props.loaded && !props.isFetching){
                props.loadServices(props.page, props.size);
            }
        }
    },[urlPage, urlSize, props.page, props.size, props.loaded, props.isFetching]);





    if (!props.loaded) return <></>;

    const services = props.services.map(s => <Service key={s.id} title={s.title} image={s.image} description={s.description} price={s.price}/>)
    const pageSelection = <div className={css.pages}>
        <PageSelection
            selected={props.pagination.selected}
            total={props.pagination.total}
            displayedNumber={5}
            getLink={i=>`/services?page=${i}&size=${props.size}`}
        />
    </div>


    if (props.services.length===0)
        return <div>
            No content loaded
            {pageSelection}
        </div>;

    return <div className={css.services}>
        {pageSelection}
        {services}
        {pageSelection}
    </div>
}

const mapStateToProps = (state) => ({
    page: state.services.page,
    size: state.services.size,
    loaded: state.services.loaded,
    isFetching: state.services.isFetching,
    services: state.services.services,
    pagination: state.services.pagination,
})
const mapDispatchToProps = {
    setPageAndSize: setPageAndSizeAC,
    loadServices: loadServicesTC,
    setIsFetching: setIsFetchingAC,
}
Services = connect(mapStateToProps, mapDispatchToProps)(Services);
export default Services;