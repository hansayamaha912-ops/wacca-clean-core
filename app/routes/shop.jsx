import { useState } from "react";
import { Link, useNavigate } from "@remix-run/react";

// ==========================================
// 商品マスタデータ（Stripeの決済リンクを追加）
// ==========================================
const PRODUCT_DATA = [
  {
    id: "master-hand",
    name: "Master Hand",
    price: "¥4,000",
    status: "Available",
    images: [
      "/assets/ピンク正面.png",
      "/assets/ピンク横.png"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: null // Master Handは別ページ（products.jsx）に遷移するため不要
  },
  {
    id: "dick-man-key-charm",
    name: "Dick man key-charm",
    price: "¥3,500",
    status: "Available",
    images: [
      "/assets/Dick正面.png",
      "/assets/Dick横.png"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: "https://buy.stripe.com/9B67sL4Q773tg2Q6Qc3wQ04" // Dickman決済リンク
  },
  {
    id: "angr-kun-key-holder",
    name: "Angr-Kun key-holder",
    price: "¥3,500",
    status: "Available",
    images: [
      "/assets/angr正面.png",
      "/assets/angr横.png"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: "https://buy.stripe.com/14AcN5eqH0F517WdeA3wQ05" // angr-kun決済リンク
  }
];

export default function Shop() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const handleProductClick = (product) => {
    if (product.id === "master-hand") {
      navigate("/products");
    } else {
      setSelectedProduct(product);
    }
  };

  // 【追加】購入ボタンをクリックしたときの処理
  const handlePurchaseClick = (url) => {
    if (url) {
      window.location.href = url; // Stripeの決済画面に直接ジャンプ
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", color: "#000", fontFamily: "sans-serif", position: "relative", paddingBottom: "140px" }}>
      
      {/* ヘッダーナビゲーション */}
      <header style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        <nav style={{ display: "flex", gap: "2rem" }}>
          <Link to="/" style={{ color: "#000", textDecoration: "none", opacity: 0.5 }}>Home</Link>
          <Link to="/shop" style={{ color: "#000", textDecoration: "none", borderBottom: "1px solid #000" }}>Shop</Link>
        </nav>
        <div style={{ marginLeft: "auto" }}>Cart (0)</div>
      </header>

      {/* 商品一覧エリア */}
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
              onClick={() => handleProductClick(product)}
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              style={{ cursor: "pointer" }}
            >
              <div style={{ width: "100%", aspectRatio: "3/4", backgroundColor: "#f9f9f9", marginBottom: "1rem", overflow: "hidden", position: "relative" }}>
                <img 
                  src={hoveredProductId === product.id ? product.images[1] : product.images[0]} 
                  alt={product.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all 0.3s ease" }}
                />
              </div>
              <div style={{ fontSize: "13px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <h3 style={{ margin: 0, fontWeight: "500", letterSpacing: "-0.01em" }}>{product.name}</h3>
                <p style={{ margin: 0, color: "#000" }}>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 固定フッター */}
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
        <div style={{ pointerEvents: "auto" }}>
          <Link to="/">
            <img src="/assets/IN.png" alt="WACCA LOGO" style={{ height: "80px", width: "auto", objectFit: "contain" }} />
          </Link>
        </div>
        <div style={{ pointerEvents: "auto", fontSize: "11px", letterSpacing: "0.05em" }}>
          <Link to="/policies" style={{ color: "#000", textDecoration: "none", opacity: 0.6 }}>
            特定商取引法に基づく表記
          </Link>
        </div>
      </footer>

      {/* 詳細ドロワー */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: selectedProduct ? "auto" : "none",
        overflow: "hidden"
      }}>
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

              {/* 【変更箇所】ボタンの文言を「BUY NOW」にし、クリックでStripeへ遷移 */}
              <button 
                onClick={() => handlePurchaseClick(selectedProduct.stripeUrl)}
                style={{ width: "100%", backgroundColor: "#000", color: "#fff", border: "none", padding: "1rem", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", marginTop: "2rem" }}
              >
                Buy Now
              </button>
            </>
          )}
        </div>
      </div>

    </div>
  );
}