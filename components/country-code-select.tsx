"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js/min";
import type { CountryCode } from "libphonenumber-js/min";

type CountryOption = {
  country: CountryCode;
  name: string;
  code: string;
  flag: string;
};

const regionNames =
  typeof Intl !== "undefined" && typeof Intl.DisplayNames === "function"
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

export const countryOptions: CountryOption[] = getCountries()
  .map((cCode) => {
    try {
      const country = cCode as CountryCode;
      const callingCode = getCountryCallingCode(country);
      let name: string = country;
      if (regionNames) {
        try {
          name = regionNames.of(country as string) || country;
        } catch {
          /* keep ISO */
        }
      }
      const flag = country
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
      return { country, name, code: `+${callingCode}`, flag };
    } catch {
      return null;
    }
  })
  .filter(Boolean)
  .sort((a, b) => a!.name.localeCompare(b!.name)) as CountryOption[];

export function findCountryByDialCode(dialCode: string, preferred: CountryCode = "IN") {
  const matches = countryOptions.filter((c) => c.code === dialCode);
  return matches.find((c) => c.country === preferred) ?? matches[0] ?? countryOptions.find((c) => c.country === "IN")!;
}

type CountryCodeSelectProps = {
  value: string;
  onChange: (dialCode: string) => void;
  disabled?: boolean;
};

export function CountryCodeSelect({ value, onChange, disabled }: CountryCodeSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = findCountryByDialCode(value || "+91");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countryOptions;
    return countryOptions.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.code.replace("+", "").includes(q.replace("+", ""))
      );
    });
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    addEventListener("pointerdown", onPointer);
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener("pointerdown", onPointer);
      removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => searchRef.current?.focus(), 20);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const pick = (option: CountryOption) => {
    onChange(option.code);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className={`country-code-select${open ? " is-open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="country-code-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="country-code-flag" aria-hidden="true">
          {selected.flag}
        </span>
        <span className="country-code-value">{selected.code}</span>
        <span className="country-code-caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div className="country-code-panel" role="listbox" id={listId}>
          <div className="country-code-search">
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search country or code…"
              aria-label="Search country"
              autoComplete="off"
            />
          </div>
          <ul className="country-code-list">
            {filtered.length === 0 && (
              <li className="country-code-empty">No countries match “{query}”</li>
            )}
            {filtered.map((option) => {
              const active = option.country === selected.country && option.code === selected.code;
              return (
                <li key={`${option.country}-${option.code}`}>
                  <button
                    type="button"
                    className={`country-code-option${active ? " is-active" : ""}`}
                    role="option"
                    aria-selected={active}
                    onClick={() => pick(option)}
                  >
                    <span aria-hidden="true">{option.flag}</span>
                    <span className="country-code-option-name">{option.name}</span>
                    <span className="country-code-option-dial">{option.code}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
