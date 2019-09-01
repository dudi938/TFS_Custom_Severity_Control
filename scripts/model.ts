export class Model {

    /**
     * Model takes the initial value from Control and sets it to the current value 
     * selected in the Hit Count custom control. This will be updated in View and
     * changes as the user increments and decrements the value.
     */

    constructor(initialValue: string) {
        this._currentValue = initialValue;
    }

    private _currentValue: string;

    public setCurrentValue(value: string) {
        if (value === undefined) {
            throw "Undefined value";
        }
        this._currentValue = value;
    }

    public decrementValue() {
        //if (this._currentValue > 0) {
        //    this.setCurrentValue(this._currentValue - 2);
        // }
    }

    public incrementValue() {
        this.setCurrentValue(this._currentValue + 2);
    }

    public getCurrentValue(): string {
        return this._currentValue;
    }
//this._model.calcValueFromInputs(String(Repeatable, Implication, TaskFrequency));
    public calcValueFromInputs(Repeatable: string ,Implication: string ,TaskFrequency: string , CalcSeverity) {
        console.log('**Debug** Repeatable = ' + Repeatable)
        console.log('**Debug** Implication = ' + Implication)
        console.log('**Debug** TaskFrequency = ' + TaskFrequency)
        console.log('**Debug** CalcSeverity = ' + CalcSeverity)

        if(Repeatable != null && Implication != null && TaskFrequency != null && CalcSeverity == true){
            //TODO need set Calc Severity flag to false

            var RepeatablePrefix = Repeatable.substr(0,1)
            var TaskFrequencyPrefix = TaskFrequency.substr(0,1)
            var ImplicationPrefix = Implication.substr(0,1)
            
            var severity = Number(RepeatablePrefix) * Number(TaskFrequencyPrefix) * Number(ImplicationPrefix);

                                                
            if (severity <= 20 )
            {
                this._currentValue = "Minor";                                     
            }
            else if (severity > 20 && severity <= 40 )
            {
                this._currentValue = "Medium";
            }
            else if (severity > 40 && severity <= 60 )
            {
                this._currentValue = "Major";
            }
            else if (severity > 60)
            {
                this._currentValue = "Critical";
            }
            

            
        }
    }
}