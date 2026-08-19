import { json } from "@remix-run/node";
import { Link, useLoaderData, useFetcher } from '@remix-run/react';
import { useState } from 'react';
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

  const handleLogoClick = () => {
    if (!isOpen) { 
      fetcher.submit({ type: 'click' }, { method: "post" });
      setIsOpen(true);
    }
  };

  return (
    <main className="index-container">
      {/* メインのロゴエリア */}
      <div className={`center-logo ${isOpen ? 'active' : ''}`} onClick={handleLogoClick}>
        {!isOpen && <div className="enter-text">［ENTER］</div>}
        <img src="/assets/IN.png" alt="WACCA" className="logo-img" />
      </div>

      {/* 4方向のミニマムガイド（展開時のみ表示） */}
      {isOpen && (
        <nav className="nav-guides">
          <Link to="/articles" className="guide-item top">ARTICLES</Link>
          <Link to="/shop" className="guide-item left">SHOP</Link>
          <Link to="/concept" className="guide-item right">CONCEPT</Link>
          <Link to="/request" className="guide-item bottom">REQUEST</Link>
        </nav>
      )}

      {/* フッター情報 */}
      <footer className="footer-info">
        <div>STATS: {stats?.view_count}</div>
        <Link to="/policies" style={{ color: "inherit", textDecoration: "none" }}>LEGAL</Link>
      </footer>
    </main>
  );
}