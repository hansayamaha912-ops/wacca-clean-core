import { Link } from "@remix-run/react";

export default function NewShop() {
  // ダミーデータで構成
  const PRODUCT_DATA = [
    { id: "p1", name: "Master Hand", img: "/assets/ピンク正面.png", size: "wide" },
    { id: "p2", name: "Dick man", img: "/assets/Dick正面.png", size: "tall" },
  ];

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", fontFamily: "Optima, serif" }}>
      {/* 固定ヘッダー */}
      <header style={{
        position: "fixed", top: 0, width: "100%", padding: "20px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        backgroundColor: "#fff", zIndex: 1000
      }}>
        <nav style={{ display: "flex", gap: "20px", fontSize: "12px" }}>
          <Link to="/">HOME</Link>
          <Link to="/products">ALL PRODUCTS</Link>
        </nav>
        <img src="/assets/IN.png" style={{ height: "30px", width: "auto" }} alt="LOGO" />
        <div style={{ fontSize: "12px" }}>CART (0)</div>
      </header>

      {/* ギャラリー */}
      <main style={{ marginTop: "120px", padding: "40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "20px" }}>
          {PRODUCT_DATA.map((item) => (
            <div key={item.id} style={{ gridColumn: item.size === "wide" ? "span 12" : "span 6" }}>
              <img src={item.img} alt={item.name} style={{ width: "100%", height: "auto" }} />
              <div style={{ fontSize: "11px", marginTop: "10px" }}>{item.name}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}