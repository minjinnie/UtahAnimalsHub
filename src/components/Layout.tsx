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
      <header
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          padding: "0.9rem 1.4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 20
        }}
      >
        <div
        onClick={() => onChangePage("home")}
        style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "rgba(20, 20, 20, 1)",
            cursor: "pointer",
            paddingLeft: "14.5rem"
        }}
        >
        <span style={{ fontSize: "1.6rem" }}>🌲</span>
        Utah Animals Hub
        </div>


        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.4rem",
            justifyContent: "center",
            flex: 1,
            marginLeft: "2rem"
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
                background: donateHover
                ? "#ebe1cdff"
                : "#fff",
                color: "rgba(10, 10, 10, 1)",
                cursor: "pointer",
                transition: "0.25s",
                marginLeft: "0.8rem"
            }}
            >
                Be a wildlife guardian
            </button>
        </nav>
      </header>

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
