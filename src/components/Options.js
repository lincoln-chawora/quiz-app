import {useMemo} from "react";

const shuffleArray = (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export default function Options({answers, dispatch,question}) {
    const index = question.id - 1;
    const hasAnswered = answers[index] !== undefined;
    const correctAnswer = question.options[question.correctOption];

    // useMemo to ensure that answers are only shuffled on initial render.
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