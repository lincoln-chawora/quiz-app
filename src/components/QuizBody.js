import Progress from "./Progress";
import Question from "./Question";
import Footer from "./Footer";
import Timer from "./Timer";
import Button from "./Button";
import {useQuizContext} from "../contexts/QuizProvider";

export function QuizBody() {
    const {index, dispatch, lastQuestion} = useQuizContext();
    return (
        <>
            <Progress />
            <Question />

            <Footer>
                <Timer />

                <div className="btn-container">
                    {index > 0 &&
                        <button className="btn btn-ui" onClick={() => dispatch({type: 'previousQuestion'})}>Back</button>
                    }

                    <Button onHandleClick={() => lastQuestion ? dispatch({type: 'finish'}) : dispatch({type: 'nextQuestion'})}>
                        {lastQuestion ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </Footer>
        </>
    )
}