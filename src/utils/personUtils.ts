import { Person, RelationType } from '@/types/person';

// Вычисление позиции для нового узла в зависимости от типа связи
export const calculateNodePosition = (
  sourcePerson: Person, 
  relationType: RelationType,
  people: Person[]
): { x: number, y: number } => {
  const NODE_WIDTH = 130;
  const NODE_HEIGHT = 160;
  const VERTICAL_GAP = 150;
  
  switch (relationType) {
    case 'parent':
      return { 
        x: sourcePerson.x || 0, 
        y: (sourcePerson.y || 0) - NODE_HEIGHT - VERTICAL_GAP
      };
    case 'child':
      // Если есть партнер, ребенок должен быть посередине между родителями
      if (sourcePerson.partnerId) {
        const partner = people.find(p => p.id === sourcePerson.partnerId);
        if (partner && partner.x !== undefined) {
          const isSourceLeft = (sourcePerson.x || 0) < (partner.x || 0);
          
          // Проверяем, сколько уже есть детей
          const existingChildren = people.filter(p => 
            p.parentIds?.includes(sourcePerson.id) || 
            (partner && p.parentIds?.includes(partner.id))
          );
          
          const childIndex = existingChildren.length;
          const middleX = ((sourcePerson.x || 0) + (partner.x || 0)) / 2;
          
          // Распределяем детей горизонтально
          let offsetX = 0;
          if (childIndex === 0) {
            offsetX = 0; // По центру для первого ребенка
          } else if (childIndex === 1) {
            offsetX = -NODE_WIDTH * 1.2; // Левее от центра для второго
          } else if (childIndex >= 2) {
            offsetX = NODE_WIDTH * 1.2; // Правее от центра для третьего
          }
          
          return { 
            x: middleX - NODE_WIDTH/2 + offsetX, 
            y: (sourcePerson.y || 0) + NODE_HEIGHT + VERTICAL_GAP * 1.5
          };
        }
      }
      
      return { 
        x: sourcePerson.x || 0, 
        y: (sourcePerson.y || 0) + NODE_HEIGHT + VERTICAL_GAP
      };
    case 'partner':
      return { 
        x: (sourcePerson.x || 0) + NODE_WIDTH * 1.4, 
        y: sourcePerson.y || 0
      };
  }
};