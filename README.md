# BDD Demo - 26/11/2021

## Tooling Setup

### Project Management
1. Jira
2. Agile board (kanban/scrum)
3. App: Cucumber for Jira
4. App: Cucumber Studio

### IDE
1. Visual Studio Code
2. Extension: Cucumber (Gherkin) Full Support 
3. Extension: Gherkin PDF (optional) 

### CI/CD
1. Github
2. Github Actions
3. Curl to Cucumber for Jira (For living docs)

## Project Management
1. Inside Jira you can setup your Cucumber for Jira with Cucumber files inside your tasks
2. Once you have filled your backlog you can add these stories to your sprint
3. You can download these stories as feature files to your local drive
4. You can copy these files into your feature folders at the beginning of each sprint

## How to behave

### The gherkin in the mix
Behaviour driven development is a conversation between customers, stakeholders, project managers and development/design teams. Abstract concepts is by its nature open for interpretation. So to eliminate misunderstandings (as much as possible) the gherkin syntax was created. You can read more at [Cucumber Website](https://cucumber.io/docs/gherkin/).

1. The language and stories should be understood by non-technical people
2. The stories should be concrete or non-fiction
3. The stories should have a narative that is believable
4. Think non technical i.e. imagine its 1820

### The cucumber in the salad
Cucumber and Gherkin often gets confused with each other. There is a distinct diference; Gherkin is a natural language wheras Cucumber is a framework. There are many frameworks that uses the Cucumber principles and on many platforms and languages.

### TDD vs BDD
BDD is a form of TDD. The difference being that in traditional TDD paradigms functions are tested individually, this is called unit testing. Functions doesn't exist in a vacuum. There is something that calls the function and there is a result or action from the function. When we call functions we have a context or scenario in mind. With BDD it becomes closer to integration or functional testing. BDD bridges the gap between unit tests and stories to create context for unit tests by creating a narative that is based on real-world scenarios.

### To mock or not to mock
With unit testing the key elements and context are usually mocked. This practise sometimes leads to mocks being generic, incomplete or even anti-production. Meaning that the first time code runs in the real world after a release there is a high risk of critical bugs being released into the wild. When using BDD it is often practised to use actual systems and data to describe and run tests. Obviously not everything will be built already and not everything can be tested. But the balance should test what your customer wants within the confines of what is controllable with the project.

### To err is human
If you are familiar with TDD principles, you should not be afraid of errors, they are your bread and butter. But also don't be afraid to call functions that does not exist. For example in a team there will be cases that certain core functionalities have not been built. If it is a blocker, mock it, if not, call the functions as you would imagine them, and let it break until the functionality has been built.

### Sprint -> TODO
When using tools like Jira and Cucumber for Jira you can define your sprints almost like checkboxes to be fullfilled. Done right will make the question "What do I do next" dissapear.

## Simple Implementation
Run the following commands to scaffold a project
```bash
mkdir bdd-demo && cd bdd-demo
npm init -y
tsc -init
npm i -D @cucumber/cucumber cucumber-pretty typescript ts-node chai
npm i -D @types/cucumber @types/chai
```

Add a cucumber.js file to the root of the project with the following contents:
```javascript
let common = [
  'src/features/**/*.feature',
  '--require-module ts-node/register',
  '--require src/step-definitions/**/*.ts',
  '--format progress',
  '--format json:output/test-results.json'
].join(' ');

module.exports = {
  default: common,
  // More profiles can be added if desired
};
```

Modify the package.json file to change the test script:
```json
"test": "./node_modules/.bin/cucumber-js -p default"
```

Create new folders for your tests:
```bash
mkdir output && mkdir src && cd src && mkdir features && mkdir step-definitions 
```

Create a feature file called 'calculator.feature' in your features folder.
Add the following code to it:

```gherkin
Feature: Calculator
Simple calculator for performing calculations on **two** numbers

@Add
Scenario: Add two numbers
	Given the first number is 50
	And the second number is 70
	When the two numbers are added
	Then the result should be 120

@Multiplication
Scenario: Multiply two numbers
	Given the first number is 51
	And the second number is 23
	When the two numbers are multiplied
	Then the result should be 1173


```

Create a new file in the steps folder called 'calculator.steps.ts'. Add the following code to it:

```typescript
import {binding, given, when, then} from 'cucumber-tsflow';
import {assert} from 'chai';

@binding()
export class calculatorSteps {

}
```

You should be able to run your project using 'npm test'
it should give you loads of warning, but never fear, @cucumber gives you the solution. You should see warnings such as this one:

```
1) Scenario: Add two numbers # features/calculator.feature:5
   ? Given the first number is 50
       Undefined. Implement with the following snippet:

         Given('the first number is {int}', function (int) {
         // Given('the first number is {float}', function (float) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
```

You can now copy all the text from the output with the snippets and modify it in your steps 

1. Add an "@" before each of the Given/When/Then function and change the case of the first letter
2. Change the variables in the string from "{int}" to "(\d)"
3. Change the function(int) to public [whatever_you_want_to_call_it]([variable]:number)
4. Clean up brackets, commas and semicolons

For Example from the snippet:
```javascript
Given('the first number is {int}', function (int) {
         // Given('the first number is {float}', function (float) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

```

Becomes:

```typescript
@given(/the first number is (\d*)/)
         public givenTheFirstNumberIs (input: number) {
            return 'pending';
         }
```

file to look something like this: (note that I removed the redundant functions as the first two function calls are in both features)

```typescript
import {binding, given, when, then } from 'cucumber-tsflow';
import {assert} from 'chai';

@binding()
export class calculatorSteps {

         @given(/the first number is (\d*)/)
         public givenTheFirstNumberIs (input: number) {
            return 'pending';
         }

         @given(/the second number is (\d*)/)
         public givenTheSecondNumberIs(input: number) {
        	return 'pending';
         }

         @when(/the two numbers are added/) 
         public theTwoNumbersAreAdded() {
           return 'pending';
         };

         @when(/the two numbers are multiplied/)
         public theTwoNumbersAreMultiplied(){
           return 'pending';
         }

         @then(/the result should be (\d*)/)
         public theResultShouldBe(input:number) {
			 return 'pending';
         }

        }
```

Now you should run "npm test" in your terminal.

Don't worry about errors. This is part of the process. 

Now we start the actual implementation.
First we Create a new file "src/calculator.ts"
Then Add the following code just to get started:

```typescript
export class Calculator{}
```

Now we go back to our test and start stubbing out our calculator. Add the following to your steps file:

```typescript
import {binding, given, when, then } from 'cucumber-tsflow';
import {assert} from 'chai';
import { Calculator } from '../src/calculator';

@binding()
export class calculatorSteps {
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
           this.calculator.addition();
         };

         @when(/the two numbers are multiplied/)
         public theTwoNumbersAreSubtracted(){
           this.calculator.multiplication();
         }

         @then(/the result should be (\d*)/)
         public theResultShouldBe(input:number) {
         assert.equal(this.calculator.result, input);
         }

        }
```

depending on your IDE you should get a lot of warnings here. But that is fine, this is what you expect. For vscode you can use "command+." Mac or "ctrl+." Windows to refactor each of the errors. It will create your methods and members in your calculator class while you are busy in the steps file.

Next implement your calculator class:

```typescript
export class Calculator{
    
    private numbers: number[] = [];
    public result: number = 0;

    addition() {
        this.result = this.numbers.reduce(this.add, 0);
    }
    private add(accumulator: number, input: number): number {
        var value = +accumulator + +input;
        return value;
    }
    
    multiplication() {
        this.result = this.numbers.reduce( (a, b) => a * b, 1 );
    }
    
    input(input: number) {
        this.numbers.push(input);    
    }

}
```

You should be able to run your test yay! your sprint is complete!

Feature: Calculator

  @Add
  Scenario: Add two numbers
    Given the first number is 50
    And the second number is 70
    When the two numbers are added
    Then the result should be 120

  @Multiplication
  Scenario: Multiply two numbers
    Given the first number is 51
    And the second number is 23
    When the two numbers are multiplied
    Then the result should be 1173

2 scenarios (2 passed)
8 steps (8 passed)

Now you should be able to commit your code and see the result on Jira!

### TODO
- Circle CI implementation
- Add references
