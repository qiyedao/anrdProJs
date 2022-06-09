import { Tabs } from 'antd';
import React from 'react';
export const renderTabs = (
  tabList = [],
  activeKey,
  onChange,
  tabBarExtraContent,
  tabBarStyle = {},
) => {
  return (
    <Tabs
      tabBarStyle={tabBarStyle}
      onChange={onChange}
      activeKey={activeKey}
      tabBarExtraContent={tabBarExtraContent}
    >
      {tabList.map((item, index) => (
        <Tabs.TabPane tab={item.tab} key={item.key}>
          {activeKey == item.key && item.children}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};
