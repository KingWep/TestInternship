import React from 'react';
import { useTranslation } from 'react-i18next';

const SettingFormField = ({
  label,
  error,
  required = false,
  children,
  className = "",
}) => {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {children}

      {error && <p className="text-xs text-red-500 mt-1.5">{t(error.message)}</p>}
    </div>
  );
};

export default SettingFormField;
