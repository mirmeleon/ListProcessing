(function (){
   let theArray = [];
   let initialized = false;

   let terminal = document.getElementById('terminal');
   let input = document.getElementById('console');
   let end =false;
   document.getElementById('submit').addEventListener('click', submit);
   input.addEventListener('keypress', (e) => e.code ==='Enter' && end !== true ? submit() : '');

   function submit(){
       let commandTokens = input.value.split(' ').filter(e => e !=='');

       if(!initialized){
         theArray = commandTokens.slice(0);
         input.value = '';
         initialized = true;
         writeLine(theArray.join(' '));
         clearInput();
         return;
      }
       switch(commandTokens[0]){

           case 'append':
               theArray.push(commandTokens[1]);
               writeLine(theArray.join(" "));
               clearInput();
           break;
           case 'prepend':
                let newString = commandTokens[1];
                theArray.unshift(newString);
                writeLine(theArray.join(" "));
                clearInput();
                break;
            case 'reverse':
                theArray.reverse();
                writeLine(theArray.join(" "));
                clearInput();
                break;
            case 'insert':
                let index = Number(commandTokens[1]);
                if(index < 0 || index > theArray.length - 1){
                    writeLine('Error: invalid index ' + index);
                    break;
                }

                let newString = commandTokens[2];
                theArray.splice(index, 0, newString);
                writeLine(theArray.join(" "));
                clearInput();
                break;
           case 'sort':
               theArray = theArray.sort();
               writeLine(theArray.join(" "));
               clearInput();
               break;
           case 'count':
               let count = 0;
               let idx = theArray.indexOf(commandTokens[1]);
               while (idx !== -1){
                   count++;
                   idx = theArray.indexOf(commandTokens[1], idx + 1);
               }
               writeLine(count);
               clearInput();
               break;
           case 'end':
               document.getElementById('submit').removeEventListener('click', submit, false);
               end = true;
               writeLine("Finished");
               clearInput();
               break;
            default:
               writeLine('Error: invalid command');
               clearInput();
       }

       function writeLine(message){
           terminal.value += message + "\n";

       }

       function clearInput(){
           input.value = '';
       }

   }
})();
