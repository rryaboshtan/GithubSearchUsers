class View {
   constructor() {
      this.app = document.getElementById('app');

      this.title = this.createElement('h1', 'title');
      this.title.textContent = 'GitHub Search Users';

      this.searchLine = this.createElement('div', 'search-line');
      this.searchInput = this.createElement('input', 'search-input');
      this.searchCounter = this.createElement('span', 'counter');

      this.searchLine.append(this.searchInput);
      this.searchLine.append(this.searchCounter);

      this.usersWrapper = this.createElement('div', 'users-wrapper');
      this.usersList = this.createElement('ul', 'users');
      this.usersWrapper.append(this.usersList);

      this.main = this.createElement('div', 'main');
      this.main.append(this.usersWrapper);

      this.app.append(this.title);
      this.app.append(this.searchLine);
      this.app.append(this.main);
   }

   createElement(elementTag, elementClass) {
      const element = document.createElement(elementTag);

      if (elementClass) {
         element.classList.add(elementClass);
      }
      return element;
   }

   createUser(userData) {
       const userElement = this.createElement('li', 'user-prev');
       userElement.innerHTML = `<img class='user-prev-photo' src='${userData.avatar_url}' alt='${userData.login}'> 
                                <span class='user-prev-name'>${userData.login}</span>`
   }
}

class Search {
   constructor(view) {
      this.view = view;

      this.view.searchInput.addEventListener('keyup', this.searchUsers);
   }

   searchUsers = async () => {
      return await fetch(`https://api.github.com/search/users?q=${this.view.searchInput.value}`).then(resp => {
         if (resp.ok) {
            resp.json().then(resp => {
                  resp.items.forEach(user => this.view.createUser(user));
            //    console.log(resp);
            });
         } else {
         }
      });
   };
}
new Search(new View());

{
    "login": "filipw",
    "id": 1710369,
    "node_id": "MDQ6VXNlcjE3MTAzNjk=",
    "avatar_url": "https://avatars.githubusercontent.com/u/1710369?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/filipw",
    "html_url": "https://github.com/filipw",
    "followers_url": "https://api.github.com/users/filipw/followers",
    "following_url": "https://api.github.com/users/filipw/following{/other_user}",
    "gists_url": "https://api.github.com/users/filipw/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/filipw/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/filipw/subscriptions",
    "organizations_url": "https://api.github.com/users/filipw/orgs",
    "repos_url": "https://api.github.com/users/filipw/repos",
    "events_url": "https://api.github.com/users/filipw/events{/privacy}",
    "received_events_url": "https://api.github.com/users/filipw/received_events",
    "type": "User",
    "site_admin": false,
    "score": 1
}