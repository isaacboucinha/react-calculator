import React from 'react';
import ButtonPanel from './ButtonPanel';
import Display from './Display';

class Calculator extends React.Component {
    constructor(props) {
        super();
        this.state = {
            value: "0",
            lastOperator: null,
            accumulatedValue: "0",
            lastPressWasOperator: false
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
                    result = accumulatedValue;
            }
        }

        return this.numberToString(result);
    }

    handleNumberButtonPress(number) {
        this.setState((state) => {
            // debugger;
            let value = state.value;
            let newAccumulatedValue = state.accumulatedValue;
            if(state.lastPressWasOperator) {
                //if last press was an operator, save accumulated value
                newAccumulatedValue = state.value;
                value = "0";
            }

            if(value === "0") {
                value = number;
            } else {
                value = state.value + number;
            }
            
            return {value: value, 
                    accumulatedValue: newAccumulatedValue,
                    lastPressWasOperator: false};
        });
    }

    handleClearButtonPress() {
        this.setState({
            value: "0",
            lastOperator: null,
            accumulatedValue: "0",
            lastPressWasOperator: false
        });
    }

    handleDecimalButtonPress() {
        this.setState((state) => {
            if(!state.value.includes('.')) {        
                let newValue = state.value + ".";
                return {value: newValue, 
                        lastPressWasOperator: false};
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
            return {value: newValue, lastPressWasOperator: false}
        })
    }

    handlePercentButtonPress() {
        this.setState((state) => {
            if(state.value !== "0") {
                let newValue = this.tryParseNumber(state.value);
                newValue = 1.0 * newValue / 100;
                return {value: this.numberToString(newValue),
                        lastOperator: null}
            }
        })
    }

    handleOperatorButtonPress(operator) {
        this.setState((state) => {
            // debugger;
            //if last press operator, simply replace operator
            if(state.lastPressWasOperator) {
                return {lastOperator: operator};
            }
            
            //last press was not operator
            //if there is an accumulated value, evaluate it
            let res = state.value;
            if(state.accumulatedValue !== "0") {
                res = this.eval(state.value, state.accumulatedValue, state.lastOperator);
            }

            return {value: res,
                    lastOperator: operator,
                    lastPressWasOperator: true
                }
        });
    }

    handleEvalButtonPress() {
        this.setState((state) => {
            // debugger;
            let res = this.eval(state.value, state.accumulatedValue, state.lastOperator);
            return {
                value: res,
                lastPressWasOperator: true
            }
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