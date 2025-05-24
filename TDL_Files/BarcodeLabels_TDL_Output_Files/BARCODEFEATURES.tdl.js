// Auto-generated from BARCODEFEATURES.TXT
const tdl = `
; Created By: Akshay on 2016-11-12 10:30, ID: 

; ==================== COMPANY FEATURES CONFIGURATION ================================
; This section defines the configuration for barcode and part number features at the company level.
; It includes version-specific switches and UI customizations based on product release.

[#Form: Company Operations]
                ; Switch for different product versions - determines which form to use based on product release
                Switch   : cwAutoPartNosLowerRel  : cwAutoPartNosNotFor3.2  : ($$Number:$$ProdInfo:ProdReleaseAsStr) < 3.2
                Switch   : cwAutoPartNosCurrenRel : cwAutoPartNosFor3.2     : ($$Number:$$ProdInfo:ProdReleaseAsStr) >= 3.2


;; {12.Nov.16 15:42} height:100% page
;; {12.Nov.16 15:42} Full Width : yes

; ==================== FORM DEFINITIONS FOR OLDER PRODUCT VERSIONS ==================
; Configuration for versions prior to 3.2

[!Form : cwAutoPartNosNOTFor3.2]
; Adds customization option to the left panel of company features
Local: Part : CMP AccFeat Left : Add : Line: At End:CMPcwEnableCustomization
height:100% page

; ==================== FORM DEFINITIONS FOR NEWER PRODUCT VERSIONS ==================
; Configuration for versions 3.2 and above

[!Form : cwAutoPartNosFor3.2]
; Adds customization option to the TallyShop features panel
Local  : Part  : CMP TallyShopFeatures Left: Add : Line:At End :CMPcwEnableCustomization  ;;,cwgapline1,cwAutoPartNosConfig,cwgapline2 +
;; {12.Nov.16 15:35} ,cwb1,cwgapline3,cwCostTracking,cwgapline4,cwCustomFldsConfig,cwgapline5,lncapbautodet,cwgapline6,cwAutoBatchFill,cwgapline7 +
;; {12.Nov.16 15:35} ,lncmpbarcodefrombatch,cwgapline9,lnbcodeforeachqty,lncmpbatchfieldcaption,cwgapline10

height:100% page

; ==================== PART DEFINITION FOR TALLYSHOP FEATURES ======================
; Defines the left panel for TallyShop features

[#Part: CMP TallyShopFeatures Left]
Add:Line:CMPcwEnableCustomization

; ==================== BARCODE MODULE ENABLEMENT OPTION ============================
; Defines the line that contains the checkbox to enable the barcode module

[Line : CMPcwEnableCustomization]
Field : Long Prompt, CMPcwEnableCustomization
Local : Field : Long Prompt: Info: "Enable Barcode Module"  + " ?"
;; {26.Feb.19 18:10} Local : Field : Long Prompt1: Info: "Enable "+ @@cwCustomizationStrX + " ?"
Space Top : 1

; ==================== BARCODE FEATURES REPORT DEFINITION ==========================
; Defines the report for barcode features configuration

[Report: frmbarcodeapplocation]
title :"Barcode Features"
Form: frmbarcodeapplocation

; ==================== BARCODE FEATURES FORM DEFINITION ============================
; Main form for barcode configuration settings

[Form:frmbarcodeapplocation ]
Part: frmbarcodeapplocation
height:92% page
Full Width : yes

; ==================== BARCODE FEATURES PART DEFINITION ============================
; Defines all the lines that make up the barcode features configuration panel

[Part:frmbarcodeapplocation ]
line: lnbcodefeaturestit,cwgapline8,cwBarCodeExePath ,cwgapline1,cwAutoPartNosConfig,cwgapline2 +
,cwb1,cwgapline3,cwCostTracking,cwgapline4,cwCustomFldsConfig,cwbyfillqty,cwgapline5,lnpriceincrate,cwincmrpline,cwgapline12,+
lncapbautodet,cwgapline6,cwAutoBatchFill,cwgapline7 +
,lncmpbarcodefrombatch ,cwgapline9,lnbcodeforeachqty,cwgapline10,lncmpbatchfieldcaption,cwgapline11 , +
lnMiscDetailstitle,lnmiscdetails1,lnmiscdetails2

; ==================== BARCODE FEATURES TITLE LINE ================================
; Defines the title line for the barcode features section

[Line: lnbcodefeaturestit]
field:fwfc
Local: Field: fwfc: info: "Barcode Features"
Local: Field: fwfc: Style: Normal Bold
Local: Field: fwfc: Border: thin bottom

; ==================== BARCODE APPLICATION PATH CONFIGURATION =====================
; Defines the field for specifying the barcode application executable path

[line : cwBarCodeExePath]
         field : Long prompt,nf,nf2
         Local: Field: nf2: Skip: Yes
         Local: Field: Long prompt: info: "App Location(Full EXE Path) :"
         Local: Field: nf: storage: cwAppLocation
         local : field : nf : full width : yes
         Local: field: nf: max:500
         local: field: nf: Case: Normal

; ==================== PRICE RATE CONFIGURATION OPTIONS ===========================
; Options for setting inclusive rates from price lists

[Line:lnpriceincrate]
 field : Long prompt,cwlogical
Local: Field: Long prompt: info: "Set Inc. Rate from Price List ?"
Local: Field: cwlogical: storage:cwisincrate

; ==================== BARCODE RATE CONFIGURATION =================================
; Option for setting barcode rate in inclusive tax

[line:cwincmrpline]
 field : Long prompt,cwlogical
Local: Field: Long prompt: info: "Set Barcode Rate in Rate Incl. Tax?"
Local: Field: cwlogical: storage:cwsetincrate

; ==================== AUTO PART NUMBER CONFIGURATION =============================
; Configuration for automatic part number generation with zero prefilling

[Line : cwAutoPartNosConfig]
Field : cwAutoPartNosConfigTitle,cwAutoPartNosConfig,medium prompt,number field,SHORT PROMPT,CWSTARTINGNUMBER,cwallowbctitle,cwallowbc
local: field: medium prompt: info : "Prefill with Zeros :"

Local: Field: number field: storage: cwNumZeros
Local: Field: number field: inactive : not #cwAutoPartNosConfig
Local: Field: number field: set as : if $$value = 0 then 5 else $$value
Local: Field: number field: set always : yes
Local: Field: SHORT PROMPT: info: "Starting No:"
Local: field: number field: Width:@@shortnamewidth

; ==================== AUTO BATCH FILL CONFIGURATION ==============================
; Configuration for automatic batch creation and numbering

[line : cwAutoBatchFill]
Field : cwAutoPartNosConfigTitle,cwAutoPartNosConfig,medium prompt,number field,cwLastCartonSerial,cwLastCarton ;;cwPrefixPartnostr,cwPrefixPartno,
local: field: medium prompt: info : "No. of Zeros to Prefill :"

Local: Field: cwAutoPartNosConfigTitle: info: "Auto Create Batch ?"
Local: Field: cwAutoPartNosConfig: storage: cwAutoCreateBatch
Local: Field: number field: storage: cwNumZerosBatch
Local: Field: number field: inactive : not #cwAutoPartNosConfig
Local: Field: number field: set as : if $$value = 0 then 5 else $$value
Local: Field: number field: set always : yes
Local: Field: cwLastCartonSerial: Style: Normal
Local: field:cwLastCartonSerial : Width:20

; ==================== BATCH DETAILS SECTION HEADER ==============================
; Header for the batch details section

[Line: lncapbautodet]
field:sp
Local: Field: sp: info: "Batch Details :"
Local: Field: sp: Style: Normal Bold
Local: field: sp: Width:14
Local: Field: sp: Border: thin bottom

; ==================== BARCODE MODULE ENABLEMENT FIELD ===========================
; Field definition for enabling the barcode customization module

[Field : CMPcwEnableCustomization]
Use : Logical Field
Storage :cwEnableCustomization
set always : yes
SubForm : frmbarcodeapplocation: $$value

; ==================== SKIPPED BARCODE PRINTING OPTION ===========================
; Option to print skipped barcodes

[field:cwallowbctitle]
use : medium prompt
info: "Print Skipped Barcode ?"
Width: 22

; ==================== LAST CARTON NUMBER FIELD ==================================
; Field for tracking the last used carton number

[field:cwLastCarton]
use : number field
storage : cwLastCarton
skip : if not #cwAutoPartNosConfig then yes else not @@cwOwnerLevel
;; {01.Apr.22 14:15} border : thick box

; ==================== SKIPPED CODES PRINTING OPTION =============================
; Logical field for printing skipped codes

[field : cwallowbc]
use : logical field
storage:cwPrintSkippedCodes

; ==================== PREVIOUS BATCH LABEL ======================================
; Label for displaying previous batch information

[field : cwLastCartonSerial]
use : sp
info: "Previous Batch :"

; ==================== PART NUMBER ATTACHMENT LABEL ==============================
; Label for part number attachment option

[field:cwPrefixPartnostr]
use : short name field
info:"Attach PartNo:"

; ==================== PART NUMBER ATTACHMENT FIELD ==============================
; Field for configuring how part numbers are attached

[field : cwPrefixPartno]
use : short name field
storage : cwPartNoAttach
table : cwPartNoAttach,Not Applicable

; ==================== PART NUMBER ATTACHMENT MODE COLLECTION ====================
; Collection defining the modes for attaching part numbers

[collection : cwPartNoAttach]
title :"Part No Attach Mode"
listname : @@cwPartNoasPrefix
listname : @@cwPartNoasSuffix

; ==================== AUTO PART NUMBER CONFIGURATION TITLE ======================
; Title for the auto part number generation option

[Field: cwAutoPartNosConfigTitle]
Use : long prompt
info: "Generate Auto Part No's ?"

; ==================== AUTO PART NUMBER ENABLEMENT FIELD =========================
; Field for enabling automatic part number generation

[Field: cwAutoPartNosConfig]
Use: logical field
;Set As: $cwAutoPartNosEnabled
storage: cwAutoPartNosEnabled

; ==================== STARTING NUMBER FIELD =====================================
; Field for setting the starting number for barcode generation

[field : CWSTARTINGNUMBER]
use : short name field
storage : cwBarCodeStartingNo
Set As: if $$isempty:$$value then 1 else $$value
inactive : not #cwAutoPartNosConfig

; ==================== BARCODE BY FILL QUANTITY CONFIGURATION ====================
; Configuration for generating barcodes based on fill quantity

[line : cwbyfillqty]
field : snf,cwlogical ,snf3,snf2, cwlogical2,snf4, cwlogical3
Local: Field: snf: info: "Generate Barcode by Fill Qty"
Local: Field: cwlogical: storage: cwbarcodebyfillqty
Local: Field: cwlogical2: storage: cwbarcodebyfillqtyPrimary
Local: Field: snf2: info: "Set in Primary Qty:"
local: field: cwlogical2: inactive: not #cwlogical
Local: field: snf: Width: 30
Local: field: snf2: Width: 0
Local: Field: snf3: info: " (Enter Fill Qty in Item Master)"
Local: Field: snf3: Style: small
Local: field: snf3: Width:0

Local: Field: snf4: info: "Enter Auto Fill Qty in Item Master?"
Local: Field: cwlogical3: storage: cwAcceptAutoFillQtyInItemMaster

; ==================== SYSTEM USER-DEFINED FIELDS ================================
; Definition of user-defined fields for storing configuration values

[system : udf]
cwAutoPartNosEnabled : logical : 171 ;; change this value.
cwNumZeros : number : 171
cwBarCodeStartingNo : string : 175
cwSkipBarcodeLabelGeneration: logical : 102

cwAutoCreateBatch : logical : 1020
cwNumZerosBatch : number : 1025
cwItemAutoCreateBatch : logical : 1022
 cwPrintSkippedCodes  : logical : 1023
 cwLastCarton : number : 1024
 cwPartNoAttach : string : 1024
 cwVchHasBatchFill :logical : 1025
cwVchHasBatchFillQty : logical : 1026
cwbarcodebyfillqty : logical : 1027
cwbarcodebyfillqtyPrimary : logical : 2028

; ==================== SYSTEM FORMULAS FOR CONFIGURATION VALUES =================
; Formulas for retrieving configuration values from the company settings

[System: Formula]
cwAutoPartNosEnabled :  $cwAutoPartNosEnabled:COMPANY:##SVCURRENTCOMPANY
cwNumZeros : $cwNumZeros:COMPANY:##SVCURRENTCOMPANY
cwBarCodeStartingNo : $cwBarCodeStartingNo:COMPANY:##SVCURRENTCOMPANY

cwAutoCreateBatch : $cwAutoCreateBatch:COMPANY:##SVCURRENTCOMPANY
cwNumZerosBatch : $cwNumZerosBatch:COMPANY:##SVCURRENTCOMPANY

cwPartNoasPrefix :"Part No as Prefix"
cwPartNoasSuffix :"Part No as Suffix"
cwCustomizationEnabled : ($cwEnableCustomization:Company:##SVCurrentCompany)
cwCustomizationStrx  : if $$isempty:@@cwCustomizationStr then "Custmization" else @@cwCustomizationStr
cwAppLocation : $cwAppLocation:COMPANY:##SVCURRENTCOMPANY
isincrate : $cwisincrate:COMPANY:##SVCURRENTCOMPANY
issetincrate : $cwsetincrate:COMPANY:##SVCURRENTCOMPANY
cwbarcodebyfillqty : $cwbarcodebyfillqty:COMPANY:##SVCURRENTCOMPANY
cwbarcodebyfillqtyPrimary : $cwbarcodebyfillqtyPrimary:COMPANY:##SVCURRENTCOMPANY

;; group

; Formula for retrieving stock group specific barcode starting number
cwBarCodeStartingNoGroup : $cwBarCodeStartingNo:stockgroup:#stkiparent

; Formula for determining number of zeros based on stock group settings
cwNumZeros1 : if not $$isempty:#stkiparent and $cwGenBarcodeLabelStockGroupWise:stockgroup:#stkiparent then $cwNumZeros:stockgroup:#stkiparent else @@cwNumZeros

; ==================== GAP LINE DEFINITIONS ======================================
; Definitions for gap lines used for spacing in the UI

[Line: cwgapline]
field:snf,fwf
Local: Field: snf: Set As:""
Local: Field: fwf: Set As:""
Local: Field: default: Skip: Yes

[Line:cwgapline1]
use:cwgapline

[Line:cwgapline2]
use:cwgapline

[Line:cwgapline3]
use:cwgapline

[Line:cwgapline4]
use:cwgapline

[Line:cwgapline5]
use:cwgapline

[Line:cwgapline6]
use:cwgapline

[Line:cwgapline7]
use:cwgapline

[Line:cwgapline8]
use:cwgapline

[Line:cwgapline9]
use:cwgapline

[Line:cwgapline10]
use:cwgapline

[Line:cwgapline11]
use:cwgapline

[Line:cwgapline12]
use:cwgapline


; ==================== STOCK ITEM BATCH & GROUP CHANGES =========================
; Configuration for stock groups and batch handling



[#form : stock group]
add : option : ShowBarCodeOption : @@cwAutoPartNosEnabled

; ==================== BARCODE OPTION FOR STOCK GROUPS ===========================
; Adds barcode options to stock group form when barcode module is enabled

[!form : ShowBarCodeOption]
add : part : SkipBarCodeLabelGeneration

; ==================== BARCODE LABEL GENERATION SETTINGS =========================
; Part containing barcode label generation settings for stock groups

[!part : SkipBarCodeLabelGeneration]
line : SkipBarCodeLabelGeneration
line : SkipBarCodeLabelGeneration2
line : SkipBarCodeLabelGeneration2a
line : SkipBarCodeLabelGeneration3

; ==================== SKIP BARCODE LABEL GENERATION OPTION =====================
; Option to skip barcode label generation for specific stock groups

[line : SkipBarCodeLabelGeneration]
field : mp,cwlogical
Local: Field: mp: info: "Skip BarCode Label Generation?"
Local: Field: cwlogical: storage: cwSkipBarcodeLabelGeneration
Local: field: mp: Width:0 ;; 4 inch

; ==================== STOCK GROUP WISE BARCODE GENERATION ======================
; Option to generate barcodes specific to stock groups

[line : SkipBarCodeLabelGeneration2]
field : mp,cwlogical
Local: Field: mp: info: "Generate Stock Group wise BarCode Labels?"
Local: Field: cwlogical: storage: cwGenBarcodeLabelStockGroupWise
Local: field: mp: Width:0 ;; 4 inch

local: field: cwlogical: inactive: $cwSkipBarcodeLabelGeneration

; ==================== STOCK GROUP PART NUMBER INFORMATION ======================
; Informational text about stock group wise part numbers

[line : SkipBarCodeLabelGeneration2a]
field : fwf
Local: Field: fwf: info: "(To Generate Stock Group wise Part No's)"
Local: field: fwf: Width:0 ;; 4 inch
Local: Field: fwfw: Style: italics

; ==================== STOCK GROUP STARTING NUMBER CONFIGURATION ================
; Configuration for starting number and zero prefilling for stock groups

[line : SkipBarCodeLabelGeneration3]
field : snf,cwstartingnumber,short prompt,numf9 ;;number field

local: field: snf: inactive: $cwSkipBarcodeLabelGeneration
local: field: cwstartingnumber: inactive: if $cwSkipBarcodeLabelGeneration then yes else not $cwGenBarcodeLabelStockGroupWise
local: field: numf9: inactive: if $cwSkipBarcodeLabelGeneration then yes else not $cwGenBarcodeLabelStockGroupWise
Local: Field: snf: info: "Starting Number"

Local: Field: numf9: storage: cwNumZeros

Local: Field: numf9: set as : if $$value = 0 then 5 else $$value
local: field: cwstartingnumber: setas : if $$value = 0 then 1 else $$value

Local: Field: numf9: set always : yes
Local: Field: SHORT PROMPT: info: "Prefill Zeros:"
Local: field: numf9: Width:@@shortnamewidth


; ==================== ITEM AUTO INCREMENT PART NUMBER ==========================
; Configuration for automatic part number incrementation for stock items

[#form : stock item]
local : field : STKI PartNo : set as : if $$isempty:$$Value and not $$isfieldedited and @@notfx then (if @@itmaLIASCHK then @@getNewItmAliasValue else $$value) else $$Value
local : field : STKI PartNo : set always : yes
;add: bottom part : cwb1

; ==================== BARCODE DISPLAY PART =====================================
; Part for displaying barcode information in stock item form

[part : cwb1]
line : cwb1
invisible : not @@cwCustomizationEnabled

; ==================== BARCODE DISPLAY LINE =====================================
; Line showing previous and next barcode values

[line: cwb1]
field: long prompt,nf,snf2,nf2
Local: Field: long prompt: info:"Previous Bar Code :"
Local: Field: snf2: info:"Next Bar Code :"
Local: Field: nf: Set As: if $$numitems:newItemColl = 0 then "" else $$COLLECTIONFIELD:$partno1x:1:newItemColl
Local: Field: nf2: Set As: if $$numitems:newItemColl = 0 then @@GetcwInitPartNo else $$cwxx:$cwNumZeros
Local: Field: nf: Skip: Yes
Local: Field: nf2: Skip: Yes
Local: Field: nf: Border: thin box ;;left right
Local: Field: nf2: Border: thin box ;;left right

; ==================== ZERO-FILLED PART NUMBER FUNCTION =========================
; Function to generate zero-filled part numbers

[function : cwxx]
parameter : a : number ;;: #numf9
;; {03.Dec.18 15:48} 000 : log : ##a
;; {03.Dec.18 15:48} 01: log : $$zerofill:($$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1):##a
20 : return : $$zerofill:($$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1):##a

; ==================== SYSTEM FORMULAS FOR PART NUMBER GENERATION ===============
; Formulas for checking conditions and generating new part numbers

[System :Formula]
itmaLIASCHK : @@cwAutoPartNosEnabled and $$line = 1 and ($$increatemode or $$isempty:$$Value)
getNewItmAliasValue : $$cwgenbarcode ;; $$zerofill:@@cwnewno:@@cwNumZeros1 ;; $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1

; ==================== BARCODE GENERATION FUNCTION ==============================
; Function to generate barcodes with proper zero filling

[function :cwgenbarcode]
variable   : mynext : number : @@cwnewno
;; {03.Dec.18 15:41} 00 : log : "---"
;; {03.Dec.18 15:41} 10 :  log : @@cwnewno
;; {03.Dec.18 15:41} 20 : log : @@cwNumZeros1
;; {03.Dec.18 15:41} 30 : log :  $$zerofill:@@cwnewno:@@cwNumZeros1
;; {03.Dec.18 15:41} 35 : log :  $$number:$$zerofill:@@cwnewno:@@cwNumZeros1 > 0
40 : if : $$number:$$zerofill:@@cwnewno:@@cwNumZeros1 > 0
41 : return : $$zerofill:@@cwnewno:@@cwNumZeros1 ;;$$zerofill:@@cwnewno:@@cwNumZeros1
42 : end if
;; {03.Dec.18 15:41} 45 : log :  @@cwnewno
50 : return :@@cwnewno

; ==================== COLLECTION FOR TRACKING ITEM PART NUMBERS ================
; Collection to track and sort stock items by part number

[collection : newItemColl]
       type : Stockitem
     FORMAT : $partno1x,20 ;;@@cwpartycodeX,25
       SORT : @@DEFAULT : -$$number:$partno1x
      fetch : partno1x
      filter : notfx
      
      option : ofSpecificGroup : not $$isempty:#stkiparent and $cwGenBarcodeLabelStockGroupWise:stockgroup:#stkiparent
      
      [!collection : ofSpecificGroup]
      child of : #stkiparent

      [System : Formula]
        notfx : not $cwSkipBarcodeLabelGeneration:stockgroup:$parent ;;$partno1x starting with "T"
;; {18.Nov.17 13:54}       cwnewno : if $$numitems:newItemColl = 0 then @@GetcwInitPartNo else $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1
      cwnewno : if $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl = 0 then @@GetcwInitPartNo else $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1
   BNewPartNo : $$zerofill:##mylastno:@@cwNumZeros
;; {02.Nov.17 17:21} for group wise part no    GetcwInitPartNo : if $$isempty:@@cwBarCodeStartingNo then 1 else @@cwBarCodeStartingNo
GetcwInitPartNo : if not $$isempty:#stkiparent and $cwGenBarcodeLabelStockGroupWise:stockgroup:#stkiparent then @@cwBarCodeStartingNogroup else  if $$isempty:@@cwBarCodeStartingNo then 1 else @@cwBarCodeStartingNo

; ==================== NEXT PART NUMBER GENERATION FUNCTION =====================
; Function to calculate the next part number

[function : cwNextGen]
; $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1
10 : log : $$COLLECTIONFIELD:$partno1x:1:newItemColl
22 : log :  $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1
23 : return : $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1

; ==================== STOCK ITEM FORM BUTTON ADDITION ==========================
; Adds auto-fill part number button to stock item form

;;[#menu : stock items] ;;Inventory Info.]
[#Form: Stock Item]	
add : button : AutoFillPartNo

; ==================== AUTO FILL PART NUMBER BUTTON =============================
; Button definition for auto-filling part numbers

[Button : AutoFillPArtNo]
title :"Part No. Fill"
key :f11 
action: call : AutoFillPartNos

; ==================== STOCK GROUP PART NUMBER BUTTON ===========================
; Button for stock group specific part number filling

[Button : stkgrpAutoFillPartNo]
title :"Stk Part No. Fill"
key : f8
action: call : AutoFillPartNos
inactive : not $cwGenBarcodeLabelStockGroupWise

; ==================== STOCK GROUP FORM MODIFICATIONS ===========================
; Modifications to the stock group form for parent field handling

[#form : stock group]
;; {18.Nov.17 13:59} add : button :  stkgrpAutoFillPartNo
local : line : mstparent : add : field : stkiparent
local : line : mstparent : local: field : stkiparent : delete : storage
local : line : mstparent : local: field : stkiparent : delete : variable
local : line : mstparent : local: field : stkiparent : skip : yes
local : line : mstparent : local: field : stkiparent : border : thick box
local : line : mstparent : local: field : stkiparent : set as : $name
local : line : mstparent : local: field : stkiparent : invisible : yes

; ==================== AUTO FILL PART NUMBERS FUNCTION ==========================
; Function to automatically fill part numbers for stock items

[function : AutoFillPartNos]
;; {17.Nov.17 18:49} 0000 : log : $$numitems:newItemColl
;; {17.Nov.17 18:49} 0001 : log : @@cwnewno

;x111  : log : if not $$isempty:#stkiparent and $cwGenBarcodeLabelStockGroupWise:stockgroup:#stkiparent then @@cwBarCodeStartingNogroup else  if $$isempty:@@cwBarCodeStartingNo then 1 else @@cwBarCodeStartingNo
;x123 : log : @@cwBarCodeStartingNo

  01xx : QueryBox:"Auto Fill Part Nos?":Yes:No
  02xx : do if : not $$lastresult : continue
  variable : myLastNo : number : @@cwnewno
  variable : totctr : number : $$numitems:MyNewItems
  
;000  : log : ##mylastno ;;$$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl ;;$$numitems:newItemColl ;;##mylastno
;001  : log : if $$numitems:newItemColl = 0 then 5 else 6 ;;@@GetcwInitPartNo else $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1
;0022 : return

    05 : start progress : ##totctr : "Generating Part Nos" : "" : "Please Wait ..."
    10 : walk collection :  MyNewItems

    ; Check if part number already exists and increment until finding an unused one
    12 : if  : not $$isempty:$(stockitem,@@BNewPartNo).mailingname
    13 : While : not $$isempty:$(stockitem,$$zeroFill:##mylastno:@@cwNumZeros).mailingname
;    13a : Querybox:@@BNewPArtNo:yes:no
    15 : set : myLastno : ##mylastno + 1
    16 : end while
    17 : end if

    ; Modify the stock item to set the new part number
    20 : modify object : (stockitem,$name).mailingname[1].mailingname : @@BNewPartNo
    30 : set : myLastno : ##mylastno + 1
    40 : show progress : $$loopindex

    100 : end walk
    120 : end  progress

    ; Collection of stock items that need part numbers
    [collection : MyNewItems]
    use : Stockitem
    fetch : partno1x
    filter : myPartEmpty

    [System: Formula]
    myPartEmpty : if $cwSkipBarcodeLabelGeneration:stockgroup:$parent then no else $$isempty:$partno1x
    
    cwitmbelogrp : $$isobjectbelongsto:stockgroup:$parent:##SStockGroup
    


    
    

; ==================== PART NUMBER REQUIREMENT CONFIGURATION ====================
; Configuration to make part numbers mandatory when barcode module is enabled

[#Part: STKI Basic]
Option      : STKIWithPartNos     : @@cwAutoPartNosEnabled or ##MSTHasPartNos OR ##UsePartNumbers

; ==================== BATCH AUTO-FILL CONFIGURATION ============================
; Configuration for automatic batch creation and filling

[#Part: STKI Batch]
add : line : after : STKI Batchable : cwAutoFillBatch,cwAutoFillBatchVchQty ;;,cwAutoFillBatchVchQtyInwards

; ==================== AUTO CREATE BATCHES OPTION ===============================
; Option to automatically create batches for stock items

[line : cwAutoFillBatch]
field : medium prompt, cwlogical
Local: Field: medium prompt: info: "Auto Create Batches?"
Local: Field: cwlogical: storage: cwItemAutoCreateBatch
local: field: default: inactive: if not @@cwAutoCreateBatch then yes else not #STKIBatchable
Local: Field: cwlogical: Set As: if not @@cwAutoCreateBatch then no else $$value

;; {13.Apr.18 22:18} Local: Field: default: Color : blue

; ==================== AUTO FILL QUANTITY CONFIGURATION =========================
; Configuration for automatically filling quantity in outward vouchers

[line: cwAutoFillBatchVchQty]
field : medium prompt,cwlogical2,sp,numf
Local: Field: cwlogical2: storage: cwVchHasBatchFillQty
Local: Field: medium prompt: info: "Auto Fill Qty (in Outward ):"
;; {30.Jul.13 16:43} local: field: cwlogical2: inactive: if not @@cwAutoCreateBatch then yes else not #cwlogical
Local: Field: cwlogical2: Set As: if not @@cwAutoCreateBatch then no else $$value
;; {13.Apr.18 22:19} Local: Field: default: Color : blue
Local: Field: sp: Set As:"Item Qty:"
Local: Field: numf: storage:cwAutoQuantity

invisible : not $cwAcceptAutoFillQtyInItemMaster:COMPANY:##SVCURRENTCOMPANY

; ==================== AUTO FILL QUANTITY FOR INWARDS ===========================
; Configuration for automatically filling quantity in inward vouchers

[line : cwAutoFillBatchVchQtyInwards]
use : cwAutoFillBatchVchQty
Local: Field:medium prompt : info: "Auto Fill Qty (in Inward ):"
delete : field : sp,numf
Local: Field: cwLogical2: storage: cwVchHasBatchFillQtyInward

; ==================== SKIPPING QUANTITY FIELD CONFIGURATION ===================
; Configuration to skip quantity fields when auto-fill is enabled

[System: Formula]
cwSkipBatchFormula : @@cwAutoCreateBatch and $cwVchHasBatchFillQty:stockitem:$stockitemname and @@IsOutwardType

[#Line: STKVCH Batch2]
add : option : cwSkipBatchFlds : @@cwSkipBatchFormula

; ==================== SKIP BATCH FIELDS CONFIGURATION =========================
; Configuration to skip batch fields when auto-fill is enabled

[!line : cwSkipBatchFlds]
;;Right Fields: VCHBATCH Godown, VCHBATCH Name, +
;;VCHBATCH ActualQty, VCHBATCH BilledQty, VCHBATCH Rate, VCHBATCH RateUnits, VCHBATCH ItemRate, VCHBATCH Discount, VCHBATCH ItemDiscount, VCHBATCH Value, VCHBATCH AddlValue

Local: Field: VCHBATCH ActualQty: Skip: Yes
Local: Field: VCHBATCH BilledQty: Skip: yes
;; {05.Jun.15 12:08} Local: Field: VCHBATCH BilledQty: Set As: $cwAutoQuantity:stockitem:$stockitemname  ;;if $$isempty:$cwAutoQuantity:stockitem:$stockitemname then $cwAutoQuantity:stockitem:$stockitemname else $$value

; ==================== MISCELLANEOUS DETAILS SECTION ===========================
; Configuration for miscellaneous barcode-related settings

[line:lnMiscDetailstitle]
 use : lncapbautodet
 Local: Field: sp: info: "Misc Details:"
 
 [line:lnmiscdetails1]
 field: sp,cwlogical
 Local: Field: sp: info: "Show Party Code (Ledger Alias) during Entry?"
 Local: Field: cwlogical: storage: cwShowPartyAliasinEntry
 Local: field: sp: Width:0
 
 [line : lnmiscdetails2]
 field : sp,cwlogical
 Local: Field: sp: info: "Barcode Template by Voucher Type:"
 Local: Field: sp: width: 0
 Local: Field: cwlogical: storage: cwBarcodeTemplatebyVchType
 
 
  [System: Formula]
  cwShowPartyAliasinEntry :  $cwShowPartyAliasinEntry:COMPANY:##SVCURRENTCOMPANY

`;
export default tdl;
