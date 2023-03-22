interface PlaceholderOptionsProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function PlaceholderOptions({
  onChange,
  value,
}: PlaceholderOptionsProps) {
  return (
    <div>
      <label>Placeholder</label>
      <input onChange={onChange} type="text" value={value} />
    </div>
  );
}
