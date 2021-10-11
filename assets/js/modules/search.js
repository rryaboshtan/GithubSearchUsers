import debounce from '../helpers/debounce.js';
import counterMessage from '../helpers/counterMessage.js';
import { USER_PER_PAGE } from './api.js';

export class Search {
   constructor(view, api) {
      this.view = view;
      this.api = api;

      this.totalCount = null;
      this.currentPage = 1;

      this.init();
   }

   init() {
      this.view.searchInput.addEventListener('keyup', debounce(this.loadUsers, this));
      this.view.loadMoreBtn.addEventListener('click', this.loadUsers);
   }

   loadUsers = e => {
      let message = '';
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
                     this.totalCount = resp.total_count;
                     message = counterMessage(this.totalCount);

                     if (!resp?.items?.length) {
                        message = counterMessage('');
                     }
                     this.view.setCounterMessage(message);
                     this.view.showLoadMoreBtn(this.showButton());
                     users = resp.items;

                     users.forEach(user => this.view.createUser(user));
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
         this.view.setCounterMessage(counterMessage(''));
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
