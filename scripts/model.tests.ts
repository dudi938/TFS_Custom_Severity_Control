import { expect } from "chai";
import { Model } from "./model";

describe("Model", () => {
    let model: Model;

    beforeEach(() => {
        model = new Model('', '');
    });

    it("correctly initialize value to 0", () => {
        expect(model.getCurrentValue('')).to.be.deep.equal(0);
    });

    it("increments 0 to be 1", () => {

        expect(model.getCurrentValue('')).to.be.deep.equal(1);
    });

    it("decrements 0 to remain at 0", () => {

        expect(model.getCurrentValue('')).to.be.deep.equal(0);
    });

    it("decrements 1 to be 0", () => {
        model.setCurrentValue('', '');

        expect(model.getCurrentValue('')).to.be.deep.equal(0);
    });

    it("decrements 20 twice to be 18", () => {
        model.setCurrentValue('', '');

        expect(model.getCurrentValue('')).to.be.deep.equal(18);
    });

});
