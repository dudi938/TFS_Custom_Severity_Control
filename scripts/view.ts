import { Model } from "./model";

/**
 * Class view returns the view of a the control rendered to allow
 * the user to change the value.
 */

export class View {

    private inputCurrentValue: string = "";
    private outputCurrentValue: string = "";


    constructor(private onInputChanged: Function) {
        this._init();
    }


    private _init(): void {

        var newLine = $("<br>");

        // input field
        $(".container").remove();
        var container = $("<div />");
        container.addClass("container");
        var inWrap = $("<div />");
        inWrap.addClass("wrap combo emptyBorder");
        var inLB = $("<Label />")
        inLB.addClass("workitemcontrol-label")
        inLB.text('Input');
        inLB.attr("for", 'inputField');
        var inTB = $("<input />").attr("type", "text");
        inTB.attr("id", "inField")
        inWrap.append(inTB);
        inTB.attr("aria-valuenow", this.inputCurrentValue);
        inTB.addClass("inputClass");
        inTB.change(() => {

        }).on("input", (evt: JQueryKeyEventObject) => {
            this._inputChanged('inputField', 'inputClass', evt);
        });
        container.append(inLB);
        container.append(inWrap);
        container.append(newLine)

        

        //output field
        var outWrap = $("<div />");
        outWrap.addClass("wrap combo emptyBorder");
        var outLB = $("<Label />")
        outLB.addClass("workitemcontrol-label")
        outLB.text('Output');
        outLB.attr('for', 'outField');
        var outTB = $("<input />").attr("type", "text");
        outTB.attr("id", "outField")
        outWrap.append(outTB);
        outTB.attr("aria-valuenow", this.outputCurrentValue);
        outTB.addClass("outputClass");
        outTB.change(() => {
  
        }).on("input", (evt: JQueryKeyEventObject) => {
             this._inputChanged('outputField', 'outputClass', evt);

        });
        container.append(outLB);
        container.append(outWrap);
        container.append(newLine)


        $("body").append(container);
    }

    private _inputChanged(fieldName: string, JQselector: string, evt: JQueryKeyEventObject): void {
        let newValue = $(evt.target).val()
        if (this.onInputChanged) {
            this.onInputChanged(newValue, fieldName);
        }
    }


    public update(value: string, fieldName: string) {
        if(fieldName == 'inputField'){
            this.inputCurrentValue = String(value);
            $(".inputClass").val(this.inputCurrentValue);
        }
        if(fieldName == 'outputField'){
            this.outputCurrentValue = String(value);
            $(".outputClass").val(this.outputCurrentValue);
        }
    }

    public getCurrentValues() :any{
        var currentValues = {
            inputFieldValue: $(".inputClass").val(),
            outputFieldValue: $(".outputClass").val()
        }
        return currentValues;
    }
}