import { columnEmptyText } from '@/config/constant';
import ProTable from '@ant-design/pro-table';
import React, { useEffect, useRef, useState } from 'react';
import CustomModal from '../CustomForm/components/Modal/CustomModal';

/**
 * 新增 & 编辑
 * @param props  values = { dataSource: [] },
 * @returns {*}
 * @constructor
 */
const UpdateForm = (props) => {
  const {
    onSubmit,
    onCancel,
    title = '导入失败信息',
    visible,
    columns,
    values = { dataSource: [] },
  } = props;

  if (!values.id) {
    Object.assign(values, { isIndex: 'no', deleteStats: 'no' });
  }
  const [formValues, setFormValues] = useState(values);
  const [fileList, setFleList] = useState([]);
  const braftRef = useRef();
  const formRef = useRef();
  useEffect(() => {}, []);

  return (
    <CustomModal
      width={1100}
      visible={visible}
      title={title}
      closable
      onCancel={() => {
        onCancel();
      }}
      contentStyle={{ padding: '5px 0' }}
      footer={[]}
    >
      <div>
        <ProTable
          rowKey="index"
          search={{ optionRender: () => null }}
          columnEmptyText={columnEmptyText}
          toolBarRender={false}
          columns={columns}
          dataSource={values.dataSource}
          pagination={false}
          scroll={{ x: 2500 }}
        />
      </div>
    </CustomModal>
  );
};
export default UpdateForm;
