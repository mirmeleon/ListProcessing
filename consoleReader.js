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
         terminal.value += theArray.join(' ') + '\n';
         input.value = ' ';
         return;
      }

       switch(commandTokens[0]){
           case 'append':
               theArray.push(commandTokens[1]);
               terminal.value += theArray.join(' ') + '\n';
               input.value = ' ';
           break;

            case 'prepend':
                var newString = commandTokens[1];
                theArray.unshift(newString);
                writeLine(theArray.join(" "));
                break;
            case 'reverse':
                theArray.reverse();
                writeLine(theArray.join(" "));
                break;
            case 'insert':
                var index = Number(commandTokens[1]);
                if(index < 0 || index > theArray.length - 1){
                    writeLine('Error: invalid index ' + index);
                    break;
                }

                var newString = commandTokens[2];
                theArray.splice(index, 0, newString);
                writeLine(theArray.join(" "));
                break;
            default:
               writeLine('Error: invalid command');
       }

       function writeLine(message){
           terminal.value += "\n" + message;
       }

   }
})();
