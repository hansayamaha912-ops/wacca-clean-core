import { Link } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import stylesUrl from "../styles/landing.css?url";

export const links = () => [{ rel: 'stylesheet', href: stylesUrl }];

export const meta = () => [
  { title: 'WACCA - Your City. Your Culture.' },
];

export default function Index() {
  const audioRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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

  // isOpen と body.class を同期
  useEffect(() => {
    document.body.classList.toggle('state1', isOpen);
    document.body.classList.toggle('state0', !isOpen);
  }, [isOpen]);

  // audio の再生/停止ロジック: 重複再生を避ける（再生中なら停止、停止中なら再生）
  const handleLogoClick = async (e) => {
    e.preventDefault();
    const next = !isOpen;
    setIsOpen(next);

    const snd = audioRef.current;
    if (!snd) return;

    if (next) {
      // 開く方向: 再生していなければ再生
      if (snd.paused) {
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
    } else {
      // 閉じる方向: もし再生中なら停止して先頭に戻す
      try {
        if (!snd.paused) {
          snd.pause();
          snd.currentTime = 0;
        }
      } catch (e) {
        // noop
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
          {/* radial lines container (40 lines: left 20 + right 20) */}
          <div className="lines-container" aria-hidden={!isOpen}>
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="line"
                style={{ ['--angle']: `${i * (360 / 40)}deg` }}
                aria-hidden="true"
              />
            ))}
          </div>
          <img src="/assets/白メイン黒ロゴ.png" alt="WACCA LOGO" className="main-logo" />

          <div className="nodes-wrapper" aria-hidden={!isOpen}>
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
