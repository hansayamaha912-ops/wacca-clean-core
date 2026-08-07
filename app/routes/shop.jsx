import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";

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
      "/assets/ピンク横.png",
      "/assets/c1.jpg",
      "/assets/c2.jpg",
      "/assets/c3.jpg",
      "/assets/c5.jpg",
      "/assets/c6.jpg",
      "/assets/c7.jpg",
      "/assets/c8.jpg", 
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
      "/assets/angr横.png",
      "/assets/アングル1.jpg",
      "/assets/アングル2.jpg",
      "/assets/アングル10.jpg",
      "/assets/アングルM1.mp4",
      "/assets/アングル3.jpg",
      "/assets/アングル4.jpg",
      "/assets/アングル5.jpg",
      "/assets/アングル6.jpg",
      "/assets/アングル7.jpg"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: "https://buy.stripe.com/14AcN5eqH0F517WdeA3wQ05"
  }
];

export default function Shop() {
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
    setSelectedProduct(product);
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
      paddingBottom: isMobile ? "180px" : "140px" 
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

      {/* 固定フッター */}
      <footer style={{
        position: "fixed",
        bottom: isMobile ? "1rem" : "1.5rem",
        left: isMobile ? "1rem" : "1.5rem",
        right: isMobile ? "1rem" : "1.5rem",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "flex-end",
        gap: isMobile ? "1.5rem" : "0",
        pointerEvents: "none",
        zIndex: 40
      }}>
        <div style={{ pointerEvents: "auto" }}>
          <Link to="/">
            <img 
              src="/assets/IN.png" 
              alt="WACCA LOGO" 
              style={{ 
                height: isMobile ? "55px" : "80px", 
                width: "auto", 
                objectFit: "contain" 
              }} 
            />
          </Link>
        </div>

        <div style={{ 
          pointerEvents: "auto", 
          fontSize: "11px", 
          letterSpacing: "0.05em",
          alignSelf: isMobile ? "flex-end" : "auto"
        }}>
          <Link to="/policies" style={{ color: "#000", textDecoration: "none", opacity: 0.6 }}>
            特定商取引法に基づく表記
          </Link>
        </div>
      </footer>

      {/* 商品ギャラリー・ポップアップモーダル */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: selectedProduct ? "auto" : "none",
        opacity: selectedProduct ? 1 : 0,
        visibility: selectedProduct ? "visible" : "hidden",
        transition: "opacity 0.25s ease, visibility 0.25s ease",
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)"
      }}>
        <div 
          onClick={() => setSelectedProduct(null)}
          style={{
            position: "absolute",
            inset: 0,
          }}
        />
        
        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: isMobile ? "100%" : "520px",
          maxHeight: isMobile ? "88vh" : "85vh",
          backgroundColor: "#fff",
          borderTopLeftRadius: isMobile ? "16px" : "0",
          borderTopRightRadius: isMobile ? "16px" : "0",
          borderRadius: isMobile ? "16px 16px 0 0" : "8px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          transform: selectedProduct ? "translateY(0)" : "translateY(20px)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          overflow: "hidden",
          zIndex: 51
        }}>
          {selectedProduct && (
            <>
              {/* モーダルヘッダー */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 1.25rem",
                borderBottom: "1px solid #eee",
                backgroundColor: "#fff",
                position: "sticky",
                top: 0,
                zIndex: 10
              }}>
                <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>
                  Product Gallery
                </span>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  style={{ 
                    background: "none", 
                    border: "none", 
                    fontSize: "13px", 
                    letterSpacing: "0.1em", 
                    textTransform: "uppercase", 
                    cursor: "pointer", 
                    padding: "4px 8px",
                    fontWeight: "500"
                  }}
                >
                  ✕ Close
                </button>
              </div>

              {/* スクロール可能なコンテンツエリア */}
              <div style={{ 
                overflowY: "auto", 
                padding: "1.25rem", 
                display: "flex", 
                flexDirection: "column", 
                gap: "1.5rem",
                WebkitOverflowScrolling: "touch"
              }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "500", letterSpacing: "-0.01em" }}>{selectedProduct.name}</h2>
                  <p style={{ margin: "6px 0 0 0", fontSize: "15px", color: "#333", fontWeight: "500" }}>{selectedProduct.price}</p>
                </div>

                {/* 複数画像のギャラリー表示 */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <p style={{ margin: 0, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#888" }}>
                    Photos ({selectedProduct.images.length})
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
                    {selectedProduct.images.map((imgSrc, index) => (
                      <div key={index} style={{ width: "100%", backgroundColor: "#f9f9f9", borderRadius: "4px", overflow: "hidden" }}>
                        <img 
                          src={imgSrc} 
                          alt={`${selectedProduct.name} view ${index + 1}`} 
                          style={{ width: "100%", height: "auto", aspectRatio: "3/4", objectFit: "cover", display: "block" }} 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <hr style={{ border: "none", borderTop: "1px solid #eee", margin: 0 }} />

                <div>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#888" }}>Size</h4>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {selectedProduct.sizes.map((size) => (
                      <span key={size} style={{ padding: "6px 14px", border: "1px solid #ddd", fontSize: "11px", borderRadius: "2px" }}>{size}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* モーダルフッター */}
              <div style={{ 
                padding: "1rem 1.25rem", 
                borderTop: "1px solid #eee", 
                backgroundColor: "#fff",
                position: "sticky",
                bottom: 0,
                zIndex: 10
              }}>
                {selectedProduct.stripeUrl ? (
                  <button 
                    onClick={() => handlePurchaseClick(selectedProduct.stripeUrl)}
                    style={{ 
                      width: "100%", 
                      backgroundColor: "#000", 
                      color: "#fff", 
                      border: "none", 
                      padding: "1rem", 
                      fontSize: "12px", 
                      letterSpacing: "0.1em", 
                      textTransform: "uppercase", 
                      cursor: "pointer", 
                      borderRadius: "2px",
                      fontWeight: "500"
                    }}
                  >
                    Buy Now
                  </button>
                ) : (
                  <div style={{ 
                    width: "100%", 
                    backgroundColor: "#f5f5f5", 
                    color: "#888", 
                    textAlign: "center", 
                    padding: "1rem", 
                    fontSize: "12px", 
                    letterSpacing: "0.1em", 
                    textTransform: "uppercase",
                    borderRadius: "2px"
                  }}>
                    Coming Soon
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}