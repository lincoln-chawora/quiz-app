import Options from "./Options";

export default function Question({answers, dispatch, question}) {
    return (
        <div>
            <h3>{question.question}</h3>

            <Options question={question} answers={answers} dispatch={dispatch} />
        </div>
    )
}