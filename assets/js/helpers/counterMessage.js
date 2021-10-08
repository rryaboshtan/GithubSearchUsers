export default function counterMessage(counter) {
   const lastDigitGroups = [[2, 3, 4], [5, 6, 7, 8, 9, 0], [1]];
   const lastChars = ['я', 'ей', 'ь'];
   let index = null;
   for (let i = 0; i < lastDigitGroups.length; i++) {
      if (lastDigitGroups[i].includes(Number(counter % 10))) {
         index = i;
         continue;
      }
   }
   return counter ? `Найдено ${counter} пользовател${lastChars[index]}` : 'ничего не найдено';
}
