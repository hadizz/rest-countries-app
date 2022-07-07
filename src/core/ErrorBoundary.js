import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(_error) {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
        this.setState({error, errorInfo});
    }

    render() {
        if (this.state.hasError) {
            // handle error page UI
            return (<div>
                we hit the wall!
                <div>{this.state.error}</div>
                <div>{this.state.errorInfo}</div>
            </div>)
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
