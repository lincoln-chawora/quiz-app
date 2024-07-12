import {useMemo} from "react";
import {useQuizContext} from "../contexts/QuizProvider";

const shuffleArray = (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export default function Options() {
    const {answers, index, questions, dispatch} = useQuizContext();

    const question = questions[index];
    const hasAnswered = answers[index] !== undefined;
    const correctAnswer = question.options[question.correctOption];

    // useMemo to store the result of the shuffle in a cache, a reshuffle will only occur if
    // question.options changes. This prevents the order changing when the component is
    // rendered from an answer being selected (an action which doesn't change the questions state).
    const answerOptions = useMemo(() => {
        return shuffleArray(question.options.map(i => i));
    }, [question.options]);

    return (
        <div className="options">
            {answerOptions.map((answer, idx) =>
                <button
                    onClick={() => dispatch({type: 'questionAnswered', payload: answer})}
                    className={`btn btn-option 
                        ${answer === answers[index] ? 'answer' : ''} 
                        ${hasAnswered ? correctAnswer === answer ? 'correct' : 'wrong' : ''}`
                    }
                    key={answer}
                    disabled={hasAnswered}
                    value={idx}
                >{answer}</button>
            )}
        </div>
    )
}