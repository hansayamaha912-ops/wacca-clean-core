import { Link } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import stylesUrl from "~/styles/landing.css?url";

export const links = () => [{ rel: 'stylesheet', href: stylesUrl }];

export const meta = () => [
  { title: 'WACCA - Your City. Your Culture.' },
];

export default function Index() {
  const audioRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // 初期 body class をセットし、アンマウント時にクリーンアップ
  useEffect(() => {
    if (!document.body.classList.contains('state0') && !document.body.classList.contains('state1')) {
      document.body.classList.add('state0');
    }
    return () => {
      document.body.classList.remove('state0');
      document.body.classList.remove('state1');
    };
  }, []);

  // isExpanded と body.class を同期
  useEffect(() => {
    if (isExpanded) {
      document.body.classList.remove('state0');
      document.body.classList.add('state1');
    } else {
      document.body.classList.remove('state1');
      document.body.classList.add('state0');
    }
  }, [isExpanded]);

  const handleLogoClick = async (e) => {
    e.preventDefault();
    if (isExpanded) return;
    setIsExpanded(true);

    const snd = audioRef.current;
    if (snd) {
      try {
        await snd.play();
      } catch (err) {
        try {
          snd.muted = true;
          await snd.play();
          snd.muted = false;
        } catch (e) {
          // noop
        }
      }
    }
  };

  const openModal = (id) => {
    alert(`openModal: ${id}`);
  };

  return (
    <main className="landing-root">
      <div className="viewport">
        <div className="logo-container" id="mainLogoTrigger" onClick={handleLogoClick} role="button" tabIndex={0}>
          <img src="/assets/白メイン黒ロゴ.png" alt="WACCA LOGO" className="main-logo" />

          <div className="nodes-wrapper" aria-hidden={!isExpanded}>
            <button type="button" className="node-btn node-left1" onClick={(e) => { e.stopPropagation(); openModal('gloveModal'); }}>
              <img src="/assets/白メイン黒ロゴ.png" alt="Glove" />
            </button>
            <button type="button" className="node-btn node-left2" onClick={(e) => { e.stopPropagation(); openModal('tattooModal'); }}>
              <img src="/assets/白メイン黒ロゴ.png" alt="Tattoo" />
            </button>
            <button type="button" className="node-btn node-right1" onClick={(e) => { e.stopPropagation(); openModal('accModal'); }}>
              <img src="/assets/白メイン黒ロゴ.png" alt="Accessory" />
            </button>
            <button type="button" className="node-btn node-right2" onClick={(e) => { e.stopPropagation(); openModal('otherModal'); }}>
              <img src="/assets/白メイン黒ロゴ.png" alt="Other" />
            </button>
          </div>
        </div>
      </div>

  <audio id="sndIntro" ref={audioRef} preload="auto" />

      <footer className="landing-footer">
        <Link to="/policies">特定商取引法に基づく表記</Link>
      </footer>
    </main>
  );
}
