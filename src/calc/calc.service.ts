import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto) {
    return this.evaluateExpression(calcBody.expression);
  }
  evaluateExpression(expression: string): number {
    // Check for invalid characters or if expression starts/ends with an operator (excluding negative sign at the start)
    if (/[^0-9\+\-\*\/]/.test(expression) || /^[\*\/\+]/.test(expression) || /[\+\-\*\/]$/.test(expression)) {
      throw new BadRequestException("Invalid expression provided");
    }
  
    try {
      // Splitting expression by operators while keeping them for later use
      const tokens = expression.split(/([\+\-\*\/])/).filter(token => token);
  
      const operators = ['*', '/', '+', '-']; // Operator precedence
      let stack = [];
  
      // Evaluating expression based on operator precedence
      operators.forEach((operator) => {
        while (tokens.includes(operator)) {
          const index = tokens.indexOf(operator);
          const left = parseFloat(tokens[index - 1]);
          const right = parseFloat(tokens[index + 1]);
  
          let result = 0;
          switch (operator) {
            case '*':
              result = left * right;
              break;
            case '/':
              if (right === 0) {
                throw new BadRequestException("Invalid expression provided");
              }
              result = left / right;
              break;
            case '+':
              result = left + right;
              break;
            case '-':
              result = left - right;
              break;
          }
  
          // Replace the evaluated expression with the result
          tokens.splice(index - 1, 3, result.toString());
        }
      });
  
      return parseFloat(tokens[0]);
    } catch (error) {
      throw new BadRequestException("Invalid expression provided")
    }
  }
}
