import { useCallback, useState } from "react";
import Image from "next/image";
import useValidation from "./useValidation";

function isText(input: Form): input is TextInput {
  return input.type === "text";
}

function isNumber(input: Form): input is NumberInput {
  return input.type === "number";
}

function isDate(input: Form): input is DateInput {
  return input.type === "date";
}

function isEmail(input: Form): input is EmailInput {
  return input.type === "email";
}

function isSelect(input: Form): input is Select {
  return input.type === "select";
}

function isCheckbox(input: Form): input is Checkbox {
  return input.type === "checkbox";
}

function isParagraph(input: Form): input is ParagraphElement {
  return input.type === "paragraph";
}

function isHeading(input: Form): input is HeadingElement {
  return input.type === "heading";
}

function isImage(input: Form): input is ImageElement {
  return input.type === "image";
}

export function isRequireable(input: Form): input is Requireable {
  return Object.hasOwnProperty.call(input, "required");
}

export function isLabelable(input: Form): input is Labelable {
  return Object.hasOwnProperty.call(input, "label");
}

export function isValidatable(input: Form): input is Validatable {
  return Object.hasOwnProperty.call(input, "validation");
}

interface ListReadableValidationErrorsProps {
  validations: Validation[];
}

function ListReadableValidationErrors({
  validations,
}: ListReadableValidationErrorsProps) {
  return (
    <ul>
      {validations.map((validation, index) =>
        !validation.valid ? (
          <li key={`${validation.schema.type}-${index}`}>
            {validation.message}
          </li>
        ) : null
      )}
    </ul>
  );
}

interface TextProps extends TextInput {
  onChange?: (e: React.ChangeEvent) => void;
}

function FormText({
  label,
  onChange,
  required,
  placeholder,
  validation = [],
}: TextProps) {
  const [text, setText] = useState("");
  const validated = useValidation(validation, text);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const className = useCallback(() => {
    if (validated === undefined) {
      return "";
    }
    return validated.every((v) => v.valid) ? "" : "danger";
  }, [validated]);

  return (
    <div>
      <label>{label}</label>
      <input
        className={className()}
        onChange={onChange ? onChange : handleChange}
        type="text"
        value={text}
        placeholder={placeholder}
        required={required}
      />
      <ListReadableValidationErrors validations={validated} />
    </div>
  );
}

interface FormNumberProps extends NumberInput {
  onChange?: (e: React.ChangeEvent) => void;
}

function FormNumber({
  label,
  onChange,
  required,
  placeholder,
  validation = [],
}: FormNumberProps) {
  const [number, setNumber] = useState(0);
  const validated = useValidation(validation, number);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(parseInt(e.target.value, 10));
  };

  const className = useCallback(() => {
    if (validated === undefined) {
      return "";
    }
    return validated.every((v) => v.valid) ? "" : "danger";
  }, [validated]);

  return (
    <div>
      <label>{label}</label>
      <input
        className={className()}
        onChange={onChange ? onChange : handleChange}
        type="number"
        value={number}
        placeholder={placeholder}
        required={required}
      />
      <ListReadableValidationErrors validations={validated} />
    </div>
  );
}

interface FormDateProps extends DateInput {
  onChange?: (e: React.ChangeEvent) => void;
}

function FormDate({ label, onChange, required, placeholder }: FormDateProps) {
  const [text, setText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div>
      <label>{label}</label>
      <input
        onChange={onChange ? onChange : handleChange}
        type="date"
        value={text}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

interface FormEmailProps extends EmailInput {
  onChange?: (e: React.ChangeEvent) => void;
}

function FormEmail({ label, onChange, required, placeholder }: FormEmailProps) {
  const [text, setText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div>
      <label>{label}</label>
      <input
        onChange={onChange ? onChange : handleChange}
        type="email"
        value={text}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

interface FormSelectProps extends Select {
  onChange?: (e: React.ChangeEvent) => void;
}

function FormSelect({
  label,
  options,
  defaultOption,
  onChange,
  required,
}: FormSelectProps) {
  const [selected, setSelected] = useState(defaultOption);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };
  return (
    <div>
      <label>{label}</label>
      <select
        onChange={onChange ? onChange : handleChange}
        value={selected}
        required={required}
      >
        {options.map((option, i) => (
          <option key={`${option}-${i}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

interface FormCheckboxProps extends Checkbox {
  onChange?: (e: React.ChangeEvent) => void;
}

function FormCheckbox({
  label,
  checked,
  onChange,
  required,
}: FormCheckboxProps) {
  const [isChecked, setChecked] = useState(checked);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  return (
    <div>
      <label>{label}</label>
      <input
        onChange={onChange ? onChange : handleChange}
        type="checkbox"
        checked={isChecked}
        required={required}
      />
    </div>
  );
}

interface FormParagraphProps extends ParagraphElement {}

function FormParagraph({ text }: FormParagraphProps) {
  return <p>{text}</p>;
}

interface FormHeadingProps extends HeadingElement {}

function FormHeading({ text }: FormHeadingProps) {
  return <h1>{text}</h1>;
}

interface FormImageProps extends ImageElement {}

function FormImage({ src, alt }: FormImageProps) {
  if (!src.startsWith("https://images.unsplash.com")) {
    <p>
      Unsupported image. Image must be from{" "}
      <a href="https://unsplash.com/">images.unsplash.com</a>
    </p>;
  }
  return (
    <div>
      <Image fill src={src} alt={alt} />
      <style jsx>{`
        div {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 3;
        }
      `}</style>
    </div>
  );
}

interface FormSelectorProps {
  input: Form;
}

export function FormSelector({ input }: FormSelectorProps) {
  if (isText(input)) {
    return <FormText {...input} />;
  }
  if (isNumber(input)) {
    return <FormNumber {...input} />;
  }
  if (isDate(input)) {
    return <FormDate {...input} />;
  }
  if (isEmail(input)) {
    return <FormEmail {...input} />;
  }
  if (isSelect(input)) {
    return <FormSelect {...input} />;
  }
  if (isCheckbox(input)) {
    return <FormCheckbox {...input} />;
  }
  if (isParagraph(input)) {
    return <FormParagraph {...input} />;
  }
  if (isHeading(input)) {
    return <FormHeading {...input} />;
  }
  if (isImage(input)) {
    return <FormImage {...input} />;
  }
  return null;
}

interface FormBuilderProps {
  inputs: Form[];
}

export default function FormBuilder({ inputs }: FormBuilderProps) {
  return (
    <>
      {inputs.map((input, i) => (
        <FormSelector input={input} key={i} />
      ))}
    </>
  );
}

export const mockInputs: InputType[] = [
  {
    id: "1",
    type: "text",
    label: "Text",
    placeholder: "Placeholder",
    required: true,
  },
  {
    id: "2",
    type: "number",
    label: "Number",
    placeholder: "Placeholder",
    required: true,
  },
  {
    id: "3",
    type: "date",
    label: "Date",
    placeholder: "Placeholder",
  },
  {
    id: "4",
    type: "email",
    label: "Email",
    placeholder: "Placeholder",
    required: true,
  },
  {
    id: "5",
    type: "select",
    label: "Select",
    options: ["Option 1", "Option 2", "Option 3"],
    defaultOption: "Option 1",
    required: true,
  },
  {
    id: "7",
    type: "checkbox",
    label: "Checkbox",
    checked: false,
    required: true,
  },
];
