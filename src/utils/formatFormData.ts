// FormData 格式化
function formatFormData(data: Record<string, any>): FormData {
  const formData = new FormData();
  Object.keys(data).forEach((item) => {
    if (data[item] !== null && data[item] !== undefined)
      formData.append(item, data[item]);
  });
  return formData;
}

export default formatFormData;
