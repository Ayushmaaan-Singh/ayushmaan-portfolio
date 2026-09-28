import React from 'react';
import siteConfig from '../data/siteConfig';

const Footer = () => {
  return (
    <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          © {siteConfig.footerYear} {siteConfig.name}. All rights reserved.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Built with React & <span style={{ color: '#ef4444' }}>❤️</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
