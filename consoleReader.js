(function () {
    let theArray = [];
    let initialized = false;

    let terminal = document.getElementById('terminal');
    let input = document.getElementById('console');
    let end = false;
    //array with used commands
    let commandArray=[];
    let commandIndexCount = 0;

    document.getElementById('submit').addEventListener('click', submit);
    input.addEventListener('keypress', (e) => e.code === 'Enter' && end !== true ? submit() : '');
    input.addEventListener('keydown', (e) => e.code === 'ArrowUp' && end !== true ? lastUsedCommand() : '');
    function submit() {
        let commandTokens = input.value.split(' ').filter(e => e !== '');
        //Move pre-command to the end of the commandArray
        for(let i=0; i < commandArray.length; i++){
            if(JSON.stringify(commandArray[i]) === JSON.stringify(commandTokens)){
                commandArray.splice(i, 1);
            }
        }
        //Adding command to the commandArray
        commandIndexCount = commandArray.length;
        commandArray[commandIndexCount] = commandTokens;
        commandIndexCount++;

        if (!initialized) {
            theArray = commandTokens.slice(0);
            input.value = '';
            initialized = true;
            writeLine(theArray.join(' '));
            clearInput();
            return;
        }
        switch (commandTokens[0]) {

            case 'append':
                theArray.push(commandTokens[1]);
                writeLine(theArray.join(" "));
                clearInput();
                break;
            case 'prepend':
                var newString = commandTokens[1];
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
                var index = Number(commandTokens[1]);
                if (commandTokens.length <= 2 || isNaN(Number(commandTokens[1]))) {
                    writeLine('Error: invalid command parameters');
                    break;
                }
                if (index < 0 || index > theArray.length - 1) {
                    writeLine('Error: invalid index ' + index);
                    break;
                }
                var newString = commandTokens[2];
                theArray.splice(index, 0, newString);
                writeLine(theArray.join(" "));
                clearInput();
                break;
            case 'sort':
                if (commandTokens.length > 1) {
                    writeLine('Error: invalid command parameters');
                } else {
                    theArray = theArray.sort();
                    writeLine(theArray.join(" "));
                    clearInput();
                }
                break;
            case 'count':
                let count = 0;
                let idx = theArray.indexOf(commandTokens[1]);
                while (idx !== -1) {
                    count++;
                    idx = theArray.indexOf(commandTokens[1], idx + 1);
                }
                writeLine(count);
                clearInput();
                break;
            case 'end':
                if (commandTokens.length > 1) {
                    writeLine('Error: invalid command parameters');
                } else {
                    document.getElementById('submit').removeEventListener('click', submit, false);
                    end = true;
                    writeLine("Finished");
                    clearInput();
                }
                break;
           case 'delete':
               var index = Number(commandTokens[1]);
               if(index < 0 || index > theArray.length - 1){
                   writeLine('Error: invalid index ' + index);
                   break;
               }
               if(isNaN(Number(commandTokens[1]))){
                   writeLine('Error: invalid command parameters');
                   break;
               }
               theArray.splice(index, 1)
               writeLine(theArray.join(' '));
               clearInput();
               break;
           case 'roll':
               if(commandTokens[1] == 'left') {
                   var rolledStr = theArray.shift()
                   theArray.push(rolledStr)
               }
               else if(commandTokens[1] == 'right') {
                   var lastStr = theArray.pop()
                   theArray.unshift(lastStr)
               }
                else{
                   writeLine('Error: invalid command parameters');
                   break;
               }
               writeLine(theArray.join(' '))
               clearInput()
               break;
           case 'sort':
               if(commandTokens.length > 1){
                   writeLine('Error: invalid command parameters');
               }else {
                   theArray = theArray.sort();
                   writeLine(theArray.join(" "));
                   clearInput();
               }
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
               if(commandTokens.length > 1){
                   writeLine('Error: invalid command parameters');
               }else {
                   document.getElementById('submit').removeEventListener('click', submit, false);
                   end = true;
                   writeLine("Finished");
                   clearInput();
               }
               break;
            default:
                writeLine('Error: invalid command');
                clearInput();
        }

        function writeLine(message) {
            terminal.value += message + "\n";

        }

        function clearInput() {
            input.value = '';
        }
    }

    function lastUsedCommand(){
        return (function(){
            input.value = commandArray[commandIndexCount-1].join(' ');
            if(commandIndexCount <= 1){
                commandIndexCount = commandArray.length;
            }else {
                commandIndexCount--;
            }
        })();
    }
})();