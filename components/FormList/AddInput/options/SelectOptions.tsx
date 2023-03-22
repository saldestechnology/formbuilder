import { useState } from "react";

interface SelectOption {
  id: string;
  value: string;
}

interface SelectOptionsProps {
  onSubmit: (options: string[]) => void;
}

export default function SelectOptions({ onSubmit }: SelectOptionsProps) {
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
