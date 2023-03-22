interface ImageOptionsAltProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function ImageOptionsAlt(props: ImageOptionsAltProps) {
  return (
    <div>
      <label>Alt</label>
      <input type="text" {...props} />
    </div>
  );
}
