import React, { useRef } from 'react';
import { renderTabs } from './renderTabs';
export const TabContext = React.createContext({});
export const TabContextProvider = ({ children, formValues }) => {
  const formRef = useRef();
  return (
    <TabContext.Provider value={{ renderTabs, formRef, formValues }}>
      <div>{children}</div>
    </TabContext.Provider>
  );
};
export const TabContextConsumer = TabContext.Consumer;
