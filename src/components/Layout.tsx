import React, { useState } from "react";
import type { PageKey } from "../App";

interface LayoutProps {
  activePage: string;
  onChangePage: (page: PageKey) => void;
  children: React.ReactNode;
}

export function Layout({ activePage, onChangePage, children }: LayoutProps) {
  const [donateHover, setDonateHover] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* HEADER */}
      <header
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 20
        }}
      >
        {/* ✅ SAME CONTAINER AS MAIN */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0.9rem 1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          {/* LOGO */}
          <div
            onClick={() => onChangePage("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(0.6rem, 2vw, 1.2rem)",
              fontSize: "clamp(1rem, 3vw, 1.35rem)",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            <img
              src="/logo.png"
              alt="Utah Animals Hub logo"
              style={{
                width: "clamp(40px, 6vw, 70px)",
                height: "auto",
                objectFit: "contain"
              }}
            />
            Utah Animals Hub
          </div>

          {/* NAV */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.4rem"
            }}
          >
            {(["home", "animals", "about"] as PageKey[]).map((page) => (
              <button
                key={page}
                onClick={() => onChangePage(page)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: activePage === page ? 700 : 500,
                  color: "#000",
                  padding: "0.4rem 0.6rem",
                  borderBottom:
                    activePage === page
                      ? "2px solid var(--color-primary)"
                      : "2px solid transparent",
                  transition: "0.2s"
                }}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}

            {/* DONATE BUTTON */}
            <button
              onClick={() => onChangePage("donate")}
              onMouseEnter={() => setDonateHover(true)}
              onMouseLeave={() => setDonateHover(false)}
              style={{
                padding: "0.45rem 1rem",
                fontSize: "0.95rem",
                fontWeight: 600,
                borderRadius: "999px",
                border: donateHover
                  ? "2px solid rgba(0,0,0,0.4)"
                  : "2px solid rgba(0,0,0,0.2)",
                background: donateHover ? "#ebe1cdff" : "#fff",
                cursor: "pointer",
                transition: "0.25s"
              }}
            >
              Be a wildlife guardian
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "1.2rem"
        }}
      >
        {children}
      </main>
    </div>
  );
}
