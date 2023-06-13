
//variables
const code = "int i = 0; for (int i = 0; i < 3 ; i*3) { int i = 2;}  for (int i = 5; i > 3 ; i--) { penis; }"; // code
var forflag = false; 
var finlinearflag = false; 
var bracketflag = false; 
var finlinearcount = 0; 
var linearcount = 0; 
var logflag = false; 
var nlogflag = false;
var finlogflag = false;
var exponflag = false;
var runonce = false; 
var constflag = false;
// end variables, start methods

// resets variables
function resetflag()
{
     forflag = false; 
     finlinearflag = false; 
     bracketflag = false;
     finlinearcount = 0; 
     linearcount = 0; 
     logflag = false;
     nlogflag = false;
     finlogflag = false;
     exponflag = false;
     runonce = false;
     constflag = false;
}
function splicecode(code) 
{
    resetflag();
    const codearr = code.split(/[;()]/);
    for (let i = 0; i < codearr.length; i++)
    {
        runonce = true;
        if (codearr[i].includes(";") || codearr[i].includes("int") || code.includes("String"))
            constflag = true;
        if (linearcount > finlinearcount)
            finlinearcount = linearcount;
        if (forflag && logflag && bracketflag)
            nlogflag = true;
        if(forflag)
        {
            if (codearr[i].includes("{"))
            {
                if (bracketflag && linearcount > 0)
                    exponflag = true;
                bracketflag = true;
            }
            if (codearr[i].includes("}"))
            {
                bracketflag = false;
                linearcount--;
                if (linearcount == 0)
                    forflag = false;
            }
        }
        if (logflag)
        {
            if (codearr[i].includes("{"))
                bracketflag = true;
            if (codearr[i].includes("}"))
            {
                bracketflag = false;
                logflag = false;
            }
        }
        codearr[i] = codearr[i].trim();
        if(codearr[i].includes("for"))
        {
            forflag = true;
            const variable = codearr[i+1].charAt(codearr[i+1].length-1);
            var comparator = codearr[i+2].trim().replaceAll(" ", "").split("");
            if (comparator.length > 3)
            {
                var copy = [];
                copy[0] = comparator[0];
                copy[1] = comparator[1].concat(comparator[2]);
                copy[2] = comparator[3];
                comparator = [];
                comparator[0] = copy[0];
                comparator[1] = copy[1];
                comparator[2] = copy[2];
            }
            const adder = codearr[i+3];
            i = i + 3;
            forlooptest(variable, comparator, adder)
        }
    }

    // alert Big O Times
    if (exponflag)
        alert("Your Big O is O(n^" + finlinearcount + ")");
    else if (nlogflag)
        alert("Your Big O is O(n log n).")
    else if (finlinearflag)
        alert("Your Big O is O(n).")
    else if (finlogflag)
        alert("Your Big O is O(log n).")
    else if (constflag)
        alert("Your big O is O(1).")
    else if (runonce)
        alert("Please enter valid code/check spacing.");
    else
        alert("Error, please enter valid code.")
   
}

