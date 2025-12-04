import { useState } from "react";
import type { Animal } from "../types";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface AnimalDetailProps {
  animal: Animal;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  relatedAnimals: Animal[];
}

function AnimalDetail({
  animal,
  onBack,
  isFavorite,
  onToggleFavorite,
  relatedAnimals
}: AnimalDetailProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const openImage = () => {
    setIsImageOpen(true);
  }

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#ffffff",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-soft)"
      }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          marginBottom: "1.5rem",
          padding: "0.55rem 1.1rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border)",
          background: "var(--bg-ivory)",
          cursor: "pointer",
          fontSize: "0.95rem"
        }}
      >
        ← Back to Animals
      </button>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap"
        }}
      >
        {/* Animal Image */}
        <PhotoProvider>
          <button 
            onClick={openImage}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow-soft)";
            }}
            style={{
              background: 'none',
              color: 'inherit',
              border: 'none',
              padding: 0,
              font: 'inherit',
              cursor: 'pointer',
              outline: 'inherit',
              height: 0,
            }}
          >
            <PhotoView src={animal.imageUrl}>
              <img
                src={animal.imageUrl}
                alt={animal.commonName}
                style={{
                  width: "360px",
                  height: "360px",
                  objectFit: "cover",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-soft)",
                  flexShrink: 0
                }}
              />
            </PhotoView>
          </button>
        </PhotoProvider>

        {/* Info Column */}
        <div style={{ flex: 1, minWidth: "280px" }}>
          <h1 style={{ margin: "0 0 0.3rem" }}>{animal.commonName}</h1>

          <p
            style={{
              margin: 0,
              fontStyle: "italic",
              color: "var(--color-text-muted)",
              fontSize: "1rem"
            }}
          >
            {animal.scientificName}
          </p>

          {/* Favorite button */}
          <button
            onClick={onToggleFavorite}
            style={{
              marginTop: "0.7rem",
              marginBottom: "1.2rem",
              padding: "0.5rem 1rem",
              borderRadius: "var(--radius-md)",
              border: "none",
              cursor: "pointer",
              backgroundColor: "var(--color-primary-soft)",
              fontSize: "0.95rem"
            }}
          >
            {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
          </button>

          {/* Description */}
          <p style={{ lineHeight: 1.6, fontSize: "1.05rem" }}>
            {animal.description}
          </p>

          {/* Details list */}
          <ul style={{ paddingLeft: "1.1rem", lineHeight: 1.65 }}>
            <li><strong>Order:</strong> {animal.order}</li>
            <li><strong>Family:</strong> {animal.family}</li>
            <li><strong>Genus:</strong> {animal.genus}</li>
            <li><strong>Species:</strong> {animal.species}</li>
            <li><strong>Average Weight:</strong> {animal.averageWeightKg} kg</li>
            <li><strong>Conservation Status:</strong> {animal.conservationStatus}</li>
            <li><strong>Native Region:</strong> {animal.nativeLocation}</li>
            <li><strong>Habitats:</strong> {animal.habitats.join(", ")}</li>
            <li><strong>Known Locations:</strong> {animal.locations.join(", ")}</li>
          </ul>
        </div>
      </div>

      {/* Related Animals Section */}
      {relatedAnimals.length > 0 && (
        <div style={{ marginTop: "2.5rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Related Animals</h2>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap"
            }}
          >
            {relatedAnimals.map((ra) => (
              <div
                key={ra.id}
                style={{
                  width: "150px",
                  backgroundColor: "#ffffff",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-soft)",
                  padding: "0.5rem",
                  textAlign: "center",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <img
                  src={ra.imageUrl}
                  alt={ra.commonName}
                  style={{
                    width: "100%",
                    height: "110px",
                    objectFit: "cover",
                    borderRadius: "var(--radius-md)"
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: "0.4rem 0 0",
                      fontSize: "0.9rem",
                      fontWeight: 600
                    }}
                  >
                    {ra.commonName}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.7rem",
                      color: "var(--color-text-muted)"
                    }}
                  >
                    {ra.scientificName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default AnimalDetail;
