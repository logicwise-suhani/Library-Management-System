function Button({ onClick, label }) {

    return (
        <>
            <div className="all-buttons">
                <button onClick={onClick}>{label}</button>
            </div>
        </>
    )

};

export default Button;