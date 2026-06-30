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
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => window.innerWidth < 768;
    
    const handleResize = () => setIsMobile(checkMobile());
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const useMobileStyle = isMounted && isMobile;

  // 1. 最外層コンテナ
  const dynamicContainerStyle: React.CSSProperties = {
    ...containerStyle,
    backgroundImage: "url('/assets/真の左.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: useMobileStyle ? "auto 42vh" : "auto 85vh",
    backgroundPosition: useMobileStyle ? "center top 20px" : "left center",
    backgroundAttachment: useMobileStyle ? "scroll" : "fixed",
  };

  // 2. レイアウトの囲み
  const dynamicWrapperStyle: React.CSSProperties = {
    ...contentWrapperBaseStyle,
    flexDirection: useMobileStyle ? "column" : "row",
    paddingTop: useMobileStyle ? "10px" : "60px",
  };

  // 3. 左側（上側）：画像用空間スペーサー
  const dynamicLeftSpacerStyle: React.CSSProperties = {
    ...leftSpacerBaseStyle,
    flex: useMobileStyle ? "0 0 auto" : "1 1 50%",
    height: useMobileStyle ? "46vh" : "auto",
    minWidth: useMobileStyle ? "100%" : "320px",
  };

  // 4. 右側（下側）：テキストエリア
  const dynamicRightSectionStyle: React.CSSProperties = {
    ...rightSectionBaseStyle,
    flex: useMobileStyle ? "0 0 auto" : "1 1 50%",
    minWidth: useMobileStyle ? "100%" : "320px",
    padding: useMobileStyle ? "0px 20px 100px 20px" : "80px 60px 60px 90px",
  };

  return (
    <div style={dynamicContainerStyle}>
      {/* 戻るボタン */}
      <div style={useMobileStyle ? mobileNavStyle : navStyle}>
        <Link to="/" style={backLinkStyle}>← BACK</Link>
      </div>

      <div style={dynamicWrapperStyle}>
        {/* 画像用の空間 */}
        <div style={dynamicLeftSpacerStyle} />

        {/* テキストエリア */}
        <div style={dynamicRightSectionStyle}>
          
          {/* 英語版テキスト */}
          <section style={{ 
            ...textBlockEnStyle, 
            textAlign: useMobileStyle ? 'center' : 'left',
            lineHeight: useMobileStyle ? '2.1' : '1.8' 
          }}>
            <p>Culture is a living thing that is always developing and moving.</p>
            <p>Who is wearing which clothes, in which city, and breathing in what kind of music?</p>
            
            <p style={{ fontWeight: 'bold', margin: '1.8em 0' }}>People, objects, and places.</p>
            
            <p>At the moment these three variables overlap, culture is born.</p>
            
            <p>Using 3D technology, we grant mass and form to communities that are inherently invisible.</p>
            <p>We sculpt images on your mind and fragments of memory into a tangible "reality" possessed with true texture and presence.</p>
            <p>This product is the very shape of culture you can hold in your hands—a key to guiding you, a person of intent, toward new places and experiences.</p>
            
            <p>WACCA creates a circle (wacca) within that culture.</p>
            <p>Starting from local connections in Tokyo, it is an attempt to bind them together through products.</p>
            
            <p style={{ fontStyle: 'italic', marginTop: '1.8em' }}>"What's ur 20?"</p>
            <p>Connecting from here, You and I.</p>
          </section>

          {/* 日本語版テキスト */}
          <section style={{ 
            ...textBlockJaStyle, 
            textAlign: useMobileStyle ? 'center' : 'left',
            lineHeight: useMobileStyle ? '2.4' : '2.0'
          }}>
            <p><span style={w}>文化は常に発展し、</span><span style={w}>動き続ける生命体である。</span></p>
            <p><span style={w}>誰がどの服を着て、</span><span style={w}>どの街の、</span><span style={w}>どんな音楽の中で</span><span style={w}>呼吸しているのか。</span></p>
            
            <p style={{ fontWeight: 'bold', margin: '1.8em 0' }}>
              <span style={w}>人・モノ・場所。</span><br />
              <span style={w}>この3つの変数が</span><span style={w}>重なる瞬間に、</span><span style={w}>文化は生まれる。</span>
            </p>
            
            <p>
              <span style={w}>私たちは、</span><span style={w}>3D技術を用いて、</span>
              <span style={w}>本来目に見えないコミュニティに</span><span style={w}>質量と形態を授ける。</span>
            </p>
            <p>
              <span style={w}>頭の中のイメージや</span><span style={w}>記憶の断片を、</span>
              <span style={w}>確かな触感と存在感を持つ</span><span style={w}>「実在」へと彫り込む。</span>
            </p>
            <p>
              <span style={w}>このプロダクトは、</span><span style={w}>あなたが手で掴める</span><span style={w}>文化の形であり、</span>
              <span style={w}>意思を持つあなたを</span><span style={w}>新しい場所や体験へと</span><span style={w}>導くための鍵である。</span>
            </p>
            
            <p><span style={w}>WACCAは、</span><span style={w}>その文化（culture）の中に</span><span style={w}>輪っか（circle）を創出する。</span></p>
            <p>
              <span style={w}>東京のローカルな</span><span style={w}>人の繋がりを起点に、</span>
              <span style={w}>それらをプロダクトで</span><span style={w}>繋ぐ試みである。</span>
            </p>
            
            {/* 修正箇所: 「What's ur 20?」の後に明示的な <br /> を配置し、次の文を一文の美しい塊に修正 */}
            <p style={{ marginTop: '1.8em' }}>
              <span style={w}>「What's ur 20?」</span><br />
              <span style={w}>ここから繋がる、あなたとわたし。</span>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// インラインスタイルのベース定義
// ==========================================

const w: React.CSSProperties = {
  display: "inline-block",
  whiteSpace: "normal",
};

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
  gap: "45px", 
  justifyContent: "center",
  boxSizing: "border-box",
};

const textBlockEnStyle: React.CSSProperties = {
  fontSize: "14px",
  letterSpacing: "0.05em",
  maxWidth: "520px",
  margin: "0 auto",
  wordBreak: "keep-all",
  overflowWrap: "anywhere",
};

const textBlockJaStyle: React.CSSProperties = {
  fontSize: "13px",
  letterSpacing: "0.06em", 
  maxWidth: "520px",
  margin: "0 auto",
  opacity: 0.9,
};