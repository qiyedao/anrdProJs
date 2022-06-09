import React from 'react';
import styles from './index.less';
export default ({ title, style, barStyle }) => {
  return (
    <div style={style} className={styles.barContainer}>
      <div style={barStyle} className={styles.line} />
      <div className={styles.title}>{title}</div>
    </div>
  );
};
