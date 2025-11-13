import type { ChangeEvent } from "react";

type SearchMode = "all" | "common" | "scientific" | "location";

interface SearchBarProps {
  query: string;
  searchMode: SearchMode;
  onQueryChange: (value: string) => void;
  onModeChange: (mode: SearchMode) => void;
}

export function SearchBar({
  query,
  searchMode,
  onQueryChange,
  onModeChange
}: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  return (
    <div
      style={{
        padding: "0.85rem 1rem",
        borderRadius: "var(--radius-lg)",
        backgroundColor: "#ffffff",
        boxShadow: "var(--shadow-soft)",
        border: "var(--border-soft)",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem"
        }}
      >
        <span
          aria-hidden="true"
          style={{
            fontSize: "1.1rem",
            color: "var(--color-primary-soft)"
          }}
        >
          🔍
        </span>
        <input
          type="text"
          placeholder="Search by name, description, or place (e.g., 'Bear Lake', 'pika')"
          value={query}
          onChange={handleChange}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "0.95rem",
            color: "var(--color-text-main)"
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.6rem"
        }}
      >
        <span
          style={{
            fontSize: "0.8rem",
            color: "var(--color-text-muted)"
          }}
        >
          Focus search:
        </span>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.35rem"
          }}
        >
          {(
            [
              ["all", "All fields"],
              ["common", "Common name"],
              ["scientific", "Scientific name"],
              ["location", "Location"]
            ] as const
          ).map(([mode, label]) => {
            const isActive = searchMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => onModeChange(mode)}
                style={{
                  borderRadius: "999px",
                  border: "none",
                  padding: "0.2rem 0.6rem",
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  backgroundColor: isActive
                    ? "var(--color-primary-soft)"
                    : "var(--color-bg-soft)",
                  color: isActive ? "#ffffff" : "var(--color-text-muted)",
                  transition: "background-color var(--transition-fast)"
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
