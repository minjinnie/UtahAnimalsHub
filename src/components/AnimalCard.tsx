import type { Animal } from "../types";

interface AnimalCardProps {
  animal: Animal;
  isSelected: boolean;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
}

export function AnimalCard({
  animal,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite
}: AnimalCardProps) {
  // category styles (safe fallback)
  const categoryStyles = {
    Mammals: { bg: "#E7F2FF", text: "#1E66D0" },
    Fishes: { bg: "#E8F8F3", text: "#1A7F5A" },
    "Reptiles & Amphibians": { bg: "#FFF4E0", text: "#B66500" },
    Invertebrates: { bg: "#F9E8FF", text: "#8A2BB8" }
  } as const;

  const style =
    categoryStyles[animal.classCategory as keyof typeof categoryStyles] || {
      bg: "#EEE",
      text: "#555"
    };

  return (
    <article
      onClick={onSelect}
      style={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        border: isSelected
          ? "2px solid var(--color-primary-soft)"
          : "var(--border-soft)",
        boxShadow: isSelected ? "var(--shadow-soft)" : "none",
        transition:
          "transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)"
      }}
    >
      <div
        style={{
          position: "relative",
          height: 140,
          overflow: "hidden"
        }}
      >
        {/* Animal Image */}
        <img
          src={animal.imageUrl}
          alt={animal.commonName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />

        {/* Favorite Star */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          aria-label={
            isFavorite ? "Remove from favorite animals" : "Add to favorite animals"
          }
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 28,
            height: 28,
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "rgba(248, 245, 236, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem"
          }}
        >
          {isFavorite ? "⭐" : "☆"}
        </button>

        {/* NEW: Category chip inside image bottom-right */}
        <span
          style={{
            position: "absolute",
            right: 6,
            bottom: 6,
            padding: "2px 6px",
            borderRadius: "6px",
            backgroundColor: style.bg,
            color: style.text,
            fontSize: "0.65rem",
            fontWeight: 600,
            whiteSpace: "nowrap"
          }}
        >
          {animal.classCategory}
        </span>
      </div>

      <div
        style={{
          padding: "0.75rem 0.85rem 0.85rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem"
        }}
      >
        {/* Title ONLY (chip removed) */}
        <h3
          style={{
            margin: 0,
            fontSize: "0.98rem"
          }}
        >
          {animal.commonName}
        </h3>

        <p
          style={{
            margin: 0,
            fontSize: "0.78rem",
            fontStyle: "italic",
            color: "var(--color-text-muted)"
          }}
        >
          {animal.scientificName}
        </p>

        <p
          style={{
            margin: "0.15rem 0 0",
            fontSize: "0.8rem",
            color: "var(--color-text-muted)"
          }}
        >
          {animal.description.length > 110
            ? animal.description.slice(0, 110) + "…"
            : animal.description}
        </p>

        <div
          style={{
            marginTop: "0.35rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.25rem"
          }}
        >
          <span className="chip">{animal.habitats.join(", ")}</span>
          <span className="chip">Locations: {animal.locations.length}</span>
        </div>
      </div>
    </article>
  );
}
