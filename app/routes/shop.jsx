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
    description: "WACCAの新たな「第3の手」。ただの雑貨ではなく、これを持つことであなたも輪（WACCA）のメンバーとしてジョインするというメッセージを込めたアイコン的グッズです。",
    images: [
      "/assets/ピンク正面.png", "/assets/c2.jpg", "/assets/c6.jpg", "/assets/ピンク横.png",
      "/assets/c1.jpg", "/assets/c3.jpg", "/assets/c7.jpg", "/assets/c8.jpg", "/assets/c9.jpg"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: null
  },
  {
    id: "dick-man-key-charm",
    name: "Dick man key-charm",
    price: "¥3,500",
    description: "ドイツ留学時に触れた「性の寛容さ」に感銘を受け、日本ではタブー視されがちは性をどこまでポップに表現できるか挑戦したキャラクター。日常にユーモアと解放を。",
    images: ["/assets/Dick正面.png", "/assets/Dick横.png"],
    sizes: ["ONE SIZE"],
    stripeUrl: "https://buy.stripe.com/9B67sL4Q773tg2Q6Qc3wQ04"
  },
  {
    id: "angr-kun-key-holder",
    name: "Angr-Kun key-holder",
    price: "¥3,500",
    description: "「怒り」という感情から生まれた正直すぎるキャラクター。本心を隠さず、ありのままを表現する彼を身につければ、自分にも正直になれるかも？",
    images: [
      "/assets/angr正面.png", "/assets/アングル1.jpg", "/assets/angr横.png", "/assets/アングル2.jpg",
      "/assets/アングルM1.mp4", "/assets/アングル3.jpg", "/assets/アングル4.jpg", "/assets/アングル5.jpg",
      "/assets/アングル6.jpg", "/assets/アングル7.jpg"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: "https://buy.stripe.com/14AcN5eqH0F517WdeA3wQ05"
  }
];

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ 
      backgroundColor: "#fff", 
      minHeight: "100vh", 
      color: "#000", 
      fontFamily: "sans-serif", 
      position: "relative", 
      paddingBottom: isMobile ? "180px" : "140px" 
    }}>
      
      {/* ヘッダー */}
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

      {/* 商品一覧 */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "1rem 1rem 3rem 1rem" : "3rem 1.5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))",
          columnGap: isMobile ? "1rem" : "1.5rem",
          rowGap: isMobile ? "2.5rem" : "3rem"
        }}>
          {PRODUCT_DATA.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              style={{ cursor: "pointer" }}
            >
              <div style={{ width: "100%", aspectRatio: "3/4", backgroundColor: "#f9f9f9", marginBottom: "0.8rem", overflow: "hidden", position: "relative" }}>
                <img 
                  src={hoveredProductId === product.id ? product.images[1] : product.images[0]} 
                  alt={product.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all 0.3s ease" }}
                />
              </div>
              <div style={{ fontSize: isMobile ? "12px" : "13px", display: "flex", flexDirection: "column", gap: "2px" }}>
                <h3 style={{ margin: 0, fontWeight: "500" }}>{product.name}</h3>
                <p style={{ margin: 0, opacity: 0.6 }}>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* フッター */}
      <footer style={{
        position: "fixed", bottom: isMobile ? "1rem" : "1.5rem", left: isMobile ? "1rem" : "1.5rem", right: isMobile ? "1rem" : "1.5rem",
        display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end",
        pointerEvents: "none", zIndex: 40
      }}>
        <div style={{ pointerEvents: "auto" }}>
          <Link to="/"><img src="/assets/IN.png" alt="WACCA LOGO" style={{ height: isMobile ? "55px" : "80px", width: "auto", objectFit: "contain" }} /></Link>
        </div>
        <div style={{ pointerEvents: "auto", fontSize: "11px" }}>
          <Link to="/policies" style={{ color: "#000", textDecoration: "none", opacity: 0.6 }}>特定商取引法に基づく表記</Link>
        </div>
      </footer>

      {/* ポップアップモーダル（スムーズスクロール対応） */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 50,
        pointerEvents: selectedProduct ? "auto" : "none",
        opacity: selectedProduct ? 1 : 0,
        visibility: selectedProduct ? "visible" : "hidden",
        transition: "opacity 0.25s ease, visibility 0.25s ease",
        display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)"
      }}>
        <div onClick={() => setSelectedProduct(null)} style={{ position: "absolute", inset: 0 }} />
        
        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: isMobile ? "100%" : "860px",
          height: isMobile ? "90vh" : "82vh",
          backgroundColor: "#fff",
          borderTopLeftRadius: isMobile ? "16px" : "8px",
          borderTopRightRadius: isMobile ? "16px" : "8px",
          borderRadius: isMobile ? "16px 16px 0 0" : "8px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          overflow: "hidden",
          zIndex: 51
        }}>
          {selectedProduct && (
            <>
              {/* 閉じるボタン（スマホ・PC共通で右上付近に常駐） */}
              <button 
                onClick={() => setSelectedProduct(null)}
                style={{ 
                  position: "absolute", top: "15px", right: "20px", zIndex: 20,
                  background: "#fff", border: "1px solid #ddd", borderRadius: "4px",
                  fontSize: "12px", letterSpacing: "0.1em", padding: "6px 12px", cursor: "pointer" 
                }}
              >
                ✕ CLOSE
              </button>

              {/* 左側：画像・動画エリア（ここが独立してスワイプ・スクロール可能） */}
              <div style={{ 
                flex: isMobile ? "1" : "1.3", 
                overflowY: "auto", 
                padding: "2rem 1.5rem", 
                backgroundColor: "#fafafa",
                display: "flex", flexDirection: "column", gap: "16px",
                WebkitOverflowScrolling: "touch"
              }}>
                <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#888", marginBottom: "-4px" }}>
                  Gallery ({selectedProduct.images.length})
                </div>
                {selectedProduct.images.map((src, index) => {
                  const isVideo = src.toLowerCase().endsWith(".mp4");
                  return (
                    <div key={index} style={{ width: "100%", backgroundColor: "#fff", borderRadius: "4px", overflow: "hidden", border: "1px solid #eee" }}>
                      {isVideo ? (
                        <video src={src} controls playsInline loop muted autoPlay style={{ width: "100%", height: "auto", display: "block" }} />
                      ) : (
                        <img src={src} alt={`${selectedProduct.name} ${index + 1}`} style={{ width: "100%", height: "auto", display: "block" }} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 右側：商品名・ストーリー小話・購入ボタン（PC時は固定、スマホ時は下に続く） */}
              <div style={{ 
                flex: "1", 
                padding: isMobile ? "1.5rem" : "2.5rem 2rem", 
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                backgroundColor: "#fff", overflowY: isMobile ? "visible" : "auto",
                borderLeft: isMobile ? "none" : "1px solid #eee"
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", paddingRight: isMobile ? "0" : "1rem" }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "500", letterSpacing: "-0.01em" }}>{selectedProduct.name}</h2>
                    <p style={{ margin: "6px 0 0 0", fontSize: "16px", fontWeight: "600", color: "#111" }}>{selectedProduct.price}</p>
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid #eee", margin: 0 }} />

                  <div>
                    <h4 style={{ margin: "0 0 8px 0", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#888" }}>Story</h4>
                    <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.8", color: "#444", whiteSpace: "pre-line" }}>
                      {selectedProduct.description}
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  {selectedProduct.stripeUrl ? (
                    <button 
                      onClick={() => window.location.href = selectedProduct.stripeUrl}
                      style={{ 
                        width: "100%", backgroundColor: "#000", color: "#fff", border: "none", 
                        padding: "1rem", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", 
                        cursor: "pointer", borderRadius: "2px", fontWeight: "500" 
                      }}
                    >
                      Buy Now
                    </button>
                  ) : (
                    <div style={{ 
                      width: "100%", backgroundColor: "#f5f5f5", color: "#888", textAlign: "center", 
                      padding: "1rem", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px" 
                    }}>
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}