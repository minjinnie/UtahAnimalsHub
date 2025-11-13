import { useState } from "react";
import type { AnimalClass, Habitat } from "../types";

interface FilterPanelProps {
  classFilter: AnimalClass | "all";
  habitatFilter: Habitat | "all";
  regionFilter: string | "all";
  showOnlyFavorites: boolean;
  availableRegions: string[];

  onClassFilterChange: (value: AnimalClass | "all") => void;
  onHabitatFilterChange: (value: Habitat | "all") => void;
  onRegionFilterChange: (value: string | "all") => void;
  onToggleFavorites: () => void;
  onResetFilters: () => void;
}

export function FilterPanel({
  classFilter,
  habitatFilter,
  regionFilter,
  showOnlyFavorites,
  availableRegions,

  onClassFilterChange,
  onHabitatFilterChange,
  onRegionFilterChange,
  onToggleFavorites,
  onResetFilters
}: FilterPanelProps) {
  // Accordion Controls
  const [openClass, setOpenClass] = useState(true);
  const [openHabitat, setOpenHabitat] = useState(true);
  const [openRegion, setOpenRegion] = useState(true);

  const animalTypes: AnimalClass[] = [
    "Mammals",
    "Reptiles & Amphibians",
    "Birds",
    "Fishes",
    "Invertebrates"
  ];

  const habitats: Habitat[] = [
    "Mountains",
    "Lake",
    "Forest",
    "Southern Utah",
    "Desert",
    "Plains",
    "Wetlands",
    "River",
    "Canyon",
    "Shrubland"
  ];

  return (
    <aside
      style={{
        position: "sticky",
         top: "1rem",
        padding: "1rem",
        borderRadius: "var(--radius-lg)",
        backgroundColor: "#ffffff",
        border: "var(--border-soft)",
        boxShadow: "var(--shadow-soft)",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}
    >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "1.2rem",
          color: "var(--color-primary)"
        }}
      >
        Filters
      </h3>

      <button
        type="button"
        onClick={onResetFilters}
        style={{
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-primary-soft)",
          background: "#fff",
          padding: "0.4rem 0.6rem",
          cursor: "pointer",
          fontSize: "0.9rem",
          whiteSpace: "nowrap"
        }}
      >
        Reset
      </button>
    </div>

      {/* FAVORITES CHECKBOX */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          fontSize: "0.9rem"
        }}
      >
        <input
          type="checkbox"
          checked={showOnlyFavorites}
          onChange={onToggleFavorites}
        />
        Show favorites only ⭐
      </label>

      {/* ---------------------- */}
      {/* ANIMAL TYPE SECTION */}
      {/* ---------------------- */}
      <section>
        <button
          onClick={() => setOpenClass((v) => !v)}
          style={accordionButtonStyle}
        >
          Animal Type {openClass ? "▾" : "▸"}
        </button>

        {openClass && (
          <div style={checkboxListStyle}>
            {/* ALL option */}
            <label style={checkboxItemStyle}>
              <input
                type="radio"
                checked={classFilter === "all"}
                onChange={() => onClassFilterChange("all")}
              />
              All Types
            </label>

            {animalTypes.map((cls) => (
              <label key={cls} style={checkboxItemStyle}>
                <input
                  type="radio"
                  checked={classFilter === cls}
                  onChange={() => onClassFilterChange(cls)}
                />
                {cls}
              </label>
            ))}
          </div>
        )}
      </section>

      {/* ---------------------- */}
      {/* HABITAT SECTION */}
      {/* ---------------------- */}
      <section>
        <button
          onClick={() => setOpenHabitat((v) => !v)}
          style={accordionButtonStyle}
        >
          Habitat {openHabitat ? "▾" : "▸"}
        </button>

        {openHabitat && (
          <div style={checkboxListStyle}>
            <label style={checkboxItemStyle}>
              <input
                type="radio"
                checked={habitatFilter === "all"}
                onChange={() => onHabitatFilterChange("all")}
              />
              All Habitats
            </label>

            {habitats.map((h) => (
              <label key={h} style={checkboxItemStyle}>
                <input
                  type="radio"
                  checked={habitatFilter === h}
                  onChange={() => onHabitatFilterChange(h)}
                />
                {h}
              </label>
            ))}
          </div>
        )}
      </section>

      {/* ---------------------- */}
      {/* REGION SECTION */}
      {/* ---------------------- */}
      <section>
        <button
          onClick={() => setOpenRegion((v) => !v)}
          style={accordionButtonStyle}
        >
          Utah Location {openRegion ? "▾" : "▸"}
        </button>

        {openRegion && (
          <div style={checkboxListStyle}>
            <label style={checkboxItemStyle}>
              <input
                type="radio"
                checked={regionFilter === "all"}
                onChange={() => onRegionFilterChange("all")}
              />
              All Regions
            </label>

            {availableRegions.map((region) => (
              <label key={region} style={checkboxItemStyle}>
                <input
                  type="radio"
                  checked={regionFilter === region}
                  onChange={() => onRegionFilterChange(region)}
                />
                {region}
              </label>
            ))}
          </div>
        )}
      </section>
    </aside>
  );
}

const accordionButtonStyle: React.CSSProperties = {
  width: "100%",
  textAlign: "left",
  padding: "0.4rem 0.2rem",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "0.9rem",
  color: "var(--color-primary)"
};

const checkboxListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  marginTop: "0.3rem",
  gap: "0.35rem",
  paddingLeft: "0.6rem"
};

const checkboxItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.45rem",
  fontSize: "0.85rem",
  cursor: "pointer"
};
