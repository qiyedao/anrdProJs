export function getFileCount(filArr: any) {
  let value: number = 0;
  filArr.forEach((item: any) => {
    value += item.size;
  });
  return value;
}
