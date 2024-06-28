export default function Button({answer, children, onHandleClick}) {
    if (answer === null) return;
    return (
        <button className="btn btn-ui" onClick={onHandleClick}>{children}</button>
    )
}