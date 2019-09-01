
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
                    (currentValue: string) => {
                        // dependent on view, model, and inputParser refactoring
                        this._model = new Model(currentValue);
                        this._view = new View(this._model, (val) => {
                            this._updateInternal(val);
                        }, () => {
                            this._model.incrementValue();
                            this._updateInternal(this._model.getCurrentValue());
                        }, () => {
                            this._model.decrementValue();
                            this._updateInternal(this._model.getCurrentValue());
                        }, () => {

                            alert("Hello world");
                            service.getFieldValue('Repeatable').then((Repeatable) =>{
                                service.getFieldValue('Implication').then((Implication) =>{
                                    service.getFieldValue('Task Frequency').then((TaskFrequency) =>{
                                        service.getFieldValue('Calc severity').then((CalcSeverity) =>{                            
                                            this._model.calcValueFromInputs(String(Repeatable), String(Implication), String(TaskFrequency), String(CalcSeverity));
                                            this._updateInternal(this._model.getCurrentValue());
                                            console.log('**Debug** CurrentValue = ' + this._model.getCurrentValue())   
                                        });
                                     });  
                                });
                            })
                        });
                    }, this._handleError
                ).then(null, this._handleError);
            },
            this._handleError);
    }

    private _handleError(error: string): void {
        new ErrorView(error);
    }

    private _updateInternal(value: string): void {
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

    private _update(value: string): void {
        this._model.setCurrentValue(value);
        this._view.update(value);
    }

    public updateExternal(value: string): void {
        this._update(value);
    }

    public getFieldName(): string {
        return this._fieldName;
    }
}

