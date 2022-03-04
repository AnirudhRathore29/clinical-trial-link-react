import './SectionTitle.css'

const SectionTitle = (props) => {
    return (
        <>
            <div className={`sec-title ${props.CustomClass}`}>
                {props.StepCount}
                <h2 className="h2"> {props.title} </h2>
                {props.ShapeImage &&
                    <img src={`/images/${props.ShapeImage}`} alt="shape vector" />
                }
                {props.SubHeading}
                {props.SubHeading2}
                {props.HeadingBtn}
            </div>
        </>
    );
}

export default SectionTitle;