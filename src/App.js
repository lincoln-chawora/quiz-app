import {useEffect, useReducer} from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import quizReducer, {initialState} from "./reducers/quizReducer";

/* Feature ideas:
1. Shuffle answers
2. Log all answers so user can go back to review
3. Update highscore into api
 */

export default function App() {
    const [{questions, status, index, answer, points, highscore}, dispatch] = useReducer(quizReducer, initialState);

    const numberOfQuestions = questions.length;
    const lastQuestion = numberOfQuestions === index + 1;
    const maxPossiblePoints = questions.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0);

    useEffect(() => {
        fetch('http://localhost:9000/questions')
            .then(response => response.json())
            .then(data => dispatch(
                {
                    type: 'dataReceived',
                    payload: { questions: data }
                }
            ))
            .catch(error => dispatch({type: 'dataFailed', payload: error}));
    }, []);

    /*
    useEffect(() => {
        fetch('http://localhost:9000/score/1')
            .then(response => response.json())
            .then(data => dispatch(
                {
                    type: 'dataReceived',
                    payload: { highscore: data.highscore }
                }
            ))
            .catch(error => console.log(error));
    }, []);
     */


    function handleFinishQuiz() {
        dispatch({type: 'finish'});
    }

  return (
      <div className="app">
        <Header />

          <Main>
              {status === 'loading' && <Loader />}
              {status === 'error' && <Error />}
              {status === 'ready' && <StartScreen numberOfQuestions={numberOfQuestions} dispatch={dispatch} />}
              {status === 'active' &&
                  <>
                    <Progress
                        answer={answer}
                        questions={questions}
                        index={index}
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        numberOfQuestions={numberOfQuestions}
                    />
                    <Question question={questions[index]} answer={answer} dispatch={dispatch} />

                      <Footer>
                          <Timer dispatch={dispatch} totalQuestions={numberOfQuestions} />

                        <Button answer={answer} onHandleClick={() => lastQuestion ? handleFinishQuiz() : dispatch({type: 'nextQuestion'})}>
                            {lastQuestion ? 'Finish' : 'Next'}
                        </Button>
                      </Footer>

                  </>
              }
              {status === 'finished' && <FinishedScreen dispatch={dispatch} points={points} highscore={highscore} maxPossiblePoints={maxPossiblePoints} />}
          </Main>
      </div>
  )
}