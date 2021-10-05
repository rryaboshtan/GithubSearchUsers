export default function debounce(fn, delay = 250) {
   let timer = null;

   if (!delay) {
      return fn;
   }

   return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
         fn.apply(this, args);
         console.log('Args = ', args);
      }, delay);
   };
}