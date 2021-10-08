import debounce from '../helpers/debounce.js';
const USER_PER_PAGE = 20;

export class Search {
   constructor(view, api, log) {
      this.view = view;
      this.api = api;
      this.log = log;

      this.view.searchInput.addEventListener('keyup', debounce(this.loadUsers, this));
      this.view.loadMoreBtn.addEventListener('click', this.loadUsers);
      this.totalCount = null;
      this.currentPage = 1;
   }

   loadUsers = e => {
      this.view.setCounterMessage('');
      if (e.code === 'Backspace') {
         this.clearUsers();
      }
      const searchValue = this.view.searchInput.value;
      let users;

      if (searchValue) {
         try {
            this.api.loadUsers(searchValue, this.currentPage).then(resp => {
               if (resp?.status === 200) {
                  this.currentPage++;

                  resp.json().then(resp => {
                     // if (resp?.items?.length) {
                     this.totalCount = resp.total_count;
                     this.view.setCounterMessage(this.totalCount);
                     this.view.showLoadMoreBtn(this.showButton());
                     users = resp.items;

                     users.forEach(user => this.view.createUser(user));
                     // }
                  });
               } else {
                  throw new Error('github users responce is failed');
               }
            });
         } catch (e) {
            throw new Error(e);
         }
      } else {
         this.clearUsers();
      }
   };

   clearUsers = () => {
      this.view.usersList.innerHTML = '';
      this.currentPage = 1;
      this.totalCount = 0;
      this.view.showLoadMoreBtn(this.showButton());
   };

   showButton = () => {
      return this.totalCount > USER_PER_PAGE && USER_PER_PAGE * (this.currentPage - 1) < this.totalCount;
   };
}