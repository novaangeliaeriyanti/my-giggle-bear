"use client";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
}

const Checkbox = ({ checked, onChange, label, className }: CheckboxProps) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer select-none ${className}`}>
      <div
        onClick={onChange}
        className={`
          relative w-5 h-5 flex items-center justify-center
          border-2 transition-all duration-200
          ${checked ? "bg-primary border-primary" : "bg-white border-outlined"}
          rounded-md hover:border-primary
        `}
      >
        {/* Checkmark */}
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
};

export default Checkbox;
