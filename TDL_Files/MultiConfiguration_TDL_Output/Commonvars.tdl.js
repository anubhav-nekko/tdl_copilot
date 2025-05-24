// Auto-generated from Commonvars.txt
const tdl = `
     [system: formula]
     rep1 : ##logi1  ; Formula that returns the value of logi1 variable
     rep2 : ##logi2  ; Formula that returns the value of logi2 variable
     rep3 : ##logi3  ; Formula that returns the value of logi3 variable

/* 
System Formulas Section
Purpose: Defines formulas that return the values of logical variables
Usage: These formulas can be used in conditional expressions throughout the TDL
*/

[BUTTON : CWlOGI1]
TITLE : IF ##LOGI1 THEN "UnSet 1" else "Set 1"  ; Dynamic button title based on logi1 state
action : set : logi1 : not ##logi1  ; Toggles the logi1 variable when clicked

/* 
Button Definition: CWlOGI1
Purpose: Toggle button that switches the logi1 variable between Yes and No
Features:
  - Dynamic title that changes based on current state
  - Single-click action to toggle the variable
*/

[variable : str1]
     type : string  ; Defines variable type as string
  default : ""  ; Sets default value to empty string
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: str1
Purpose: General-purpose string variable for temporary storage
Type: String
Persistence: Session only (not saved between sessions)
*/

[variable : str2]
     type : string  ; Defines variable type as string
  default : ""  ; Sets default value to empty string
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: str2
Purpose: General-purpose string variable for temporary storage
Type: String
Persistence: Session only (not saved between sessions)
*/

[variable : str3]
     type : string  ; Defines variable type as string
  default : ""  ; Sets default value to empty string
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: str3
Purpose: General-purpose string variable for temporary storage
Type: String
Persistence: Session only (not saved between sessions)
*/

[variable : str4]
     type : string  ; Defines variable type as string
  default : ""  ; Sets default value to empty string
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: str4
Purpose: General-purpose string variable for temporary storage
Type: String
Persistence: Session only (not saved between sessions)
*/

[variable : str5]
     type : string  ; Defines variable type as string
  default : ""  ; Sets default value to empty string
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: str5
Purpose: General-purpose string variable for temporary storage
Type: String
Persistence: Session only (not saved between sessions)
*/

[variable : str6]
     type : string  ; Defines variable type as string
  default : ""  ; Sets default value to empty string
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: str6
Purpose: General-purpose string variable for temporary storage
Type: String
Persistence: Session only (not saved between sessions)
*/

[variable : str7]
     type : string  ; Defines variable type as string
  default : ""  ; Sets default value to empty string
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: str7
Purpose: General-purpose string variable for temporary storage
Type: String
Persistence: Session only (not saved between sessions)
*/

[variable : str8]
     type : string  ; Defines variable type as string
  default : ""  ; Sets default value to empty string
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: str8
Purpose: General-purpose string variable for temporary storage
Type: String
Persistence: Session only (not saved between sessions)
*/


[variable : str9]
     type : string  ; Defines variable type as string
  default : ""  ; Sets default value to empty string
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: str9
Purpose: General-purpose string variable for temporary storage
Type: String
Persistence: Session only (not saved between sessions)
*/


[variable : str10]
     type : string  ; Defines variable type as string
  default : ""  ; Sets default value to empty string
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: str10
Purpose: General-purpose string variable for temporary storage
Type: String
Persistence: Session only (not saved between sessions)
*/


[variable : str11]
     type : string  ; Defines variable type as string
  default : ""  ; Sets default value to empty string
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: str11
Purpose: General-purpose string variable for temporary storage
Type: String
Persistence: Session only (not saved between sessions)
*/


[variable : str12]
     type : string  ; Defines variable type as string
  default : ""  ; Sets default value to empty string
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: str12
Purpose: General-purpose string variable for temporary storage
Type: String
Persistence: Session only (not saved between sessions)
*/

[variable : str13]
     type : string  ; Defines variable type as string
  default : ""  ; Sets default value to empty string
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: str13
Purpose: General-purpose string variable for temporary storage
Type: String
Persistence: Session only (not saved between sessions)
*/



[variable : logi]
use : logi1  ; Alias that references the logi1 variable

/* 
Variable Definition: logi
Purpose: Alias for the logi1 variable
Type: Logical (inherits from logi1)
Usage: Provides a shorter name to access logi1
*/

[variable : logi1]
     type : logical  ; Defines variable type as logical (Yes/No)
  default : no  ; Sets default value to No
persistent: no  ; Variable will not persist between sessions
   
/* 
Variable Definition: logi1
Purpose: General-purpose logical variable for flags and conditions
Type: Logical (Yes/No)
Persistence: Session only (not saved between sessions)
*/

[variable : logi2]
     type : logical  ; Defines variable type as logical (Yes/No)
  default : no  ; Sets default value to No
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: logi2
Purpose: General-purpose logical variable for flags and conditions
Type: Logical (Yes/No)
Persistence: Session only (not saved between sessions)
*/

[variable : logi3]
     type : logical  ; Defines variable type as logical (Yes/No)
  default : no  ; Sets default value to No
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: logi3
Purpose: General-purpose logical variable for flags and conditions
Type: Logical (Yes/No)
Persistence: Session only (not saved between sessions)
*/

[variable : logi4]
type : logical  ; Defines variable type as logical (Yes/No)
  default : no  ; Sets default value to No
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: logi4
Purpose: General-purpose logical variable for flags and conditions
Type: Logical (Yes/No)
Persistence: Session only (not saved between sessions)
*/

[variable : logi5]
type : logical  ; Defines variable type as logical (Yes/No)
  default : no  ; Sets default value to No
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: logi5
Purpose: General-purpose logical variable for flags and conditions
Type: Logical (Yes/No)
Persistence: Session only (not saved between sessions)
*/

[variable : logi6]
type : logical  ; Defines variable type as logical (Yes/No)
  default : no  ; Sets default value to No
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: logi6
Purpose: General-purpose logical variable for flags and conditions
Type: Logical (Yes/No)
Persistence: Session only (not saved between sessions)
*/

[variable : logi7]
type : logical  ; Defines variable type as logical (Yes/No)
  default : no  ; Sets default value to No
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: logi7
Purpose: General-purpose logical variable for flags and conditions
Type: Logical (Yes/No)
Persistence: Session only (not saved between sessions)
*/

[variable : logi8]
type : logical  ; Defines variable type as logical (Yes/No)
  default : no  ; Sets default value to No
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: logi8
Purpose: General-purpose logical variable for flags and conditions
Type: Logical (Yes/No)
Persistence: Session only (not saved between sessions)
*/

[variable : logi9]
type : logical  ; Defines variable type as logical (Yes/No)
  default : no  ; Sets default value to No
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: logi9
Purpose: General-purpose logical variable for flags and conditions
Type: Logical (Yes/No)
Persistence: Session only (not saved between sessions)
*/

[variable : logi10]
type : logical  ; Defines variable type as logical (Yes/No)
  default : no  ; Sets default value to No
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: logi10
Purpose: General-purpose logical variable for flags and conditions
Type: Logical (Yes/No)
Persistence: Session only (not saved between sessions)
*/


[variable : logi11]
type : logical  ; Defines variable type as logical (Yes/No)
  default : no  ; Sets default value to No
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: logi11
Purpose: General-purpose logical variable for flags and conditions
Type: Logical (Yes/No)
Persistence: Session only (not saved between sessions)
*/


[variable : logi12]
type : logical  ; Defines variable type as logical (Yes/No)
  default : no  ; Sets default value to No
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: logi12
Purpose: General-purpose logical variable for flags and conditions
Type: Logical (Yes/No)
Persistence: Session only (not saved between sessions)
*/

[variable : logi13]
type : logical  ; Defines variable type as logical (Yes/No)
  default : no  ; Sets default value to No
persistent: no  ; Variable will not persist between sessions

/* 
Variable Definition: logi13
Purpose: General-purpose logical variable for flags and conditions
Type: Logical (Yes/No)
Persistence: Session only (not saved between sessions)
*/



[variable : num1]
    type: number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num1
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num2]
    type: number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num2
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num3]
    type: number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num3
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num4]
type : number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num4
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num5]
type : number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num5
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num6]
type : number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num6
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num7]
type : number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num7
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num8]
type : number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num8
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num9]
type : number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num9
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num10]
type : number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num10
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num11]
type : number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num11
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num12]
type : number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num12
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num13]
type : number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num13
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num14]
type : number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num14
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/

[variable : num15]
type : number  ; Defines variable type as number
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: num15
Purpose: General-purpose numeric variable for calculations
Type: Number
Persistence: Session only (not saved between sessions)
*/


[variable : amt1]
    type: amount  ; Defines variable type as amount (for currency values)
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: amt1
Purpose: General-purpose amount variable for monetary values
Type: Amount (currency)
Persistence: Session only (not saved between sessions)
*/

[variable : amt2]
    type: amount  ; Defines variable type as amount (for currency values)
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: amt2
Purpose: General-purpose amount variable for monetary values
Type: Amount (currency)
Persistence: Session only (not saved between sessions)
*/

[variable : amt3]
    type: amount  ; Defines variable type as amount (for currency values)
default : 0  ; Sets default value to 0
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: amt3
Purpose: General-purpose amount variable for monetary values
Type: Amount (currency)
Persistence: Session only (not saved between sessions)
*/


[variable : sdf1]
type  : date  ; Defines variable type as date
default : ""  ; Sets default value to empty (no date)
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: sdf1
Purpose: General-purpose date variable for date operations
Type: Date
Persistence: Session only (not saved between sessions)
*/

[variable : sdf2]
type  : date  ; Defines variable type as date
default : ""  ; Sets default value to empty (no date)
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: sdf2
Purpose: General-purpose date variable for date operations
Type: Date
Persistence: Session only (not saved between sessions)
*/

[variable : sdf3]
type  : date  ; Defines variable type as date
default : ""  ; Sets default value to empty (no date)
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: sdf3
Purpose: General-purpose date variable for date operations
Type: Date
Persistence: Session only (not saved between sessions)
*/


[variable : sdf4]
type  : date  ; Defines variable type as date
default : ""  ; Sets default value to empty (no date)
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: sdf4
Purpose: General-purpose date variable for date operations
Type: Date
Persistence: Session only (not saved between sessions)
*/

[variable : sdf5]
type  : date  ; Defines variable type as date
default : ""  ; Sets default value to empty (no date)
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: sdf5
Purpose: General-purpose date variable for date operations
Type: Date
Persistence: Session only (not saved between sessions)
*/

[variable : sdf6]
type  : date  ; Defines variable type as date
default : ""  ; Sets default value to empty (no date)
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: sdf6
Purpose: General-purpose date variable for date operations
Type: Date
Persistence: Session only (not saved between sessions)
*/


[variable : sdf7]
type  : date  ; Defines variable type as date
default : ""  ; Sets default value to empty (no date)
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: sdf7
Purpose: General-purpose date variable for date operations
Type: Date
Persistence: Session only (not saved between sessions)
*/

[variable : sdf8]
type  : date  ; Defines variable type as date
default : ""  ; Sets default value to empty (no date)
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: sdf8
Purpose: General-purpose date variable for date operations
Type: Date
Persistence: Session only (not saved between sessions)
*/


[variable : sdf9]
type  : date  ; Defines variable type as date
default : ""  ; Sets default value to empty (no date)
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: sdf9
Purpose: General-purpose date variable for date operations
Type: Date
Persistence: Session only (not saved between sessions)
*/

[variable : sdf10]
type  : date  ; Defines variable type as date
default : ""  ; Sets default value to empty (no date)
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: sdf10
Purpose: General-purpose date variable for date operations
Type: Date
Persistence: Session only (not saved between sessions)
*/


[variable : qty1]
type : quantity  ; Defines variable type as quantity (for stock quantities)
default : ""  ; Sets default value to empty (no quantity)
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: qty1
Purpose: General-purpose quantity variable for inventory operations
Type: Quantity (with units)
Persistence: Session only (not saved between sessions)
*/

[variable : qty2]
type : quantity  ; Defines variable type as quantity (for stock quantities)
default : ""  ; Sets default value to empty (no quantity)
persistent : no  ; Variable will not persist between sessions

/* 
Variable Definition: qty2
Purpose: General-purpose quantity variable for inventory operations
Type: Quantity (with units)
Persistence: Session only (not saved between sessions)
*/

[system : variable]
qty1: ""  ; Sets system-wide default for qty1 to empty
sdf1 : ""  ; Sets system-wide default for sdf1 to empty
sdf2 : ""  ; Sets system-wide default for sdf2 to empty
sdf3 : ""  ; Sets system-wide default for sdf3 to empty
sdf4 : ""  ; Sets system-wide default for sdf4 to empty
sdf5 : ""  ; Sets system-wide default for sdf5 to empty
sdf6 : ""  ; Sets system-wide default for sdf6 to empty
sdf7 : ""  ; Sets system-wide default for sdf7 to empty
sdf8 : ""  ; Sets system-wide default for sdf8 to empty
sdf9 : ""  ; Sets system-wide default for sdf9 to empty
sdf10 : ""  ; Sets system-wide default for sdf10 to empty

str1 : ""  ; Sets system-wide default for str1 to empty
str2 : ""  ; Sets system-wide default for str2 to empty
str3 : ""  ; Sets system-wide default for str3 to empty
str4 : ""  ; Sets system-wide default for str4 to empty
str5 : ""  ; Sets system-wide default for str5 to empty
str6 : ""  ; Sets system-wide default for str6 to empty
str7 : ""  ; Sets system-wide default for str7 to empty
str8 : ""  ; Sets system-wide default for str8 to empty
str9 : ""  ; Sets system-wide default for str9 to empty
str10 : ""  ; Sets system-wide default for str10 to empty
str11 : ""  ; Sets system-wide default for str11 to empty
str12 : ""  ; Sets system-wide default for str12 to empty
str13 : ""  ; Sets system-wide default for str13 to empty
logi  : no  ; Sets system-wide default for logi to No
logi1 : no  ; Sets system-wide default for logi1 to No
logi2 : no  ; Sets system-wide default for logi2 to No
logi3 : no  ; Sets system-wide default for logi3 to No
logi4 : no  ; Sets system-wide default for logi4 to No
logi5 : no  ; Sets system-wide default for logi5 to No
logi6 : no  ; Sets system-wide default for logi6 to No
logi7 : no  ; Sets system-wide default for logi7 to No
logi8 : no  ; Sets system-wide default for logi8 to No
logi9 : no  ; Sets system-wide default for logi9 to No
logi10 : no  ; Sets system-wide default for logi10 to No
logi11 : no  ; Sets system-wide default for logi11 to No
logi12 : no  ; Sets system-wide default for logi12 to No
logi13 : no  ; Sets system-wide default for logi13 to No

   num1 : 0  ; Sets system-wide default for num1 to 0
   num2 : 0  ; Sets system-wide default for num2 to 0
   num3 : 0  ; Sets system-wide default for num3 to 0
   
   num4 : 0  ; Sets system-wide default for num4 to 0
   num5 : 0  ; Sets system-wide default for num5 to 0
   num6 : 0  ; Sets system-wide default for num6 to 0
   
   num7 : 0  ; Sets system-wide default for num7 to 0
   num8 : 0  ; Sets system-wide default for num8 to 0
   num9 : 0  ; Sets system-wide default for num9 to 0
   num10: 0  ; Sets system-wide default for num10 to 0
   num11: 0  ; Sets system-wide default for num11 to 0
   num12: 0  ; Sets system-wide default for num12 to 0
   num13: 0  ; Sets system-wide default for num13 to 0
   num14: 0  ; Sets system-wide default for num14 to 0
   num15: 0  ; Sets system-wide default for num15 to 0
   
   
   amt1 : 0  ; Sets system-wide default for amt1 to 0
   amt2 : 0  ; Sets system-wide default for amt2 to 0
   amt3 : 0  ; Sets system-wide default for amt3 to 0

/* 
System Variables Section
Purpose: Defines system-wide default values for all variables
Notes: 
  - These defaults are used when variables are reset or initialized
  - They ensure consistent behavior across different parts of the application
  - The system variables section centralizes all default values in one place
*/

`;
export default tdl;
