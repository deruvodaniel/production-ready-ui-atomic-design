'use client';

import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Card } from '@/components/molecules/Card/Card';
import { useTheme } from '@/theme/theme-provider';
import { Palette, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ColorPickerProps {
  className?: string;
}

// Generate color scale from base color (simplified version)
const generateColorScale = (baseColor: string) => {
  // This is a simplified color scale generation
  // In a real implementation, you'd use a more sophisticated algorithm
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const colors: Record<number, string> = {};

  // For demo purposes, we'll create a simple tint/shade system
  shades.forEach((shade, index) => {
    if (shade === 500) {
      colors[shade] = baseColor;
    } else if (shade < 500) {
      // Lighter shades (tints)
      const ratio = (500 - shade) / 500;
      colors[shade] = lightenColor(baseColor, ratio);
    } else {
      // Darker shades
      const ratio = (shade - 500) / 500;
      colors[shade] = darkenColor(baseColor, ratio);
    }
  });

  return colors;
};

// Helper functions for color manipulation
const lightenColor = (color: string, ratio: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const newR = Math.min(255, Math.round(r + (255 - r) * ratio));
  const newG = Math.min(255, Math.round(g + (255 - g) * ratio));
  const newB = Math.min(255, Math.round(b + (255 - b) * ratio));

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

const darkenColor = (color: string, ratio: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const newR = Math.max(0, Math.round(r * (1 - ratio)));
  const newG = Math.max(0, Math.round(g * (1 - ratio)));
  const newB = Math.max(0, Math.round(b * (1 - ratio)));

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

// Color swatch component
const ColorSwatch: React.FC<{
  color: string;
  shade: number;
  isActive?: boolean;
  onClick?: () => void;
}> = ({ color, shade, isActive, onClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-200',
        isActive
          ? 'ring-2 ring-blue-500 ring-offset-2'
          : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
      )}
      onClick={onClick}
    >
      <div className="h-16 w-full" style={{ backgroundColor: color }} />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 p-2 rounded-full transition-all duration-200 hover:bg-opacity-100"
          aria-label="Copy color code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-gray-700" />
          )}
        </button>
      </div>
      <div className="p-2 bg-white">
        <Typography variant="caption" className="text-xs font-mono text-gray-600">
          {shade}
        </Typography>
        <Typography variant="caption" className="text-xs font-mono text-gray-500 block">
          {color}
        </Typography>
      </div>
    </div>
  );
};

export const ColorPicker: React.FC<ColorPickerProps> = ({ className }) => {
  const { config, updateTheme } = useTheme();
  const [selectedColorType, setSelectedColorType] = useState<'primary' | 'secondary' | 'accent'>(
    'primary'
  );

  const colorTypes = [
    { key: 'primary', label: 'Primary', description: 'Main brand color' },
    { key: 'secondary', label: 'Secondary', description: 'Supporting color' },
    { key: 'accent', label: 'Accent', description: 'Highlight color' },
  ] as const;

  const handleColorChange = (colorType: 'primary' | 'secondary' | 'accent', color: string) => {
    updateTheme({
      colors: {
        ...config.colors,
        [colorType]: color,
      },
    });
  };

  const currentColor = config.colors[selectedColorType];
  const colorScale = generateColorScale(currentColor);

  return (
    <Card variant="elevated" padding="lg" className={className}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Palette className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <Typography variant="h6" weight="bold">
              Brand Colors
            </Typography>
            <Typography variant="caption" color="muted">
              Define your brand color palette
            </Typography>
          </div>
        </div>

        {/* Color Type Selector */}
        <div className="grid grid-cols-3 gap-2">
          {colorTypes.map(type => (
            <button
              key={type.key}
              onClick={() => setSelectedColorType(type.key)}
              className={cn(
                'p-3 rounded-lg border-2 transition-all duration-200 text-left',
                selectedColorType === type.key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: config.colors[type.key] }}
                />
                <Typography variant="body" weight="semibold" className="text-sm">
                  {type.label}
                </Typography>
              </div>
              <Typography variant="caption" color="muted" className="text-xs">
                {type.description}
              </Typography>
            </button>
          ))}
        </div>

        {/* Color Input */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={currentColor}
              onChange={e => handleColorChange(selectedColorType, e.target.value)}
              className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
            />
            <div className="flex-1">
              <input
                type="text"
                value={currentColor}
                onChange={e => {
                  const color = e.target.value;
                  if (color.match(/^#[0-9A-F]{6}$/i)) {
                    handleColorChange(selectedColorType, color);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="#3b82f6"
              />
            </div>
          </div>
        </div>

        {/* Color Scale Preview */}
        <div className="space-y-3">
          <Typography variant="body" weight="semibold">
            Generated Scale
          </Typography>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(colorScale).map(([shade, color]) => (
              <ColorSwatch
                key={shade}
                color={color}
                shade={parseInt(shade)}
                isActive={parseInt(shade) === 500}
                onClick={() => handleColorChange(selectedColorType, color)}
              />
            ))}
          </div>
        </div>

        {/* Quick Presets */}
        <div className="space-y-3">
          <Typography variant="body" weight="semibold">
            Quick Presets
          </Typography>
          <div className="grid grid-cols-6 gap-2">
            {[
              '#3b82f6', // Blue
              '#ef4444', // Red
              '#10b981', // Green
              '#f59e0b', // Amber
              '#8b5cf6', // Purple
              '#06b6d4', // Cyan
              '#f97316', // Orange
              '#84cc16', // Lime
              '#ec4899', // Pink
              '#6b7280', // Gray
            ].map(color => (
              <button
                key={color}
                onClick={() => handleColorChange(selectedColorType, color)}
                className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors duration-200"
                style={{ backgroundColor: color }}
                aria-label={`Set ${selectedColorType} color to ${color}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
