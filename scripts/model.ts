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

    public calcValueFromInputs(sPlanedFinishDate: string ) {
        let PlanedFinishDate = new Date(sPlanedFinishDate)


        //this._currentValue = PlanedFinishDate + 0;
        var dateDiff = PlanedFinishDate.getTime() - Date.now();
        this._currentValue = Math.ceil(dateDiff / (1000 * 3600 * 24));
    }
}