// Auto-generated from BARCODEFOREACHQTY2.TXT
const tdl = `
;===============================================================================
; BARCODEFOREACHQTY2.TXT
; Created By: Akshay on 2014-08-08 11:37, ID:
; Purpose: Provides configuration and logic for auto-creating a batch for each quantity
;          (1 qty per batch) in Tally, with options for barcode, zero-filling, and batch naming.
;===============================================================================

;------------------------------------------------------------------------------
; Line to configure auto batch creation for each quantity, zero-fill, and starting number
;------------------------------------------------------------------------------

[Line: lnbcodeforeachqty]
field:lp,cwlogical ,sp,numf ,sp2,numf2 ,sp3,cwlogical2
Local: Field: lp : info:"Auto Create Batch for Each Qty.(1 qty / batch.) ?"
Local: Field:sp : info: "Prefill with Zeros :"
Local: Field:sp2 : info: "Starting No.:"
Local: Field: cwlogical : storage:cwbarcodeeachqty
Local: Field: numf: storage:cwnumzerofill
Local: Field: numf2: storage:cwbcodestnox
Local: Field: numf: Style: Normal Bold
Local: Field: numf2: Style: Normal Bold
Local: field: lp: Width:42
Local: field: sp: Width:20
Local: field: sp2: Width:14
local: field: sp: inactive: not $cwbarcodeeachqty
local: field: sp2: inactive: not $cwbarcodeeachqty
local: field: numf: inactive: not $cwbarcodeeachqty
local: field: numf2: inactive: not $cwbarcodeeachqty
Local: field: numf: Align:left
Local: field: numf2: Align:left
Local: Field: sp3: info: "Skip Auto Fill (1 Barcode for All Qty)?"
Local: field: sp3: Width: 0
local: field:cwlogical2: inactive: not $cwbarcodeeachqty
Local: Field: cwlogical2: storage:cwBatchQtyOne
border:thin box

;------------------------------------------------------------------------------
; Add barcode and batch options to voucher type behaviour part
;------------------------------------------------------------------------------

[#Part: VTYP BehaviourMain]
ADD : OPTION : CWBARCODEAUTOINVOKE : @@cwCustomizationEnabled
add:option :prtgeneratebarcodeqty:@@cwbarcodeeachqty
add : option : cwFillCusumptionFromBOM  : @@cwCustomizationEnabled

;------------------------------------------------------------------------------
; Add barcode template and configuration lines to voucher type behaviour part
;------------------------------------------------------------------------------

[!PART : CWBARCODEAUTOINVOKE]
ADD : LINE : AT BEGINNING : CWBARCODETITLE,CWBARCODEINVOKEFROMVCH,CWBARCODEINVOKEFROMVCH2,cwWarnonEmptypartyCode, cwFillCusumptionFromBOM
add : option: cwVchtypeTempate : $cwBarcodeTemplatebyVchType:COMPANY:##SVCURRENTCOMPANY

[!part :cwVchtypeTempate]
add : line : after : cwWarnonEmptypartyCode : cwBarcodeTemplate

[line: cwBarcodeTemplate]
field: sp,snf
Local: Field: sp: info: "Barcode Template Name:"
Local: field: sp: Width: 30
Local: Field: snf: storage: cwBarcodeTemplatename
Local: Field: default: Style: Normal Bold
local: field: snf: Case: Normal

;------------------------------------------------------------------------------
; Barcode settings and options lines
;------------------------------------------------------------------------------

[LINE :CWBARCODETITLE]
Line: Form SubTitle
Local: Field : Form SubTitle : Info : $$LocaleString:"Barcode Settings"

[LINE:CWBARCODEINVOKEFROMVCH]
field : long prompt,cwlogical
Local: Field: long prompt: info: "Generate Barcode on Save (New Entry)?"
Local: field: long prompt: Width: 40
Local: Field: long prompt: Style: Normal Bold
Local: Field: cwlogical: storage:GenBarCodeOnSave

[LINE:CWBARCODEINVOKEFROMVCH2]
field : long prompt,cwlogical
Local: Field: long prompt: info: "Generate Barcode on Save (Editing)?"
Local: field: long prompt: Width: 40
Local: Field: long prompt: Style: Normal Bold
Local: Field: cwlogical: storage:GenBarCodeOnSaveEdit

[line: cwWarnonEmptypartyCode]
use : CWBARCODEINVOKEFROMVCH
Local: Field: long prompt: info: "Warn on Blank Party Code"
Local: Field: cwlogical: storage:  cwWarnonEmptypartyCode
local: field: cwlogical: inactive: not @@cwShowPartyAliasinEntry

[line : cwGenOnOut]
field : sp,cwlogical
Local: Field: sp: info: "Generate Barcode on Outward?"
Local: Field: cwlogical: storage: cwGenerateBarcodeOnOutward
Local: field: sp: Width: 30
invisible: not $$IsJobMaterialIssue:$parent
Local: Field: sp: Style: Normal Bold

;------------------------------------------------------------------------------
; System formulas for barcode generation and warning logic
;------------------------------------------------------------------------------

[System: Formula]
GenBarCodeOnSave : ($$increatemode and $GenBarCodeOnSave:vouchertype:##SVVouchertype) or (not $$increatemode and $GenBarCodeOnSaveEdit:vouchertype:##SVVouchertype)
GenBarCodeOnSaveEdit : $GenBarCodeOnSaveEdit:vouchertype:##SVVouchertype
cwWarnonEmptypartyCode : $cwWarnonEmptypartyCode:Vouchertype:##SVVoucherType

;------------------------------------------------------------------------------
; Add batch for each qty option to barcode print part
;------------------------------------------------------------------------------

[!Part: prtgeneratebarcodeqty]
ADD:LINE: before : Form SubTitle :lnbcodeforeachqtyvch

[Line: lnbcodeforeachqtyvch]
field:long prompt,cwlogical
Local: Field: long prompt : info: "Auto Fill Batch for Each Qty.?"
Local: Field: cwlogical : storage:cwbarcodeeachqty
Local: Field: default: Style: Normal Bold
Local: field: long prompt: Width:30

;------------------------------------------------------------------------------
; BOM consumption fill option
;------------------------------------------------------------------------------

[!part : cwFillCusumptionFromBOM]
line: cwFillCusumptionFromBOM

[line: cwFillCusumptionFromBOM]
field : long prompt,cwlogical
Local: Field: long prompt: info: "Fill Items from BOM?"
Local: Field: cwlogical: storage: cwFillItemsFromBOM
local: field: default: inactive: not $$isstockjrnl:$parent
Local: Field: default: style : normal bold
invisible : not ##UseBoM

;------------------------------------------------------------------------------
; Add line number and batch details fields to inventory info lines
;------------------------------------------------------------------------------

[#line : ei invinfo]
add : option : mylineno

[#line : ci invinfo]
add : option : mylineno

[#line : SJDetailsA]
add : option : mylineno

[#line : SJDetailsC]
add : option : mylineno

[!line : mylineno]
add : field : at beginning : snfLineNo
add : field : after :VCH StockItem: snfbatchdets

[field :snfLineNo]
use : numf
set as  :$$line
skip : yes
invisible : yes
storage : cwline

[field : snfbatchdets]
use : nf
set as : if $$line = 1 then "" else $$Getfromprev:$$line:$stockitemname
skip : yes
border : thick box
invisible : yes

;------------------------------------------------------------------------------
; Function to fetch previous batch name for the same item
;------------------------------------------------------------------------------

[function : Getfromprev]
parameter : myline : number
parameter : myitemname : string
returns : string
variable : str : string : ""
variable : id : number : 1
00 : walk Collection : AllInventory Entries
01 : do if : ##id >= ##myline : return: ##str
02 : if : $stockitemname = ##myitemname
03 : set : str : $$collectionfield:$batchname:(-1):BatchAllocations
05 : end if
06 : incr : id
07 : end walk
08 : return : ##str

;------------------------------------------------------------------------------
; Subform integration for batch allocation in item entry fields
;------------------------------------------------------------------------------

[#Field: VCH StockItem]
add:Sub Form :itembarcodedet  : @@cwbarcodeeachqty and ($$number:$actualqty=0)  AND (@@HasBatchWise) and @@cwbarcodeeachqtyx and not @@IsStockJrnl
add:Sub Form :itembarcodedet2 : @@cwbarcodeeachqty and ($$number:$actualqty=0)  AND (@@HasBatchWise) and @@cwbarcodeeachqtyx and $isdeemedpositive and @@IsStockJrnl and NOT $$IsMultiGodownOn

[#Line: SJDetailsC]
Local: Field:VCH Godown : add:Sub Form :before:Mfgr SJBatchAllocations:itembarcodedet2  :@@cwbarcodeeachqty and ($$number:$actualqty=0)  AND (@@HasBatchWise) and @@cwbarcodeeachqtyx and $isdeemedpositive and @@IsStockJrnl and $$IsMultiGodownOn
add: field : cwxline

[#Field: mvchgodown]
add:Sub Form : itembarcodedet2 :@@cwbarcodeeachqty and ($$number:$actualqty=0)  AND (@@HasBatchWise) and @@cwbarcodeeachqtyx and $isdeemedpositive and @@IsStockJrnl and $$IsMultiGodownOn

[field: cwxline]
use : number field
set as : $$line
skip : yes
invisible:yes

;------------------------------------------------------------------------------
; Batch allocation detail forms and lines for batch breakup entry
;------------------------------------------------------------------------------

[Report: itembarcodedet2]
use:itembarcodedet

[Report: itembarcodedet3]
use:itembarcodedet
Local: Field: nf: ADD:table:Stockable Godown VchExtract ,Not Applicable

[Report:itembarcodedet]
Form: itembarcodedet
title : "Enter Batch-wise Breakup Details..."

[Form: itembarcodedet]
Part: itembarcodedet
on : form Accept : yes : Form Accept
on : form Accept : yes : Call : batchbarcodefill:$cwautotr:$cwautoor:$cwordue:$cwmfddt:$cwnewgodownname:$cwnewbcodeqty:$cwnewrate:$cwnewdis:$cwnewamount:#fldprtno:#fldbatch:#fldnuzero:#fldstno:$cwmrpbatch:$cwfillvalcaption1:$cwfillvalcaption2:$cwfillvalcaption3:#cwxline:#cwlogical

[Part: itembarcodedet]
Line: lnstkdetx,itembarcodedet,itembarcodedet2

;------------------------------------------------------------------------------
; Main batch breakup entry line with all batch, rate, and custom fields
;------------------------------------------------------------------------------

[Line: itembarcodedet]
option:titleopt
field :snf ,snf2,snfx,sdf,nf ,snf3,snf4,snf5,numf,numf2,numf5,numf3,numf4,cwlogical,numf6
Local: Field: nf: info:  "Godown Name"
Local: Field: numf: info: "Qty."
Local: Field: numf2: info: "Rate"
Local: Field: numf3: info: "Dis(%)"
Local: Field: numf4: info: "Amount"
Local: Field: numf5: info: "MRP"
Local: Field: sdf: info: "Mfg Dt."
Local: Field : snfx  : Info : $$LocaleString:"Due on"
Local: Field : snf : Info  : $$LocaleString:"Tracking No."
Local: Field : snf2 : Info  : $$LocaleString:"Order No."
Local: Field: snf3: info:@@cwbatchtitle1
Local: Field: snf4: info:@@cwbatchtitle2
Local: Field: snf5: info: @@cwbatchtitle3
local: field: snf3: Invisible:$$isempty:@@cwbatchtitle1 or not @@cwenablebatchfield
local: field: snf4: Invisible:$$isempty:@@cwbatchtitle2 or not @@cwenablebatchfield
local: field: snf5: Invisible:$$isempty:@@cwbatchtitle3 or not @@cwenablebatchfield
Local: Field: cwlogical: Set As:  $isdeemedpositive
Local: Field: numf6: Set As: #cwxline
Local: Field: numf6: Border: thin box
local: field: numf6: Invisible: yes
local: field: cwlogical: Invisible: yes
local: field: nf: Invisible:If @@IsNonTrackJobVchs Then NOT $$IsMultiGodownOn Else NOT $$IsMultiGodownOn AND (@@HasBatchWise OR NOT @@IsAddlTypeGodown)
local: field: NUMF3: Invisible: NOT @@WithDiscount
local: field: snf: Invisible:NOT @@HasTrackingNo
local: field: snf2: Invisible:NOT @@IsOrdersOn
Local: field: snfx: Width:8
local: field: sdf: Invisible:NOT @@HasMfgDateSet
local: field: snfx: Invisible:NOT @@IsOrdersOn
local: field: numf5: Invisible:NOT @@cwmrpenable
Local: field: sdf: Align: left
Local: field: sdf: Width:7
local: field: numf5: type: String

;------------------------------------------------------------------------------
; Additional fields and calculations for batch breakup entry
;------------------------------------------------------------------------------

[field:oddue]
use: Due Date Field
storage :cwordue
Invisible:NOT @@IsOrdersOn
Format      : "Universal Date,After:$Date"
Width:8

[Field: fillVCHBATCHMfdx]
Use         : Short Date Field
storage :cwmfddt
Invisible:NOT @@HasMfgDateSet
Format      :  "Universal Date"
width:@@shortdatewidth
set as : ##varvchdate

[#Field: VCHBATCH Mfd]
delete:Format

[Line: itembarcodedet2]
field:snf,snf2,oddue,fillVCHBATCHMfdx,nf ,snf3,snf4,snf5,numf,numf2,numf5,numf3,numf4,fillVCHBATCHMfdx
Local: Field: nf: storage:cwnewgodownname
Local: Field: numf: storage:cwnewbcodeqty
Local: Field: numf2: storage:cwnewrate
Local: Field: numf3: storage:cwnewdis
Local: Field: numf4: storage:cwnewamount
Local: Field: snf: storage:cwautotr
Local: Field: snf2: storage:cwautoor
Local: Field: numf5: storage:cwmrpbatch
Local: Field: snf6: storage:cwnewsl
Local: Field: snf3: storage:cwfillvalcaption1
Local: Field: snf4: storage:cwfillvalcaption2
Local: Field: snf5: storage:cwfillvalcaption3
Local: Field: numf4: Set As:(#numf*#numf2)- (#numf*#numf2)*#numf3/100
Local: Field: nf: Set As:if $AsMfgJrnl:VoucherType:##SVVoucherType and not $$issysname:#mvchgodown then #mvchgodown else if @@IsStockJrnl then #VCHGodown else $$value
Local: Field: nf: table:Stockable Godown VchExtract ,Not Applicable:not $$IsStockJrnl:##SVVoucherType
local: field: nf: Invisible:If @@IsNonTrackJobVchs Then NOT $$IsMultiGodownOn Else NOT $$IsMultiGodownOn AND (@@HasBatchWise OR NOT @@IsAddlTypeGodown)
local: field: NUMF3: Invisible: NOT @@WithDiscount
Local: Field: nf: Keys        : Create Godown, Alter Godown
Local: Field: nf: Variable    : SV Godown
Local: Field: snf: table:NotApplicable,VCH InTNoBG,New Number
Local: Field: snf2: table: NotApplicable,VCH PoBG ,New Number
Local: Field: snf: Show table: Always
Local: Field: snf2: Show table: Always
Local: Field: snf: Key	: Create New Name
Local: Field: snf:Trigger :New Number : $$IsSysNameEqual:NewNumber:$$EditData
Local: Field: snf:Dynamic     : ""
Local: Field: snf2:Dynamic     : ""
Local: Field: snf2: Key	: Create New Name
Local: Field: snf2:Trigger : New Number : $$IsSysNameEqual:NewNumber:$$EditData
Local: field: numf: Format: "nozero,decimal:2"
Local: field: numf2: Format: "nozero,decimal:2"
Local: field: numf3: Format: "nozero,decimal:2"
Local: field: numf4: Format: "nozero,decimal:2"
local: field: numf5: type: String
local: field: snf: Invisible:NOT @@HasTrackingNo
local: field: snf2: Invisible:NOT @@IsOrdersOn
local: field: numf5: Invisible:NOT @@cwmrpenable
local: field: snf3: Invisible:$$isempty:@@cwbatchtitle1 or not @@cwenablebatchfield
local: field: snf4: Invisible:$$isempty:@@cwbatchtitle2 or not @@cwenablebatchfield
local: field: snf5: Invisible:$$isempty:@@cwbatchtitle3 or not @@cwenablebatchfield

;------------------------------------------------------------------------------
; Line for batch number and part number prompts in batch breakup entry
;------------------------------------------------------------------------------

[Line: lnstkdetx]
field:fldprtno,fldbatchprompt,fldbatch,fldnuzero,fldstno ,testx

[System: Formula]
cwIsOutwardType : @@isOutwardType and not $$isCreditNote:##svVoucherType

[field:fldbatchprompt]
use : sp
info: "Starting Batch (to Fill) :"
invisible : not @@cwIsOutwardType
Width:0

[field : testx]
use : nf
Skip: Yes
set as: @@mybatch
invisible : @@cwIsOutwardType

[field:fldprtno]
use:snf
Set As:$partno:stockitem:$stockitemname
skip :yes
Invisible: @@cwIsOutwardType

[System: Formula]
mybatch :$$collectionfield:$BatchName:(-1):itbatch

[field:fldbatch]
use:snf
setas : if @@cwIsOutwardType then $$value else if #snfbatchdets = "" then $$stringpart:$$mybatch:($$stringlength:#fldprtno):1000 else $$stringpart:#snfbatchdets:($$stringlength:#fldprtno):1000
skip :not @@cwIsOutwardType
Invisible: not @@cwIsOutwardType

[Collection: itbatch]
type : batch
child of : $stockitemname
format : $BatchName ,10
fetch :BatchName ,stockitemname
sort:@@default:$$number:$BatchName

[System: Formula]
cwnonprimarybatch : $$number:@@cwnamestart = 0
cwnamestart:  $$stringpart:$batchname:0:2

[Function: mybatch]
returns:string
variable:svtodate:date:@@cwCMPLastVoucher
10 : if : ##svtodate<##varvchdate
12 : end if
20:return :@@mybatch

[System: Formula]
fltitsame :$stockitemname = #allocname

[field:fldnuzero]
use:numf
setas :@@cwnumzerofill
skip :yes
Invisible: yes

[field:fldstno]
use:numf
setas:@@cwbcodestnox
skip :yes
Invisible: yes

;------------------------------------------------------------------------------
; Function to generate batch name with part number and zero-fill
;------------------------------------------------------------------------------

[function : Cwmakebatch]
returns : string
variable : str : string
variable : itemline : string : #snfLineNo
10 : set : str : ##fpartno
20 :  if : ##lastbatch = 0
30: set : lastbatch : ##startingno
40 : else
50 : set : lastbatch : ##lastbatch + 1
60 : end if
70  : return : ##str + $$zerofill:($$string:##lastbatch):@@cwnumzerofill

;------------------------------------------------------------------------------
; Function to fill batch allocations for barcode/serial logic
;------------------------------------------------------------------------------

[Function: batchbarcodefill]
parameter :trno :string
parameter :ordernox :string
parameter :duedtx :DueDate
parameter :mftx :date
parameter :mygodown :string
parameter :myqty:number
parameter :myrate:number
parameter :mydiscount:number
parameter :myamount:number
PARAMETER : FPARTNO: STRING
PARAMETER : LASTBATCH : NUMBER
PARAMETER : FNUMZERO : NUMBER
PARAMETER : STARTINGNO : NUMBER
PARAMETER : mymrp : STRING
PARAMETER : capt1 : STRING
PARAMETER : capt2 : STRING
PARAMETER : capt3 : STRING
parameter : myline : number : 1
parameter : myPositive : logical : yes
VARIABLE : ctr : number : $$numitems:BatchAllocations

f011  : if : @@cwIsOutwardType
f012  : set : lastbatch : ##lastbatch - 1
f013a: set : FPARTNO : ""
f014 : end if

03a: if : not $$isstockjrnl:##SVvouchertype
03c:  while : ##ctr  >= 0
03d: delete collection object : BatchAllocations : 1 : yes
03d1: decr : ctr
03e: end while
03f: else
03g: while : $$numitems:BatchAllocations > 1
03h: delete collection object : BatchAllocations : 1 : yes
03i: end while
03z: end if

10  : set: ctr : 1
30 : for range  : ctr1 : number : 1 :  ##myqty
45 : do if : $$loopindex > 1 : insert collection object  : BatchAllocations
46 : do if : $$loopindex = 1 and ((not @@isstockjrnl) or (@@isstockjrnl and not $$IsMultiGodownOn)) : set target : BatchAllocations[1]
46a : if : $$loopindex = 1 and (@@isstockjrnl and $$IsMultiGodownOn)
46b: do if : ##myPositive : set target : InventoryEntriesIn[##myline]
46c: do if : not ##myPositive : set target : InventoryEntriesOut[##myline]
46d: set target : BatchAllocations[1]
46e: end if
50a : set value : TrackingNumber : ##trno
50b : set value : OrderNo : ##ordernox
50c : set value : OrderDueDate : ##duedtx
50d : set value : MfdOn : ##mftx
50 : set value : godownname : ##mygodown
55 : set value : cwbatchcaption1 : ##capt1
60 : set value : cwbatchcaption2 : ##capt2
65 : set value : cwbatchcaption3 : ##capt3
70 : set value : batchname  :  $$Cwmakebatch
75 : set value : billedqty : if $cwBatchQtyOne:COMPANY:##SVCURRENTCOMPANY then $$asqty:##myqty else $$asqty:1
78 : set value : Actualqty : if $cwBatchQtyOne:COMPANY:##SVCURRENTCOMPANY then $$asqty:##myqty else $$asqty:1
80 : set value : batchrate : $$asrate:##myrate
90 : set value : BatchDiscount : ##mydiscount
92 : set value : cwmrpbatch: ##mymrp
190 : if : $cwBatchQtyOne:COMPANY:##SVCURRENTCOMPANY
191 : break
192 : end if
199 : set: ctr : ##ctr + 1
200 : end for

;------------------------------------------------------------------------------
; System formulas for barcode and batch configuration
;------------------------------------------------------------------------------

[System: Formula]
autobatchFormAccept :yes
cwbarcodeeachqty:$cwbarcodeeachqty:COMPANY:##SVCURRENTCOMPANY
cwbarcodeeachqtyx:$cwbarcodeeachqty:Vouchertype:##SVVoucherType
cwnumzerofill: $cwnumzerofill:COMPANY:##SVCURRENTCOMPANY
cwbcodestnox: $cwbcodestnox:COMPANY:##SVCURRENTCOMPANY

;------------------------------------------------------------------------------
; UDF declarations for barcode and batch configuration
;------------------------------------------------------------------------------

[System: UDF]
cwbarcodeeachqty:Logical:6001
cwnumzerofill:number:6002
cwnewgodownname:string:6003
cwnewbcodeqty:number:6004
cwnewrate:number:6005
cwnewdis:number:6006
cwnewamount:number:6007
cwbcodestnox:number:6008
cwautotr:string:6009
cwautoor:string:60010
cwordue:duedate:60011
cwmfddt:date:60012
cwfillvalcaption1:string:60013
cwfillvalcaption2:string:60014
cwfillvalcaption3:string:60015
cwnewsl:string:60016

`;
export default tdl;
