// 处理 Tree 数据 map
export const loopTreeMap = (nodeKey: string, childNodeName: string) => {
  const loopHandle = <
    T extends Record<string, any>,
    D extends Record<string, any>,
  >(
    treeData: D[],
    currentNodeKey: string | number,
    handleCallback: (node: D, parentNode?: D) => D | T,
    parentNode?: D,
  ) => {
    if (!treeData) return [];
    return treeData.map((node) => {
      if (node[childNodeName])
        // @ts-ignore
        node[childNodeName] = loopHandle(
          node[childNodeName],
          currentNodeKey,
          handleCallback,
          node,
        );

      if (
        (currentNodeKey && node[nodeKey] === currentNodeKey) ||
        !currentNodeKey
      )
        return handleCallback(node, parentNode);
      return node;
    });
  };
  return loopHandle;
};

// 处理 Tree 数据 reduce
export const loopTreeReduce = (childNodeName: string) => {
  const loopHandle = <D extends Record<string, any>, I extends any>(
    treeData: D[],
    handleCallback: (prev: I, node: D) => I,
    initData: I,
  ) => {
    if (!treeData) return initData;
    return treeData.reduce((prevData, node) => {
      // eslint-disable-next-line no-param-reassign
      if (node[childNodeName])
        prevData = loopHandle(node[childNodeName], handleCallback, prevData);
      return handleCallback(prevData, node);
    }, initData);
  };
  return loopHandle;
};

// 处理 Tree 数据 reduce
export const loopTreeReduceWithHandled = (childNodeName: string) => {
  const loopHandle = <D extends Record<string, any>, I extends any>(
    treeData: D[],
    handleCallback: (prev: I, node: D) => I,
    initData: I,
  ) => {
    if (!treeData) return initData;
    return treeData.reduce((prevData, node) => {
      // eslint-disable-next-line no-param-reassign
      prevData = handleCallback(prevData, node);
      // eslint-disable-next-line no-param-reassign
      if (node[childNodeName])
        prevData = loopHandle(node[childNodeName], handleCallback, prevData);
      return prevData;
    }, initData);
  };
  return loopHandle;
};
