'use client';

import { useEffect } from 'react';

export default function StorybookRedirect() {
  useEffect(() => {
    // Redirect to the static Storybook build served from /public
    window.location.replace('/storybook/index.html');
  }, []);

  return (
    <div className="p-6 text-center">
      <p>Loading Storybook…</p>
      <noscript>
        <a href="/storybook/index.html">Open Storybook</a>
      </noscript>
    </div>
  );
}
