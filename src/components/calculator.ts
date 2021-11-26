export class Calculator{
    private numbers:number[] = [];
    public result: number = 0;

    Multiply() {
        this.result = this.numbers.reduce((total,increment) => total * increment, 1);
    }

    Add() {
        this.result = this.numbers.reduce(this.Addition, 0);
    }

    private Addition(total: number, increment: number): number
    {
        var value = +total + +increment;
        return value;
    }

    input(input: number) {
        this.numbers.push(input);
    }
}