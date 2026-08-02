import React from 'react';

const countryCodes: Record<string, string> = {
  Bénin: 'BJ',
  Niger: 'NE',
  'Guinée Conakry': 'GN',
  Guinée: 'GN',
  'Burkina Faso': 'BF',
  'Congo Brazzaville': 'CG',
};

export const getCountryCode = (country: string) => countryCodes[country] ?? '';

const codeToEmoji = (code: string) => code
  .toUpperCase()
  .split('')
  .map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)))
  .join('');

export const CountryFlag: React.FC<{ country: string; className?: string }> = ({ country, className = '' }) => {
  const code = getCountryCode(country);
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} title={country}>
      {code && <span aria-hidden="true" className="text-base leading-none">{codeToEmoji(code)}</span>}
      <span>{country}</span>
    </span>
  );
};
