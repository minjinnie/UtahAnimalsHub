import { useMemo, useState } from "react";
import "./theme.css";
import "react-photo-view/dist/react-photo-view.css";
import { animals } from "./data/animals";
import type { Animal, AnimalClass, Habitat } from "./types";
import { Layout } from "./components/Layout";
import { SearchBar } from "./components/SearchBar";
import { FilterPanel } from "./components/FilterPanel";
import { AnimalCard } from "./components/AnimalCard";
import { useLocalStorage } from "./hooks/useLocalStorage";
import AnimalDetail from "./components/AnimalDetail";

export type PageKey = "home" | "animals" | "about" | "donate";
type SearchMode = "all" | "common" | "scientific" | "location";

export function App() {
  const [activePage, setActivePage] = useState<PageKey>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("all");
  const [classFilter, setClassFilter] = useState<AnimalClass | "all">("all");
  const [habitatFilter, setHabitatFilter] = useState<Habitat | "all">("all");
  const [regionFilter, setRegionFilter] = useState<string | "all">("all");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // favorites saved in localStorage
  const [favoriteIds, setFavoriteIds] = useLocalStorage<string[]>(
    "utah-animals-favorites",
    []
  );

  // selected animal id (for detail page)
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(
    animals[0]?.id ?? null
  );

  // NEW: show full-page detail mode
  const [showDetail, setShowDetail] = useState(false);

  const regions = useMemo(
    () =>
      Array.from(new Set(animals.flatMap((a) => a.locations))).sort((a, b) =>
        a.localeCompare(b)
      ),
    []
  );

  const toggleFavorite = (animalId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(animalId)
        ? prev.filter((id) => id !== animalId)
        : [...prev, animalId]
    );
  };

  const resetFilters = () => {
    setClassFilter("all");
    setHabitatFilter("all");
    setRegionFilter("all");
    setShowOnlyFavorites(false);
    setSearchQuery("");
    setSearchMode("all");
  };

  const filteredAnimals = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return animals.filter((animal) => {
      if (showOnlyFavorites && !favoriteIds.includes(animal.id)) return false;

      if (classFilter !== "all" && animal.classCategory !== classFilter)
        return false;

      if (habitatFilter !== "all" && !animal.habitats.includes(habitatFilter))
        return false;

      if (regionFilter !== "all" && !animal.locations.includes(regionFilter))
        return false;

      if (!query) return true;

      let target = "";
      switch (searchMode) {
        case "common":
          target = animal.commonName.toLowerCase();
          break;
        case "scientific":
          target = animal.scientificName.toLowerCase();
          break;
        case "location":
          target = (animal.nativeLocation + " " + animal.locations.join(" ")).toLowerCase();
          break;
        case "all":
        default:
          target = (
            animal.commonName +
            " " +
            animal.scientificName +
            " " +
            animal.description +
            " " +
            animal.nativeLocation +
            " " +
            animal.locations.join(" ")
          ).toLowerCase();
          break;
      }

      return target.includes(query);
    });
  }, [
    searchQuery,
    searchMode,
    classFilter,
    habitatFilter,
    regionFilter,
    showOnlyFavorites,
    favoriteIds
  ]);

  const selectedAnimal: Animal | null =
    filteredAnimals.find((a) => a.id === selectedAnimalId) ??
    animals.find((a) => a.id === selectedAnimalId) ??
    filteredAnimals[0] ??
    null;

  const relatedAnimals =
    selectedAnimal?.relatedAnimalIds
      .map((id) => animals.find((a) => a.id === id))
      .filter((a): a is Animal => Boolean(a)) ?? [];

  // ------------------------
  // ANIMALS PAGE
  // ------------------------

  const renderAnimals = () => {
    if (showDetail && selectedAnimal) {
      return (
        <AnimalDetail
          animal={selectedAnimal}
          relatedAnimals={relatedAnimals}
          isFavorite={favoriteIds.includes(selectedAnimal.id)}
          onToggleFavorite={() => toggleFavorite(selectedAnimal.id)}
          onBack={() => setShowDetail(false)}
        />
      );
    }

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(220px, 260px) minmax(0, 1fr)",
          gap: "1.3rem",
          marginTop: "0.5rem"
        }}
      >
        <FilterPanel
          classFilter={classFilter}
          habitatFilter={habitatFilter}
          regionFilter={regionFilter}
          showOnlyFavorites={showOnlyFavorites}
          availableRegions={regions}
          onClassFilterChange={setClassFilter}
          onHabitatFilterChange={setHabitatFilter}
          onRegionFilterChange={setRegionFilter}
          onToggleFavorites={() => setShowOnlyFavorites((prev) => !prev)}
          onResetFilters={resetFilters}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          <SearchBar
            query={searchQuery}
            searchMode={searchMode}
            onQueryChange={setSearchQuery}
            onModeChange={setSearchMode}
          />

          <section
            aria-label="List of animals"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              paddingRight: "0.2rem"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.8rem",
                color: "var(--color-text-muted)"
              }}
            >
              <span>
                Showing{" "}
                <strong style={{ color: "var(--color-primary)" }}>
                  {filteredAnimals.length}
                </strong>{" "}
                result{filteredAnimals.length === 1 ? "" : "s"}
              </span>
              <span>Click a card to see full details.</span>
            </div>

            {filteredAnimals.length === 0 ? (
              <div
                style={{
                  padding: "0.9rem",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--color-bg-soft)",
                  border: "var(--border-soft)",
                  fontSize: "0.85rem"
                }}
              >
                No animals match these filters yet.
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.7rem"
                }}
              >
                {filteredAnimals.map((animal) => (
                  <AnimalCard
                    key={animal.id}
                    animal={animal}
                    isSelected={selectedAnimal?.id === animal.id}
                    isFavorite={favoriteIds.includes(animal.id)}
                    onSelect={() => {
                      setSelectedAnimalId(animal.id);
                      setShowDetail(true); // NEW: open full detail page
                    }}
                    onToggleFavorite={() => toggleFavorite(animal.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    );
  };

  // ------------------------
  // HOME PAGE
  // ------------------------

  const renderHome = () => {
  const featured = animals.slice(0, 4);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
      <section
        style={{
          width: "100%",
          height: "260px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "var(--shadow-soft)"
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1434730737257-3e97ad16f4b6?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Utah landscape"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(88%)"
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#ffffff",
            width: "80%"
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "2rem",
              textShadow: "0 2px 6px rgba(0,0,0,0.35)"
            }}
          >
            Discover Utah’s Wildlife
          </h1>

          <p
            style={{
              marginTop: "0.6rem",
              fontSize: "1rem",
              textShadow: "0 2px 6px rgba(0,0,0,0.35)"
            }}
          >
            Explore mammals, birds, fish, reptiles, amphibians, and more living across Utah.
          </p>

          <div
            style={{
              marginTop: "0.8rem",
              display: "flex",
              justifyContent: "center",
              gap: "0.7rem",
              flexWrap: "wrap"
            }}
          >
            <button
              onClick={() => setActivePage("animals")}
              style={{
                backgroundColor: "#567c61ff",
                color: "#fff",
                border: "none",
                padding: "0.55rem 1.3rem",
                borderRadius: "999px",
                fontSize: "0.9rem",
                cursor: "pointer",
                boxShadow: "var(--shadow-soft)"
              }}
            >
              Browse Animals
            </button>
          </div>
        </div>
      </section>

      {/* <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "1rem"
        }}
      >
        {[
          {
            title: "For hikers & travelers",
            text: "See where animals live so you can explore Utah safely and respectfully.",
            icon: "🗺️"
          },
          {
            title: "For students & teachers",
            text: "Scientific names, taxonomy, and habitat info for school projects.",
            icon: "📘"
          },
          {
            title: "For wildlife lovers",
            text: "Learn about conservation, behavior, related species, and more.",
            icon: "🌿"
          }
        ].map((info) => (
          <div
            key={info.title}
            style={{
              backgroundColor: "#ffffffff",
              padding: "1.1rem 1.3rem",
              boxShadow: "var(--shadow-soft)",
              border: "var(--border-soft)"
            }}
          >
            <div style={{ fontSize: "1.6rem" }}>{info.icon}</div>
            <h3 style={{ margin: "0.4rem 0", fontSize: "1rem", color: "#2f6f4e" }}>
              {info.title}
            </h3>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              {info.text}
            </p>
          </div>
        ))}
      </section> */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "0.8rem"
        }}
      >
        {[
          { name: "Mountains", habitat: "Mountains", img: "https://images.unsplash.com/photo-1613192568074-50b1e22ae2ea?q=80&w=2070&auto=format&fit=crop" },
          { name: "Desert", habitat: "Desert", img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2076&auto=format&fit=crop" },
          { name: "Forest", habitat: "Forest", img: "https://plus.unsplash.com/premium_photo-1697644694664-626d1e69c5c2?q=80&w=1917&auto=format&fit=crop" },
          { name: "Lake", habitat: "Lake", img: "https://images.unsplash.com/photo-1544035143-b9100b39c035?q=80&w=1828&auto=format&fit=crop" }
        ].map((h) => (
          <div
            key={h.name}
            onClick={() => {
              resetFilters();
              setHabitatFilter(h.name as Habitat);
              setActivePage("animals");
            }}
            style={{
              height: "110px",
              overflow: "hidden",
              position: "relative",
              cursor: "pointer"
            }}
          >
            <img
              src={h.img + "&fit=crop&w=800&q=60"}
              alt={h.name}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 1,
                transition: "opacity 0.35s"
              }}
              className="habitat-hover-img"
            />

            <div
              style={{
                position: "absolute",
                bottom: "0.5rem",
                left: "0.8rem",
                color: "white",
                fontWeight: 600,
                textShadow: "0 2px 6px rgba(0,0,0,0.4)"
              }}
            >
              {h.name}
            </div>
          </div>
        ))}
      </section>

      <section
        style={{
          padding: "1.1rem 1.3rem",
          backgroundColor: "#ffffff",
          boxShadow: "var(--shadow-soft)",
          border: "var(--border-soft)"
        }}
      >
        <h3 style={{ margin: 0, fontSize: "1.05rem" }}>
          Featured Utah species
        </h3>

        <div
          style={{
            marginTop: "0.7rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "0.8rem"
          }}
        >
          {featured.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              isSelected={false}
              isFavorite={favoriteIds.includes(animal.id)}
              onSelect={() => {
                setActivePage("animals");
                setSelectedAnimalId(animal.id);
                setShowDetail(true); 
              }}
              onToggleFavorite={() => toggleFavorite(animal.id)}
            />
          ))}
        </div>
      </section>

    </div>
  );
};


  // ------------------------
  // ABOUT PAGE
  // ------------------------

  const renderAbout = () => {
  return (
    <section
      style={{
        marginTop: "0.8rem",
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) minmax(250px, 1fr)",
        gap: "1.2rem",
        alignItems: "start"
      }}
    >
      {/* LEFT COLUMN */}
      <div
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {/* Our Mission */}
        <article
          style={{
            padding: "1.2rem 1.4rem",
            borderRadius: "var(--radius-lg)",
            backgroundColor: "#ffffff",
            border: "var(--border-soft)",
            boxShadow: "var(--shadow-soft)"
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "1.15rem",
              color: "var(--color-primary)"
            }}
          >
            Our Mission
          </h2>
          <p style={{ marginTop: "0.6rem", lineHeight: 1.6 }}>
            The Utah Animals Information Hub aims to provide an accessible,
            trustworthy, and visually clear reference for learning about Utah’s
            native wildlife. We combine scientific accuracy with a friendly design
            so that hikers, families, students, and educators can easily understand
            the animals around them.
          </p>
        </article>

        {/* How We Work */}
        <article
          style={{
            padding: "1.2rem 1.4rem",
            borderRadius: "var(--radius-lg)",
            backgroundColor: "#ffffff",
            border: "var(--border-soft)",
            boxShadow: "var(--shadow-soft)"
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "1.15rem",
              color: "var(--color-primary)"
            }}
          >
            How We Work
          </h2>
          <p style={{ marginTop: "0.6rem", lineHeight: 1.6 }}>
            We review information from trusted sources such as state wildlife
            agencies, academic research, and community science platforms.
          </p>
          <ul
            style={{
              marginTop: "0.4rem",
              paddingLeft: "1.2rem",
              lineHeight: 1.6,
              fontSize: "0.9rem"
            }}
          >
            <li>Cross-check taxonomy and conservation status</li>
            <li>Highlight habitat, range, and related species</li>
            <li>Ensure consistency across multiple data sources</li>
            <li>Design for readability on both desktop and mobile</li>
          </ul>
        </article>

        {/* Who We Are */}
        <article
          style={{
            padding: "1.2rem 1.4rem",
            borderRadius: "var(--radius-lg)",
            backgroundColor: "#ffffff",
            border: "var(--border-soft)",
            boxShadow: "var(--shadow-soft)"
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "1.15rem",
              color: "var(--color-primary)"
            }}
          >
            Who We Are
          </h2>
          <p style={{ marginTop: "0.6rem", lineHeight: 1.6 }}>
            We are Alex Snow, Kevin Dixon, and MJ Sung, a small team of student developers and wildlife enthusiasts
            who care deeply about Utah’s natural ecosystems. Our goal is to create a modern, reliable platform that
            helps people learn about and appreciate the animals that live throughout Utah. By combining thoughtful design,
            research, and engineering, we aim to make wildlife knowledge easy to explore and enjoyable for all visitors.
          </p>
        </article>
      </div>

      <aside
        style={{
          padding: "1.2rem 1.4rem",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "#ffffff",
          border: "var(--border-soft)",
          boxShadow: "var(--shadow-soft)",
          position: "sticky",
          top: "6rem",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "1rem",
            color: "var(--color-primary)"
          }}
        >
          Contact Us
        </h3>

        <p
          style={{
            marginTop: "0.6rem",
            fontSize: "0.88rem",
            lineHeight: 1.6,
            color: "var(--color-text-muted)"
          }}
        >
          Notice incorrect info? Want to contribute?
        </p>

        <button
          type="button"
          style={{
            marginTop: "0.4rem",
            borderRadius: "999px",
            padding: "0.45rem 0.9rem",
            border: "none",
            cursor: "pointer",
            backgroundColor: "var(--color-primary)",
            color: "#ffffff",
            fontSize: "0.85rem"
          }}
        >
          Submit a correction →
        </button>

        <hr style={{ margin: "1rem 0", opacity: 0.4 }} />

        <p
          style={{
            margin: 0,
            fontSize: "0.83rem",
            color: "var(--color-text-muted)"
          }}
        >
          Email: <strong>utahwildlifehub@email.com</strong>
        </p>
      </aside>
    </section>
  );
};


