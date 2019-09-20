export class Model {

    /**
     * Model takes the initial value from Control and sets it to the current value 
     * selected in the Hit Count custom control. This will be updated in View and
     * changes as the user increments and decrements the value.
     */
    private _outputCurrentValue: string;
    private _inputCurrentValue: string;



    constructor(inputFieldValue, outputFieldValue) {
        this._outputCurrentValue = outputFieldValue;
        this._inputCurrentValue = inputFieldValue;
    }




    public setCurrentValue(value: string, fieldName: string) {
        if (value === undefined) {
            throw "Undefined value";
        }

        if(fieldName == 'outputField'){
            this._outputCurrentValue = String(value);
        }
        if(fieldName == 'inputField'){
            this._inputCurrentValue = String(value);
        }
    }
    

    public getCurrentValue(fieldName: string): string {
        if(fieldName == 'outputField'){
            return this._outputCurrentValue;
        }
        if(fieldName == 'inputField'){
            return this._inputCurrentValue;
        }
        
    }
//this._model.calcValueFromInputs(String(Repeatable, Implication, TaskFrequency));
    public calcValueFromInputs(currentValues) {


        console.log('**Debug** inputFieldValue = ' + currentValues.inputFieldValue)
        console.log('**Debug** outputFieldValue = ' + currentValues.outputFieldValue)


        if(currentValues.inputFieldValue != null && currentValues.outputFieldValue){
            console.log('*****')
            console.log(currentValues.inputFieldValue)
            console.log('*****')
            console.log(String(currentValues.inputFieldValue).split('$'))
        }
    }
}