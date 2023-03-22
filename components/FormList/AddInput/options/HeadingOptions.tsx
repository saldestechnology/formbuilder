interface HeadingOptionsProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function HeadingOptions({
  onChange,
  value,
}: HeadingOptionsProps) {
  return (
    <div>
      <label>Heading</label>
      <input onChange={onChange} type="text" value={value} />
    </div>
  );
}
