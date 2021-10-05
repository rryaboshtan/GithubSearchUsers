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
               console.log(resp);
            });
         } else {
             
         }
      });
   };
}
new Search(new View());
