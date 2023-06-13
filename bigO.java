

import java.util.*;
import java.io.*;
import javax.script.*;
public class bigO
{


    boolean flag = false; static boolean forflag = false;
    static boolean linearflag = false;
    static boolean addflag = false;
    static boolean subflag = false;
    static boolean forloopflag = true; //nested for loop
    static boolean flinear = false; // final linear
    static boolean flog = false;
    static boolean logflag = false;
    static boolean nlognflag = false;
    static int cnt = 0;
    static int highestcnt = 0;
   
    
    public static void main(String[] args) throws FileNotFoundException, ScriptException, NoSuchMethodException
    {
       
        Scanner scn =  new Scanner(System.in);
        System.out.println("Please type in the block of code you would like to analyze");
        String file = scn.nextLine();
        Scanner scan = new Scanner(new File(file));
        while(scan.hasNextLine())
        {
            String line = scan.nextLine();
            forflag = check(line);
           if (forflag)
           {
          
            checkFor(line);
            if (linearflag)
            {
                if (logflag)
                    nlognflag = true;
                linearflag = false;
                flinear = true;
                if (forloopflag)
                    cnt++;
            }
            else if (logflag)
                flog = true;
            
           
           }
        }
        if (nlognflag)
            System.out.println("Your runtime is O(n log n)");
        else if (flinear)
            System.out.println("Your run time is O(n^"+ highestcnt  + ")");
        else if (flog)
            System.out.println("Your runtime is O(log n)");
        else
            System.out.println("Your run time is O(1)");
    }
    private static boolean check(String line)
    {
       String[] lineset = line.split(" ");
       for (String word: lineset)
       {
        System.out.println(word);
        if (word.equals("}") && forloopflag)
        {
            logflag = false;
            forloopflag = false;
            System.out.println("cnt = 1");
            highestcnt = cnt;
            cnt = 0;
        }
        if(word.length()>= 3)
        {
            if (word.substring(0,3).equals("for"))
                return true;
        }
       }
        return false;

    }
    private static void checkFor(String line)
    {
       String newline = line.replace("(", ";").replace(")" , ";");
       String[] lineset = newline.split(";");
        for (String s: lineset)
        {
            s.replace(" ", "");
           s = s.trim();
            System.out.println(s);
            if (s.equals("{"))
                forloopflag = true;
            
        }
       String variable = lineset[1];
       variable = variable.replace(" ", "");
       Character variablechar = variable.charAt(variable.length()-1);
       String condition = lineset[2];
       condition = condition.replace(" ", "");
       Character condition1 = condition.charAt(condition.length()-1); // value
        Character conditiontemp = condition.charAt(condition.length()-2); // boolean symbol
        String condition2 =  Character.toString(conditiontemp);
       if(condition.length() > 3)
        { 
            StringBuilder str = new StringBuilder("");
            str.append(condition.charAt(condition.length()-3));
            str.append(condition.charAt(condition.length()-2));
            condition2 = str.toString();
        }
      
       String increment = lineset[3];
       increment = increment.replace(" ", "");
       String[] incarr = increment.split("");
       if (incarr[1].equals("+"))
       {
        addflag = true;
        subflag = false;
            if (incarr[2].equals("+"))
                linearflag = true;
            else if (incarr[2].equals("1"))
                linearflag = true;
            else
                linearflag = false;
       }
        else if (incarr[1].equals("-"))
       {
        linearflag = true;
        subflag = true;
        addflag = false;
        if (incarr[2].equals("-"))
            linearflag = true;
        else if (incarr[2].equals("1"))
            linearflag = true;
        else
            linearflag = false;
       }
       else
       {
        logflag = true;
        linearflag = false;
        return;
       }
       if (linearflag == false)
       {
        logflag = true;
        return;
       }
      linearflag = forLoopRunner(variablechar, condition1, condition2);
      

    }
    private static boolean forLoopRunner(Character variable, Character value, String boolsymbol)
    {
        int iterator = (int) variable;
        int condition = (int) value;
        boolean called = false;
        switch(boolsymbol)
        {
            case "<":
                if(addflag)
                {
                    for(int i = iterator; i < condition; i++)
                    {
                        if (called) // prevents inf loop
                            return true; // its linear
                        called = true;
                    }
                }
                else if (subflag)
                {
                    for (int i = iterator; i < condition; i--)
                    {
                        if (called) //prevents inf loop
                            return true; // its linear
                        called = true;
                    }
                }
                break;
            case ">":
                if(addflag)
                    {
                        for(int i = iterator; i > condition; i++)
                        {
                            if (called) // prevents inf loop
                                return true; // its linear
                            called = true;
                        }
                    }
                    else if (subflag)
                    {
                        for (int i = iterator; i > condition; i--)
                        {
                            if (called) //prevents inf loop
                                return true; // its linear
                            called = true;
                        }
                    }
                break;
            case "<=":
                if(addflag)
                    {
                        for(int i = iterator; i <= condition; i++)
                        {
                            if (called) // prevents inf loop
                                return true; // its linear
                            called = true;
                        }
                    }
                    else if (subflag)
                    {
                        for (int i = iterator; i <= condition; i--)
                        {
                            if (called) //prevents inf loop
                                return true; // its linear
                            called = true;
                        }
                    }
                break;
            case ">=":
                if(addflag)
                    {
                        for(int i = iterator; i >= condition; i++)
                        {
                            if (called) // prevents inf loop
                                return true; // its linear
                            called = true;
                        }
                    }
                    else if (subflag)
                    {
                        for (int i = iterator; i >= condition; i--)
                        {
                            if (called) //prevents inf loop
                                return true; // its linear
                            called = true;
                        }
                    }
                break;
            case "==":
                if(addflag)
                    {
                        for(int i = iterator; i == condition; i++)
                        {
                            if (called) // prevents inf loop
                                return true; // its linear
                            called = true;
                        }
                    }
                    else if (subflag)
                    {
                        for (int i = iterator; i == condition; i--)
                        {
                            if (called) //prevents inf loop
                                return true; // its linear
                            called = true;
                        }
                    }   
                break;
            case "!=":
                if(addflag)
                    {
                        for(int i = iterator; i != condition; i++)
                        {
                            if (called) // prevents inf loop
                                return true; // its linear
                            called = true;
                        }
                    }
                    else if (subflag)
                    {
                        for (int i = iterator; i != condition; i--)
                        {
                            if (called) //prevents inf loop
                                return true; // its linear
                            called = true;
                        }
                    }
                break;
        }

        return false;
        
    }
}

