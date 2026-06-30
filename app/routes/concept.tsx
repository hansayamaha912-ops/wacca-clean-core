import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "WACCA - CONCEPT" },
    { name: "description", content: "WACCAコンセプト: 文化は常に発展し、動き続ける生命体である。" }
  ];
};

export default function Concept() {
  return (
    <div style={containerStyle}>
      {/* 
        インラインスタイルだけでは実現できない「スマホ用CSS」を干渉しないようにここに記述します。
        これにより、PCとスマホで完全に表示スタイルが分離されます。
      */}
      <style dangerouslySetInnerHTML={{__html: `
        /* --- PC版の標準スタイル --- */
        .concept-container {
          background-image: url('/assets/真の左.jpg');
          background-size: auto 85vh;
          background-position: left center;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
        .content-wrapper {
          display: flex;
          flex-direction: row;
          padding-top: 60px;
        }
        .left-spacer {
          flex: 1 1 50%;
          minWidth: 320px;
        }
        .right-section {
          flex: 1 1 50%;
          minWidth: 320px;
          padding: 80px 60px 60px 90px;
          text-align: left;
        }
        .text-block-en, .text-block-ja {
          text-align: left;
        }
        .nav-block {
          position: fixed;
          top: 30px;
          right: 40px;
        }

        /* --- スマホ版（画面幅 767px 以下）専用スタイル --- */
        @media (max-width: 767px) {
          .concept-container {
            background-size: auto 45vh !important;
            background-position: center top 20px !important;
            background-attachment: scroll !important;
          }
          .content-wrapper {
            flex-direction: column !important;
            padding-top: 20px !important;
          }
          .left-spacer {
            flex: 0 0 auto !important;
            height: 40vh !important;
            width: 100% !important;
          }
          .right-section {
            flex: 0 0 auto !important;
            width: 100% !important;
            padding: 20px 24px 80px 24px !important;
            text-align: center !important;
          }
          .text-block-en, .text-block-ja {
            text-align: center !important;
            margin: 0 auto !important;
          }
          .nav-block {
            position: absolute !important;
            top: 20px !important;
            left: 20px !important;
            right: auto !important;
          }
        }
      `}} />

      {/* 戻るボタン */}
      <div className="nav-block">
        <Link to="/" style={backLinkStyle}>← BACK</Link>
      </div>

      <div className="content-wrapper" style={contentWrapperBaseStyle}>
        {/* 左側：画像用のスペーサー空間 */}
        <div className="left-spacer" style={leftSpacerBaseStyle} />

        {/* 右側：テキストコンテンツエリア */}
        <div className="right-section" style={rightSectionBaseStyle}>
          {/* 英語版テキスト */}
          <section className="text-block-en" style={textBlockEnStyle}>
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
          <section className="text-block-ja" style={textBlockJaStyle}>
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
// ベースとなる固定インラインスタイル
// ==========================================

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "#f4f0ea", // オリジナルのベージュ
  color: "#000000",
  fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', sans-serif",
  position: "relative",
  boxSizing: "border-box",
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
};

const textBlockJaStyle: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "2.0",
  letterSpacing: "0.08em",
  maxWidth: "520px",
  opacity: 0.9,
};