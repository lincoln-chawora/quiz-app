import Options from "./Options";
import {useQuizContext} from "../contexts/QuizProvider";

export default function Question() {
    const {index, questions} = useQuizContext();

    const question = questions.at(index);

    return (
        <div>
            <h3>{question.question}</h3>

            <Options />
        </div>
    )
}