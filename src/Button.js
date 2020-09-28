import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super();
    }
    
    render() {
        return (
            <div 
                className={"button" + 
                    (this.props.orange ? " orange" : "") + 
                    (this.props.wide ? " wide" : "")}
                onClick={this.props.onButtonPress}
            >
                <button value={this.props.children}>{this.props.children}</button>
            </div>
        );
    }
}

export default Button;