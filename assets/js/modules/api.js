const URL = 'https://api.github.com/';
const USER_PER_PAGE = 20;

export class Api {
   async loadUsers() {
      await fetch(`${URL}search/users?q=${searchValue}&per_page=${USER_PER_PAGE}&page=${this.currentPage}`);
   }
}