const renderDonate = () => {
  return (
    <div
      style={{
        marginTop: "0.8rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.6rem",
        width: "100%"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.2rem",
          width: "100%"
        }}
      >
        <section
          style={{
            borderRadius: "var(--radius-lg)",
            padding: "1.4rem 1.6rem",
            backgroundColor: "var(--color-bg-soft)",
            border: "var(--border-soft)",
            boxShadow: "var(--shadow-soft)",
            display: "flex",
            flexDirection: "column",
            gap: "0.7rem"
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--color-primary)"
            }}
          >
            Support Utah wildlife conservation
          </h2>

          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
            Utah Animals Information Hub does not process donations directly.
            Instead, we highlight respected organizations working on habitat
            restoration, native species protection, and wildlife education
            across the state.
          </p>

          <p
            style={{
              margin: 0,
              fontSize: "0.86rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.5
            }}
          >
            Use the links below to learn more about each organization’s mission,
            then donate through their official websites.
          </p>
        </section>

        <section
          style={{
            borderRadius: "var(--radius-lg)",
            padding: "1.4rem 1.6rem",
            backgroundColor: "#ffffff",
            border: "var(--border-soft)",
            boxShadow: "var(--shadow-soft)",
            display: "flex",
            flexDirection: "column",
            gap: "0.7rem",
            fontSize: "0.95rem",
            lineHeight: 1.6
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "rgba(45,45,45,1)"
            }}
          >
            Why your donation matters
          </h3>

          <p style={{ margin: 0 }}>
            Healthy wildlife populations depend on intact habitat, clean water,
            and informed communities. Donations to reputable conservation groups
            help fund long-term projects that individuals cannot do alone -
            from restoring streams to monitoring species like Bonneville
            cutthroat trout and desert bighorn sheep.
          </p>
        </section>
      </div>

        {/* Organizations list */}
        <section
          style={{
            borderRadius: "var(--radius-lg)",
            padding: "1.2rem 1.4rem",
            backgroundColor: "#ffffff",
            border: "var(--border-soft)",
            boxShadow: "var(--shadow-soft)",
            display: "flex",
            flexDirection: "column",
            gap: "0.9rem"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "0.5rem"
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "1rem"
              }}
            >
              Suggested conservation partners
            </h3>
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--color-text-muted)"
              }}
            >
              Always confirm details on the organization’s official site.
            </span>
          </div>

          {/* grid of organizations */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "0.9rem"
            }}
          >
            {[
              {
                name: "Utah Wildlife Foundation",
                focus:
                  "Habitat restoration, wildlife corridors, and community education projects across Utah.",
                impact:
                  "Supports on-the-ground work that keeps migration routes open and restores damaged habitat.",
                tag: "Statewide projects"
              },
              {
                name: "Trout & Coldwater Streams Alliance",
                focus:
                  "Protects native trout and coldwater habitats including rivers connected to the historic Lake Bonneville basin.",
                impact:
                  "Improves stream health, stabilizes banks, and works with landowners to benefit both people and fish.",
                tag: "Rivers & lakes"
              },
              {
                name: "Desert Bighorn Stewardship Initiative",
                focus:
                  "Monitors and supports desert bighorn sheep herds in Southern Utah’s canyon country.",
                impact:
                  "Funds research, disease monitoring, and outreach to reduce disturbance near lambing areas.",
                tag: "Desert wildlife"
              },
              {
                name: "Utah Youth Outdoor Education Fund",
                focus:
                  "Provides outdoor learning experiences for K–12 students, focusing on wildlife, ecosystems, and stewardship.",
                impact:
                  "Helps the next generation build a strong connection with Utah’s wild places.",
                tag: "Education"
              }
            ].map((org) => (
              <article
                key={org.name}
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-md)",
                  border: "var(--border-soft)",
                  padding: "1.2rem 1.3rem",
                  paddingBottom: "3.2rem", 
                  backgroundColor: "var(--color-bg-soft)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  fontSize: "0.92rem",
                  minHeight: "230px"
                }}
              >
                {/* Title */}
                <h4
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "rgba(45, 45, 45, 1)"
                  }}
                >
                  {org.name}
                </h4>

                {/* CHIP aligned under title */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "-0.3rem",
                    marginBottom: "0.5rem"
                  }}
                >
                  <span
                    className="chip"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "999px",
                      backgroundColor: "#ebe1cdff",
                      color: "rgba(60, 60, 60, 1)",
                      border: "1px solid rgba(0,0,0,0.1)"
                    }}
                  >
                    {org.tag}
                  </span>
                </div>

                {/* Main text */}
                <p style={{ margin: 0 }}>{org.focus}</p>

                <p
                  style={{
                    margin: 0,
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                    color: "var(--color-text-muted)"
                  }}
                >
                  {org.impact}
                </p>

                {/* Circular corner button */}
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    right: "0.9rem",
                    bottom: "0.9rem",
                    width: "38px",
                    height: "38px",
                    borderRadius: "999px",
                    border: "none",
                    backgroundColor: "var(--color-primary)",
                    color: "#ffffff",
                    cursor: "pointer",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "var(--shadow-soft)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow-soft)";
                  }}
                >
                  →
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    );
  };

  const handleChangePage = (page: PageKey) => {
    setActivePage(page);
  };

  return (
    <Layout activePage={activePage} onChangePage={handleChangePage}>
      {activePage === "home" && renderHome()}
      {activePage === "animals" && renderAnimals()}
      {activePage === "about" && renderAbout()}
      {activePage === "donate" && renderDonate()}
    </Layout>
  );
}
