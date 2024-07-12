import {useQuizContext} from "../contexts/QuizProvider";

export default function StartScreen() {
    const {numberOfQuestions, dispatch} = useQuizContext();
    return (
        <div className="start">
            <h2>Welcome to The react Quiz!</h2>
            <h3>{numberOfQuestions} questions to test your React mastery</h3>
            <button className="btn btn-ui" onClick={() => dispatch({type: 'start'})}>Start</button>
        </div>
    )
}