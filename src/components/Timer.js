import {useEffect, useState} from "react";
import {useQuizContext} from "../contexts/QuizProvider";
const SECS_PER_QUESTION = 30;

export default function Timer() {
    const {numberOfQuestions, dispatch} = useQuizContext();

    const [seconds, setSeconds] = useState(numberOfQuestions * SECS_PER_QUESTION);

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    if (seconds < 1) {
        dispatch({type: 'finish'});
    }

    useEffect(() => {
        const id = setInterval(function () {
            setSeconds((prevState) => prevState - 1)
        }, 1000);

        return () => clearInterval(id);
    }, [setSeconds]);
    return (
        <div className="timer">
            {mins < 10 && '0'}
            {mins}:{secs < 10 && '0'}
            {secs}
        </div>
    )
}