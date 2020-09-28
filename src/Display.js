import React from 'react';

class Display extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="display">
                <div>{this.props.children}</div>
            </div>
        );
    }
}

export default Display;