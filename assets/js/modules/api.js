const URL = 'https://api.github.com/';
const USER_PER_PAGE = 20;

export class Api {
   async loadUsers(value, page) {
      try {
         return await fetch(`${URL}search/users?q=${value}&per_page=${USER_PER_PAGE}&page=${page}`);
      } catch (e) {
         console.error('Error: ', e);
      }
   }
}
