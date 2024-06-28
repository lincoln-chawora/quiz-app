import {useEffect} from "react";

export default function FinishedScreen({points, maxPossiblePoints, highscore, dispatch}) {
    useEffect(() => {
        fetch('http://localhost:9000/score/1', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({highscore})
        }).catch(error => console.log('Error', error));
    }, [highscore]);

    const percentage = (points/maxPossiblePoints) * 100;

    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";

    return (
        <>
            <p className="result">
                <span>{emoji}</span> You scored <strong>{points} out of {maxPossiblePoints} ({Math.ceil(percentage)}%)</strong>
            </p>
            <p className="highscore">(High score: {highscore} points)</p>

            <button className="btn btn-ui" onClick={() => dispatch({type: 'restart'})}>Restart quiz</button>
        </>
    )
}