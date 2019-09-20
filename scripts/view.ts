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

        var newLine = $("<br>");




        // severity field
        $(".container").remove();
        var container = $("<div />");
        container.addClass("container");
        var sevWrap = $("<div />");
        sevWrap.addClass("wrap combo emptyBorder");
        var sevLB = $("<Label />")
        sevLB.addClass("workitemcontrol-label")
        sevLB.text('Severity');
        sevLB.attr("for", 'sevField');
        var sevTB = $("<input />").attr("type", "text");
        sevTB.attr("id", "sevField")
        sevWrap.append(sevTB);
        sevTB.attr("aria-valuenow", this.sevCurrentValue);
        sevTB.addClass("sevClass");
        sevTB.change(() => {
            //this._inputChanged('severityField', 'sevClass');
        }).on("input", (evt: JQueryKeyEventObject) => {
            this._inputChanged('severityField', 'sevClass', evt);
            //this._inputChanged('severityField', evt.key);
            //evt.preventDefault();
        });
        container.append(sevLB);
        container.append(sevWrap);
        container.append(newLine)

        

        var impWrap = $("<div />");
        impWrap.addClass("wrap combo emptyBorder");
        var impLB = $("<Label />")
        impLB.addClass("workitemcontrol-label")
        impLB.text('Implication');
        impLB.attr('for', 'impField');
        var impTB = $("<input />").attr("type", "text");
        impTB.attr("id", "impField")
        impWrap.append(impTB);
        impTB.attr("aria-valuenow", this.impCurrentValue);
        impTB.addClass("impClass");
        impTB.change(() => {
            //this._inputChanged('implicationField', 'impClass');
        }).on("input", (evt: JQueryKeyEventObject) => {
             this._inputChanged('implicationField', 'impClass', evt);
            //this._inputChanged('implicationField', evt.key);
           //evt.preventDefault();
        });
        container.append(impLB);
        container.append(impWrap);
        container.append(newLine)



        var taskFreqWrap = $("<div />");
        taskFreqWrap.addClass("wrap combo emptyBorder");
        var taskFreqLB = $("<Label />")
        taskFreqLB.addClass("workitemcontrol-label")
        taskFreqLB.text('Task Frequency');
        taskFreqLB.attr('for', 'taskFreq');
        var taskFreqTB = $("<input />").attr("type", "text");
        taskFreqTB.attr("id", "taskFreq")
        taskFreqWrap.append(taskFreqTB);
        taskFreqTB.attr("aria-valuenow", this.taskFreqCurrentValue);
        taskFreqTB.addClass("taskFreqClass");
        taskFreqTB.change(() => {
            //this._inputChanged('taskFrequencyField', 'taskFreqClass');
        }).on("input", (evt: JQueryKeyEventObject) => {
            this._inputChanged('taskFrequencyField', 'taskFreqClass', evt);
            //this._inputChanged('taskFrequencyField', evt.key);
            //evt.preventDefault();
        });
        container.append(taskFreqLB);
        container.append(taskFreqWrap);
        container.append(newLine)



        var repWrap = $("<div />");
        repWrap.addClass("wrap combo emptyBorder");
        var repLB = $("<Label />")
        repLB.addClass("workitemcontrol-label");
        repLB.text("Reaptable")
        repLB.attr("for", "reaptField")
        var repTB = $("<input />").attr("type", "text");
        repTB.attr("id", "reaptField")
        repWrap.append(repTB);
        repTB.attr("aria-valuenow", this.repCurrentValue);
        repTB.addClass("repClass");
        repTB.change(() => {
            //this._inputChanged('reaptableField', 'repClass');
        }).on("input", (evt: JQueryKeyEventObject) => {
            this._inputChanged('reaptableField', 'repClass', evt);
            //this._inputChanged('reaptableField', evt.key);
            //evt.preventDefault();
        });
        container.append(repLB);
        container.append(repWrap);


        $("body").append(container);


    }

    private _inputChanged(fieldName: string, JQselector: string, evt: JQueryKeyEventObject): void {
        let newValue = $(evt.target).val()
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