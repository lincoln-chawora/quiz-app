function ErrorMessage() {
    return (
        <p className="error">
            <span>💥</span> There was an error fetching questions. Is the questions 'server' running?
        </p>
    );
}

export default ErrorMessage;