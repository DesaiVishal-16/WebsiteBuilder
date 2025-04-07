interface StyleSectionProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: "text" | "number";
}

const StyleSection = ({ label, value, onChange, type = "text" }: StyleSectionProps) => {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full border px-2 py-1 rounded"
      />
    </div>
  );
};

export default StyleSection;
