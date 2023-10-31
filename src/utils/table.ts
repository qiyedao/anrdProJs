import type { ActionType } from '@ant-design/pro-components';
//表格查询最后一条
export const requeryTable = <T extends Record<string, any>>(
  res: { list: T[]; total: number; pageNum: number },
  actionRef: React.Ref<ActionType | undefined>,
): boolean => {
  if (res?.total > 0 && res?.list?.length === 0 && res?.pageNum > 1) {
    actionRef?.current?.reloadAndRest();
    return false;
  }
  return true;
};
