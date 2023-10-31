import type { DataNode } from 'antd/es/tree';

//扁平化树数据
export const getTreeList = <T extends any[]>(treeData: T) => {
  let list: any[] = [];
  for (let i = 0; i < treeData?.length; i++) {
    const node = treeData[i];
    // const { key } = node;
    list.push({ ...node });
    if (node.children) {
      list = [...list, ...getTreeList(node?.children || [])];
    }
  }

  return list;
};

//模糊查询树
export const searchTreeNode = <T extends any[]>(
  name: string,
  tree: T,
  searchProp: string = 'name',
) => {
  if (!name.trim()) {
    return tree;
  }
  const newTree: any[] = [];
  tree.forEach((node) => {
    if (node?.[searchProp]?.includes(name)) {
      newTree.push({
        ...node,
      });
    } else {
      if (node?.children?.length > 0) {
        const newChildren = searchTreeNode(name, node?.children, searchProp);
        if (newChildren.length > 0) {
          newTree.push({
            ...node,
            children: newChildren,
          });
        }
      }
    }
  });
  return newTree;
};

export const formatClassTreeData = (treeData: Resource.IClassifyItem[]) => {
  const treeList = getTreeList(treeData);
  const list: { value: string; lable: string }[] = [];
  const map: Record<string, any> = {};
  treeList.forEach((item) => {
    list.push({
      lable: item.name,
      value: item.id,
    });
    map[item.id] = item.name;
  });

  return {
    list,
    map,
    tree: treeData,
  };
};
type TreeNode = {
  id: string;
  children: TreeNode[];
};
export const getParentKeysFn = (treeData: TreeNode[], keys: string[] = []) => {
  treeData.forEach((node) => {
    const { id, children = [] } = node;
    if (children?.length > 0) {
      keys.push(id);
      getParentKeysFn(children, keys);
    }
  });
  return keys;
};

//Tree格式化成面包屑
export const getBreadcrumbList = (
  treeData?: DataNode[],
  breadcrumbList: any[] = [],
) => {
  const value = breadcrumbList;
  treeData?.forEach((item) => {
    if (item.children && item.children?.length === 1) {
      value.push({ title: item.title, key: item.key });
      getBreadcrumbList(item.children, value);
    } else {
      value.push({ title: item.title, key: item.key });
    }
  });
  return value;
};
