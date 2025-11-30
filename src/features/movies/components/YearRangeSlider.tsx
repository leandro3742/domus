import React from 'react';
import type { Range } from '../types'; // ajustá la ruta

type RangeSliderProps = {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: Range<number>;
  onChange: (next: Range<number>) => void;
};

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
}) => {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const distance = max - min;
  const fromPercent = ((value.from - min) / distance) * 100;
  const toPercent = ((value.to - min) / distance) * 100;

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(e.target.value);
    const newFrom = clamp(Math.min(raw, value.to)); // que no pase al to
    onChange({ from: newFrom, to: value.to });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(e.target.value);
    const newTo = clamp(Math.max(raw, value.from)); // que no baje del from
    onChange({ from: value.from, to: newTo });
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      {label && <span className="text-sm font-medium">{label}</span>}

      {/* Valores actuales */}
      <div className="flex justify-between text-xs text-slate-600">
        <span>{value.from}</span>
        <span>{value.to}</span>
      </div>

      <div className="relative h-6 w-full">
        {/* Track base */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 rounded bg-slate-200" />

        {/* Rango seleccionado */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 rounded bg-slate-500"
          style={{
            left: `${fromPercent}%`,
            right: `${100 - toPercent}%`,
          }}
        />

        <input
          name="yearFrom"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value.from}
          onChange={handleFromChange}
          className="pointer-events-none absolute left-0 right-0 top-0 bottom-0 w-full h-full opacity-0 cursor-pointer z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full"
        />

        <input
          name="yearTo"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value.to}
          onChange={handleToChange}
          className="pointer-events-none absolute left-0 right-0 top-0 bottom-0 w-full h-full opacity-0 cursor-pointer z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full"
        />

        {/* Thumbs visuales (falsos) para mejor control visual */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full pointer-events-none z-10"
          style={{ left: `calc(${fromPercent}% - 8px)` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full pointer-events-none z-10"
          style={{ left: `calc(${toPercent}% - 8px)` }}
        />
      </div>

      <div className="flex justify-between text-[11px] text-slate-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
