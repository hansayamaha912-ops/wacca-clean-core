import { useState, useEffect } from "react";
import { Link, useNavigate } from "@remix-run/react";

// ==========================================
// 商品マスタデータ
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
    stripeUrl: null
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
    stripeUrl: "https://buy.stripe.com/9B67sL4Q773tg2Q6Qc3wQ04"
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
    stripeUrl: "https://buy.stripe.com/14AcN5eqH0F517WdeA3wQ05"
  }
];

export default function Shop() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  
  // レスポンシブ判定用の画面幅ステート
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // 初回確認
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProductClick = (product) => {
    // 修正：Master Handクリック時に商品IDをクエリで渡して遷移
    if (product.id === "master-hand") {
      navigate(`/products?id=${product.id}`);
    } else {
      setSelectedProduct(product);
    }
  };

  const handlePurchaseClick = (url) => {
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div style={{ 
      backgroundColor: "#fff", 
      minHeight: "100vh", 
      color: "#000", 
      fontFamily: "sans-serif", 
      position: "relative", 
      paddingBottom: isMobile ? "180px" : "140px" // スマホ時はフッターが被らないよう余白を広めに
    }}>
      
      {/* ヘッダーナビゲーション */}
      <header style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: isMobile ? "1.5rem 1rem" : "2rem 1.5rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        fontSize: "12px", 
        letterSpacing: "0.1em", 
        textTransform: "uppercase" 
      }}>
        <nav style={{ display: "flex", gap: "2rem" }}>
          <Link to="/" style={{ color: "#000", textDecoration: "none", opacity: 0.5 }}>Home</Link>
          <Link to="/shop" style={{ color: "#000", textDecoration: "none", borderBottom: "1px solid #000" }}>Shop</Link>
        </nav>
        <div style={{ marginLeft: "auto" }}>Cart (0)</div>
      </header>

      {/* 商品一覧エリア */}
      <main style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: isMobile ? "1rem 1rem 3rem 1rem" : "3rem 1.5rem" 
      }}>
        <div style={{
          display: "grid",
          // スマホ時は2列（画像サイズ最大化＆ゆとり重視）、PC時は4列
          gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))",
          columnGap: isMobile ? "1rem" : "1.5rem",
          rowGap: isMobile ? "2.5rem" : "3rem"
        }}>
          {PRODUCT_DATA.map((product) => (
            <div 
              key={product.id} 
              onClick={() => handleProductClick(product)}
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              style={{ cursor: "pointer" }}
            >
              {/* 画像コンテナ */}
              <div style={{ 
                width: "100%", 
                aspectRatio: "3/4", 
                backgroundColor: "#f9f9f9", 
                marginBottom: "0.8rem", 
                overflow: "hidden", 
                position: "relative" 
              }}>
                <img 
                  src={hoveredProductId === product.id ? product.images[1] : product.images[0]} 
                  alt={product.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all 0.3s ease" }}
                />
              </div>
              
              {/* 商品テキスト */}
              <div style={{ fontSize: isMobile ? "12px" : "13px", display: "flex", flexDirection: "column", gap: "2px" }}>
                <h3 style={{ margin: 0, fontWeight: "500", letterSpacing: "-0.01em", lineHeight: "1.3" }}>{product.name}</h3>
                <p style={{ margin: 0, color: "#000", opacity: 0.6 }}>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 固定フッター（レスポンシブ対応） */}
      <footer style={{
        position: "fixed",
        bottom: isMobile ? "1rem" : "1.5rem",
        left: isMobile ? "1rem" : "1.5rem",
        right: isMobile ? "1rem" : "1.5rem",
        display: "flex",
        flexDirection: isMobile ? "column" : "row", // スマホ時は縦に並べて重なりを防ぐ
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "flex-end",
        gap: isMobile ? "1.5rem" : "0",
        pointerEvents: "none",
        zIndex: 40
      }}>
        {/* 最左下：IN.pngロゴ */}
        <div style={{ pointerEvents: "auto" }}>
          <Link to="/">
            <img 
              src="/assets/IN.png" 
              alt="WACCA LOGO" 
              style={{ 
                height: isMobile ? "55px" : "80px", // スマホ時も小さすぎないよう55pxに調整
                width: "auto", 
                objectFit: "contain" 
              }} 
            />
          </Link>
        </div>

        {/* 最右下：特定商取引法に基づく表記 */}
        <div style={{ 
          pointerEvents: "auto", 
          fontSize: "11px", 
          letterSpacing: "0.05em",
          alignSelf: isMobile ? "flex-end" : "auto" // スマホ時も右下に寄せる
        }}>
          <Link to="/policies" style={{ color: "#000", textDecoration: "none", opacity: 0.6 }}>
            特定商取引法に基づく表記
          </Link>
        </div>
      </footer>

      {/* 詳細ドロワー（モバイル時は全画面、PC時は右側部分表示に可変） */}
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
          maxWidth: isMobile ? "100%" : "440px", // スマホ時はフルスクリーン、PCは440px
          backgroundColor: "#fff",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.05)",
          transform: selectedProduct ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-out",
          padding: isMobile ? "1.5rem" : "2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box"
        }}>
          {selectedProduct && (
            <>
              <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 120px)" }}>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  style={{ background: "none", border: "none", padding: 0, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", marginBottom: "2rem" }}
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

              <button 
                onClick={() => handlePurchaseClick(selectedProduct.stripeUrl)}
                style={{ width: "100%", backgroundColor: "#000", color: "#fff", border: "none", padding: "1rem", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", marginTop: "1.5rem" }}
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