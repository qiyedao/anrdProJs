import { Table, Button, Pagination } from 'antd';
import SearchForm from '@/components/Form/SearchForm';
import { useEffect, useRef, useState } from 'react';
import './index.less';
const ProTable = ({
  columns,
  pagination,
  paginationLeft,
  paginationRight,
  onChange,
  dataSource,
  search = true,
  request,
}) => {
  const [searchColumns, setSearchColumns] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [tableDataSource, setDataSource] = useState([]);
  const [formValues, setFormValues] = useState({});

  const [total, setTotal] = useState(0);
  const searchFormRef = useRef();
  useEffect(() => {
    handdleSearchColumns();
    handleRequest({ current: 1 });
  }, []);

  //获取数据
  const handleRequest = (originParams = {}, values, isReset = false) => {
    if (request) {
      let params = { ...originParams };
      if (!isReset) {
        params = { ...params, ...formValues, ...values };
      }
      console.log('params', params);
      request(params).then((data) => {
        if (data.success) {
          setDataSource(data.data);
          setTotal(data.total);
          setCurrent(params.current || 1);
          if (values) {
            setFormValues(values);
          }
        }
      });
    }
  };
  //处理搜索列表
  const handdleSearchColumns = () => {
    const columnsForSearch = columns
      .filter((item) => item.search !== false && item.type)
      .map((item) => {
        return {
          ...item,
          name: item.name || item.dataIndex,
          labelName: item.labelName || item.title,
        };
      });
    setSearchColumns(columnsForSearch);
  };
  //分页
  const handleChangeNumber = (page) => {
    handleRequest({ current: page, pageSize });
  };
  //收集表单
  const handleFormValues = () => {
    searchFormRef?.current.validateFields().then((values) => {
      handleRequest({ current: 1, pageSize }, values);
    });
  };

  return (
    <div>
      <SearchForm
        searchColumns={searchColumns}
        searchFormRef={searchFormRef}
        span={3}
        toolBarRender={[
          <Button
            style={{ marginRight: 16 }}
            htmlType="reset"
            key="reset"
            onClick={() => {
              handleRequest({ current: 1, pageSize }, {}, true);
            }}
          >
            重置
          </Button>,
          <Button onClick={handleFormValues} key="search" type="primary">
            查询
          </Button>,
        ]}
      />
      <Table columns={columns} dataSource={tableDataSource} pagination={false} />
      {tableDataSource.length ? (
        <div className={'custom-pagination-container'}>
          {paginationLeft ? paginationLeft : null}
          <div>
            <Pagination
              {...pagination}
              current={current}
              total={total}
              onChange={handleChangeNumber}
            />
          </div>
          {paginationRight ? paginationRight : null}
        </div>
      ) : null}
    </div>
  );
};

export default ProTable;
