(function (){
   let theArray = [];
   let initialized = false;
   let terminal = document.getElementById('terminal');
   let input = document.getElementById('console');
   document.getElementById('submit').addEventListener('click', submit);
   input.addEventListener('keypress', (e) => e.code ==='Enter' ? submit() : '');

   function submit(){
      if(!initialized){
         theArray = commandTokens.slice(0);
         return;
      }
       let commandTokens = input.value.split(' ').filter(e => e !=='');
       switch(commandTokens[0]){
           //todo
           default:
               terminal.value +='Error: invalid command';
       }

   }
})();
