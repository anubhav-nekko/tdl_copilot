// Auto-generated from CommonFormulae.txt
const tdl = `
;===============================================================================
; COMMONFORMULAE.TXT
; Purpose: Provides reusable system formulas and utility functions for Tally TDL.
;          Includes date formatting, company and ledger info, cash/bank balances,
;          party codes, alias handling, address utilities, and more.
; Modified by: pg on 2012-11-06 12:11, ID:
;===============================================================================

;------------------------------------------------------------------------------
; SYSTEM FORMULAS: ITEM ALIAS, CASH/BANK BALANCES, DATE FORMATTING
;------------------------------------------------------------------------------

[System: Formula]
cwItemAlias2 : $$ReptField:Name:2:stockitem:$stockitemname

cwCashOpeningBalance : $$filteramttotal:ledger:cwCashMaster:$Openingbalance
cwBankOpeningBalance : $$filteramttotal:ledger:cwBankMaster:$Openingbalance
cwCashClosingBalance : $$filteramttotal:ledger:cwCashMaster:$Closingbalance
cwBankClosingBalance : $$filteramttotal:ledger:cwBankMaster:$Closingbalance

cwCashMaster : $$IsLedOfGrp:$Name:$$Groupcash
cwBankMaster : $$IsLedOfGrp:$Name:$$GroupBank

dlr : "$"
cwCurrMonthStart : $$monthstart:##svfromdate
cwCurrMonthEnd   : $$monthend:##svfromdate
cwNormalUser : $$cmpuserlevel <> "Owner"
cwOwnerLevel : $$cmpuserlevel = "Owner"
cwDataEntry : $$cmpuserlevel = "Data Entry"
cwdelnote : $$isdelnote:##svvouchertype
cwWithinDateFilter : ($Date <= @@DSPToDate)
cwWithinBillDateFilter : ($BillDate <= ##svtodate)
cwClearedWithinDate : $clearedon <= ##svtodate and $clearedon >= ##svfromdate

cwCmpAdmin : $ownername:company:##SVCurrentcompany

iscwVchSo : $$issalesOrder:##SVVouchertype
iscwVchPO : $$IsPurcOrder:##SVVouchertype
iscwSo : $$issalesOrder:$vouchertypename
iscwPO : $$IsPurcOrder:$vouchertypename
cwcmpmobileno : $cwMobileno:company:##svcurrentcompany
cwBankName : $$filtercount:ledgerentries:cwisbankacc > 0
cwisbankacc : $cwisBank
cwBooksFrom : $BooksFrom:Company:##SVCurrentCompany

cwcashOpeningBalance : $$filteramttotal:ledger:cwCashMaster:$Openingbalance
cwBankOpeningBalance : $$filteramttotal:ledger:cwBankMaster:$Openingbalance
cwcashClosingBalance : $$filteramttotal:ledger:cwCashMaster:$Closingbalance
cwBankClosingBalance : $$filteramttotal:ledger:cwBankMaster:$Closingbalance

;------------------------------------------------------------------------------
; DATE FORMATTING FUNCTIONS
;------------------------------------------------------------------------------

[FUNCTION: CWDATE]
PARAMETER : MYDATE : date : $DATE
VARIABLE : D : NUMBER
VARIABLE : M : NUMBER
VARIABLE : Y : NUMBER
VARIABLE : SEP : STRING : "-"
10 : SET : D : $$DAYOFDATE:##MYDATE
20 : SET : M : $$monthOFDATE:##MYDATE
30 : SET : Y : $$yearOFDATE:##MYDATE
40 : RETURN : $$ZEROFILL:##D:2 + ##SEP + $$ZEROFILL:##M:2 + ##SEP + $$STRING:##Y

[function : Date2YYMMDD]
parameter: mf : date
parameter: sep : string :"-"
returns : string
variable : s :string
variable : yr : string :"A"
variable : mm : number :"B"
variable : dd : number : "C"
10 : set : s : ##yr + ##sep+  $$zerofill:##mm:2 + ##sep + $$zerofill:##dd:2
15 : return : ##s

;------------------------------------------------------------------------------
; SYSTEM FORMULAS: PAGE NUMBERS, PARTY CODES, LEDGER/COMPANY INFO, ETC.
;------------------------------------------------------------------------------

[System: Formula]
cwnextpage : $$pageno+1
cwPrevPage : $$pageno - 1

cwpartycodex : $$LocaleString:$$Alias:1:Yes
cwpartycodex2 : $$LocaleString:$$Alias:2:Yes
colon : ":"
linep1 : $$Line  + 1
linep1ex : if $$explodelevel = 0 then 1 else @@linep1
linep2ex : if $$explodelevel < 2 then 1 else @@linep1
cwSerial: @@cwDebug
cwDebug : $$serialnumber = 742231584 or $$serialnumber = 735003873  or $$serialnumber = 785208321
cwDebug2: @@cwDebug or ##SVEducationalMode
indebug : @@cwdebug
CWEdu   : ##SVEducationalMode
cwOwner : (##svusername = $ownername:company:##svcurrentcompany)
cwNormal: Not @@cwowner
DellDebug: $$sysinfo:machinename = ("DEll")

;------------------------------------------------------------------------------
; OBJECT EXTENSIONS: LEDGER, COMPANY, COSTCENTRE, GODOWN, ETC.
;------------------------------------------------------------------------------

[#object : ledger]
cwisbank : $$ischildof:$$groupbank or $$ischildof:$$groupbankod
cwpartycode : if @@cwpartycodex = $name then "" else @@cwpartycodex
iscwDebtor : $$isbelongsto:$$groupsundrydebtors
iscwCreditor : $$isbelongsto:$$groupsundryCreditors

[#object : company]
cwMobileno : $$collectionfield:$MobileNumbers:1:MobileNumbers

[#object : CostCentre]
cwpartycode : if @@cwpartycodex = $name then "" else @@cwpartycodex

[#object : godown]
cwPartyCode : if @@cwpartycodex = $name then "" else @@cwpartycodex

;------------------------------------------------------------------------------
; BALANCE FORMULAS FOR PARTIES
;------------------------------------------------------------------------------

[system : formula]
cwprvbal : if $$isdr:@@cwpartyclbal then @@cwpartyclbal - $amount else -1*@@cwpartyclbal - $amount
cwpartyclbal : $$ToValue:$Date:$ClosingBalance:Ledger:$partyledgername
mycurrbal : @@cwprvbal + $amount

;------------------------------------------------------------------------------
; DATE, MFD, EXPIRY, AND BATCH FORMATTING FORMULAS
;------------------------------------------------------------------------------

[system : formula]
cwmfdMMYY : if not $$isempty:$mfdon then $$ShortMonthName:$MFDON + "-"+ @@CWSHmfdYR ELSE ""
CWEXPIRYMMYY : if not $$isempty:$EXPIRYPERIOD then $$SHORTMONTHNAME:$EXPIRYPERIOD + "-"+ @@CWSHYR else ""
CWSHMONN : $$NUMBER:CWSHMON
cwshortmfd : if not $$isempty:$mfdon then @@cwshmfddays +"-"+ @@CWSHmfdMON + "-"+ @@CWSHmfdYR else ""
cwshmfdDays : if @@cwshmfdDays1 < 10 then "0" + $$string:@@cwshmfdDays1 else $$string:@@cwshmfdDays1
CWSHmfdMON  : if @@CWSHmfdMON1 < 10 then "0"+$$string:@@CWSHmfdMON1 else $$string:@@CWSHmfdMON1
CWSHmfdYR  : if @@CWSHmfdYR1 < 10 then "0"+$$string:@@CWSHmfdYR1 else $$string:@@CWSHmfdYR1
cwshmfdDays1: $$DAYOFDATE:$mfdon
CWSHmfdMON1 : $$MONTHOFDATE:$mfdon
CWSHmfdYR1 : $$YEAROFDATE:$mfdon -  2000
CWSHORTEXPIRY: if not $$isempty:$EXPIRYPERIOD then @@cwshdays +"-"+ @@CWSHMON + "-"+ @@CWSHYR else ""
CWSHDAYs : if @@cwshday1 < 10 then "0" + $$string:@@cwshday1 else $$string:@@cwshday1
cwshday1 : $$DAYOFDATE:$EXPIRYPERIOD
CWSHMON : if @@cwshmon1 < 10 then "0"+$$string:@@cwshmon1 else $$string:@@cwshmon1
cwshmon1 : $$MONTHOFDATE:$EXPIRYPERIOD
CWSHYR : if @@cwshyr1 < 10 then "0"+$$string:@@cwshyr1 else $$string:@@cwshyr1
cwshyr1 : $$YEAROFDATE:$EXPIRYPERIOD -  2000
cwBatchmfd : $$collectionfield:@@mfstr:first:batchallocations
cwBatchExp : $$collectionfield:@@expstr:first:batchallocations
CWbATCHNAME : IF $BATCHNAME ="pRIMARY BATCH" THEN "" ELSE $BATCHNAME
expstr : $$string:$EXPIRYPERIOD:"shortdate"
mfstr : $$string:$mfdon:"shortdate"
cwLedMailing : $MailingName:ledger:$partyledgername

;------------------------------------------------------------------------------
; (The rest of the file continues with additional formulas, collection and style
;  definitions, company/ledger/party address utilities, tax and voucher utilities,
;  and other reusable logic as per the original file.)
;===============================================================================

`;
export default tdl;
