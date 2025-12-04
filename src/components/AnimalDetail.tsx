import { useState } from "react";
import type { Animal } from "../types";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface AnimalDetailProps {
  animal: Animal;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  relatedAnimals: Animal[];
  onSelectAnimal: (id: string) => void;
}

function AnimalDetail({
  animal,
  onBack,
  isFavorite,
  onToggleFavorite,
  relatedAnimals,
  onSelectAnimal,
}: AnimalDetailProps) {
  const images = Array.isArray(animal.images) ? animal.images : [];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const safeIndex =
    images.length === 0
      ? 0
      : activeImageIndex >= images.length
      ? 0
      : activeImageIndex;

  const activeImage =
    images.length > 0 ? images[safeIndex] : undefined;

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#ffffff",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <button
        onClick={onBack}
        style={{
          marginBottom: "1.5rem",
          padding: "0.55rem 1.1rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border)",
          background: "var(--bg-ivory)",
          cursor: "pointer",
          fontSize: "0.95rem",
        }}
      >
        ← Back to Animals
      </button>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <PhotoProvider>
          <div style={{ width: "380px", flexShrink: 0 }}>
            {activeImage && (
              <PhotoView src={activeImage}>
                <img
                  src={activeImage}
                  alt={animal.commonName}
                  style={{
                    width: "100%",
                    height: "240px",
                    objectFit: "cover",
                    borderRadius: 0,
                    boxShadow: "var(--shadow-soft)",
                    cursor: "pointer",
                  }}
                />
              </PhotoView>
            )}

            {images.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginTop: "0.6rem",
                }}
              >
                {images.slice(0, 3).map((img, index) => (
                  <img
                    key={img}
                    src={img}
                    onClick={() => setActiveImageIndex(index)}
                    style={{
                      width: "32%",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: 0,
                      cursor: "pointer",
                      border:
                        safeIndex === index
                          ? "2px solid var(--color-primary)"
                          : "1px solid rgba(0,0,0,0.15)",
                      opacity: safeIndex === index ? 1 : 0.65,
                      transition: "0.2s",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </PhotoProvider>

        <div style={{ flex: 1, minWidth: "280px" }}>
          <h1 style={{ margin: "0 0 0.3rem" }}>{animal.commonName}</h1>

          <p
            style={{
              margin: 0,
              fontStyle: "italic",
              color: "var(--color-text-muted)",
              fontSize: "1rem",
            }}
          >
            {animal.scientificName}
          </p>

          <button
            onClick={onToggleFavorite}
            style={{
              marginTop: "0.7rem",
              marginBottom: "1.2rem",
              padding: "0.5rem 1rem",
              borderRadius: "var(--radius-md)",
              border: "none",
              cursor: "pointer",
              backgroundColor: isFavorite
                ? "var(--color-primary)"
                : "var(--color-primary-soft)",
              fontSize: "0.95rem",
              color: "#ffffff",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {isFavorite ? "⭐ Favorited" : "☆ Add to Favorites"}
          </button>

          <p style={{ lineHeight: 1.6, fontSize: "1.05rem" }}>
            {animal.description}
          </p>

          <ul style={{ paddingLeft: "1.1rem", lineHeight: 1.65 }}>
            <li>
              <strong>Order:</strong> {animal.order}
            </li>
            <li>
              <strong>Family:</strong> {animal.family}
            </li>
            <li>
              <strong>Genus:</strong> {animal.genus}
            </li>
            <li>
              <strong>Species:</strong> {animal.species}
            </li>
            <li>
              <strong>Average Weight:</strong> {animal.averageWeightKg} kg
            </li>
            <li>
              <strong>Conservation Status:</strong>{" "}
              {animal.conservationStatus}
            </li>
            <li>
              <strong>Native Region:</strong> {animal.nativeLocation}
            </li>
            <li>
              <strong>Habitats:</strong> {animal.habitats.join(", ")}
            </li>
            <li>
              <strong>Known Locations:</strong>{" "}
              {animal.locations.join(", ")}
            </li>
          </ul>
        </div>
      </div>

      {relatedAnimals.length > 0 && (
        <div style={{ marginTop: "2.5rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Related Animals</h2>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {relatedAnimals.map((ra) => (
              <div
                key={ra.id}
                onClick={() => onSelectAnimal(ra.id)}
                style={{
                  width: "150px",
                  backgroundColor: "#ffffff",
                  boxShadow: "var(--shadow-soft)",
                  padding: "0.5rem",
                  textAlign: "center",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <img
                  src={ra.images?.[0]}
                  alt={ra.commonName}
                  style={{
                    width: "100%",
                    height: "110px",
                    objectFit: "cover",
                    borderRadius: "var(--radius-md)",
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: "0.4rem 0 0",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                    }}
                  >
                    {ra.commonName}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.7rem",
                      color: "var(--color-text-muted)",
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
