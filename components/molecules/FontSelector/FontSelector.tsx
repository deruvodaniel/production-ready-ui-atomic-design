'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Card } from '@/components/molecules/Card/Card';
import { Dropdown } from '@/components/molecules/Dropdown/Dropdown';
import { Upload, Type, Download } from 'lucide-react';
import styles from './FontSelector.module.css';
import { useTheme } from '@/theme/theme-provider';

const defaultFonts = [
  { id: 'inter', label: 'Inter', value: 'Inter', category: 'sans' },
  { id: 'roboto', label: 'Roboto', value: 'Roboto', category: 'sans' },
  { id: 'open-sans', label: 'Open Sans', value: 'Open Sans', category: 'sans' },
  { id: 'lato', label: 'Lato', value: 'Lato', category: 'sans' },
  { id: 'montserrat', label: 'Montserrat', value: 'Montserrat', category: 'sans' },
  { id: 'poppins', label: 'Poppins', value: 'Poppins', category: 'sans' },
  { id: 'nunito', label: 'Nunito', value: 'Nunito', category: 'sans' },
  { id: 'source-sans', label: 'Source Sans Pro', value: 'Source Sans Pro', category: 'sans' },

  { id: 'playfair', label: 'Playfair Display', value: 'Playfair Display', category: 'serif' },
  { id: 'merriweather', label: 'Merriweather', value: 'Merriweather', category: 'serif' },
  { id: 'georgia', label: 'Georgia', value: 'Georgia', category: 'serif' },
  { id: 'times', label: 'Times New Roman', value: 'Times New Roman', category: 'serif' },
  { id: 'crimson', label: 'Crimson Text', value: 'Crimson Text', category: 'serif' },

  { id: 'fira-code', label: 'Fira Code', value: 'Fira Code', category: 'mono' },
  { id: 'source-code', label: 'Source Code Pro', value: 'Source Code Pro', category: 'mono' },
  { id: 'jetbrains', label: 'JetBrains Mono', value: 'JetBrains Mono', category: 'mono' },
  { id: 'monaco', label: 'Monaco', value: 'Monaco', category: 'mono' },
];

export interface FontSelectorProps {
  className?: string;
}

export const FontSelector: React.FC<FontSelectorProps> = ({ className }) => {
  const { config, updateTheme } = useTheme();
  const [customFonts, setCustomFonts] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFontChange = (category: 'sans' | 'serif' | 'mono' | 'display', fontName: string) => {
    // Load Google Font if it's not a system font
    if (!['Georgia', 'Times New Roman', 'Monaco'].includes(fontName)) {
      loadGoogleFont(fontName);
    }

    updateTheme({
      typography: {
        fontFamily: {
          ...config.typography.fontFamily,
          [category]: fontName,
        },
      },
    });
  };

  const loadGoogleFont = (fontName: string) => {
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap`;

    // Check if font is already loaded
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (existingLink) return;

    // Create and append font link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    document.head.appendChild(link);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('font/') || file.name.match(/\.(woff|woff2|ttf|otf)$/i)) {
        const reader = new FileReader();
        reader.onload = e => {
          const fontData = e.target?.result as string;
          const fontName = file.name.replace(/\.[^/.]+$/, '');

          // Create font face
          const fontFace = new FontFace(fontName, `url(${fontData})`);
          fontFace
            .load()
            .then(() => {
              document.fonts.add(fontFace);
              setCustomFonts(prev => [...prev, fontName]);
            })
            .catch(console.error);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const allFonts = [
    ...defaultFonts,
    ...customFonts.map(font => ({
      id: font.toLowerCase().replace(/\s+/g, '-'),
      label: font,
      value: font,
      category: 'custom' as const,
    })),
  ];

  const sansFonts = allFonts.filter(f => f.category === 'sans' || f.category === 'custom');
  const serifFonts = allFonts.filter(f => f.category === 'serif');
  const monoFonts = allFonts.filter(f => f.category === 'mono');

  return (
    <Card variant="elevated" padding="lg" className={className}>
      <div className={styles.header}>
        <Typography variant="h4" weight="semibold" className={styles.title}>
          <Type className="w-5 h-5" />
          Typography Settings
        </Typography>
      </div>

      <div className={styles.content}>
        {/* Font Upload */}
        <div className={styles.uploadSection}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".woff,.woff2,.ttf,.otf"
            multiple
            onChange={handleFileUpload}
            className={styles.hiddenInput}
          />
          <Button
            variant="outline"
            leftIcon={<Upload />}
            onClick={() => fileInputRef.current?.click()}
            className={styles.uploadButton}
          >
            Upload Custom Fonts
          </Button>
          <Typography variant="caption" color="muted">
            Supports .woff, .woff2, .ttf, .otf files
          </Typography>
        </div>

        {/* Font Selectors */}
        <div className={styles.fontSelectors}>
          <div className={styles.fontGroup}>
            <Typography variant="h6" weight="medium" className={styles.groupTitle}>
              Sans Serif (Body Text)
            </Typography>
            <Dropdown
              items={sansFonts}
              value={config.typography.fontFamily.sans}
              placeholder="Select sans serif font"
              onSelect={item => handleFontChange('sans', item.value)}
            />
            <div
              className={styles.preview}
              style={{ fontFamily: config.typography.fontFamily.sans }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          <div className={styles.fontGroup}>
            <Typography variant="h6" weight="medium" className={styles.groupTitle}>
              Display (Headings)
            </Typography>
            <Dropdown
              items={sansFonts}
              value={config.typography.fontFamily.display}
              placeholder="Select display font"
              onSelect={item => handleFontChange('display', item.value)}
            />
            <div
              className={styles.preview}
              style={{
                fontFamily: config.typography.fontFamily.display,
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              Heading Preview
            </div>
          </div>

          <div className={styles.fontGroup}>
            <Typography variant="h6" weight="medium" className={styles.groupTitle}>
              Serif
            </Typography>
            <Dropdown
              items={serifFonts}
              value={config.typography.fontFamily.serif}
              placeholder="Select serif font"
              onSelect={item => handleFontChange('serif', item.value)}
            />
            <div
              className={styles.preview}
              style={{ fontFamily: config.typography.fontFamily.serif }}
            >
              Elegant serif typography for emphasis
            </div>
          </div>

          <div className={styles.fontGroup}>
            <Typography variant="h6" weight="medium" className={styles.groupTitle}>
              Monospace (Code)
            </Typography>
            <Dropdown
              items={monoFonts}
              value={config.typography.fontFamily.mono}
              placeholder="Select monospace font"
              onSelect={item => handleFontChange('mono', item.value)}
            />
            <div
              className={styles.preview}
              style={{ fontFamily: config.typography.fontFamily.mono }}
            >
              const code = &quot;monospace font&quot;;
            </div>
          </div>
        </div>

        {/* Custom Fonts List */}
        {customFonts.length > 0 && (
          <div className={styles.customFonts}>
            <Typography variant="h6" weight="medium">
              Custom Fonts ({customFonts.length})
            </Typography>
            <div className={styles.fontList}>
              {customFonts.map(font => (
                <div key={font} className={styles.fontItem}>
                  <Typography variant="caption" style={{ fontFamily: font }}>
                    {font}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
