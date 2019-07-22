export class Model {

    /**
     * Model takes the initial value from Control and sets it to the current value 
     * selected in the Hit Count custom control. This will be updated in View and
     * changes as the user increments and decrements the value.
     */

    constructor(initialValue: number) {
        this._currentValue = initialValue;
    }

    private _currentValue: number;

    public setCurrentValue(value: number) {
        if (value === undefined) {
            throw "Undefined value";
        }
        this._currentValue = value;
    }

    public decrementValue() {
        if (this._currentValue > 0) {
            this.setCurrentValue(this._currentValue - 2);
        }
    }

    public incrementValue() {
        this.setCurrentValue(this._currentValue + 2);
    }

    public getCurrentValue(): number {
        return this._currentValue;
    }

    public calcValueFromInputs(value1: number,value2: number, value3: number ) {
        // if (value1 === undefined || value1 === null) {
        //     alert("Undefined value");
        //     return
        // }
        // if (value2 === undefined || value2 === null) {
        //     alert("Undefined value");
        //     return
        // }
        // if (value3 === undefined || value3 === null) {
        //     alert("Undefined value");
        //     return
        // }
        // if (value4 === undefined || value4 === null) {
        //     alert("Undefined value");
        //     return
        // }


        this._currentValue = (value1 + value2 ) * value3;
    }
}