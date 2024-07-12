import {useQuizContext} from "../contexts/QuizProvider";

export default function Button({children, onHandleClick}) {
    const {answers, index} = useQuizContext();
    return (
        <button className="btn btn-ui" disabled={answers[index] === undefined} onClick={onHandleClick}>{children}</button>
    )
}