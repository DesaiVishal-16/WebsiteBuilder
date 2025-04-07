const FontSizeSelector = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  const options = ["12px", "14px", "16px", "20px", "24px", "32px"];

  return (
    <div>
      <label className="block text-sm font-medium">Font Size</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 border rounded">
        {options.map((size) => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
    </div>
  );
};

export default FontSizeSelector;
