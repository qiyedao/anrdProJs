export function hightElTxt(content: string, highTags: any[]) {
  const retStr: string[] = content.split('');

  highTags.forEach((item: any) => {
    const { start, instanceId, color = 'red' } = item;
    // const color = map[type] || 'red';
    retStr[
      start
    ] = `<span id=instance_${instanceId} style='background: ${color} !important;color:#fff; padding:2px 3px; cursor: pointer;'>${
      retStr[start] || ''
    }`;
  });
  highTags.forEach((item: any) => {
    const { end } = item;
    retStr[end] = `</span>${retStr[end] || ''}`;
  });

  return retStr.join('');
}

export function hightElTxtHtml(content: string, highTags: any[], map: any) {
  const retStr: any[] = content.split('');
  highTags.forEach((item: any) => {
    const { start, end, type, instanceName } = item;
    const color = map[type] || 'red';
    retStr.splice(start, end, <span style={{ color }}>{instanceName}</span>);
  });

  return retStr;
}
