import { isLabelable, isRequireable } from "@/utils/FormBuilder";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

interface PlaceholderOptionsProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

function PlaceholderOptions({ onChange, value }: PlaceholderOptionsProps) {
  return (
    <div>
      <label>Placeholder</label>
      <input onChange={onChange} type="text" value={value} />
    </div>
  );
}

interface HeadingOptionsProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

function HeadingOptions({ onChange, value }: HeadingOptionsProps) {
  return (
    <div>
      <label>Heading</label>
      <input onChange={onChange} type="text" value={value} />
    </div>
  );
}

interface ParagraphOptionsProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

function ParagraphOptions({ onChange, value }: ParagraphOptionsProps) {
  return (
    <div>
      <label>Paragraph</label>
      <input onChange={onChange} type="text" value={value} />
    </div>
  );
}

interface SelectOptionsProps {
  onSubmit: (options: string[]) => void;
}

interface SelectOption {
  id: string;
  value: string;
}

function SelectOptions({ onSubmit }: SelectOptionsProps) {
  const [options, setOptions] = useState<SelectOption[]>([
    { id: "1", value: "" },
  ]);
  const addInput = () => {
    setOptions((prev) => {
      return [
        ...prev,
        {
          id: `${prev.length + 1}`,
          value: "",
        },
      ];
    });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prev) => {
      return prev.map((option) => {
        if (option.id === e.target.id) {
          return { ...option, value: e.target.value };
        }
        return option;
      });
    });
    onSubmit(options.map((option) => option.value));
  };
  const removeLastElementOption = () => {
    setOptions(options.slice(0, -1));
  };
  return (
    <div>
      <label>Options</label>
      {options.map((option, index) => (
        <input
          id={option.id}
          key={index}
          onChange={onChange}
          type="text"
          value={option.value}
          required
        />
      ))}
      <div className="grid">
        <div>
          <button onClick={addInput}>Add</button>
        </div>
        <div>
          <button onClick={removeLastElementOption}>Remove</button>
        </div>
      </div>
    </div>
  );
}

interface ImageOptionsProps extends Validatable {
  onChangeSrc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAlt: (e: React.ChangeEvent<HTMLInputElement>) => void;
  src: string;
  alt: string;
  id: string;
}

function ImageOptions({
  onChangeSrc,
  onChangeAlt,
  src,
  alt,
  validate,
  removeValidation,
  id,
}: ImageOptionsProps) {
  const [srcValid, setSrcValid] = useState<boolean>(true);
  const handleSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSrcValid(e.target.value.startsWith("https://images.unsplash.com"));
    if (srcValid && validate) validate(id, srcValid);
    onChangeSrc(e);
  };
  useEffect(() => {
    return () => {
      if (removeValidation) removeValidation(id);
    };
  }, [removeValidation, id]);
  return (
    <div>
      <label>Image</label>
      <input
        className={srcValid ? "" : "danger"}
        onChange={handleSrcChange}
        type="text"
        value={src}
        formNoValidate={!srcValid}
      />
      {!srcValid && <p className="error">Image must be from unsplash</p>}
      <label>Alt</label>
      <input onChange={onChangeAlt} type="text" value={alt} />
      <style jsx>{`
        .error {
          color: var(--color-danger);
          font-size: 0.5rem;
        }
        .danger {
          outline: 1px solid var(--color-danger);
        }
      `}</style>
    </div>
  );
}

interface InputValidation {
  id: string;
  valid: boolean;
}

interface AddInputProps {
  onSubmit: (input: Form) => void;
}

