import {useQuizContext} from "../contexts/QuizProvider";

export default function Progress() {
    const {answers, numberOfQuestions, maxPossiblePoints, points, index} = useQuizContext();
    return (
        <header className="progress">
            <progress  max={numberOfQuestions} value={index + Number(answers[index] !== undefined)} />
            <p>Question <strong>{index + 1}</strong> / {numberOfQuestions}</p>
            <p><strong>{points}</strong> / {maxPossiblePoints}</p>
        </header>
    )
}