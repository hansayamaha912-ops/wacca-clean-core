import { useState, useEffect, useRef } from "react";
import { Link } from "@remix-run/react";

// o2mummyのように、画像ごとのサイズ比率を保持したマスタデータ
const PRODUCT_DATA = [
  { id: "p1", name: "Master Hand", img: "/assets/ピンク正面.png", size: "wide" },
  { id: "p2", name: "Dick man", img: "/assets/Dick正面.png", size: "tall" },
  { id: "p3", name: "Angr-Kun", img: "/assets/angr正面.png", size: "square" },
  // ...データは増やす想定
];

export default function NewShop() {
  const [cursorType, setCursorType] = useState("logo-cursor");
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // 300px以上スクロールしたらカーソルを通常に戻す
      if (window.scrollY > 300) {
        setCursorType("auto");
      } else {
        setCursorType("logo-cursor");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ cursor: cursorType, backgroundColor: "#fff", minHeight: "200vh" }}>
      {/* 1. 固定ヘッダー（o2mummyスタイル） */}
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

      {/* 2. 雑誌風エディトリアルレイアウト */}
      <main style={{ marginTop: "100px", padding: "40px" }} ref={scrollRef}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "20px"
        }}>
          {PRODUCT_DATA.map((item) => (
            <div key={item.id} style={{ 
              gridColumn: item.size === "wide" ? "span 12" : "span 6",
              marginBottom: "40px" 
            }}>
              <img src={item.img} alt={item.name} style={{ width: "100%", height: "auto" }} />
              <div style={{ marginTop: "10px", fontSize: "11px", letterSpacing: "0.1em" }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* カスタムカーソルの見た目制御用CSS */}
      <style>{`
        .logo-cursor { cursor: crosshair; } /* ここにロゴ画像をカーソルとして指定可能 */
      `}</style>
    </div>
  );
}