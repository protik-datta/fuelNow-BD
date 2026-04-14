import { motion } from "framer-motion";
import { cloneElement } from 'react';

export function Input({
  value,
  onChange,
  placeholder,
  onKeyDown,
  className = "",
  type = "text",
}) {
  return (
    <motion.input
      whileFocus={{ boxShadow: `0 0 0 3px rgba(5,150,105,0.2)` }}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      className={`w-full px-4.5 py-3.5 rounded-xl text-[15px] text-dark border-2 border-border-custom outline-none bg-white font-hind transition-colors duration-200 focus:border-primary-light ${className}`}
    />
  );
}

export function Select({
  value,
  onChange,
  placeholder,
  children,
  className = "",
  disabled = false,
}) {
  return (
    <div className="relative w-full">
      <motion.select
        whileFocus={{ boxShadow: `0 0 0 3px rgba(5,150,105,0.2)` }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4.5 py-3.5 rounded-xl text-[15px] border-2 border-border-custom outline-none bg-white appearance-none cursor-pointer font-hind transition-colors duration-200 focus:border-primary-light ${
          value ? "text-dark" : "text-gray-400"
        } ${className} {disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </motion.select>
      <div className="absolute right-4.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function FormField({ label, error, children }) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-dark text-[15px]">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[#EF4444] text-[13px] mt-1.5 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
