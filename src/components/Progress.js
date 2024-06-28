export default function Progress({maxPossiblePoints, numberOfQuestions, points, index, answer}) {
    return (
        <header className="progress">
            <progress  max={numberOfQuestions} value={index + Number(answer !== null)} />
            <p>Question <strong>{index + 1}</strong> / {numberOfQuestions}</p>
            <p><strong>{points}</strong> / {maxPossiblePoints}</p>
        </header>
    )
}