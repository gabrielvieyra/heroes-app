// Interfaces
import { PowerstatsI } from '../types/types';

const updateSkill = (actualValue: string, nextValue: string): string =>
  (parseInt(actualValue) + parseInt(nextValue) || 0).toString();

export const getSumOfAllPowerstats = (allPowerstats: Array<PowerstatsI>): PowerstatsI => {
  const totalPowerstats: PowerstatsI = {
    intelligence: '0',
    strength: '0',
    speed: '0',
    durability: '0',
    power: '0',
    combat: '0',
  };

  allPowerstats.forEach(stats => {
    Object.keys(totalPowerstats).forEach(key => {
      totalPowerstats[key] = updateSkill(totalPowerstats[key], stats[key]);
    });
  });

  return totalPowerstats;
};
