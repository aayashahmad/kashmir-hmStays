const FancyTitle = ({ title }) => {

    return (

        <div className="fancy_wrapper">
            <div className="fancy_title bold-text cursive_text">
                {title}
            </div>
            <div className="fancy_underline"></div>
        </div>

    )
}


export default FancyTitle;