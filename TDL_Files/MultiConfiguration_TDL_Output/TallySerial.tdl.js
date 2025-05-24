// Auto-generated from TallySerial.txt
const tdl = `
;; PRODUCT: Tally connectivity
;; PRODUCT-ID: d022ba98-b2c3-4fc2-a0f9-e7a590ff5697
;; AUTHOR: TallyDeveloper

;; This file contains TDL (Tally Definition Language) code for Tally connectivity features
;; It defines various reports, fields, and menu options for integration with external systems

;; Required report and variable definitions
;; has Report : prgpath, variable : company name
;; has Report : prgvers, variable : prgver
;; has Report : pserial
;; has Report : prgtemplate
;; has Field : PrgExplodeLevel

;; Include external definition files
;;[include : ledgerexists.txt]      ; Includes ledger existence checking functionality
;;[include : cwledgerexistsNew.txt] ; Includes updated ledger existence checking
;;[include : GetNextVocher.txt]     ; Includes voucher sequence functionality
;;[include : itemparams.txt]        ; Includes item parameter definitions
;;[include : getitemdetails.txt]    ; Includes item details retrieval functionality

;; System formulas for serial number validation
[system : formula]
cwTallySEriallock : Yes                      ; Flag to enable serial lock
cwTallySerialLockDate : $$Date:"18/11/2010"  ; Date after which serial lock is enforced

;; Report to get current company information including GUID
[report : CwCurrentCompany]
use : list of companies                                              ; Inherits from list of companies report
local : line : List of Companies : invisible : $name <> ##svcurrentcompany  ; Hides non-current companies
local : line : List of Companies : add : field : dlr,cwguid                 ; Adds GUID field to display

;; Field definition for company GUID
[field : cwguid]
set as : $GUID  ; Sets field value to company GUID

;; Field definition for program explode level
[Field : PrgExplodeLevel]
   use : numberfield  ; Uses number field type
format : "Nocomma"    ; Formats without commas
set as : $$ExplodeLevel  ; Sets to current explode level
 Style : Normal  ; Uses normal style

;; Report to get program path from company settings
[Report : prgPath]
    use : PRGtemplate  ; Inherits from program template
  local : field : disguisenamefield : set as : $Destination:COMPANY:##SVCURRENTCOMPANY  ; Sets field to company destination path

;; Report to get program version
[report : prgvers]
    use : PRGtemplate  ; Inherits from program template
  local : field : disguisenamefield : set as :  @@prgver  ; Sets field to program version formula

;; Report to get program serial number with validation
[Report : pSerial]
    use : PRGtemplate  ; Inherits from program template
;;  local : field: disguisenamefield: set as:  if @@cwTallySEriallock then (if $$machinedate < @@cwTallySerialLockDate  then $$serialnumber else -1) else $$serialnumber  ; Commented out original serial check
  local : field: disguisenamefield: set as: if $$serialnumber > 0 then $$serialnumber else 424  ; Sets field to serial number or default 424

;; Field definition for program name
[Field : pgName]
use : Name field  ; Uses name field type
style : normal    ; Uses normal style
width : 100       ; Sets width to 100
set as : $name    ; Sets to current name

;; Field definition for program amount
[field : pgAmount]
use : Amount Field  ; Uses amount field type
format : "No Comma"  ; Formats without commas

;; Field definition for program quantity
[field: pgQty]
  use : QtyPrimary Field  ; Uses quantity primary field type
format : "NoComma"        ; Formats without commas

;; Field definitions for delimiters (used in exports)
;; These fields are used as separators in exported data
[field : xd1]
use : name field  ; Uses name field type
width : 1         ; Sets width to 1
set as : ","      ; Sets value to comma

;; Additional delimiter fields that reuse xd1 definition
[field : xd2]
use : xd1  ; Inherits from xd1

[field : xd3]
use : xd1  ; Inherits from xd1

[field : xd4]
use : xd1  ; Inherits from xd1

[field : xd5]
use : xd1  ; Inherits from xd1

[field : xd6]
use : xd1  ; Inherits from xd1

[field : xd7]
use : xd1  ; Inherits from xd1

[field : xd8]
use : xd1  ; Inherits from xd1

[field : xd9]
use : xd1  ; Inherits from xd1

[field : xd10]
use : xd1  ; Inherits from xd1

;; Dollar sign field definition (used in exports)
[FIELD : DLR]
USE : XD1      ; Inherits from xd1
SET AS : "$"   ; Sets value to dollar sign

;; Additional dollar sign fields that reuse DLR definition
[FIELD : DLR1]
USE : dLR  ; Inherits from DLR

[FIELD : DLR2]
USE : dLR  ; Inherits from DLR

[FIELD : DLR3]
USE : dLR  ; Inherits from DLR

[FIELD : DLR4]
USE : dLR  ; Inherits from DLR

[FIELD : DLR5]
USE : dLR  ; Inherits from DLR

[FIELD : DLR6]
USE : dLR  ; Inherits from DLR

[FIELD : DLR7]
USE : dLR  ; Inherits from DLR

[FIELD : DLR8]
USE : dLR  ; Inherits from DLR

[FIELD : DLR9]
USE : dLR  ; Inherits from DLR

[FIELD : DLR10]
USE : dLR  ; Inherits from DLR

[FIELD : DLR11]
USE : dLR  ; Inherits from DLR

[FIELD : DLR12]
USE : dLR  ; Inherits from DLR

[FIELD : DLR13]
USE : dLR  ; Inherits from DLR

[FIELD : DLR14]
USE : dLR  ; Inherits from DLR

[FIELD : DLR15]
USE : dLR  ; Inherits from DLR

;; Field definition for d0 (reuses d1)
[field : d0]
use : d1  ; Inherits from d1

;; Field definition for delimiter D1 (used in exports)
[FIELD : D1]
USE : SHORT NAME FIELD  ; Uses short name field type
INVISIBLE : if not $$InExportMode then yes else @@IsExcelFormat  ; Only visible in Excel export mode
WIDTH : 1               ; Sets width to 1
SET AS : "$"            ; Sets value to dollar sign
;set as : $$descname    ; Commented out alternative value

;; Additional delimiter fields that reuse D1 definition
[FIELD : D2]
USE : D1  ; Inherits from D1

[FIELD : D3]
   USE : D1  ; Inherits from D1

[FIELD : D4]
   USE : D1  ; Inherits from D1

[FIELD : D5]
   USE : D1  ; Inherits from D1

[FIELD : D6]
   USE : D1  ; Inherits from D1
INVISIBLE : if not $$InExportMode then yes else @@IsExcelFormat  ; Only visible in Excel export mode

[FIELD : D7]
   USE : D1  ; Inherits from D1

[FIELD : D8]
   USE : D1  ; Inherits from D1

[FIELD : D9]
   USE : D1  ; Inherits from D1

[FIELD : D10]
   USE : D1  ; Inherits from D1

[FIELD : D11]
   USE : D1  ; Inherits from D1

[FIELD : D12]
   USE : D1  ; Inherits from D1

[FIELD : D13]
   USE : D1  ; Inherits from D1

[FIELD : D14]
   USE : D1  ; Inherits from D1

[FIELD : D15]
   USE : D1  ; Inherits from D1

[FIELD : D16]
   USE : D1  ; Inherits from D1

[FIELD : D17]
   USE : D1  ; Inherits from D1

[FIELD : D18]
   USE : D1  ; Inherits from D1

[FIELD : D19]
   USE : D1  ; Inherits from D1

[FIELD : D20]
   USE : D1  ; Inherits from D1

[FIELD : D21]
   USE : D1  ; Inherits from D1

[FIELD : D22]
   USE : D1  ; Inherits from D1

[FIELD : D23]
   USE : D1  ; Inherits from D1

[FIELD : D24]
  USE : D1  ; Inherits from D1

[FIELD : D25]
   USE : D1  ; Inherits from D1
   
[FIELD : D26]
   USE : D1  ; Inherits from D1

[FIELD : D27]
   USE : D1  ; Inherits from D1

[FIELD : D28]
   USE : D1  ; Inherits from D1

[FIELD : D29]
  USE : D1  ; Inherits from D1

[FIELD : D30]
   USE : D1  ; Inherits from D1

[FIELD : D31]
   USE : D1  ; Inherits from D1

[FIELD : D32]
   USE : D1  ; Inherits from D1

[FIELD : D33]
   USE : D1  ; Inherits from D1

[FIELD : D34]
   USE : D1  ; Inherits from D1

[FIELD : D35]
   USE : D1  ; Inherits from D1

[FIELD : D36]
   USE : D1  ; Inherits from D1

[FIELD : D37]
   USE : D1  ; Inherits from D1

[FIELD : D38]
   USE : D1  ; Inherits from D1

[FIELD : D39]
   USE : D1  ; Inherits from D1
   
[FIELD : D40]
   USE : D1  ; Inherits from D1

[FIELD : D41]
   USE : D1  ; Inherits from D1

[FIELD : D42]
   USE : D1  ; Inherits from D1

[FIELD : D43]
   USE : D1  ; Inherits from D1

[FIELD : D44]
   USE : D1  ; Inherits from D1

[FIELD : D45]
   USE : D1  ; Inherits from D1

[FIELD : D46]
   USE : D1  ; Inherits from D1

[FIELD : D47]
   USE : D1  ; Inherits from D1

[FIELD : D48]
   USE : D1  ; Inherits from D1

[FIELD : D49]
   USE : D1  ; Inherits from D1

[FIELD : D50]
   USE : D1  ; Inherits from D1

[FIELD : D51]
   USE : D1  ; Inherits from D1

[FIELD : D52]
   USE : D1  ; Inherits from D1

[FIELD : D53]
   USE : D1  ; Inherits from D1

[FIELD : D54]
   USE : D1  ; Inherits from D1

[FIELD : D55]
   USE : D1  ; Inherits from D1

[FIELD : D56]
   USE : D1  ; Inherits from D1
   
[FIELD : D57]
   USE : D1  ; Inherits from D1
   
[FIELD : D58]
   USE : D1  ; Inherits from D1
   
[FIELD : D59]
   USE : D1  ; Inherits from D1
   
[FIELD : D60]
   USE : D1  ; Inherits from D1
   
[FIELD : D61]
   USE : D1  ; Inherits from D1
   
[FIELD : D62]
   USE : D1  ; Inherits from D1
   
[FIELD : D63]
   USE : D1  ; Inherits from D1
   
[FIELD : D64]
   USE : D1  ; Inherits from D1
   
[FIELD : D65]
   USE : D1  ; Inherits from D1

[FIELD : D66]
   USE : D1  ; Inherits from D1

[FIELD : D67]
   USE : D1  ; Inherits from D1

[FIELD : D68]
   USE : D1  ; Inherits from D1

[FIELD : D69]
   USE : D1  ; Inherits from D1

[FIELD : D70]
   USE : D1  ; Inherits from D1

[FIELD : D71]
   USE : D1  ; Inherits from D1

[FIELD : D72]
   USE : D1  ; Inherits from D1

[FIELD : D73]
   USE : D1  ; Inherits from D1

[FIELD : D74]
   USE : D1  ; Inherits from D1

[FIELD : D75]
   USE : D1  ; Inherits from D1

[FIELD : D76]
   USE : D1  ; Inherits from D1

[FIELD : D77]
   USE : D1  ; Inherits from D1
   
[FIELD : D78]
   USE : D1  ; Inherits from D1

[FIELD : D79]
   USE : D1  ; Inherits from D1

[FIELD : D80]
   USE : D1  ; Inherits from D1
   
[FIELD : D81]
   USE : D1  ; Inherits from D1
   
[FIELD : D82]
   USE : D1  ; Inherits from D1
   
[FIELD : D83]
   USE : D1  ; Inherits from D1
   
[FIELD : D84]
   USE : D1  ; Inherits from D1
   
[FIELD : D85]
   USE : D1  ; Inherits from D1
   
[FIELD : D86]
   USE : D1  ; Inherits from D1
   
[FIELD : D87]
   USE : D1  ; Inherits from D1
   
[FIELD : D88]
   USE : D1  ; Inherits from D1
   
[FIELD : D89]
   USE : D1  ; Inherits from D1
   
[FIELD : D90]
   USE : D1  ; Inherits from D1
   
[FIELD : D91]
   USE : D1  ; Inherits from D1
   
[FIELD : D92]
   USE : D1  ; Inherits from D1
   
[FIELD : D93]
   USE : D1  ; Inherits from D1

[FIELD : D94]
   USE : D1  ; Inherits from D1

[FIELD : D95]
   USE : D1  ; Inherits from D1

[FIELD : D96]
   USE : D1  ; Inherits from D1

[FIELD : D97]
   USE : D1  ; Inherits from D1
   
[FIELD : D98]
   USE : D1  ; Inherits from D1
   
[FIELD : D99]
   USE : D1  ; Inherits from D1
   
[FIELD : D100]
   USE : D1  ; Inherits from D1

[FIELD : D101]
   USE : D1  ; Inherits from D1

[FIELD : D102]
   USE : D1  ; Inherits from D1

[FIELD : D103]
   USE : D1  ; Inherits from D1

[FIELD : D104]
   USE : D1  ; Inherits from D1

[FIELD : D105]
   USE : D1  ; Inherits from D1

[FIELD : D106]
   USE : D1  ; Inherits from D1

[FIELD : D107]
   USE : D1  ; Inherits from D1

[FIELD : D108]
   USE : D1  ; Inherits from D1

[FIELD : D109]
   USE : D1  ; Inherits from D1
   
[FIELD : D110]
   USE : D1  ; Inherits from D1
   
[FIELD : D111]
   USE : D1  ; Inherits from D1

[FIELD : D112]
   USE : D1  ; Inherits from D1
   
[FIELD : D113]
   USE : D1  ; Inherits from D1

[FIELD : D114]
   USE : D1  ; Inherits from D1
   
[FIELD : D115]
   USE : D1  ; Inherits from D1
   
[FIELD : D116]
   USE : D1  ; Inherits from D1
   
[FIELD : D117]
   USE : D1  ; Inherits from D1
   
[FIELD : D118]
   USE : D1  ; Inherits from D1
   
[FIELD : D119]
   USE : D1  ; Inherits from D1
   
[FIELD : D120]
   USE : D1  ; Inherits from D1

;; Program template report definition
[report : prgTemplate]
    use : dsptemplate  ; Inherits from display template
   Form : PrgTemplate   ; Uses PrgTemplate form

;; Form definition for program template
[Form : PrgTemplate]
    use : dsptemplate  ; Inherits from display template
   Part : PrgTemplate   ; Uses PrgTemplate part
  width : 100% Page     ; Sets width to full page
 height : 100% Page     ; Sets height to full page

;; Part definition for program template
[Part : PrgTemplate]
   line : PrgTemplate  ; Uses PrgTemplate line
 scroll : vertical     ; Enables vertical scrolling

;; Line definition for program template
[Line : PrgTemplate]
  Field : disguiseNameField  ; Includes disguise name field
  local : field : disguisenamefield : width  : 100  ; Sets field width to 100
  local : field : disguisenamefield : set always : yes  ; Always applies set as condition

;; Field definition for disguise name
[field : disguiseNameField]
    use : name field  ; Uses name field type

;------------------------------

;; Menu modifications for Gateway of Tally
[#menu: Gateway of Tally]
;; {23.Sep.13 17:27}         add: Option: GetLedgerCreditPeriodLock ;; : @@GetLedgerCreditPeriodDemoLock
       
;; Menu definition for ledger credit period lock
[!menu: GetLedgerCreditPeriodLock]
        add: Item: before: @@locQuit: @@GetLedgerCreditPeriodReport: Display: RepGetLedgerCreditPeriod  ; Adds report menu item
        add: Item: before: @@locQuit: Blank  ; Adds blank line before quit option
        
;; System formulas for ledger credit period
[System: formula]
   GetLedgerCreditPeriodReport: "GetLedgerCreditPeriod"  ; Sets report title
;; GetLedgerCreditPeriodDemoLock: $$MachineDate < $$Date:"01/04/2013"  ; Commented out demo lock condition
     
;; Report definition for ledger credit period
[Report: RepGetLedgerCreditPeriod]
        use: Dsp Template  ; Inherits from display template
      Title: @@GetLedgerCreditPeriodReport  ; Sets title from formula
   Printset: Report Title: @@GetLedgerCreditPeriodReport  ; Sets print title
       Form: FrmGetLedgerCreditPeriod  ; Uses ledger credit period form
     Export: Yes  ; Enables export functionality
     set  : svfromdate : ##svcurrentdate  ; Sets from date to current date
     set  : svTodate : ##svcurrentdate  ; Sets to date to current date
    Local : Button   : RelReports        : Inactive : Yes  ; Disables related reports button
    variable : ledgername  ; Declares ledger name variable
;; {23.Sep.13 17:27}     set : ledgername : "AJIT MARKETING"  ; Commented out default ledger name
     
;; Form definition for ledger credit period
[Form: FrmGetLedgerCreditPeriod]
        use: DSP Template  ; Inherits from display template
       Part: PrtGetLedgerCreditPeriod  ; Uses ledger credit period part
      Width: 100% Page  ; Sets width to full page
     Height: 100% Page  ; Sets height to full page
 Background: @@SV_STOCKSUMMARY  ; Sets background from system variable
     delete: page break  ; Removes page break

;; Part definition for ledger credit period
[Part: PrtGetLedgerCreditPeriod]
       Line: LnGetLedgerCreditPeriod  ; Uses ledger credit period line
       set : 1  ; Sets initial value to 1
     repeat: LnGetLedgerCreditPeriod  ; Repeats the line
     scroll: Vertical  ; Enables vertical scrolling
 Common Border: YEs  ; Adds border to all elements
      Total: Qtyf,amtf  ; Totals quantity and amount fields

;; Title line definition for ledger credit period
[Line: LnGetLedgerCreditPeriodTitle]
        use: LnGetLedgerCreditPeriod  ; Inherits from main line
     option: titleopt  ; Uses title option
local:field: sdf: set as: "Date"  ; Sets date column header
local:field: nf: set as: "Name"  ; Sets name column header
local:field: fwf: set as: "Description"  ; Sets description column header
local:field: qtyf: set as: "Qty."  ; Sets quantity column header
local:field: amtf: set as: "Value"  ; Sets value column header
local:field: ratepf : set as : "Rate"  ; Sets rate column header
      local: field: default : style: normal bold  ; Sets bold style for all fields

;; Line definition for ledger credit period
[Line: LnGetLedgerCreditPeriod]
     Fields: name field  ; Includes name field
      Local: Field: namefield: Set As: $billcreditperiod:ledger:##ledgername  ; Sets field to ledger credit period

`;
export default tdl;
