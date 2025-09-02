'use client';

import React from 'react';
import styles from './ResponsiveTable.module.css';

export interface Column<T> { key: keyof T; header: string; render?: (value: any, row: T) => React.ReactNode }
export interface ResponsiveTableProps<T extends Record<string, any>> {
  columns: Column<T>[];
  data: T[];
  caption?: string;
}

export function ResponsiveTable<T extends Record<string, any>>({ columns, data, caption }: ResponsiveTableProps<T>) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table} role="table">
        {caption && <caption className={styles.caption}>{caption}</caption>}
        <thead className={styles.thead} role="rowgroup">
          <tr className={styles.tr} role="row">
            {columns.map((col) => (
              <th key={String(col.key)} scope="col" className={styles.th} role="columnheader">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody} role="rowgroup">
          {data.map((row, i) => (
            <tr key={i} className={styles.tr} role="row">
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={styles.td}
                  role="cell"
                  data-label={col.header}
                >
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
