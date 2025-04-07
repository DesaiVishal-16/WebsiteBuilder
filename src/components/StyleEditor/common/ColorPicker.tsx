interface Props{
 value: string; 
 onChange: (val: string) => void ;
 name: string;
}

const ColorPicker = ({ value, onChange,name }: Props) => {
  return (
    <div>
      <label className="block text-sm font-medium">{name}</label>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="mt-1" />
    </div>
  );
};

export default ColorPicker;
