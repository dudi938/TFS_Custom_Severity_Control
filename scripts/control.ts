
/** The class control.ts will orchestrate the classes of InputParser, Model and View
 *  in order to perform the required actions of the extensions. 
 */

import * as WitService from "TFS/WorkItemTracking/Services";
import { Model } from "./model";
import { View } from "./view";
import { ErrorView } from "./errorView";
import * as Q from "q";

export class Controller {
    private _fieldName: string = "";
    private _inputs: IDictionaryStringTo<string>;
    private _model: Model;
    private _view: View;

    constructor() {
        this._initialize();
    }

    private _initialize(): void {
        this._inputs = VSS.getConfiguration().witInputs;
        this._fieldName = this._inputs["FieldName"];

        WitService.WorkItemFormService.getService().then(
            (service) => {
                Q.spread(
                    [service.getFieldValue(this._fieldName)],
                    (currentValue: number) => {
                        // dependent on view, model, and inputParser refactoring
                        this._model = new Model(Number(currentValue));
                        this._view = new View(this._model, (val) => {
                            this._updateInternal(val);
                        }, () => {
                            this._model.incrementValue();
                            this._updateInternal(this._model.getCurrentValue());
                        }, () => {
                            this._model.decrementValue();
                            this._updateInternal(this._model.getCurrentValue());
                        }, () => {

                            console.log('************Debug***************')
                            service.getFieldValue('Task Frequency').then((TaskFrequencyvid) =>{
                                service.getFieldValue('Repeatable').then((Repeatable) =>{
                                    service.getFieldValue('Implication').then((Implication) =>{
                                        console.log('Task Frequency=' + TaskFrequencyvid)
                                        console.log('Repeatable=' + Repeatable)
                                        console.log('Implication=' + Implication)



                                        if (TaskFrequencyvid === null) {
                                            alert("Missing input in Task Frequency field");
                                            return
                                        }
                                        if (Repeatable === null) {
                                            alert("Missing input in Repeatable field");
                                            return
                                        }
                                        if (Implication === null) {
                                            alert("Missing input in Implication field");
                                            return
                                        }

                                        this._model.calcValueFromInputs(Number(TaskFrequencyvid),Number(Repeatable),Number(Implication));
                                        this._updateInternal(this._model.getCurrentValue());
                                    })
                                })
                            })
                            console.log('************Debug***************')
                        });
                    }, this._handleError
                ).then(null, this._handleError);
            },
            this._handleError);
    }

    private _handleError(error: string): void {
        new ErrorView(error);
    }

    private _updateInternal(value: number): void {
        WitService.WorkItemFormService.getService().then(
            (service) => {
                service.setFieldValue(this._fieldName, value).then(
                    () => {
                        this._update(value);
                    }, this._handleError);
            },
            this._handleError
        );
    }

    private _update(value: number): void {
        this._model.setCurrentValue(value);
        this._view.update(value);
    }

    public updateExternal(value: number): void {
        this._update(value);
    }

    public getFieldName(): string {
        return this._fieldName;
    }
}

