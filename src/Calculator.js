import React from 'react';
import ButtonPanel from './ButtonPanel';
import Display from './Display';

class Calculator extends React.Component {
    constructor(props) {
        super();
        this.state = {
            value: "0",
            isDecimal: false,
            lastOperator: null,
            accumulatedValue: null
        }

        this.handleNumberButtonPress = this.handleNumberButtonPress.bind(this);
        this.handleClearButtonPress = this.handleClearButtonPress.bind(this);
        this.handleDecimalButtonPress = this.handleDecimalButtonPress.bind(this);
        this.handleNegativeButtonPress = this.handleNegativeButtonPress.bind(this);
        this.handlePercentButtonPress = this.handlePercentButtonPress.bind(this);
        this.handleOperatorButtonPress = this.handleOperatorButtonPress.bind(this);
        this.handleEvalButtonPress = this.handleEvalButtonPress.bind(this);
    }

    tryParseNumber(string) {
        if(!string || string === "") return null;

        if(string.charAt(0) === '-') {
            return parseFloat(string.substring(0)) * -1;
        }

        return parseFloat(string);
    }

    numberToString(number) {
        return number < 0 ? "- + number" : "" + number; 
    }

    handleNumberButtonPress(number) {
        this.setState((state) => {
            let newValue = "";
            let newAccumulatedValue = null;
            if(state.lastOperator !== null) {
                //if last press was an operator, save accumulated value
                newAccumulatedValue = state.value;
                state.value = "0";
            }

            if(state.value === "0") {
                newValue = number;
            } else {
                newValue = state.value + number;
            }
            
            return {value: newValue, 
                    accumulatedValue: newAccumulatedValue,
                    lastOperator: null};
        });
    }

    handleClearButtonPress() {
        this.setState({
            value: "0",
            isDecimal: false,
            lastOperator: null,
            accumulatedValue: null
        });
    }

    handleDecimalButtonPress() {
        this.setState((state) => {
            if(!state.isDecimal) {        
                let newValue = state.value + ".";
                return {value: newValue, 
                        isDecimal: true,
                        lastOperator: null};
            }
            return {};
        });
    }
    
    handleNegativeButtonPress() {
        this.setState((state) => {
            let newValue;
            if(state.value.charAt(0) === '-') {
                //is already negative, make it positive
                newValue = state.value.substring(1);
            } else {
                //is positive, make it negative
                newValue = "-" + state.value;
            }
            return {value: newValue, lastOperator: null}
        })
    }

    handlePercentButtonPress() {
        this.setState((state) => {
            if(state.value !== "0") {
                let newValue = this.tryParseNumber(state.value);
                newValue = 1.0 * newValue / 100;
                return {value: this.numberToString(newValue),
                        isDecimal: true,
                        lastOperator: null}
            }
        })
    }

    eval(currentValueString, accumulatedValueString, operator) {
        let currentValue = this.tryParseNumber(currentValueString);
        let accumulatedValue = this.tryParseNumber(accumulatedValueString);
        let result = currentValue;

        if(accumulatedValue) {
            switch(operator) {
                case "+":
                    result = accumulatedValue + currentValue;
                    break;
                case "-":
                    result = accumulatedValue - currentValue;
                    break;
                case "/":
                    result = accumulatedValue / currentValue;
                    break;
                case "x":
                    result = accumulatedValue * currentValue;
                    break;
                default:
                    throw new Error("Unknown Operator");
            }
        }

        return this.numberToString(result);
    }

    handleOperatorButtonPress(operator) {
        this.setState((state) => {
            if(state.lastOperator) {
                return {lastOperator: operator};
            }

            
        });
    }

    handleEvalButtonPress() {
        this.setState((state) => {
            
        });
    }

    render() {
        return (
            <>
                <Display>{this.state.value}</Display>
                <ButtonPanel 
                    onNumberButtonPress={this.handleNumberButtonPress}
                    onClearButtonPress={this.handleClearButtonPress}
                    onDecimalButtonPress={this.handleDecimalButtonPress}
                    onNegativeButtonPress={this.handleNegativeButtonPress}
                    onPercentButtonPress={this.handlePercentButtonPress}
                    onOperatorButtonPress={this.handleOperatorButtonPress}
                    onEvalButtonPress={this.handleEvalButtonPress}
                />
            </>
        );
    }
}

export default Calculator;