import { isLabelable } from "@/utils/FormBuilder";

interface AddInputLabelProps {
  type: InputType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const AddInputLabel = ({ type, ...props }: AddInputLabelProps) =>
  isLabelable(type) ? (
    <input type="text" placeholder="Label" {...props} />
  ) : null;
