const URL = 'https://api.github.com/';

export const USER_PER_PAGE = 20;

export class Api {
   async loadUsers(value, page) {
      try {
         return await fetch(`${URL}search/users?q=${value}&per_page=${USER_PER_PAGE}&page=${page}`);
      } catch (e) {
         console.error('Error: ', e);
      }
   }

   loadUserDetails(login) {
      const urls = [
         `${URL}users/${login}/following`,
         `${URL}users/${login}/followers`,
         `${URL}users/${login}/repos`
      ];
      const requests = urls.map(url => fetch(url));
      return Promise.all(requests)
         .then(responses => Promise.all((responses).map(resp => resp.json())));
   }
}
