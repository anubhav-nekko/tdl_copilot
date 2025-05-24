// Auto-generated from ShowDemoForm.txt
const tdl = `
;===============================================================================
; SHOWDEMOFORM.TXT
; Created By: pg on 2011-08-13 19:23
; Purpose: Displays an evaluation/trial message at Tally startup if in demo mode,
;          and shows "Evaluation Till" info in the Gateway of Tally menu.
;===============================================================================

;------------------------------------------------------------------------------
; EVENT: SHOW DEMO FORM ON SYSTEM START (IF IN DEMO MODE)
;------------------------------------------------------------------------------

[system : event]
cwindemo2 : System Start  : @@cwShowDemoForm : Call : cwShowDemoForm

;------------------------------------------------------------------------------
; GATEWAY MENU INTEGRATION: SHOW "EVALUATION TILL" INDENT
;------------------------------------------------------------------------------

[#menu : Gateway of tally]
add : option : cwShowTrialTill : @@cwShowDemoForm

[!MENU : cwShowTrialTill]
add : indent : at beginning : @@TrialTill

;------------------------------------------------------------------------------
; SYSTEM FORMULAS: DEMO DATE AND DISPLAY LOGIC
;------------------------------------------------------------------------------

[System : Formula]
xdebg : yes ;;not (@@cwdebug)
TrialTill : if @@cwShowDemoForm then "Evaluation Till: " +  @@cwShowDemoDatex else ""
cwShowDemoDatex : if $$serialnumber < 100  then $$string:@@cwShowDemoDate2 else $$string:@@cwShowDemoDate

;------------------------------------------------------------------------------
; FUNCTION: SHOW DEMO FORM (MESSAGE BOX ON STARTUP)
;------------------------------------------------------------------------------

[function : cwShowDemoForm]
variable : mydate : string
variable : mystr : string
variable : mysystemname : string

;0x : log : $$serialnumber
00a : log : "Evaluation Mode Activated..."
00b : log : @@TrialTill ;;"Evaluation till: " + $$string:@@cwShowDemoDate ;;##mysystemname

01 : set : mysystemname : $$SysInfo:SystemName
02 : if : @@cwdebug or (##mysystemname in ("e1","e2","e3","e4","e5","e6","node2","node3"))
    ;;        05	: LOG	: "Application Path	: " + $$SysInfo:ApplicationPath
    ;;	10	: LOG	: "Current Data Path: " + $$SysInfo:CurrentPath
    ;;	20	: LOG	: $$SysInfo:SystemDate
    ;;	25	: LOG	: "System Time		: " + $$SysInfo:SystemTime
    ;;	26	: LOG	: "System Time (HMS): " + $$SysInfo:SystemTimeHMS
    ;;	30	: LOG	: "System Name		: " + $$SysInfo:SystemName
    ;;	50	: LOG	: "Windows Version	: " + $$SysInfo:WindowsVersion
    ;;	60	: LOG	: "Windows User		: " + $$SysInfo:WindowsUser
    ;;	70	: LOG	: "IP Address		: " + $$SysInfo:IPAddress
    ;;	80	: LOG	: "Mac Address		: " + $$SysInfo:MacAddress
90 : continue
95 : end if

100 : set : mydate : @@cwShowDemoDatex
200 : set : mystr : "Evaluation!!!\n"+"This Customization is in Evaluation Mode\n Till :" + ##mydate +".\n During this period, it can be used for Evaluation or Non-Commercial Use Only. \n After "+ ##mydate +", this customization will not work."
300 : MsgBox : "Evaluation!!!" : ##mystr : no

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
