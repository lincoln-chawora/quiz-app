export default function Progress({answers, index, maxPossiblePoints, numberOfQuestions, points }) {
    return (
        <header className="progress">
            <progress  max={numberOfQuestions} value={index + Number(answers[index] !== undefined)} />
            <p>Question <strong>{index + 1}</strong> / {numberOfQuestions}</p>
            <p><strong>{points}</strong> / {maxPossiblePoints}</p>
        </header>
    )
}