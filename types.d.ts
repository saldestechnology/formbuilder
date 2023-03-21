interface Form {
  id: string;
  type: string;
  label: string;
  onChange?: (e: React.ChangeEvent) => void;
}

interface Requireable {
  required?: boolean;
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

interface Input extends Form, Requireable {
  type: string;
  placeholder: string;
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

interface Select extends Form, Requireable {
  type: "select";
  options: string[];
  defaultOption?: string;
}

interface Checkbox extends Form, Requireable {
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