export default function AddInput({ onSubmit }: AddInputProps) {
  const [inputType, setInputType] = useState<PrimitiveTypes | "">("");
  const [inputLabel, setInputLabel] = useState<string>("");
  const [isRequired, setIsRequired] = useState<boolean>(true);
  const [inputPlaceholder, setInputPlaceholder] = useState<string>("");
  const [heading, setHeading] = useState<string>("");
  const [paragraph, setParagraph] = useState<string>("");
  const [selectOptions, setSelectOptions] = useState<string[]>([""]);
  const [src, setSrc] = useState<string>("");
  const [alt, setAlt] = useState<string>("");
  const [isValid, setIsValid] = useState<InputValidation[]>(
    [] as InputValidation[]
  );
  const [isReady, setReady] = useState<boolean>(false);

  const commonProps = {
    id: uuid(),
  };

  const handleInputTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputType(e.target.value as PrimitiveTypes);
  };

  const handleInputLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLabel(e.target.value);
  };

  const handleInputPlaceholderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputPlaceholder(e.target.value);
  };

  const handleSelectOptionsChange = (options: string[]) => {
    setSelectOptions(options);
  };

  /**
   * Validation logics.
   */

  const validate = (id: string, valid: boolean) => {
    setIsValid((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) {
        return [...prev, { id, valid }];
      }
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, valid };
        }
        return item;
      });
    });
    setReady(isValidated());
  };

  const isValidated = () => isValid.every((rule) => rule.valid);

  const removeValidation = (id: string) => {
    setIsValid((prev) => {
      return prev.filter((item) => item.id !== id);
    });
    setReady(isValidated());
  };

  /**
   * Export as object
   */

  const makeInputType = (): InputType => {
    switch (inputType) {
      case "text":
        return {
          ...commonProps,
          type: "text",
          placeholder: inputPlaceholder,
          required: isRequired,
          label: inputLabel,
        };
      case "number":
        return {
          ...commonProps,
          type: "number",
          placeholder: inputPlaceholder,
          required: isRequired,
          label: inputLabel,
        };
      case "date":
        return {
          ...commonProps,
          type: "date",
          placeholder: inputPlaceholder,
          required: isRequired,
          label: inputLabel,
        };
      case "email":
        return {
          ...commonProps,
          type: "email",
          placeholder: inputPlaceholder,
          required: isRequired,
          label: inputLabel,
        };
      case "select":
        return {
          ...commonProps,
          type: "select",
          options: selectOptions,
          required: isRequired,
          label: inputLabel,
        };
      case "checkbox":
        return {
          ...commonProps,
          type: "checkbox",
          checked: false,
          required: isRequired,
          label: inputLabel,
        };
      case "image":
        return {
          ...commonProps,
          type: "image",
          src,
          alt,
          validate,
          removeValidation,
        };
      case "heading":
        return {
          ...commonProps,
          type: "heading",
          text: heading,
        };
      case "paragraph":
        return {
          ...commonProps,
          type: "paragraph",
          text: paragraph,
        };
      default:
        return {
          ...commonProps,
          type: "text",
          placeholder: inputPlaceholder,
          required: isRequired,
          label: inputLabel,
        };
    }
  };

  const selectedOptions = () => {
    switch (inputType) {
      case "text":
        return (
          <PlaceholderOptions
            onChange={handleInputPlaceholderChange}
            value={inputPlaceholder}
          />
        );
      case "email":
        return (
          <PlaceholderOptions
            onChange={handleInputPlaceholderChange}
            value={inputPlaceholder}
          />
        );
      case "heading":
        return (
          <HeadingOptions
            onChange={(e) => setHeading(e.target.value)}
            value={heading}
          />
        );
      case "paragraph":
        return (
          <ParagraphOptions
            onChange={(e) => setParagraph(e.target.value)}
            value={paragraph}
          />
        );
      case "image":
        return (
          <ImageOptions
            onChangeSrc={(e) => setSrc(e.target.value)}
            onChangeAlt={(e) => setAlt(e.target.value)}
            src={src}
            alt={alt}
            validate={validate}
            removeValidation={removeValidation}
            id={uuid().toString()}
          />
        );
      case "select":
        return <SelectOptions onSubmit={handleSelectOptionsChange} />;
      default:
        return null;
    }
  };

  const resetAllStates = () => {
    setInputType("");
    setInputLabel("");
    setIsRequired(true);
    setInputPlaceholder("");
    setSelectOptions([""]);
    setHeading("");
    setParagraph("");
    setSrc("");
    setAlt("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidated()) {
      const input = makeInputType();
      onSubmit(input);
      resetAllStates();
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <label>
        Type
        <select
          defaultValue={"text"}
          value={inputType as string}
          onChange={handleInputTypeChange}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="email">Email</option>
          <option value="select">Select</option>
          <option value="radio">Radio</option>
          <option value="checkbox">Checkbox</option>
          <option value="image">Image</option>
          <option value="heading">Heading</option>
          <option value="paragraph">Paragraph</option>
        </select>
      </label>
      {isLabelable(makeInputType()) && (
        <input
          type="text"
          placeholder="Label"
          onChange={handleInputLabelChange}
          value={inputLabel}
        />
      )}
      {selectedOptions()}
      {isRequireable(makeInputType()) && (
        <label>
          Is required?
          <input
            type="checkbox"
            onChange={(e) => setIsRequired(e.target.checked)}
            checked={isRequired}
          />
        </label>
      )}
      <button disabled={isReady} type="submit">
        Add input
      </button>
      <style jsx>{`
        div {
          margin: 1rem 0;
        }
        input[type="checkbox"] {
          margin-left: 0.5rem;
        }
      `}</style>
    </form>
  );
}
