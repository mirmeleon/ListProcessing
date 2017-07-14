(function (){
   let theArray = [];
   let initialized = false;

   let terminal = document.getElementById('terminal');
   let input = document.getElementById('console');
   document.getElementById('submit').addEventListener('click', submit);
   input.addEventListener('keypress', (e) => e.code ==='Enter' ? submit() : '');

   function submit(){
       let commandTokens = input.value.split(' ').filter(e => e !=='');
      console.log('Submited: ' + commandTokens);

       if(!initialized){
         theArray = commandTokens.slice(0);
         input.value = '';
         initialized = true;
         return;

      }

       switch(commandTokens[0]){
           case 'append':

           break;





           default:
               terminal.value += 'Error: invalid command';
       }

   }
})();
