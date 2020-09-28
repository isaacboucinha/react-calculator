import React from 'react';
import Button from './Button'

const NUMBER = "number";
const CLEAR = "clear";
const DECIMAL = "decimal";
const NEGATIVE = "negative";
const PERCENT = "percent";
const OPERATOR = "operator";

class ButtonPanel extends React.Component {
    constructor(props) {
        super();
        this.handleButtonPress = this.handleButtonPress.bind(this);
    }

    handleButtonPress(type, e) {
        if(type === NUMBER) {
            this.props.onNumberButtonPress(e.target.value, e);
        } else if(type === CLEAR) {
            this.props.onClearButtonPress(e.target.value, e);
        } else if(type === DECIMAL) {
            this.props.onDecimalButtonPress(e.target.value, e);
        } else if(type === NEGATIVE) {
            this.props.onNegativeButtonPress(e.target.value, e);
        } else if(type === PERCENT) {
            this.props.onPercentButtonPress(e.target.value, e);
        } else if(type === OPERATOR) {
            this.props.onOperatorButtonPress(e.target.value, e);
        }
    }

    render() {
        return (
            <div className="button-panel">
                <div>
                    <Button onButtonPress={this.handleButtonPress.bind(this, CLEAR)}>AC</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, NEGATIVE)}>+/-</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, PERCENT)}>%</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, OPERATOR)}
                            orange="true">/</Button>
                </div>
                <div>
                    <Button onButtonPress={this.handleButtonPress.bind(this, NUMBER)}>7</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, NUMBER)}>8</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, NUMBER)}>9</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, OPERATOR)} 
                            orange="true">x</Button>
                </div>
                <div>
                    <Button onButtonPress={this.handleButtonPress.bind(this, NUMBER)}>4</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, NUMBER)}>5</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, NUMBER)}>6</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, OPERATOR)} 
                            orange="true">-</Button>
                </div>
                <div>
                    <Button onButtonPress={this.handleButtonPress.bind(this, NUMBER)}>1</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, NUMBER)}>2</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, NUMBER)}>3</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, OPERATOR)} 
                            orange="true">+</Button>
                </div>
                <div>
                    <Button onButtonPress={this.handleButtonPress.bind(this, NUMBER)} 
                            wide="true">0</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, DECIMAL)}>.</Button>
                    <Button onButtonPress={this.handleButtonPress.bind(this, OPERATOR)} 
                            orange="true">=</Button>
                </div>
            </div>
        );
    }
}

export default ButtonPanel;