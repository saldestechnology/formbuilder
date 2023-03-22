/**
 * Basic types
 */

type PrimitiveTypes =
  | "text"
  | "number"
  | "date"
  | "email"
  | "select"
  | "checkbox"
  | "paragraph"
  | "heading"
  | "image";

interface Form {
  id: string;
  type: PrimitiveTypes;
}

/**
 * Extra functionality for inputs
 */

interface Requireable extends Form {
  required?: boolean;
}

interface Labelable extends Form {
  label: string;
}

/**
 * Validation
 */

interface Operator {
  name: string;
  fn: (a: number, b: number) => boolean;
}

interface NumberValidation {
  type: "number";
  operator: "eq" | "neq" | "gt" | "lt" | "gte" | "lte";
  value: number;
}

interface StringValidation {
  type: "string";
  condition: "startsWith" | "endsWith" | "includes";
  value: string;
}

interface Validation {
  schema: NumberValidation | StringValidation;
  message: string;
  valid?: boolean;
}

interface Validatable extends Form {
  validation?: Validation[];
}

/**
 * Specific types
 */

interface Input extends Requireable, Labelable {
  type: string;
  placeholder: string;
}

interface ParagraphElement extends Form {
  type: "paragraph";
  text: string;
}

interface HeadingElement extends Form {
  type: "heading";
  text: string;
}

interface ImageElement extends Validatable {
  type: "image";
  src: string;
  alt: string;
}

interface TextInput extends Input, Validatable {
  type: "text";
}

interface NumberInput extends Input, Validatable {
  type: "number";
}

interface DateInput extends Input {
  type: "date";
}

interface EmailInput extends Input {
  type: "email";
}

interface Select extends Requireable, Labelable {
  type: "select";
  options: string[];
  defaultOption?: string;
}

interface Checkbox extends Requireable, Labelable {
  type: "checkbox";
  checked: boolean;
}

type InputType =
  | TextInput
  | NumberInput
  | DateInput
  | EmailInput
  | Select
  | Checkbox
  | ParagraphElement
  | HeadingElement
  | ImageElement;
