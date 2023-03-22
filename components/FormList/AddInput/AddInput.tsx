import { isRequireable } from "@/utils/FormBuilder";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { AddInputLabel } from "./AddInputLabel";
import {
  HeadingOptions,
  ImageOptionsAlt,
  ImageOptionsSrc,
  ParagraphOptions,
  PlaceholderOptions,
  SelectOptions,
} from "./options";

interface AddInputProps {
  onSubmit: (input: Form) => void;
}

/**
 * This is a parent component which acts as an encoder from the UI to
 * our object representation of an input in a form.
 * This is achieved by first selecting the type of object you wish to
 * construct. Since each property of an input field as defined by the
 * HTML standard is unique so is also each input field (this will be
 * important later). Input fields available to the user is defined in
 * accordance with the interface that a particular type implements.
 *
 * In this component we also apply a validation layer. This validation
 * layer relies on an interface with an id that represents the unique
 * input fields. Because an input is unique within this encoder we're
 * able to attach validation schemas to the input object.
 */
export default function AddInput({ onSubmit }: AddInputProps) {
  const [inputType, setInputType] = useState<PrimitiveTypes>("text");
  const [inputLabel, setInputLabel] = useState<string>("");
  const [isRequired, setIsRequired] = useState<boolean>(true);
  const [inputPlaceholder, setInputPlaceholder] = useState<string>("");
  const [heading, setHeading] = useState<string>("");
  const [paragraph, setParagraph] = useState<string>("");
  const [selectOptions, setSelectOptions] = useState<string[]>([""]);
  const [src, setSrc] = useState<string>("");
  const [alt, setAlt] = useState<string>("");
  const [isReady, setReady] = useState<boolean>(false);

  const commonProps = {
    id: uuid(),
  };

  const handleInputTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputType(e.currentTarget.value as PrimitiveTypes);
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
          validation: [
            {
              schema: {
                type: "string",
                condition: "startsWith",
                value: "https://images.unsplash.com",
              },
              message: "Have to start with 'https://images.unsplash.com'",
            },
            {
              schema: {
                type: "string",
                condition: "endsWith",
                value: "/",
              },
              message: "Have to end with '/'",
            },
          ],
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
          <>
            <ImageOptionsSrc
              onChange={(e) => setSrc(e.target.value)}
              value={src}
            />
            <ImageOptionsAlt
              onChange={(e) => setAlt(e.target.value)}
              value={alt}
            />
          </>
        );
      case "select":
        return <SelectOptions onSubmit={handleSelectOptionsChange} />;
      default:
        return null;
    }
  };

  const resetAllStates = () => {
    setInputType("text");
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
    const input = makeInputType();
    onSubmit(input);
    resetAllStates();
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <AddInputLabel
        type={makeInputType()}
        onChange={handleInputLabelChange}
        value={inputLabel}
      />
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
