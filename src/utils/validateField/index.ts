import { stringPropertyValidate } from '@/utils/stringFns';
import { message } from 'antd';

export const validateField = (
  e: any,
  field: { dataType: string },
  isViauslAnalysis = false,
) => {
  if (field.dataType === 'int' && e.target.value.toString().includes('.')) {
    message.error('整数类型的检索值不可以输入小数');
    return false;
  }
  const isComp = e.target.value === '+' || e.target.value === '-';
  if (isComp) return true;
  if (
    ['int', 'double'].includes(field.dataType) &&
    isNaN(Number(e.target.value))
  ) {
    message.error('请输入有效数字类型');
    return false;
  }
  console.log(
    'containSpecial(e.target.value)',
    field.dataType,
    e.target.value,
    stringPropertyValidate(e.target.value),
  );
  if (
    field.dataType === 'String' &&
    stringPropertyValidate(e.target.value) &&
    isViauslAnalysis
  ) {
    message.destroy();
    message.warning(
      '图查询条件不能包含特殊字符,只能包含中文、英文、数字、下划线、空格',
    );
    return false;
  }
  return true;
};
