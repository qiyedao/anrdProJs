import classNames from 'classnames';
import React from 'react';
import styles from './index.less';

export default ({ icon, text, style, imgStyle, textStyle, type, onClick, disabled }) => {
  return (
    <span
      onClick={() => {
        console.log('disabled', disabled);
        if (!disabled) {
          onClick();
        }
      }}
      className={classNames(disabled ? styles['customDisabledBtnStyle'] : styles['customBtnStyle'])}
    >
      {icon && <img style={imgStyle ? imgStyle : {}} src={icon ? icon : ''} />}
      <a
        style={textStyle ? textStyle : {}}
        // style={disabled ? { color: '#929496' } : textStyle ? textStyle : {}}
      >
        {text ? text : '编辑'}
      </a>
    </span>
  );
};
