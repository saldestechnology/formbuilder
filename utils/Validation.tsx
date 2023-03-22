import { isValidatable } from "./FormBuilder";

const operators: Operator[] = [
  { name: "gt", fn: gt },
  { name: "lt", fn: lt },
  { name: "gte", fn: gte },
  { name: "lte", fn: lte },
  { name: "eq", fn: eq },
  { name: "neq", fn: neq },
];

function gt(a: number, b: number) {
  return a > b;
}

function lt(a: number, b: number) {
  return a < b;
}

function gte(a: number, b: number) {
  return a >= b;
}

function lte(a: number, b: number) {
  return a <= b;
}

function eq(a: number, b: number) {
  return a === b;
}

function neq(a: number, b: number) {
  return a !== b;
}

function compareWithOperator(a: number, b: number, operator: string) {
  const op = operators.find((o) => o.name === operator);
  if (op) {
    return op.fn(a, b);
  }
  return false;
}

export function createNumberValidator(
  operator: "eq" | "neq" | "gt" | "lt" | "gte" | "lte",
  a: number
): (b: number) => boolean {
  return (b: number) => compareWithOperator(a, b, operator);
}

/**
 * Validate number.
 * @param schema number validation schema
 * @param value compared value
 * @returns boolean
 */
function validateNumber(schema: NumberValidation, value: number): boolean {
  const validator = createNumberValidator(schema.operator, value);
  return validator(schema.value);
}

/**
 * Validate string.
 * @param schema string validation schema
 * @param value compared value
 * @returns boolean
 */
function validateString(schema: StringValidation, value: string): boolean {
  switch (schema.condition) {
    case "startsWith":
      return value.startsWith(schema.value);
    case "endsWith":
      return value.endsWith(schema.value);
    case "includes":
      return value.includes(schema.value);
  }
}

/**
 * Validate value.
 * @param form form
 * @param value compared value
 * @returns boolean
 * @throws Error
 */
export function validate(
  validation: Validation,
  value: string | number
): Validation {
  switch (validation.schema.type) {
    case "number":
      return {
        ...validation,
        valid: validateNumber(validation.schema, value as number),
      };
    case "string":
      return {
        ...validation,
        valid: validateString(validation.schema, value as string),
      };
    default:
      throw new Error("Invalid validation schema");
  }
}
