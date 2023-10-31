import { PageHeader } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Avatar } from 'antd';
import { AvatarDropdown } from '../RightContent/AvatarDropdown';
const RightHeader = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <PageHeader
      style={{
        backgroundColor: '#fff',
        boxShadow: ' 0 1px 4px rgba(0,21,41,8%)',
      }}
    >
      <div
        className="absolute flex flex-1 justify-end w-full"
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <div style={{ width: 100 }}>
          <AvatarDropdown>
            <div style={{ display: 'flex' }}>
              <Avatar
                size={'small'}
                shape="circle"
                src={initialState?.currentUser?.avatar}
              />
              {initialState?.currentUser?.name}
            </div>
          </AvatarDropdown>
        </div>
      </div>
    </PageHeader>
  );
};

export default RightHeader;
