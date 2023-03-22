interface ParagraphOptionsProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function ParagraphOptions({
  onChange,
  value,
}: ParagraphOptionsProps) {
  return (
    <div>
      <label>Paragraph</label>
      <input onChange={onChange} type="text" value={value} />
    </div>
  );
}
