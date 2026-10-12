/**
 * IndexNow Notification Script
 * Pings Bing / IndexNow API with all public URLs from the sitemap.
 * Usage: node scripts/indexnow.mjs
 */

import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bernardfiagbenu.vercel.app';
const KEY = process.env.INDEXNOW_KEY || 'indexnow-key-bernardfiagbenu';

const urlList = [
  `${SITE_URL}/`,
  `${SITE_URL}/research`,
  `${SITE_URL}/research/ai-computing`,
  `${SITE_URL}/research/telecommunications`,
  `${SITE_URL}/research/edtech`,
  `${SITE_URL}/research/supply-chain`,
  `${SITE_URL}/research/energy`,
];

async function submitToIndexNow() {
  const host = new URL(SITE_URL).host;
  const payload = {
    host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  };

  console.log(`Submitting ${urlList.length} URLs to IndexNow for host ${host}...`);

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    console.log(`IndexNow response status: ${response.status} ${response.statusText}`);
    if (response.ok || response.status === 202) {
      console.log('URLs successfully submitted to IndexNow.');
    } else {
      const text = await response.text();
      console.warn('IndexNow returned non-200 response:', text);
    }
  } catch (err) {
    console.error('Failed to notify IndexNow:', err.message);
  }
}

submitToIndexNow();
