import InputMask from "react-input-mask";

export default function PhoneInput({ value, onChange }) {
  
  return (
    <InputMask
      mask='(99)99999-9999'
      value={value}
      onChange={onChange}
      maskPlaceholder={null}
    >
      {(inputProps) => (
        <input
          {...inputProps}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          name="phone"
          placeholder="Telefone"
          type="tel"
        />
      )}
    </InputMask>
  );
}
