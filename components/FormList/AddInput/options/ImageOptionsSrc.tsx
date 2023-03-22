interface ImageOptionsSrcProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  validationRules?: Validation[];
}

export default function ImageOptionsSrc({
  onChange,
  value,
}: ImageOptionsSrcProps) {
  return (
    <div>
      <label>Image</label>
      <input type="text" onChange={onChange} value={value} />
    </div>
  );
}
