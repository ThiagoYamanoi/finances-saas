function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  step
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        step={step}
        required
        className="
          rounded-lg
          border
          border-gray-300
          px-4
          py-3
          outline-none
          transition
          focus:border-emerald-500
          focus:ring-2
          focus:ring-emerald-100
        "
      />
    </div>
  );
}

export default Input;