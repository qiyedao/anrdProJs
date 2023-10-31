import { loopTreeMap } from '../tree';
import secondLevelAreas from './second-level-areas.json';
import thirdLevelAreas from './third-level-areas.json';

const getAreaOpthions = <T extends any[]>(areas: T) => {
  return loopTreeMap('code', 'children')(areas, '', ({ name, ...rest }) => {
    return {
      value: name,
      label: name,
      ...rest,
    };
  });
};

const secondLevelAreasOptions = getAreaOpthions(secondLevelAreas);

const thirdLevelAreaOptions = getAreaOpthions(thirdLevelAreas);

export { getAreaOpthions, secondLevelAreasOptions, thirdLevelAreaOptions };
