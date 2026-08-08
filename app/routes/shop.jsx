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
    description: "ドイツ留学時に触れた「性の寛容さ」に感銘を受け、日本ではタブー視されがちな性をどこまでポップに表現できるか挑戦したキャラクター。日常にユーモアと解放を。",
    images: ["/assets/Dick正面.png", "/assets/Dick横.png"],
    sizes: ["ONE SIZE"],
    stripeUrl: "https://buy.stripe.com/9B67sL4Q773tg2Q6Qc3wQ04"
  },
  {
    id: "angr-kun-key-holder",
    name: "Angr-Kun key-holder",
    price: "¥3,500",
    description: "「怒り」という感情から生まれた正直すぎるキャラクター。本心を隠さず、ありのままを表現する彼を身につければ、自分にも正直になれるはず",
    images: [
      "/assets/angr正面.png", "/assets/アングル1.jpg", "/assets/angr横.png", "/assets/アングル2.jpg",
      , "/assets/アングル3.jpg", "/assets/アングル4.jpg", "/assets/アングル5.jpg",
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
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", color: "#000", fontFamily: "sans-serif", position: "relative", paddingBottom: "140px" }}>
      
      {/* ヘッダー・メイン（変更なし） */}
      <header style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "1.5rem 1rem" : "2rem 1.5rem", display: "flex", justifyContent: "space-between" }}>
        <nav style={{ display: "flex", gap: "2rem" }}><Link to="/" style={{ color: "#000", textDecoration: "none", opacity: 0.5 }}>Home</Link><Link to="/shop" style={{ color: "#000", textDecoration: "none", borderBottom: "1px solid #000" }}>Shop</Link></nav>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "1.5rem" }}>
          {PRODUCT_DATA.map((product) => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} style={{ cursor: "pointer" }}>
              <div style={{ width: "100%", aspectRatio: "3/4", backgroundColor: "#f9f9f9", overflow: "hidden" }}>
                <img src={product.images[0]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3>{product.name}</h3><p>{product.price}</p>
            </div>
          ))}
        </div>
      </main>

      {/* ポップアップモーダル（修正箇所：画像のコンテナを完全に独立） */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 50,
        pointerEvents: selectedProduct ? "auto" : "none",
        opacity: selectedProduct ? 1 : 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <div onClick={() => setSelectedProduct(null)} style={{ position: "absolute", inset: 0 }} />
        
        {/* モーダル枠 */}
        <div style={{
          width: "90%", maxWidth: "800px", height: "80vh", backgroundColor: "#fff",
          display: "flex", flexDirection: isMobile ? "column" : "row",
          overflow: "hidden", position: "relative", zIndex: 51, borderRadius: "8px"
        }}>
          {selectedProduct && (
            <>
              {/* 左：画像・動画リスト（縦に自然に並ぶ） */}
              <div style={{ flex: 1, overflowY: "auto", padding: "20px", backgroundColor: "#f0f0f0" }}>
                {selectedProduct.images.map((src, index) => (
                  <div key={index} style={{ width: "100%", marginBottom: "15px" }}>
                    {src.toLowerCase().endsWith(".mp4") ? (
                      <video src={src} controls style={{ width: "100%", display: "block" }} />
                    ) : (
                      <img src={src} style={{ width: "100%", display: "block" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* 右：ストーリーとボタン */}
              <div style={{ flex: 0.8, padding: "30px", display: "flex", flexDirection: "column" }}>
                <button onClick={() => setSelectedProduct(null)} style={{ alignSelf: "flex-end", cursor: "pointer" }}>CLOSE</button>
                <h2>{selectedProduct.name}</h2>
                <p>{selectedProduct.description}</p>
                <div style={{ marginTop: "auto" }}>
                  {selectedProduct.stripeUrl ? (
                    <button onClick={() => window.location.href = selectedProduct.stripeUrl} style={{ width: "100%", padding: "15px", background: "#000", color: "#fff" }}>BUY NOW</button>
                  ) : <p>COMING SOON</p>}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}