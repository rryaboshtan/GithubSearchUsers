export class View {
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

      this.loadMore = this.createElement('button', 'btn');
      this.loadMore.textContent = 'Загрузить ещё';
      this.usersWrapper.append(this.loadMore);

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
                               <span class='user-prev-name'>${userData.login}</span>`;
      this.usersList.append(userElement);
   }
}
