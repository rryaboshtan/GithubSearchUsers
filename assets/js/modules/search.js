import debounce from '../helpers/debounce.js';

const USER_PER_PAGE = 20;

export class Search {
   constructor(view) {
      this.view = view;

      this.view.searchInput.addEventListener('keyup', debounce(this.loadUsers, 500));
      this.view.loadMore.addEventListener('click', this.loadUsers);
      this.currentPage = 1;
   }

   loadUsers = async () => {
      const searchValue = this.view.searchInput.value;
      if (searchValue) {
         return await fetch(
            `https://api.github.com/search/users?q=${searchValue}&per_page=${USER_PER_PAGE}&page=${this.currentPage}`
         ).then(resp => {
            if (resp.ok) {
               this.currentPage++;
               resp.json().then(resp => {
                  resp.items.forEach(user => this.view.createUser(user));
               });
            } else {
            }
         });
      } else {
         this.clearUsers();
      }
   };

   clearUsers = () => {
      this.view.usersList.innerHTML = '';
   };
}
