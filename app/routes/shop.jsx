import { useState } from "react";
import { Link } from "@remix-run/react";

// ==========================================
// 商品マスタデータ（アセットパスを修正、descriptionを削除）
// ==========================================
const PRODUCT_DATA = [
  {
    id: "master-hand",
    name: "Master Hand",
    price: "¥4,000",
    status: "Available",
    images: [
      "/assets/ピンク正面.jpg", // 通常時（正面）
      "/assets/ピンク横.jpg"    // ホバー時（横）
    ],
    sizes: ["ONE SIZE"]
  },
  {
    id: "dick-man-key-charm",
    name: "Dick man key-charm",
    price: "¥3,500",
    status: "Available",
    images: [
      "/assets/Dick正面.jpg",
      "/assets/Dick横.png"
    ],
    sizes: ["ONE SIZE"]
  },
  {
    id: "angr-kun-key-holder",
    name: "Angr-Kun key-holder",
    price: "¥3,500",
    status: "Available",
    images: [
      "/assets/angr正面.jpg",
      "/assets/angr横.jpg"
    ],
    sizes: ["ONE SIZE"]
  }
];

export default function Shop() {
  // 詳細ドロワーの表示管理
  const [selectedProduct, setSelectedProduct] = useState(null);
  // マウスオーバー時の画像切り替え管理
  const [hoveredProductId, setHoveredProductId] = useState(null);

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", color: "#000", fontFamily: "sans-serif", position: "relative", paddingBottom: "120px" }}>
      
      {/* ヘッダーナビゲーション */}
      <header style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        <nav style={{ display: "flex", gap: "2rem" }}>
          <Link to="/" style={{ color: "#000", textDecoration: "none", opacity: 0.5 }}>Home</Link>
          <Link to="/shop" style={{ color: "#000", textDecoration: "none", borderBottom: "1px solid #000" }}>Shop</Link>
        </nav>
        <div style={{ marginLeft: "auto" }}>Cart (0)</div>
      </header>

      {/* 商品一覧エリア（横1列に4つのグリッド） */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          columnGap: "1.5rem",
          rowGap: "3rem"
        }}>
          {PRODUCT_DATA.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              style={{ cursor: "pointer" }}
            >
              {/* 画像コンテナ */}
              <div style={{ width: "100%", aspectRatio: "3/4", backgroundColor: "#f9f9f9", marginBottom: "1rem", overflow: "hidden", position: "relative" }}>
                <img 
                  src={hoveredProductId === product.id ? product.images[1] : product.images[0]} 
                  alt={product.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all 0.3s ease" }}
                />
              </div>
              
              {/* 商品テキスト */}
              <div style={{ fontSize: "13px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <h3 style={{ margin: 0, fontWeight: "500", letterSpacing: "-0.01em" }}>{product.name}</h3>
                <p style={{ margin: 0, color: "#000" }}>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ===================================================
           【固定フッター】
           =================================================== */}
      <footer style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "1.5rem",
        right: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        pointerEvents: "none",
        zIndex: 40
      }}>
        {/* 最左下：IN.pngロゴ（サイズを2.5倍の高さ80pxに拡大） */}
        <div style={{ pointerEvents: "auto" }}>
          <Link to="/">
            <img src="/assets/IN.png" alt="WACCA LOGO" style={{ height: "80px", width: "auto", objectFit: "contain" }} />
          </Link>
        </div>

        {/* 最右下：特定商取引法に基づく表記 */}
        <div style={{ pointerEvents: "auto", fontSize: "11px", letterSpacing: "0.05em" }}>
          <Link to="/policies" style={{ color: "#000", textDecoration: "none", opacity: 0.6 }}>
            特定商取引法に基づく表記
          </Link>
        </div>
      </footer>

      {/* ===================================================
           【詳細ドロワー】画面遷移なしで右からスライドイン
           =================================================== */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: selectedProduct ? "auto" : "none",
        overflow: "hidden"
      }}>
        {/* 背景の薄いオーバーレイ */}
        <div 
          onClick={() => setSelectedProduct(null)}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.08)",
            opacity: selectedProduct ? 1 : 0,
            transition: "opacity 0.3s ease-out"
          }}
        />
        
        {/* 詳細パネル本体 */}
        <div style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "#fff",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.05)",
          transform: selectedProduct ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-out",
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box"
        }}>
          {selectedProduct && (
            <>
              <div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  style={{ background: "none", border: "none", padding: 0, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", marginBottom: "3rem" }}
                >
                  ← Close
                </button>

                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  {/* 詳細表示内のアングル違い2枚並び */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {selectedProduct.images.map((imgSrc, index) => (
                      <img key={index} src={imgSrc} alt="" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", backgroundColor: "#f9f9f9" }} />
                    ))}
                  </div>

                  <div>
                    <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "500", letterSpacing: "-0.01em" }}>{selectedProduct.name}</h2>
                    <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#666" }}>{selectedProduct.price}</p>
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid #eee", margin: 0 }} />

                  {/* Descriptionカラムを削除し、Sizeのみを配置 */}
                  <div>
                    <h4 style={{ margin: "0 0 8px 0", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#aaa" }}>Size</h4>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {selectedProduct.sizes.map((size) => (
                        <span key={size} style={{ padding: "6px 12px", border: "1px solid #eee", fontSize: "11px" }}>{size}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button style={{ width: "100%", backgroundColor: "#000", color: "#fff", border: "none", padding: "1rem", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", marginTop: "2rem" }}>
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>

    </div>
  );
}