function forlooptest(variable, comparator, adder)
{
    var forloopcnt = 0;
    if (comparator[1] == ">")
    {
        if (adder.includes("+"))
        {
            for( var i = variable; i > comparator[2]; i++)
            {
                finlinearflag = true;
                forloopcnt++;
                if (forloopcnt > 2)
                    break;
            }
            if (forloopcnt == 0)
            {
                forflag = false;
                bracketflag = false;
            }
            else
                linearcount++;
        }
        else if (adder.includes("-"))
        {
            for( var i = variable; i > comparator[2]; i--)
            {
                finlinearflag = true;
                forloopcnt++;
                if (forloopcnt > 2)
                    break;
            }
            if (forloopcnt == 0)
            {
                forflag = false;
                bracketflag = false;
            }
            else
                linearcount++;
        }
        else
        {
            logflag = true;
            finlogflag = true;
        }
    }
    else if (comparator[1] == "<")
    {
        if (adder.includes("+"))
        {
            for( var i = variable; i < comparator[2]; i++)
            {
                finlinearflag = true;
                forloopcnt++;
                if (forloopcnt > 2)
                    break;
            }
            if (forloopcnt == 0)
            {
                forflag = false;
                bracketflag = false;
            }
            else
                linearcount++;
        }
        else if (adder.includes("-"))
        {
            for( var i = variable; i < comparator[2]; i--)
            {
                finlinearflag = true;
                forloopcnt++;
                if (forloopcnt > 2)
                    break;
            }
            if (forloopcnt == 0)
            {
                forflag = false;
                bracketflag = false;
            }
            else
                linearcount++;
        }
        else
        {
            logflag = true;   
            finlogflag = true;
        }
    }
    else if (comparator[1] == "==")
    {
        if (adder.includes("+"))
        {
            for( var i = variable; i == comparator[2]; i++)
            {
                finlinearflag = true;
                forloopcnt++;
                if (forloopcnt > 2)
                    break;
            }
            if (forloopcnt == 0)
            {
                forflag = false;
                bracketflag = false;
            }
            else
                linearcount++;
        }
        else if (adder.includes("-"))
        {
            for( var i = variable; i == comparator[2]; i--)
            {
                finlinearflag = true;
                forloopcnt++;
                if (forloopcnt > 2)
                    break;
            }
            if (forloopcnt == 0)
            {
                forflag = false;
                bracketflag = false;
            }
            else
                linearcount++;
        }
        else
        {
            logflag = true;
            finlogflag = true;
        }
        
    }
    else if (comparator[1] == "!=")
    {
        if (adder.includes("+"))
        {
            for( var i = variable; i != comparator[2]; i++)
            {
                finlinearflag = true;
                forloopcnt++;
                if (forloopcnt > 2)
                    break;
            }
            if (forloopcnt == 0)
            {
                forflag = false;
                bracketflag = false;
            }
            else
                linearcount++;
        }
        else if (adder.includes("-"))
        {
            for( var i = variable; i != comparator[2]; i--)
            {
                finlinearflag = true;
                forloopcnt++;
                if (forloopcnt > 2)
                    break;
            }
            if (forloopcnt == 0)
            {
                forflag = false;
                bracketflag = false;
            }
            else
                linearcount++;
        }
        else
        {
            logflag = true;
            finlogflag = true;
        }
    }
    else if (comparator[1] == ">=")
    {
        if (adder.includes("+"))
        {
            for( var i = variable; i >= comparator[2]; i++)
            {
                finlinearflag = true;
                forloopcnt++;
                if (forloopcnt > 2)
                    break;
            }
            if (forloopcnt == 0)
            {
                forflag = false;
                bracketflag = false;
            }
            else
                linearcount++;
        }
        else if (adder.includes("-"))
        {
            for( var i = variable; i >= comparator[2]; i--)
            {
                finlinearflag = true;
                forloopcnt++;
                if (forloopcnt > 2)
                    break;
            }
            if (forloopcnt == 0)
            {
                forflag = false;
                bracketflag = false;
            }
            else
                linearcount++;
        }
        else
        {
            logflag = true;
            finlogflag = true;
        }
    }
    else if (comparator[1] == "<=")
    {
        if (adder.includes("+"))
        {
            for( var i = variable; i <= comparator[2]; i++)
            {
                finlinearflag = true;
                forloopcnt++;
                if (forloopcnt > 2)
                    break;
            }
            if (forloopcnt == 0)
            {
                forflag = false;
                bracketflag = false;
            }
            else
                linearcount++;
        }
        else if (adder.includes("-"))
        {
            for( var i = variable; i <= comparator[2]; i--)
            {
                finlinearflag = true;
                forloopcnt++;
                if (forloopcnt > 2)
                    break;
            }
            if (forloopcnt == 0)
            {
                forflag = false;
                bracketflag = false;
            }
            else
                linearcount++;
        }
        else
        {
            logflag = true;
            finlogflag = true;
        }
    }
}
