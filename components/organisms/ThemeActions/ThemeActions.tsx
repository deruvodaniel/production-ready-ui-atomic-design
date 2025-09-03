'use client';

import React from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Card } from '@/components/molecules/Card/Card';
import { useTheme } from '@/theme/theme-provider';
import { Download, Upload, RefreshCw, Settings } from 'lucide-react';

export const ThemeActions: React.FC = () => {
  const { config } = useTheme();

  const handleExportTheme = () => {
    const themeData = JSON.stringify(config, null, 2);
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportTheme = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          try {
            const themeData = JSON.parse(e.target?.result as string);
            // updateTheme(themeData); // Would need to implement validation
            console.log('Theme imported:', themeData);
          } catch (error) {
            console.error('Invalid theme file:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleResetTheme = () => {
    if (confirm('Are you sure you want to reset to default theme?')) {
      localStorage.removeItem('ui-starter-theme');
      window.location.reload();
    }
  };

  return (
    <Card variant="elevated" padding="lg">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Settings className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <Typography variant="h6" weight="bold">
              Theme Actions
            </Typography>
            <Typography variant="caption" color="muted">
              Export, import, or reset your theme
            </Typography>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start" onClick={handleExportTheme}>
            <Download className="w-4 h-4 mr-2" />
            Export Theme
          </Button>

          <Button variant="outline" className="w-full justify-start" onClick={handleImportTheme}>
            <Upload className="w-4 h-4 mr-2" />
            Import Theme
          </Button>

          <Button variant="outline" className="w-full justify-start" onClick={handleResetTheme}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <Typography variant="caption" color="muted" className="text-xs">
            Theme changes are automatically saved to your browser
          </Typography>
        </div>
      </div>
    </Card>
  );
};
