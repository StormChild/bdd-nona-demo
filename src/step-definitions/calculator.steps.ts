import {binding, given, when, then} from 'cucumber-tsflow';
import { assert } from 'chai';
import { Calculator } from '../components/calculator';

@binding()
export class calculatorSteps{
    private calculator = new Calculator();

      @given(/the first number is (\d*)/)
      public givenTheFirstNumberIs (input: number) {
        this.calculator.input(input);
    }

    @given(/the second number is (\d*)/)
    public givenTheSecondNumberIs(input: number) {
        this.calculator.input(input);
    }
         @when(/the two numbers are added/)
         public theTwoNumbersAreAdded() {
           this.calculator.Add();
         };
         @when(/the two numbers are multiplied/)
         public theTwoNumbersAreMultiplied(){
           this.calculator.Multiply();
         }
         @then(/the result should be (\d*)/)
         public theResultShouldBe(input:number) {
             assert.equal(this.calculator.result, input);
         }

}