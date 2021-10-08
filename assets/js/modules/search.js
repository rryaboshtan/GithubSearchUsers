import debounce from '../helpers/debounce.js';
const USER_PER_PAGE = 20;

//TO DO
// process backspace button and add typing after prev typing

export class Search {
   constructor(view, api) {
      this.view = view;
      this.api = api;

      this.view.searchInput.addEventListener('keyup', debounce(this.loadUsers, this, 300));
      this.view.loadMoreBtn.addEventListener('click', this.loadUsers);
      this.totalCount;
      this.currentPage = 1;
   }

   loadUsers = e => {
      console.log('event.code =', e.code);
      if (e.code === 'Backspace') {
         this.clearUsers();
      }
      const searchValue = this.view.searchInput.value;
      let users;

      if (searchValue) {
         try {
            // console.log('loadUsers', this.api.loadUsers(searchValue, this.currentPage));
            this.api.loadUsers(searchValue, this.currentPage).then(resp => {
               if (resp?.status === 200) {
                  this.currentPage++;
                  console.log('resp.status = ', resp.status);

                  resp.json().then(resp => {
                     // if (resp?.items?.length) {
                     console.log('resp = ', resp);
                     this.totalCount = resp.total_count;
                     console.log('currpage - 1 = ', this.currentPage - 1);

                     console.log('this.totalcount = ', this.totalCount);
                     console.log('currpage  * USER = ', USER_PER_PAGE * (this.currentPage - 1));

                     this.view.showLoadMoreBtn(this.showButton());
                     users = resp.items;
                     console.log('resp.items ', resp.items);

                     users.forEach(user => this.view.createUser(user));
                     // }
                  });
               } else {
                  console.log('resp = ', resp);
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
      console.log('this.showButton', this.showButton());
      console.log('this.totalcount = ', this.totalCount);
      this.view.showLoadMoreBtn(this.showButton());
   };

   showButton = () => {
      return this.totalCount > USER_PER_PAGE && USER_PER_PAGE * (this.currentPage - 1) < this.totalCount;
   };
}

// {
//     "login": "DFFZMXJ",
//     "id": 35987451,
//     "node_id": "MDQ6VXNlcjM1OTg3NDUx",
//     "avatar_url": "https://avatars.githubusercontent.com/u/35987451?v=4",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/DFFZMXJ",
//     "html_url": "https://github.com/DFFZMXJ",
//     "followers_url": "https://api.github.com/users/DFFZMXJ/followers",
//     "following_url": "https://api.github.com/users/DFFZMXJ/following{/other_user}",
//     "gists_url": "https://api.github.com/users/DFFZMXJ/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/DFFZMXJ/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/DFFZMXJ/subscriptions",
//     "organizations_url": "https://api.github.com/users/DFFZMXJ/orgs",
//     "repos_url": "https://api.github.com/users/DFFZMXJ/repos",
//     "events_url": "https://api.github.com/users/DFFZMXJ/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/DFFZMXJ/received_events",
//     "type": "User",
//     "site_admin": false,
//     "score": 1
// }
