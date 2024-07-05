export default function Button({answers, index, children, onHandleClick}) {
    return (
        <button className="btn btn-ui" disabled={answers[index] === undefined} onClick={onHandleClick}>{children}</button>
    )
}