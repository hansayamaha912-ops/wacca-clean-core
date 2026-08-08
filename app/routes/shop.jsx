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
      "/assets/ピンク正面.png", "/assets/ピンク横.png", "/assets/c2.jpg", "/assets/c6.jpg",
      "/assets/c1.jpg", "/assets/c3.jpg", "/assets/c7.jpg", "/assets/c8.jpg", "/assets/c9.jpg"
    ],
    sizes: ["ONE SIZE"],
    // ★ここを商品詳細ページのパスに変更しました
    purchasePath: "/master-hand" 
  },
  {
    id: "dick-man-key-charm",
    name: "Dick man key-charm",
    price: "¥3,500",
    description: "ドイツ留学時に触れた「性の寛容さ」に感銘を受け、日本ではタブー視されがちな性をどこまでポップに表現できるか挑戦したキャラクター。日常にユーモアと解放を。",
    images: ["/assets/Dick正面.png", "/assets/Dick横.png"],
    sizes: ["ONE SIZE"],
    stripeUrl: "https://buy.stripe.com/9B67sL4Q773tg2Q6Qc3wQ04"
  },
  {
    id: "angr-kun-key-holder",
    name: "Angr-Kun key-holder",
    price: "¥3,500",
    description: "「怒り」という感情から生まれた正直すぎるキャラクター。本心を隠さず、ありのままを表現する彼を身につければ、自分にも正直になれるはず。",
    images: [
      "/assets/angr正面.png", "/assets/angr横.png", "/assets/アングル1.jpg", "/assets/アングル2.jpg",
       "/assets/アングル3.jpg", "/assets/アングル4.jpg", "/assets/アングル5.jpg",
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

  // 購入処理の分岐用関数
  const handlePurchase = (product) => {
    if (product.purchasePath) {
      // マスターハンドの場合：特定のページへ遷移
      window.location.href = product.purchasePath;
    } else if (product.stripeUrl) {
      // その他：Stripe決済へ
      window.location.href = product.stripeUrl;
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", color: "#000", fontFamily: "sans-serif", position: "relative", paddingBottom: "140px" }}>
      
      {/* ヘッダー */}
      <header style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "1.5rem 1rem" : "2rem 1.5rem", display: "flex", justifyContent: "space-between" }}>
        <nav style={{ display: "flex", gap: "2rem" }}>
          <Link to="/" style={{ color: "#000", textDecoration: "none", opacity: 0.5 }}>Home</Link>
          <Link to="/shop" style={{ color: "#000", textDecoration: "none", borderBottom: "1px solid #000" }}>Shop</Link>
        </nav>
      </header>

      {/* 商品一覧 */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "1.5rem" }}>
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
                  src={hoveredProductId === product.id ? product.images[1] : product.images[0]} 
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all 0.3s ease" }} 
                />
              </div>
              <h3 style={{ margin: 0, fontSize: "13px", fontWeight: "500" }}>{product.name}</h3>
              <p style={{ margin: 0, opacity: 0.6, fontSize: "13px" }}>{product.price}</p>
            </div>
          ))}
        </div>
      </main>

      {/* ポップアップモーダル */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 50,
        pointerEvents: selectedProduct ? "auto" : "none",
        opacity: selectedProduct ? 1 : 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <div onClick={() => setSelectedProduct(null)} style={{ position: "absolute", inset: 0 }} />
        
        <div style={{
          width: "90%", maxWidth: "800px", height: "80vh", backgroundColor: "#fff",
          display: "flex", flexDirection: isMobile ? "column" : "row",
          overflow: "hidden", position: "relative", zIndex: 51, borderRadius: "8px"
        }}>
          {selectedProduct && (
            <>
              {/* 左：ギャラリー */}
              <div style={{ flex: 1, overflowY: "auto", padding: "20px", backgroundColor: "#f0f0f0" }}>
                {selectedProduct.images.map((src, index) => (
                  <div key={index} style={{ width: "100%", marginBottom: "15px" }}>
                    {src.toLowerCase().endsWith(".mp4") ? (
                      <video src={src} controls playsInline loop muted autoPlay style={{ width: "100%", display: "block" }} />
                    ) : (
                      <img src={src} style={{ width: "100%", display: "block" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* 右：ストーリーとボタン */}
              <div style={{ flex: 0.8, padding: "30px", display: "flex", flexDirection: "column" }}>
                <button onClick={() => setSelectedProduct(null)} style={{ alignSelf: "flex-end", cursor: "pointer", border: "none", background: "none", fontSize: "12px", letterSpacing: "0.1em" }}>✕ CLOSE</button>
                <h2 style={{ fontSize: "20px", marginTop: "10px" }}>{selectedProduct.name}</h2>
                <p style={{ fontSize: "15px", fontWeight: "600", margin: "5px 0 15px 0" }}>{selectedProduct.price}</p>
                <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#444" }}>{selectedProduct.description}</p>
                
                <div style={{ marginTop: "auto" }}>
                  {/* ★分岐させた購入処理を呼び出し */}
                  <button onClick={() => handlePurchase(selectedProduct)} style={{ width: "100%", padding: "15px", background: "#000", color: "#fff", border: "none", cursor: "pointer", fontSize: "12px", letterSpacing: "0.1em" }}>
                    {selectedProduct.purchasePath ? "GO TO PRODUCT PAGE" : "BUY NOW"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}