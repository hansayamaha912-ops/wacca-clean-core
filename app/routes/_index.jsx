import { json } from "@remix-run/node";
import { Link, useLoaderData, useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import stylesUrl from "../styles/landing.css?url";

const getSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars missing");
  return createClient(url, key);
};

export const loader = async () => {
  const supabase = getSupabase();
  const { data } = await supabase.from('analytics').select('*').eq('id', 1);
  const stats = (data && data.length > 0) ? data[0] : { view_count: 0, click_count: 0 };
  return json({ stats });
};

export const action = async ({ request }) => {
  const supabase = getSupabase();
  const formData = await request.formData();
  const type = formData.get("type");
  
  const { data } = await supabase.from('analytics').select('*').eq('id', 1);
  const current = (data && data.length > 0) ? data[0] : { view_count: 0, click_count: 0 };
  
  const updateKey = type === 'click' ? 'click_count' : 'view_count';
  await supabase.from('analytics')
    .update({ [updateKey]: (current[updateKey] || 0) + 1 })
    .eq('id', 1);
  
  return json({ success: true });
};

export const links = () => [{ rel: 'stylesheet', href: stylesUrl }];
export const meta = () => [{ title: 'WACCA - Your City. Your Culture.' }];

export default function Index() {
  const { stats } = useLoaderData();
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [labels] = useState(() => ({
    view: ['Σ', 'Ψ', 'Φ', 'Δ', 'Ω', 'Ξ'][Math.floor(Math.random() * 6)],
    click: ['α', 'β', 'γ', 'δ', 'ε', 'ζ'][Math.floor(Math.random() * 6)]
  }));

  useEffect(() => {
    fetcher.submit({ type: 'view' }, { method: "post" });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude.toFixed(2), lng: pos.coords.longitude.toFixed(2) });
      });
    }
  }, []);

  const handleLogoClick = () => {
    if (!isOpen) { 
      fetcher.submit({ type: 'click' }, { method: "post" });
      setIsOpen(true);
    }
  };

  return (
    <main className="index-container">
      {/* 統計と位置情報の表示 */}
      <div className="stats-display">
        {location.lat !== 0 ? `LOC: ${location.lat}, ${location.lng} | ` : ""}
        %{labels.view}＊5: {stats?.view_count} | 2｜6{labels.click}: {stats?.click_count}
      </div>

      {/* メインのロゴエリア */}
      <div className={`center-logo ${isOpen ? 'active' : ''}`} onClick={handleLogoClick}>
        {!isOpen && <div className="enter-text">［ENTER］</div>}
        <img src="/assets/IN.png" alt="WACCA" className="logo-img" />
      </div>

      {/* 4方向のガイド（展開時のみ表示） */}
      {isOpen && (
        <nav className="nav-guides">
          <Link to="/articles" className="guide-item top">ARTICLES</Link>
          <Link to="/shop" className="guide-item left">SHOP</Link>
          <Link to="/concept" className="guide-item right">CONCEPT</Link>
          <Link to="/request" className="guide-item bottom">REQUEST</Link>
        </nav>
      )}

      {/* フッター */}
      <footer className="footer-info">
        <Link to="/policies" style={{ color: "inherit", textDecoration: "none" }}>LEGAL</Link>
      </footer>
    </main>
  );
}