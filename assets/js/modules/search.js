import debounce from '../helpers/debounce.js';

const USER_PER_PAGE = 20;

export class Search {
   constructor(view) {
      this.view = view;

      this.view.searchInput.addEventListener('keyup', debounce(this.loadUsers, 500));
      this.view.loadMoreBtn.addEventListener('click', this.loadUsers);
      this.currentPage = 1;
   }

   loadUsers = async () => {
      const searchValue = this.view.searchInput.value;
      let totalCount;
      let users;

      if (searchValue) {
         return await fetch(
            `https://api.github.com/search/users?q=${searchValue}&per_page=${USER_PER_PAGE}&page=${this.currentPage}`
         ).then(resp => {
            if (resp.ok) {
               this.currentPage++;
               resp.json().then(resp => {
                   totalCount = resp.total_count;
                   console.log('currpage - 1 = ', this.currentPage - 1);

                   console.log('totalcount = ', totalCount);
                   console.log('currpage  * USER = ', USER_PER_PAGE * (this.currentPage - 1));
                   
                  this.view.showLoadMoreBtn(this.showButton(totalCount) ? true : false);
                  users = resp.items;
                  users.forEach(user => this.view.createUser(user));
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
      this.currentPage = 1;
   };

   showButton = (totalCount) => {
       
      return totalCount > USER_PER_PAGE && USER_PER_PAGE * (this.currentPage - 1) < totalCount;
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