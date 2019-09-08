import { Model } from "./model";

/**
 * Class view returns the view of a the control rendered to allow
 * the user to change the value.
 */

export class View {

    private currentValue: string = "";

    constructor(private model: Model, private onInputChanged: Function, private onUpTick: Function, private onDownTick: Function, private onCalcEvent: Function) {
        this._init();
    }

    private _init(): void {
        // remove the existing container from body before continuing
        $(".container").remove();
        
        var container = $("<div />");
        container.addClass("container");

        var wrap = $("<div />");
        wrap.addClass("wrap combo emptyBorder");

        var SevirityTB = $("<input />").attr("type", "number");
        wrap.append(SevirityTB);
        SevirityTB.attr("aria-valuenow", this.currentValue);
        SevirityTB.change(() => {
            this._inputChanged();
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


         var calc = $("<div />");
         calc.css("border", "2px solid green");
         calc.css("border-radius", "5px");
         calc.css("padding", "3px")
         calc.html("Calc Severity");
         calc.click(() => {
             var TaskFrequencyInput2 = $(".workitemlabel");
             this.onCalcEvent();
         });

        container.append(wrap);
        container.append(calc);

        $("body").append(container);


        $( document ).ready(function() {
            
            console.log( "ready!" );
            setTimeout(function() {
                //bind onchange event to the inputs fields
                var TaskFrequencyInput = $(".workitemlabel").has("label:contains('Task Frequency')").next().find("input");
                console.log('TaskFrequencyInput = ' + String(TaskFrequencyInput)  );
                //alert(TaskFrequencyInput.val())
                TaskFrequencyInput.change(this.onCalcEvent());
                $(".workitemlabel").has("label:contains('Occurrence')").next().find("input").change(this.onCalcEvent);
                $(".workitemlabel").has("label:contains('Implication')").next().find("input").change(this.onCalcEvent);
           }, 2000);



  
            //this.bindChangeEventToInputs();
        });
        //this.onCalcEvent();
    }

    private _inputChanged(): void {
        let newValue = Number($("input").val());
        if (this.onInputChanged) {
            this.onInputChanged(newValue);
        }
    }

    public update(value: string) {
        this.currentValue = String(value);
        $("input").val(this.currentValue);
    }


    public bindChangeEventToInputs(){
        
        // //bind onchange event to the inputs fields
        // var TaskFrequencyInput = $(".workitemlabel").has("label:contains('Task Frequency')").next().find("input");
        // TaskFrequencyInput.change(this.onCalcEvent());
        // $(".workitemlabel").has("label:contains('Occurrence')").next().find("input").change(this.onCalcEvent);
        // $(".workitemlabel").has("label:contains('Implication')").next().find("input").change(this.onCalcEvent);

    }
}

