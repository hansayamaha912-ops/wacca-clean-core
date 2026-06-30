import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

export const meta = () => {
  return [
    { title: "WACCA - CONCEPT" },
    { name: "description", content: "WACCAコンセプト: 文化は常に発展し、動き続ける生命体である。" }
  ];
};

export default function Concept() {
  // 初期値を真（PC版）にして、ハイドレーション時の干渉を防ぐ
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // スマホサイズかつマウント完了後のみスマホ用スタイルを適用、それ以外は成功しているPC版を維持
  const useMobileStyle = isMounted && isMobile;

  // 1. 最外層コンテナ（背景画像の設定）
  const dynamicContainerStyle: React.CSSProperties = {
    ...containerStyle,
    backgroundImage: "url('/assets/真の左.jpg')",
    backgroundRepeat: "no-repeat",
    // スマホ時は 45vh、PC時は大成功した「auto 85vh」で固定
    backgroundSize: useMobileStyle ? "auto 45vh" : "auto 85vh",
    // スマホ時は上部中央、PC時は左中央
    backgroundPosition: useMobileStyle ? "center top 20px" : "left center",
    // スマホ時は通常スクロール、PC時は固定（fixed）
    backgroundAttachment: useMobileStyle ? "scroll" : "fixed",
  };

  // 2. レイアウトの囲み（横並び or 縦並び）
  const dynamicWrapperStyle: React.CSSProperties = {
    ...contentWrapperBaseStyle,
    flexDirection: useMobileStyle ? "column" : "row",
    paddingTop: useMobileStyle ? "20px" : "60px",
  };

  // 3. 左側のガードスペース（画像と被らないための余白エリア）
  const dynamicLeftSpacerStyle: React.CSSProperties = {
    ...leftSpacerBaseStyle,
    flex: useMobileStyle ? "0 0 auto" : "1 1 50%",
    height: useMobileStyle ? "40vh" : "auto",
    minWidth: useMobileStyle ? "100%" : "320px",
  };

  // 4. 右側のテキストエリア（PC時は左余白 90px で完全回避）
  const dynamicRightSectionStyle: React.CSSProperties = {
    ...rightSectionBaseStyle,
    flex: useMobileStyle ? "0 0 auto" : "1 1 50%",
    minWidth: useMobileStyle ? "100%" : "320px",
    padding: useMobileStyle ? "20px 24px 80px 24px" : "80px 60px 60px 90px",
  };

  return (
    <div style={dynamicContainerStyle}>
      {/* 戻るボタン */}
      <div style={useMobileStyle ? mobileNavStyle : navStyle}>
        <Link to="/" style={backLinkStyle}>← BACK</Link>
      </div>

      <div style={dynamicWrapperStyle}>
        {/* 左側：画像用の空間 */}
        <div style={dynamicLeftSpacerStyle} />

        {/* 右側：テキストエリア */}
        <div style={dynamicRightSectionStyle}>
          {/* 英語版テキスト */}
          <section style={{ ...textBlockEnStyle, textAlign: useMobileStyle ? 'center' : 'left' }}>
            <p>Culture is a living thing that is always developing and moving.</p>
            <p>Who is wearing which clothes, in which city, and breathing in what kind of music?</p>
            <p style={{ fontWeight: 'bold', margin: '1.5em 0' }}>People, objects, and places.</p>
            <p>At the moment these three variables overlap, culture is born.</p>
            <p>Using 3D technology, we grant mass and form to communities<br />that are inherently invisible.</p>
            <p>We sculpt images on your mind and fragments of memory into a tangible "reality"<br />possessed with true texture and presence.</p>
            <p>This product is the very shape of culture you can hold in your hands<br />—a key to guiding you, a person of intent, toward new places and experiences.</p>
            <p>WACCA creates a circle (wacca) within that culture.</p>
            <p>Starting from local connections in Tokyo,<br />it is an attempt to bind them together through products.</p>
            <p style={{ fontStyle: 'italic', marginTop: '1.5em' }}>"What's ur 20?"</p>
            <p>Connecting from here, You and I.</p>
          </section>

          {/* 日本語版テキスト */}
          <section style={{ ...textBlockJaStyle, textAlign: useMobileStyle ? 'center' : 'left' }}>
            <p>文化は常に発展し、動き続ける生命体である。</p>
            <p>誰がどの服を着て、どの街の、どんな音楽の中で呼吸しているのか。</p>
            <p style={{ fontWeight: 'bold', margin: '1.5em 0' }}>人・モノ・場所。この3つの変数が重なる瞬間に、文化は生まれる。</p>
            <p>私たちは、3D技術を用いて、本来目に見えないコミュニティに質量と形態を授ける。</p>
            <p>頭の中のイメージや記憶の断片を、確かな触感と存在感を持つ「実在」へと彫り込む。</p>
            <p>このプロダクトは、あなたが手で掴める文化の形であり、<br />意思を持つあなたを新しい場所や体験へと導くための鍵である。</p>
            <p>WACCAは、その文化（culture）の中に輪っか（circle）を創出する。</p>
            <p>東京のローカルな人の繋がりを起点に、それらをプロダクトで繋ぐ試みである。</p>
            <p style={{ marginTop: '1.5em' }}>「What's ur 20?」ここから繋がる、あなたとわたし。</p>
          </section>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// インラインスタイルのベース定義
// ==========================================

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "#f4f0ea",
  color: "#000000",
  fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', sans-serif",
  position: "relative",
  boxSizing: "border-box",
};

const navStyle: React.CSSProperties = {
  position: "fixed",
  top: "30px",
  right: "40px", 
  zIndex: 10,
};

const mobileNavStyle: React.CSSProperties = {
  position: "absolute",
  top: "20px",
  left: "20px",
  zIndex: 10,
};

const backLinkStyle: React.CSSProperties = {
  color: "#000000",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "12px",
  letterSpacing: "0.1em",
  backgroundColor: "#f4f0ea",
  padding: "6px 14px",
  border: "1px solid #000000",
  borderRadius: "20px",
};

const contentWrapperBaseStyle: React.CSSProperties = {
  display: "flex",
  width: "100%",
  minHeight: "100vh",
};

const leftSpacerBaseStyle: React.CSSProperties = {
  pointerEvents: "none",
};

const rightSectionBaseStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  justifyContent: "center",
  boxSizing: "border-box",
};

const textBlockEnStyle: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.8",
  letterSpacing: "0.05em",
  maxWidth: "520px",
  margin: "0 auto",
};

const textBlockJaStyle: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "2.0",
  letterSpacing: "0.08em",
  maxWidth: "520px",
  margin: "0 auto",
  opacity: 0.9,
};