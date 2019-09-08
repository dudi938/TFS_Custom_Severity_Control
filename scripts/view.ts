import { Model } from "./model";

/**
 * Class view returns the view of a the control rendered to allow
 * the user to change the value.
 */

export class View {

    private sevCurrentValue: string = "";
    private impCurrentValue: string = "";
    private taskFreqCurrentValue: string = "";
    private repCurrentValue: string = "";



    constructor(private model: Model, private onInputChanged: Function, private onUpTick: Function, private onDownTick: Function) {
        this._init();
    }



    private _init(): void {

        // severity field
        $(".container").remove();
        var container = $("<div />");
        container.addClass("container");
        var sevWrap = $("<div />");
        sevWrap.addClass("wrap combo emptyBorder");
        var sevLB = $("<Label />").addClass("workitemcontrol-label").val('Severity');
        var sevTB = $("<input />").attr("type", "text");
        sevWrap.append(sevLB);
        sevWrap.append(sevTB);
        sevTB.attr("aria-valuenow", this.sevCurrentValue);
        sevTB.addClass("sevClass");
        sevTB.change(() => {
            this._inputChanged('severityField', 'sevClass');
        }).on("keydown", (evt: JQueryKeyEventObject) => {
            if (evt.keyCode === 38) {
                if (this.onUpTick) {
                    this.onUpTick();
                    evt.preventDefault();
                }
            } else if (evt.keyCode === 40) {
                if (this.onDownTick) {
                    this.onDownTick();
                    evt.preventDefault();
                }
            }
        });
        container.append(sevWrap);

        

        var impWrap = $("<div />");
        impWrap.addClass("wrap combo emptyBorder");
        var impLB = $("<Label />").addClass("workitemcontrol-label").val('Implication');
        var impTB = $("<input />").attr("type", "text");
        impWrap.append(impLB);
        impWrap.append(impTB);
        impTB.attr("aria-valuenow", this.impCurrentValue);
        impTB.addClass("impClass");
        impTB.change(() => {
            this._inputChanged('implicationField', 'impClass');
        }).on("keydown", (evt: JQueryKeyEventObject) => {
            if (evt.keyCode === 38) {
                if (this.onUpTick) {
                    this.onUpTick();
                    evt.preventDefault();
                }
            } else if (evt.keyCode === 40) {
                if (this.onDownTick) {
                    this.onDownTick();
                    evt.preventDefault();
                }
            }
        });
        container.append(impWrap);




        var taskFreqWrap = $("<div />");
        taskFreqWrap.addClass("wrap combo emptyBorder");
        var taskFreqLB = $("<Label />").addClass("workitemcontrol-label").val('Task Frequency');
        var taskFreqTB = $("<input />").attr("type", "text");
        taskFreqWrap.append(taskFreqLB);
        taskFreqWrap.append(taskFreqTB);
        taskFreqTB.attr("aria-valuenow", this.taskFreqCurrentValue);
        taskFreqTB.addClass("taskFreqClass");
        taskFreqTB.change(() => {
            this._inputChanged('taskFrequencyField', 'taskFreqClass');
        }).on("keydown", (evt: JQueryKeyEventObject) => {
            if (evt.keyCode === 38) {
                if (this.onUpTick) {
                    this.onUpTick();
                    evt.preventDefault();
                }
            } else if (evt.keyCode === 40) {
                if (this.onDownTick) {
                    this.onDownTick();
                    evt.preventDefault();
                }
            }
        });
        container.append(taskFreqWrap);




        var repWrap = $("<div />");
        repWrap.addClass("wrap combo emptyBorder");
        var repLB = $("<Label />").addClass("workitemcontrol-label");
        var repTB = $("<input />").attr("type", "text");
        repWrap.append(repLB);
        repWrap.append(repTB);
        repTB.attr("aria-valuenow", this.repCurrentValue);
        repTB.addClass("repClass");
        repTB.change(() => {
            this._inputChanged('reaptableField', 'repClass');
        }).on("keydown", (evt: JQueryKeyEventObject) => {
            if (evt.keyCode === 38) {
                if (this.onUpTick) {
                    this.onUpTick();
                    evt.preventDefault();
                }
            } else if (evt.keyCode === 40) {
                if (this.onDownTick) {
                    this.onDownTick();
                    evt.preventDefault();
                }
            }
        });
        container.append(repWrap);


        $("body").append(container);


    }

    private _inputChanged(fieldName: string, JQselector: string): void {
        let newValue = $("." + JQselector).val();
        if (this.onInputChanged) {
            this.onInputChanged(newValue, fieldName);
        }
    }

    public update(value: string, fieldName: string) {
        if(fieldName == 'severityField'){
            this.sevCurrentValue = String(value);
            $(".sevClass").val(this.sevCurrentValue);
        }
        if(fieldName == 'implicationField'){
            this.impCurrentValue = String(value);
            $(".impClass").val(this.impCurrentValue);
        }
        if(fieldName == 'taskFrequencyField'){
            this.taskFreqCurrentValue = String(value);
            $(".taskFreqClass").val(this.taskFreqCurrentValue);
        }
        if(fieldName == 'reaptableField'){
            this.repCurrentValue = String(value);
            $(".repClass").val(this.repCurrentValue);
        }
    }

    public getCurrentValues() :any{
        var currentValues = {
            severity: $(".sevClass").val(),
            implication: $(".impClass").val(),
            taskFrequency: $(".taskFreqClass").val(),
            reapetable: $(".repClass").val()       
        }
        return currentValues;
    }
}