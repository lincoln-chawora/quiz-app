import {useReducer} from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import quizReducer, {initialState} from "./reducers/quizReducer";
import {useQuestionData} from "./hooks/useQuestionData";

/* --- Feature ideas ---
1. ✅ Shuffle answers
2. ✅ Log all answers so user can go back to review
3. ✅ Update highscore into api
 */

export default function App() {
    const [{questions, status, index, answers, points, highscore}, dispatch] = useReducer(quizReducer, initialState);
    useQuestionData(dispatch);

    const numberOfQuestions = questions.length;
    const lastQuestion = numberOfQuestions === index + 1;
    const maxPossiblePoints = questions.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0);

    function handleFinishQuiz() {
        dispatch({type: 'finish'});
    }

    return (
      <div className="app">
        <Header />

          <Main>
              {status === 'loading' && <Loader />}
              {status === 'error' && <ErrorMessage />}
              {status === 'ready' && <StartScreen numberOfQuestions={numberOfQuestions} dispatch={dispatch} />}
              {status === 'active' &&
                  <>
                    <Progress
                        answers={answers}
                        index={index}
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        numberOfQuestions={numberOfQuestions}
                    />
                    <Question question={questions[index]} answers={answers} dispatch={dispatch} />

                      <Footer>
                          <Timer dispatch={dispatch} totalQuestions={numberOfQuestions} />


                          <div className="btn-container">
                              {index > 0 &&
                                  <button className="btn btn-ui" onClick={() => dispatch({type: 'previousQuestion'})}>Back</button>
                              }

                              <Button index={index} answers={answers} onHandleClick={() => lastQuestion ? handleFinishQuiz() : dispatch({type: 'nextQuestion'})}>
                                  {lastQuestion ? 'Finish' : 'Next'}
                              </Button>
                          </div>

                      </Footer>

                  </>
              }
              {status === 'finished' && <FinishedScreen dispatch={dispatch} points={points} highscore={highscore} maxPossiblePoints={maxPossiblePoints} />}
          </Main>
      </div>
  )
}