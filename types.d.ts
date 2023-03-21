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
  label: string;
  onChange?: (e: React.ChangeEvent) => void;
}

interface Requireable extends Form {
  required?: boolean;
}

interface Input extends Requireable {
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

interface ImageElement extends Form {
  type: "image";
  src: string;
  alt: string;
}

interface TextInput extends Input {
  type: "text";
}

interface NumberInput extends Input {
  type: "number";
}

interface DateInput extends Input {
  type: "date";
}

interface EmailInput extends Input {
  type: "email";
}

interface Select extends Requireable {
  type: "select";
  options: string[];
  defaultOption?: string;
}

interface Checkbox extends Requireable {
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
