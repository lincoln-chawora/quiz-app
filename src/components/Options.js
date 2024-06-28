export default function Options({question, dispatch, answer}) {
    const hasAnswered = answer !== null
    return (
        <div className="options">
            {question.options.map((option, idx) =>
                <button
                    onClick={() => dispatch({type: 'newAnswer', payload: idx})}
                    className={`btn btn-option 
                        ${idx === answer ? 'answer' : ''} 
                        ${hasAnswered ? idx === question.correctOption ? 'correct' : 'wrong' : ''}`
                    }
                    key={option}
                    disabled={hasAnswered}
                    value={idx}
                >{option}</button>
            )}
        </div>
    )
}