import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "true" },
  { href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap", rel: "stylesheet" }
];

// ==========================================
// 商品マスタデータ（色が被らないように配置順を最適化）
// ==========================================
const PRODUCT_DATA = [
  {
    id: "master-hand",
    name: "Master Hand",
    price: "¥4,000",
    description: "WACCAの新たな「第3の手」。ただの雑貨ではなく、これを持つことであなたも輪（WACCA）のメンバーとしてジョインするというメッセージを込めたシグネチャー的グッズです。",
    images: [
      "/assets/ピンク正面.png", "/assets/ピンク横.png", "/assets/c2.jpg", "/assets/c6.jpg",
      "/assets/c1.jpg", "/assets/c3.jpg", "/assets/c7.jpg", "/assets/c8.jpg", "/assets/c9.jpg"
    ],
    sizes: ["ONE SIZE"],
    purchasePath: "/products"
  },
  {
    id: "joe-blad-commander",
    name: "JOE BLAD Commander",
    price: "Sold out",
    description: "北欧の軍人で軍人気質。口数が少ないが、何を考えているのかは分かりやすい。",
    images: [
      "/assets/Joe2.PNG",
      "/assets/Joe1.PNG",
      "/assets/Joe3.PNG",
      "/assets/Joe4.PNG"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: null
  },
  {
    id: "dick-man-key-charm",
    name: "Dick man key-charm",
    price: "¥3,500",
    description: "「性の寛容さ」に感銘を受け、日本ではタブー視されがちな性表現できるか挑戦したキャラクター。日常にユーモアと解放を。",
    images: ["/assets/Dick正面.png", "/assets/Dick横.png"],
    sizes: ["ONE SIZE"],
    stripeUrl: "https://buy.stripe.com/9B67sL4Q773tg2Q6Qc3wQ04"
  },
  {
    id: "pest-mask",
    name: "Pests Mask",
    price: "¥1,100",
    description: "極度の潔癖症である男が、自らの手で作り上げた特製ガスマスク。マスクを通してしか心地良さを感じられない彼のアイテム",
    images: [
      "/assets/Gam2.PNG",
      "/assets/Gam3.PNG",
      "/assets/Gam1.PNG"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: null
  },
  {
    id: "angr-kun-key-holder",
    name: "Angr-Kun key-holder",
    price: "¥2,500",
    description: "「怒り」という感情から生まれた正直すぎるキャラクター。本心を隠さず、ありのままを表現する彼を身につければ、自分にも正直になれるはず。",
    images: [
      "/assets/angr正面.png", "/assets/アングル1.jpg", "/assets/angr横.png",
      "/assets/アングル3.jpg", "/assets/アングル5.jpg",
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: "https://buy.stripe.com/14AcN5eqH0F517WdeA3wQ05"
  },
  {
    id: "double-cigarette-holder",
    name: "Double Cigarette Holder",
    price: "¥1,200",
    description: "タバコを2本同時に差し、1度に1本吸えるという驚きの喫煙者向け便利グッズ。",
    images: [
      "/assets/py1.PNG",
      "/assets/py2.PNG"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: null
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

  const handlePurchase = (product) => {
    if (product.purchasePath) {
      window.location.href = product.purchasePath;
    } else if (product.stripeUrl) {
      window.location.href = product.stripeUrl;
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", color: "#000", fontFamily: "'Montserrat', sans-serif", paddingBottom: "140px" }}>
      
      {/* ヘッダー */}
      <header style={{ 
        maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "1.2rem 1rem" : "2rem 1.5rem", 
        display: "flex", justifyContent: "space-between", alignItems: "center" 
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "12px", textDecoration: "none", color: "#000" }}>
          <img src="/assets/IN.png" alt="Logo" style={{ height: isMobile ? "22px" : "30px", width: "auto", objectFit: "contain" }} />
          <span style={{ fontSize: isMobile ? "24px" : "36px", fontWeight: "900", letterSpacing: "-0.04em", textTransform: "lowercase", lineHeight: "1" }}>
            wacca
          </span>
        </Link>

        <nav style={{ display: "flex", gap: isMobile ? "1.2rem" : "2rem", fontWeight: "900", fontSize: isMobile ? "12px" : "14px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          <Link to="/" style={{ color: "#000", textDecoration: "none", opacity: 0.5 }}>Home</Link>
          <Link to="/shop" style={{ color: "#000", textDecoration: "none", borderBottom: "2px solid #000" }}>Shop</Link>
        </nav>
      </header>

      {/* 商品一覧 */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "1.5rem 1rem" : "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? "1rem" : "1.5rem" }}>
          {PRODUCT_DATA.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              style={{ cursor: "pointer" }}
            >
              <div style={{ width: "100%", aspectRatio: "3/4", backgroundColor: "#f9f9f9", overflow: "hidden", marginBottom: "0.8rem", position: "relative" }}>
                <img 
                  src={hoveredProductId === product.id && product.images[1] ? product.images[1] : product.images[0]} 
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all 0.3s ease" }} 
                />
              </div>
              <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "900", textTransform: "uppercase" }}>{product.name}</h3>
              <p style={{ margin: 0, opacity: 0.6, fontSize: "13px" }}>{product.price}</p>
            </div>
          ))}
        </div>
      </main>

      {/* ポップアップモーダル（スマホ・PC両対応の完全スクロール設計） */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 50,
        pointerEvents: selectedProduct ? "auto" : "none",
        opacity: selectedProduct ? 1 : 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: isMobile ? "10px" : "20px",
        transition: "opacity 0.25s ease"
      }}>
        <div onClick={() => setSelectedProduct(null)} style={{ position: "absolute", inset: 0 }} />
        
        <div style={{
          width: "100%", maxWidth: "800px", height: isMobile ? "92vh" : "82vh", backgroundColor: "#fff",
          display: "flex", flexDirection: isMobile ? "column" : "row",
          overflow: "hidden", position: "relative", zIndex: 51, borderRadius: "8px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
        }}>
          {selectedProduct && (
            <>
              {/* 左側：ギャラリー（独立スクロール） */}
              <div style={{ 
                flex: isMobile ? "1.2" : "1", 
                overflowY: "auto", 
                padding: "20px", 
                backgroundColor: "#f0f0f0",
                WebkitOverflowScrolling: "touch" 
              }}>
                {selectedProduct.images.map((src, index) => (
                  <div key={index} style={{ width: "100%", marginBottom: "15px", backgroundColor: "#fff", borderRadius: "4px", overflow: "hidden" }}>
                    {src.toLowerCase().endsWith(".mp4") ? (
                      <video src={src} controls playsInline loop muted autoPlay style={{ width: "100%", display: "block" }} />
                    ) : (
                      <img src={src} alt={`${selectedProduct.name} ${index + 1}`} style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* 右側：詳細情報・購入ボタン（独立スクロール） */}
              <div style={{ 
                flex: "1", 
                padding: isMobile ? "20px" : "30px", 
                display: "flex", 
                flexDirection: "column", 
                overflowY: "auto",
                backgroundColor: "#fff",
                WebkitOverflowScrolling: "touch" 
              }}>
                <button onClick={() => setSelectedProduct(null)} style={{ alignSelf: "flex-end", cursor: "pointer", border: "none", background: "none", fontWeight: "900", fontSize: "14px", padding: "5px" }}>✕ CLOSE</button>
                <h2 style={{ fontSize: isMobile ? "20px" : "24px", marginTop: "5px", fontWeight: "900" }}>{selectedProduct.name}</h2>
                <p style={{ fontSize: "16px", fontWeight: "900", margin: "5px 0 15px 0" }}>{selectedProduct.price}</p>
                <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#444" }}>{selectedProduct.description}</p>
                
                <div style={{ marginTop: "auto", paddingTop: "25px" }}>
                  {selectedProduct.stripeUrl || selectedProduct.purchasePath ? (
                    <button onClick={() => handlePurchase(selectedProduct)} style={{ width: "100%", padding: "15px", background: "#000", color: "#fff", border: "none", cursor: "pointer", fontWeight: "900", textTransform: "uppercase" }}>
                      {selectedProduct.purchasePath ? "GO TO PRODUCT PAGE" : "BUY NOW"}
                    </button>
                  ) : (
                    <div style={{ width: "100%", padding: "15px", background: "#f5f5f5", color: "#888", textAlign: "center", fontSize: "12px", letterSpacing: "0.1em", fontWeight: "900" }}>
                      COMING SOON
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