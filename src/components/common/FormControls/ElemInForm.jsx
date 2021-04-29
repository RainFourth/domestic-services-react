import React from "react";
import css from "./ElemInForm.module.scss";

// ElementInForm(gen4)
const ElemInForm = (props) => {
    let {input, meta, element, /*children,*/ style, /*label,*/  ...restProps} = props;
    //console.log(props)
    //console.log(restProps)
    //console.log(placeholder)
    const hasError = meta.touched && meta.error;
    return <>
        <div className={css.elemInForm + " " + (hasError && css.error)}>

            {/* надо props.type, а то он это будет считать тегом, а не переменной, содержащей тег */}
            {
                element==="checkbox" || element==="radio" ?
                    <input id={"someId"} type={element} {...input} {...restProps} {...style} />
                    :
                    <props.element {...input} {...restProps} {...style} />
            }

        </div>

        <div className={css.errorMsg}>
            {/*error message*/}
            { hasError && <span>{meta.error}</span> }
        </div>
    </>



}
export default ElemInForm;

