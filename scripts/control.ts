
/** The class control.ts will orchestrate the classes of InputParser, Model and View
 *  in order to perform the required actions of the extensions. 
 */

import * as WitService from "TFS/WorkItemTracking/Services";
import { Model } from "./model";
import { View } from "./view";
import { ErrorView } from "./errorView";
import * as Q from "q";

export class Controller {
    private _outputFieldName: string = "";
    private _inputFieldName: string = "";


    private _inputs: IDictionaryStringTo<string>;
    private _model: Model;
    private _view: View;

    constructor() {
        this._initialize();
    }

    private _initialize(): void {
        this._inputs = VSS.getConfiguration().witInputs;
        this._outputFieldName = this._inputs["OutputField"];
        this._inputFieldName = this._inputs["InputField"];



        WitService.WorkItemFormService.getService().then(
            (service) => {
                Q.spread(
                    [service.getFieldValue(this._outputFieldName), 
                     service.getFieldValue(this._inputFieldName)],
                    (outputFieldValue: string, inputFieldValue: string) => {
                        
                        this._updateInternal(outputFieldValue, 'outputField', true)
                        this._updateInternal(inputFieldValue, 'inputField', true)

                            // dependent on view, model, and inputParser refactoring
                            this._model = new Model(outputFieldValue, inputFieldValue);
                            this._view = new View((val, fieldName) => {
                            this._updateInternal(val, fieldName, true);

                            this._model.calcValueFromInputs(this._view.getCurrentValues());
                            this._updateInternal(this._model.getCurrentValue('outputField'), 'outputField', true);
                            console.log('**Debug** CurrentValue = ' + this._model.getCurrentValue('outputField'))   
            
                        })
                    }, this._handleError
                ).then(null, this._handleError);
            },
            this._handleError);
    }

    private _handleError(error: string): void {
        new ErrorView(error);
    }

     private _updateInternal(value: string, fieldName: string, updateHtml: boolean): any {

        WitService.WorkItemFormService.getService().then(
            (service) => {


                if(fieldName == 'outputField'){
                service.setFieldValue(this._outputFieldName, value).then(
                    () => {
                        this._update(value, fieldName, updateHtml);
                    }, this._handleError);
                }


                else  if(fieldName == 'inputField'){
                    service.setFieldValue(this._inputFieldName, value).then(
                        () => {
                            this._update(value, fieldName, updateHtml);
                        }, this._handleError);
                    }
            },
            this._handleError
        );
    }

    private _update(value: string, fieldName: string, updateHtml: boolean): void {
        this._model.setCurrentValue(value, fieldName);
        if(updateHtml == true){
            this._view.update(value, fieldName);
        }
        
    }

    // public updateExternal(value: string, fieldName: string): void {
    //     this._update(value, fieldName);
    // }

    // public getFieldName(): string {
    //     return this._severityFieldName;
    // }
}

