export class View {
   constructor(api) {
      this.api = api;
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

      this.loadMoreBtn = this.createElement('button', 'btn');
      this.loadMoreBtn.textContent = 'Загрузить ещё';
      this.loadMoreBtn.style.display = 'none';
      this.usersWrapper.append(this.loadMoreBtn);

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
      userElement.addEventListener('click', () => this.showUserDetails(userData));
      userElement.innerHTML = `<img class='user-prev-photo' src='${userData.avatar_url}' alt='${userData.login}'> 
                               <span class='user-prev-name'>${userData.login}</span>`;
      this.usersList.append(userElement);
   }

   showUserDetails(userData) {
      const user = this.createElement('div', 'user');
      const data = this.api.loadUserDetails(userData.login).then(res => {
         const [following, followers, repos] = res;
         const followingList = this.createDataList(following, 'Following');

         user.innerHTML = `<img src='${userData.avatar_url}' alt='${userData.login}'>
                           <h2>${userData.login}</h2>
                           ${followingList}`;
      });

      this.main.append(user);
   }

   createDataList(list, title) {
      const block = this.createElement('div', 'user-block');
      const titleTag = this.createElement('h3', 'user-block-title');
      const listTag = this.createElement('li', 'user-list');
      titleTag.textContent = title;

      block.append(titleTag);

      return block.innerHTML;
   }

   showLoadMoreBtn(show) {
      this.loadMoreBtn.style.display = show ? 'block' : 'none';
   }

   setCounterMessage(message) {
      this.searchCounter.textContent = message;
   }
}
