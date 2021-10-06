export default function debounce(fn, searchClass, delay = 250) {
   let timer = null;
   let clearUsers = false;

   console.error('searchClass.view.searchInput.value = ', searchClass.view.searchInput.value);
   if (searchClass.view.searchInput.value) {
      clearUsers = true;
   }

   if (!delay) {
      return fn;
   }

   return function (...args) {
      let clearUsers = false;

      console.error('searchClass.view.searchInput.value = ', searchClass.view.searchInput.value);
      if (searchClass.view.searchInput.value) {
         clearUsers = true;
      }

      clearTimeout(timer);
      timer = setTimeout(() => {
         fn.apply(this, args);
            // console.error('sdffffffff');

         if (clearUsers) {
            console.error('sdffffffff');
            searchClass.clearUsers();
         }
         // console.log('Args = ', args);
      }, delay);
   };
}
