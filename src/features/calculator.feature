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
