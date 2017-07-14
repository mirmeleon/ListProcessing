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

       switch (commandTokens[0]) {
           case 'sort':
               theArray = theArray.sort();
               writeLine(theArray.join(" "));
               break;
           case 'count':
               let count = 0;
               let matchNext = theArray.indexOf(commandTokens[1]);
               while (matchNext !== -1){
                   count++;
                   matchNext = theArray.indexOf(commandTokens[1], matchNext +1);
               }
               writeLine(count);
               break;
           default:
               writeLine('Error: invalid command');
       }

       function writeLine(message) {
           terminal.value += "\n" + message;
       }

   }
})();
