// Auto-generated from BARCODEFEATURES.TXT
const tdl = `
; Created By: Akshay on 2016-11-12 10:30, ID: 

; ====================  "Comapny Features Changes"  --------------------------------
; This section defines company-level features and configurations for the barcode module

[#Form: Company Operations]
                ; Switch statements to handle different product release versions
                Switch   : cwAutoPartNosLowerRel  : cwAutoPartNosNotFor3.2  : ($$Number:$$ProdInfo:ProdReleaseAsStr) < 3.2
                Switch   : cwAutoPartNosCurrenRel : cwAutoPartNosFor3.2     : ($$Number:$$ProdInfo:ProdReleaseAsStr) >= 3.2


;; {12.Nov.16 15:42} height:100% page  ; Commented out height setting
;; {12.Nov.16 15:42} Full Width : yes  ; Commented out width setting

; Form definition for product versions below 3.2
[!Form : cwAutoPartNosNOTFor3.2]

Local: Part : CMP AccFeat Left : Add : Line: At End:CMPcwEnableCustomization  ; Adds customization line to accounting features
height:100% page  ; Sets form height to full page

; Form definition for product versions 3.2 and above
[!Form : cwAutoPartNosFor3.2]
Local  : Part  : CMP TallyShopFeatures Left: Add : Line:At End :CMPcwEnableCustomization  ;;,cwgapline1,cwAutoPartNosConfig,cwgapline2 +  ; Adds customization line to TallyShop features
;; {12.Nov.16 15:35} ,cwb1,cwgapline3,cwCostTracking,cwgapline4,cwCustomFldsConfig,cwgapline5,lncapbautodet,cwgapline6,cwAutoBatchFill,cwgapline7 +  ; Commented out additional lines
;; {12.Nov.16 15:35} ,lncmpbarcodefrombatch,cwgapline9,lnbcodeforeachqty,lncmpbatchfieldcaption,cwgapline10  ; Commented out more lines

height:100% page  ; Sets form height to full page

; Adds customization line to TallyShop features part
[#Part: CMP TallyShopFeatures Left]
Add:Line:CMPcwEnableCustomization  ; Adds the barcode module enablement line


; Line definition for enabling barcode module
[Line : CMPcwEnableCustomization]
Field : Long Prompt, CMPcwEnableCustomization  ; Defines fields for the line
Local : Field : Long Prompt: Info: "Enable Barcode Module"  + " ?"  ; Sets the prompt text
;; {26.Feb.19 18:10} Local : Field : Long Prompt1: Info: "Enable "+ @@cwCustomizationStrX + " ?"  ; Commented out alternative prompt
Space Top : 1  ; Adds space above the line


; Report definition for barcode application location
[Report: frmbarcodeapplocation]
title :"Barcode Features"  ; Sets the report title
Form: frmbarcodeapplocation  ; Specifies the form to use

; Form definition for barcode application location
[Form:frmbarcodeapplocation ]
Part: frmbarcodeapplocation  ; Specifies the part to use
height:92% page  ; Sets form height to 92% of page
Full Width : yes  ; Sets form to full width


; Part definition for barcode application location with multiple lines
[Part:frmbarcodeapplocation ]
line: lnbcodefeaturestit,cwgapline8,cwBarCodeExePath ,cwgapline1,cwAutoPartNosConfig,cwgapline2 +  ; First set of lines
,cwb1,cwgapline3,cwCostTracking,cwgapline4,cwCustomFldsConfig,cwbyfillqty,cwgapline5,lnpriceincrate,cwincmrpline,cwgapline12,+  ; Second set of lines
lncapbautodet,cwgapline6,cwAutoBatchFill,cwgapline7 +  ; Third set of lines
,lncmpbarcodefrombatch ,cwgapline9,lnbcodeforeachqty,cwgapline10,lncmpbatchfieldcaption,cwgapline11 , +  ; Fourth set of lines
lnMiscDetailstitle,lnmiscdetails1,lnmiscdetails2  ; Final set of lines

; Title line for barcode features
[Line: lnbcodefeaturestit]
field:fwfc  ; Defines field for the line
Local: Field: fwfc: info: "Barcode Features"  ; Sets the title text
Local: Field: fwfc: Style: Normal Bold  ; Sets bold style for the title
Local: Field: fwfc: Border: thin bottom  ; Adds bottom border to the title



; Line definition for barcode application path
[line : cwBarCodeExePath]
         field : Long prompt,nf,nf2  ; Defines fields for the line
         Local: Field: nf2: Skip: Yes  ; Skips the second field
         Local: Field: Long prompt: info: "App Location(Full EXE Path) :"  ; Sets the prompt text
         Local: Field: nf: storage: cwAppLocation  ; Links field to storage variable
         local : field : nf : full width : yes  ; Sets field to full width
         Local: field: nf: max:500  ; Sets maximum length to 500
         local: field: nf: Case: Normal  ; Sets normal case for input

; Line definition for price inclusion in rate
[Line:lnpriceincrate]
 field : Long prompt,cwlogical  ; Defines fields for the line
Local: Field: Long prompt: info: "Set Inc. Rate from Price List ?"  ; Sets the prompt text
Local: Field: cwlogical: storage:cwisincrate  ; Links field to storage variable


; Line definition for inclusive rate in barcode
[line:cwincmrpline]
 field : Long prompt,cwlogical  ; Defines fields for the line
Local: Field: Long prompt: info: "Set Barcode Rate in Rate Incl. Tax?"  ; Sets the prompt text
Local: Field: cwlogical: storage:cwsetincrate  ; Links field to storage variable




; Line definition for auto part numbers configuration
[Line : cwAutoPartNosConfig]
Field : cwAutoPartNosConfigTitle,cwAutoPartNosConfig,medium prompt,number field,SHORT PROMPT,CWSTARTINGNUMBER,cwallowbctitle,cwallowbc  ; Defines fields for the line
local: field: medium prompt: info : "Prefill with Zeros :"  ; Sets the prompt text for zero prefill

Local: Field: number field: storage: cwNumZeros  ; Links field to storage variable
Local: Field: number field: inactive : not #cwAutoPartNosConfig  ; Disables field when auto part numbers not enabled
Local: Field: number field: set as : if $$value = 0 then 5 else $$value  ; Sets default value of 5 if empty
Local: Field: number field: set always : yes  ; Always applies the set as condition
Local: Field: SHORT PROMPT: info: "Starting No:"  ; Sets the prompt text for starting number
Local: field: number field: Width:@@shortnamewidth  ; Sets field width based on formula



; Line definition for auto batch fill configuration
[line : cwAutoBatchFill]
Field : cwAutoPartNosConfigTitle,cwAutoPartNosConfig,medium prompt,number field,cwLastCartonSerial,cwLastCarton ;;cwPrefixPartnostr,cwPrefixPartno,  ; Defines fields for the line
local: field: medium prompt: info : "No. of Zeros to Prefill :"  ; Sets the prompt text for zero prefill

Local: Field: cwAutoPartNosConfigTitle: info: "Auto Create Batch ?"  ; Sets the title text
Local: Field: cwAutoPartNosConfig: storage: cwAutoCreateBatch  ; Links field to storage variable
Local: Field: number field: storage: cwNumZerosBatch  ; Links field to storage variable
Local: Field: number field: inactive : not #cwAutoPartNosConfig  ; Disables field when auto part numbers not enabled
Local: Field: number field: set as : if $$value = 0 then 5 else $$value  ; Sets default value of 5 if empty
Local: Field: number field: set always : yes  ; Always applies the set as condition
Local: Field: cwLastCartonSerial: Style: Normal  ; Sets normal style for the field
Local: field:cwLastCartonSerial : Width:20  ; Sets field width to 20


; Line definition for batch details title
[Line: lncapbautodet]
field:sp  ; Defines field for the line
Local: Field: sp: info: "Batch Details :"  ; Sets the title text
Local: Field: sp: Style: Normal Bold  ; Sets bold style for the title
Local: field: sp: Width:14  ; Sets field width to 14
Local: Field: sp: Border: thin bottom  ; Adds bottom border to the title



; Field definition for enabling customization
[Field : CMPcwEnableCustomization]
Use : Logical Field  ; Uses logical field type
Storage :cwEnableCustomization  ; Links field to storage variable
set always : yes  ; Always applies the set as condition
SubForm : frmbarcodeapplocation: $$value  ; Shows subform based on field value

; Field definition for barcode skip title
[field:cwallowbctitle]
use : medium prompt  ; Uses medium prompt field type
info: "Print Skipped Barcode ?"  ; Sets the prompt text
Width: 22  ; Sets field width to 22



; Field definition for last carton number
[field:cwLastCarton]
use : number field  ; Uses number field type
storage : cwLastCarton  ; Links field to storage variable
skip : if not #cwAutoPartNosConfig then yes else not @@cwOwnerLevel  ; Skips field based on conditions
;; {01.Apr.22 14:15} border : thick box  ; Commented out border setting

; Field definition for allowing barcode printing
[field : cwallowbc]
use : logical field  ; Uses logical field type
storage:cwPrintSkippedCodes  ; Links field to storage variable

; Field definition for last carton serial label
[field : cwLastCartonSerial]
use : sp  ; Uses short prompt field type
info: "Previous Batch :"  ; Sets the label text


; Field definition for part number prefix label
[field:cwPrefixPartnostr]
use : short name field  ; Uses short name field type
info:"Attach PartNo:"  ; Sets the label text


; Field definition for part number prefix configuration
[field : cwPrefixPartno]
use : short name field  ; Uses short name field type
storage : cwPartNoAttach  ; Links field to storage variable
table : cwPartNoAttach,Not Applicable  ; Sets the lookup table



; Collection definition for part number attachment options
[collection : cwPartNoAttach]
title :"Part No Attach Mode"  ; Sets the collection title
listname : @@cwPartNoasPrefix  ; Adds prefix option to list
listname : @@cwPartNoasSuffix  ; Adds suffix option to list



; Field definition for auto part numbers title
[Field: cwAutoPartNosConfigTitle]
Use : long prompt  ; Uses long prompt field type
info: "Generate Auto Part No's ?"  ; Sets the prompt text

; Field definition for auto part numbers toggle
[Field: cwAutoPartNosConfig]
Use: logical field  ; Uses logical field type
;Set As: $cwAutoPartNosEnabled  ; Commented out set as condition
storage: cwAutoPartNosEnabled  ; Links field to storage variable

; Field definition for barcode starting number
[field : CWSTARTINGNUMBER]
use : short name field  ; Uses short name field type
storage : cwBarCodeStartingNo  ; Links field to storage variable
Set As: if $$isempty:$$value then 1 else $$value  ; Sets default value of 1 if empty
inactive : not #cwAutoPartNosConfig  ; Disables field when auto part numbers not enabled

; Line definition for barcode by fill quantity configuration
[line : cwbyfillqty]
field : snf,cwlogical ,snf3,snf2, cwlogical2,snf4, cwlogical3  ; Defines fields for the line
Local: Field: snf: info: "Generate Barcode by Fill Qty"  ; Sets the prompt text
Local: Field: cwlogical: storage: cwbarcodebyfillqty  ; Links field to storage variable
Local: Field: cwlogical2: storage: cwbarcodebyfillqtyPrimary  ; Links field to storage variable
Local: Field: snf2: info: "Set in Primary Qty:"  ; Sets the prompt text for primary quantity
local: field: cwlogical2: inactive: not #cwlogical  ; Disables field when fill quantity not enabled
Local: field: snf: Width: 30  ; Sets field width to 30
Local: field: snf2: Width: 0  ; Sets field width to 0
Local: Field: snf3: info: " (Enter Fill Qty in Item Master)"  ; Sets the help text
Local: Field: snf3: Style: small  ; Sets small style for the help text
Local: field: snf3: Width:0  ; Sets field width to 0

Local: Field: snf4: info: "Enter Auto Fill Qty in Item Master?"  ; Sets the prompt text
Local: Field: cwlogical3: storage: cwAcceptAutoFillQtyInItemMaster  ; Links field to storage variable


; User-defined field definitions with storage IDs
[system : udf]
cwAutoPartNosEnabled : logical : 171 ;; change this value.  ; Auto part numbers enabled flag
cwNumZeros : number : 171  ; Number of zeros for prefill
cwBarCodeStartingNo : string : 175  ; Starting number for barcodes
cwSkipBarcodeLabelGeneration: logical : 102  ; Skip barcode generation flag

cwAutoCreateBatch : logical : 1020  ; Auto create batch flag
cwNumZerosBatch : number : 1025  ; Number of zeros for batch prefill
cwItemAutoCreateBatch : logical : 1022  ; Item-level auto create batch flag
 cwPrintSkippedCodes  : logical : 1023  ; Print skipped codes flag
 cwLastCarton : number : 1024  ; Last carton number
 cwPartNoAttach : string : 1024  ; Part number attachment mode
 cwVchHasBatchFill :logical : 1025  ; Batch fill flag
cwVchHasBatchFillQty : logical : 1026  ; Batch fill quantity flag
cwbarcodebyfillqty : logical : 1027  ; Barcode by fill quantity flag
cwbarcodebyfillqtyPrimary : logical : 2028  ; Primary unit for barcode fill quantity

; System formulas for retrieving company-level settings
[System: Formula]
cwAutoPartNosEnabled :  $cwAutoPartNosEnabled:COMPANY:##SVCURRENTCOMPANY  ; Gets auto part numbers enabled setting
cwNumZeros : $cwNumZeros:COMPANY:##SVCURRENTCOMPANY  ; Gets number of zeros setting
cwBarCodeStartingNo : $cwBarCodeStartingNo:COMPANY:##SVCURRENTCOMPANY  ; Gets barcode starting number

cwAutoCreateBatch : $cwAutoCreateBatch:COMPANY:##SVCURRENTCOMPANY  ; Gets auto create batch setting
cwNumZerosBatch : $cwNumZerosBatch:COMPANY:##SVCURRENTCOMPANY  ; Gets number of zeros for batch

cwPartNoasPrefix :"Part No as Prefix"  ; Text for prefix option
cwPartNoasSuffix :"Part No as Suffix"  ; Text for suffix option
cwCustomizationEnabled : ($cwEnableCustomization:Company:##SVCurrentCompany)  ; Gets customization enabled setting
cwCustomizationStrx  : if $$isempty:@@cwCustomizationStr then "Custmization" else @@cwCustomizationStr  ; Gets customization string with fallback
cwAppLocation : $cwAppLocation:COMPANY:##SVCURRENTCOMPANY  ; Gets application location path
isincrate : $cwisincrate:COMPANY:##SVCURRENTCOMPANY  ; Gets inclusive rate setting
issetincrate : $cwsetincrate:COMPANY:##SVCURRENTCOMPANY  ; Gets set inclusive rate setting
cwbarcodebyfillqty : $cwbarcodebyfillqty:COMPANY:##SVCURRENTCOMPANY  ; Gets barcode by fill quantity setting
cwbarcodebyfillqtyPrimary : $cwbarcodebyfillqtyPrimary:COMPANY:##SVCURRENTCOMPANY  ; Gets primary unit setting for fill quantity

;; group  ; Group-level formulas

cwBarCodeStartingNoGroup : $cwBarCodeStartingNo:stockgroup:#stkiparent  ; Gets starting number from stock group

cwNumZeros1 : if not $$isempty:#stkiparent and $cwGenBarcodeLabelStockGroupWise:stockgroup:#stkiparent then $cwNumZeros:stockgroup:#stkiparent else @@cwNumZeros  ; Gets number of zeros based on group settings


; Line definition for gap (spacer)
[Line: cwgapline]
field:snf,fwf  ; Defines fields for the line
Local: Field: snf: Set As:""  ; Sets empty value
Local: Field: fwf: Set As:""  ; Sets empty value
Local: Field: default: Skip: Yes  ; Skips all fields by default

; Gap line definitions (reusing the base definition)
[Line:cwgapline1]
use:cwgapline  ; Uses the base gap line definition

[Line:cwgapline2]
use:cwgapline  ; Uses the base gap line definition

[Line:cwgapline3]
use:cwgapline  ; Uses the base gap line definition

[Line:cwgapline4]
use:cwgapline  ; Uses the base gap line definition

[Line:cwgapline5]
use:cwgapline  ; Uses the base gap line definition

[Line:cwgapline6]
use:cwgapline  ; Uses the base gap line definition

[Line:cwgapline7]
use:cwgapline  ; Uses the base gap line definition

[Line:cwgapline8]
use:cwgapline  ; Uses the base gap line definition

[Line:cwgapline9]
use:cwgapline  ; Uses the base gap line definition

[Line:cwgapline10]
use:cwgapline  ; Uses the base gap line definition

[Line:cwgapline11]
use:cwgapline  ; Uses the base gap line definition

[Line:cwgapline12]
use:cwgapline  ; Uses the base gap line definition


;------------------- "Stock item batch & Group changes " ------------------------


; Adds barcode option to stock group form
[#form : stock group]
add : option : ShowBarCodeOption : @@cwAutoPartNosEnabled  ; Shows barcode options when enabled

; Adds barcode label generation part when option is shown
[!form : ShowBarCodeOption]
add : part : SkipBarCodeLabelGeneration  ; Adds part for barcode label generation settings

; Part definition for barcode label generation settings
[!part : SkipBarCodeLabelGeneration]
line : SkipBarCodeLabelGeneration  ; Adds line for skip setting
line : SkipBarCodeLabelGeneration2  ; Adds line for group-wise generation
line : SkipBarCodeLabelGeneration2a  ; Adds line for help text
line : SkipBarCodeLabelGeneration3  ; Adds line for starting number

; Line definition for skipping barcode label generation
[line : SkipBarCodeLabelGeneration]
field : mp,cwlogical  ; Defines fields for the line
Local: Field: mp: info: "Skip BarCode Label Generation?"  ; Sets the prompt text
Local: Field: cwlogical: storage: cwSkipBarcodeLabelGeneration  ; Links field to storage variable
Local: field: mp: Width:0 ;; 4 inch  ; Sets field width to 0

; Line definition for group-wise barcode label generation
[line : SkipBarCodeLabelGeneration2]
field : mp,cwlogical  ; Defines fields for the line
Local: Field: mp: info: "Generate Stock Group wise BarCode Labels?"  ; Sets the prompt text
Local: Field: cwlogical: storage: cwGenBarcodeLabelStockGroupWise  ; Links field to storage variable
Local: field: mp: Width:0 ;; 4 inch  ; Sets field width to 0

local: field: cwlogical: inactive: $cwSkipBarcodeLabelGeneration  ; Disables field when skip is enabled

; Line definition for help text about group-wise generation
[line : SkipBarCodeLabelGeneration2a]
field : fwf  ; Defines field for the line
Local: Field: fwf: info: "(To Generate Stock Group wise Part No's)"  ; Sets the help text
Local: field: fwf: Width:0 ;; 4 inch  ; Sets field width to 0
Local: Field: fwfw: Style: italics  ; Sets italics style for the help text


; Line definition for starting number configuration
[line : SkipBarCodeLabelGeneration3]
field : snf,cwstartingnumber,short prompt,numf9 ;;number field  ; Defines fields for the line

local: field: snf: inactive: $cwSkipBarcodeLabelGeneration  ; Disables field when skip is enabled
local: field: cwstartingnumber: inactive: if $cwSkipBarcodeLabelGeneration then yes else not $cwGenBarcodeLabelStockGroupWise  ; Conditional disabling
local: field: numf9: inactive: if $cwSkipBarcodeLabelGeneration then yes else not $cwGenBarcodeLabelStockGroupWise  ; Conditional disabling
Local: Field: snf: info: "Starting Number"  ; Sets the prompt text

Local: Field: numf9: storage: cwNumZeros  ; Links field to storage variable

Local: Field: numf9: set as : if $$value = 0 then 5 else $$value  ; Sets default value of 5 if empty
local: field: cwstartingnumber: setas : if $$value = 0 then 1 else $$value  ; Sets default value of 1 if empty

Local: Field: numf9: set always : yes  ; Always applies the set as condition
Local: Field: SHORT PROMPT: info: "Prefill Zeros:"  ; Sets the prompt text
Local: field: numf9: Width:@@shortnamewidth  ; Sets field width based on formula



; ================= "Item Auto Inc Part No"

; Stock item form modifications for auto part numbers
[#form : stock item]
local : field : STKI PartNo : set as : if $$isempty:$$Value and not $$isfieldedited and @@notfx then (if @@itmaLIASCHK then @@getNewItmAliasValue else $$value) else $$Value  ; Auto-generates part number
local : field : STKI PartNo : set always : yes  ; Always applies the set as condition
;add: bottom part : cwb1  ; Commented out part addition

; Part definition for barcode information
[part : cwb1]
line : cwb1  ; Adds line for barcode information
invisible : not @@cwCustomizationEnabled  ; Hides when customization not enabled

; Line definition for barcode information
[line: cwb1]
field: long prompt,nf,snf2,nf2  ; Defines fields for the line
Local: Field: long prompt: info:"Previous Bar Code :"  ; Sets the prompt text for previous code
Local: Field: snf2: info:"Next Bar Code :"  ; Sets the prompt text for next code
Local: Field: nf: Set As: if $$numitems:newItemColl = 0 then "" else $$COLLECTIONFIELD:$partno1x:1:newItemColl  ; Sets previous code value
Local: Field: nf2: Set As: if $$numitems:newItemColl = 0 then @@GetcwInitPartNo else $$cwxx:$cwNumZeros  ; Sets next code value
Local: Field: nf: Skip: Yes  ; Skips editing for previous code
Local: Field: nf2: Skip: Yes  ; Skips editing for next code
Local: Field: nf: Border: thin box ;;left right  ; Adds border to previous code
Local: Field: nf2: Border: thin box ;;left right  ; Adds border to next code

; Function to generate next part number with zero padding
[function : cwxx]
parameter : a : number ;;: #numf9  ; Parameter for number of zeros
;; {03.Dec.18 15:48} 000 : log : ##a  ; Commented out debug log
;; {03.Dec.18 15:48} 01: log : $$zerofill:($$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1):##a  ; Commented out debug log
20 : return : $$zerofill:($$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1):##a  ; Returns zero-padded next number

; System formulas for auto part number generation
[System :Formula]
itmaLIASCHK : @@cwAutoPartNosEnabled and $$line = 1 and ($$increatemode or $$isempty:$$Value)  ; Checks if auto part number should be generated
getNewItmAliasValue : $$cwgenbarcode ;; $$zerofill:@@cwnewno:@@cwNumZeros1 ;; $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1  ; Gets new part number value

; Function to generate barcode with proper formatting
[function :cwgenbarcode]
variable   : mynext : number : @@cwnewno  ; Variable for next number
;; {03.Dec.18 15:41} 00 : log : "---"  ; Commented out debug log
;; {03.Dec.18 15:41} 10 :  log : @@cwnewno  ; Commented out debug log
;; {03.Dec.18 15:41} 20 : log : @@cwNumZeros1  ; Commented out debug log
;; {03.Dec.18 15:41} 30 : log :  $$zerofill:@@cwnewno:@@cwNumZeros1  ; Commented out debug log
;; {03.Dec.18 15:41} 35 : log :  $$number:$$zerofill:@@cwnewno:@@cwNumZeros1 > 0  ; Commented out debug log
40 : if : $$number:$$zerofill:@@cwnewno:@@cwNumZeros1 > 0  ; Checks if number is valid
41 : return : $$zerofill:@@cwnewno:@@cwNumZeros1 ;;$$zerofill:@@cwnewno:@@cwNumZeros1  ; Returns zero-padded number
42 : end if
;; {03.Dec.18 15:41} 45 : log :  @@cwnewno  ; Commented out debug log
50 : return :@@cwnewno  ; Returns raw number as fallback

; Collection definition for retrieving existing part numbers
[collection : newItemColl]
       type : Stockitem  ; Collection type is stock items
     FORMAT : $partno1x,20 ;;@@cwpartycodeX,25  ; Format for display
       SORT : @@DEFAULT : -$$number:$partno1x  ; Sorts by part number in descending order
      fetch : partno1x  ; Fetches part number field
      filter : notfx  ; Applies filter
      
      option : ofSpecificGroup : not $$isempty:#stkiparent and $cwGenBarcodeLabelStockGroupWise:stockgroup:#stkiparent  ; Option for group-specific items
      
      ; Collection modification for group-specific items
      [!collection : ofSpecificGroup]
      child of : #stkiparent  ; Filters by parent stock group

      ; System formulas for part number generation
      [System : Formula]
        notfx : not $cwSkipBarcodeLabelGeneration:stockgroup:$parent ;;$partno1x starting with "T"  ; Filter for items not skipped
;; {18.Nov.17 13:54}       cwnewno : if $$numitems:newItemColl = 0 then @@GetcwInitPartNo else $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1  ; Commented out old formula
      cwnewno : if $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl = 0 then @@GetcwInitPartNo else $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1  ; Gets next number
   BNewPartNo : $$zerofill:##mylastno:@@cwNumZeros  ; Formats new part number with zeros
;; {02.Nov.17 17:21} for group wise part no    GetcwInitPartNo : if $$isempty:@@cwBarCodeStartingNo then 1 else @@cwBarCodeStartingNo  ; Commented out old formula
GetcwInitPartNo : if not $$isempty:#stkiparent and $cwGenBarcodeLabelStockGroupWise:stockgroup:#stkiparent then @@cwBarCodeStartingNogroup else  if $$isempty:@@cwBarCodeStartingNo then 1 else @@cwBarCodeStartingNo  ; Gets initial part number

; Function to get next generated number (for debugging)
[function : cwNextGen]
; $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1
10 : log : $$COLLECTIONFIELD:$partno1x:1:newItemColl  ; Logs current part number
22 : log :  $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1  ; Logs next part number
23 : return : $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1  ; Returns next part number

;;[#menu : stock items] ;;Inventory Info.]  ; Commented out menu modification
; Adds auto fill button to stock item form
[#Form: Stock Item]	
add : button : AutoFillPartNo  ; Adds button for auto-filling part numbers


; Button definition for auto-filling part numbers
[Button : AutoFillPArtNo]
title :"Part No. Fill"  ; Sets button title
key :f11  ; Sets keyboard shortcut
action: call : AutoFillPartNos  ; Sets action to call function

; Button definition for stock group auto-filling part numbers
[Button : stkgrpAutoFillPartNo]
title :"Stk Part No. Fill"  ; Sets button title
key : f8  ; Sets keyboard shortcut
action: call : AutoFillPartNos  ; Sets action to call function
inactive : not $cwGenBarcodeLabelStockGroupWise  ; Disables when group-wise generation not enabled

; Stock group form modifications
[#form : stock group]
;; {18.Nov.17 13:59} add : button :  stkgrpAutoFillPartNo  ; Commented out button addition
local : line : mstparent : add : field : stkiparent  ; Adds parent field to master parent line
local : line : mstparent : local: field : stkiparent : delete : storage  ; Removes storage from field
local : line : mstparent : local: field : stkiparent : delete : variable  ; Removes variable from field
local : line : mstparent : local: field : stkiparent : skip : yes  ; Skips editing for field
local : line : mstparent : local: field : stkiparent : border : thick box  ; Adds thick border to field
local : line : mstparent : local: field : stkiparent : set as : $name  ; Sets field value to name
local : line : mstparent : local: field : stkiparent : invisible : yes  ; Hides the field






; Function to auto-fill part numbers
[function : AutoFillPartNos]
;; {17.Nov.17 18:49} 0000 : log : $$numitems:newItemColl  ; Commented out debug log
;; {17.Nov.17 18:49} 0001 : log : @@cwnewno  ; Commented out debug log

;x111  : log : if not $$isempty:#stkiparent and $cwGenBarcodeLabelStockGroupWise:stockgroup:#stkiparent then @@cwBarCodeStartingNogroup else  if $$isempty:@@cwBarCodeStartingNo then 1 else @@cwBarCodeStartingNo  ; Commented out debug log
;x123 : log : @@cwBarCodeStartingNo  ; Commented out debug log

  01xx : QueryBox:"Auto Fill Part Nos?":Yes:No  ; Asks for confirmation
  02xx : do if : not $$lastresult : continue  ; Continues if user selects No
  variable : myLastNo : number : @@cwnewno  ; Variable for last number
  variable : totctr : number : $$numitems:MyNewItems  ; Variable for total count
  
;000  : log : ##mylastno ;;$$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl ;;$$numitems:newItemColl ;;##mylastno  ; Commented out debug log
;001  : log : if $$numitems:newItemColl = 0 then 5 else 6 ;;@@GetcwInitPartNo else $$number:$$COLLECTIONFIELD:$partno1x:1:newItemColl + 1  ; Commented out debug log
;0022 : return  ; Commented out early return

    05 : start progress : ##totctr : "Generating Part Nos" : "" : "Please Wait ..."  ; Shows progress dialog
    10 : walk collection :  MyNewItems  ; Processes each item in collection


    12 : if  : not $$isempty:$(stockitem,@@BNewPartNo).mailingname  ; Checks if part number already exists
    13 : While : not $$isempty:$(stockitem,$$zeroFill:##mylastno:@@cwNumZeros).mailingname  ; Loops until finding unused number
;    13a : Querybox:@@BNewPArtNo:yes:no  ; Commented out debug dialog
    15 : set : myLastno : ##mylastno + 1  ; Increments last number
    16 : end while
    17 : end if



    20 : modify object : (stockitem,$name).mailingname[1].mailingname : @@BNewPartNo  ; Updates item with new part number

; Stock item batch part modifications
[#Part: STKI Batch]
add : line : after : STKI Batchable : cwAutoFillBatch,cwAutoFillBatchVchQty ;;,cwAutoFillBatchVchQtyInwards  ; Adds auto fill batch lines

; Line definition for auto batch creation
[line : cwAutoFillBatch]
field : medium prompt, cwlogical  ; Defines fields for the line
Local: Field: medium prompt: info: "Auto Create Batches?"  ; Sets the prompt text
Local: Field: cwlogical: storage: cwItemAutoCreateBatch  ; Links field to storage variable
local: field: default: inactive: if not @@cwAutoCreateBatch then yes else not #STKIBatchable  ; Conditional disabling
Local: Field: cwlogical: Set As: if not @@cwAutoCreateBatch then no else $$value  ; Sets default value based on company setting

;; {13.Apr.18 22:18} Local: Field: default: Color : blue  ; Commented out color setting





; Line definition for auto batch fill quantity
[line: cwAutoFillBatchVchQty]
field : medium prompt,cwlogical2,sp,numf  ; Defines fields for the line
Local: Field: cwlogical2: storage: cwVchHasBatchFillQty  ; Links field to storage variable
Local: Field: medium prompt: info: "Auto Fill Qty (in Outward ):"  ; Sets the prompt text
;; {30.Jul.13 16:43} local: field: cwlogical2: inactive: if not @@cwAutoCreateBatch then yes else not #cwlogical  ; Commented out condition
Local: Field: cwlogical2: Set As: if not @@cwAutoCreateBatch then no else $$value  ; Sets default value based on company setting
;; {13.Apr.18 22:19} Local: Field: default: Color : blue  ; Commented out color setting
Local: Field: sp: Set As:"Item Qty:"  ; Sets label text for quantity
Local: Field: numf: storage:cwAutoQuantity  ; Links field to storage variable

invisible : not $cwAcceptAutoFillQtyInItemMaster:COMPANY:##SVCURRENTCOMPANY  ; Hides when auto fill not accepted


; Line definition for auto batch fill quantity in inwards
[line : cwAutoFillBatchVchQtyInwards]
use : cwAutoFillBatchVchQty  ; Uses the outward line as base
Local: Field:medium prompt : info: "Auto Fill Qty (in Inward ):"  ; Sets the prompt text for inward
delete : field : sp,numf  ; Removes quantity fields
Local: Field: cwLogical2: storage: cwVchHasBatchFillQtyInward  ; Links field to storage variable

;-----------------  "Skipping Qty Field when auto fill is enabled"
;------------------ "When Creating New Batch."

; Formula for determining when to skip batch fields
[System: Formula]
cwSkipBatchFormula : @@cwAutoCreateBatch and $cwVchHasBatchFillQty:stockitem:$stockitemname and @@IsOutwardType  ; Checks conditions for skipping

; Adds option to batch line based on skip formula
[#Line: STKVCH Batch2]
add : option : cwSkipBatchFlds : @@cwSkipBatchFormula  ; Adds option when formula is true


; Line modification when batch fields should be skipped
[!line : cwSkipBatchFlds]
;;Right Fields: VCHBATCH Godown, VCHBATCH Name, +  ; Commented out field list
;;VCHBATCH ActualQty, VCHBATCH BilledQty, VCHBATCH Rate, VCHBATCH RateUnits, VCHBATCH ItemRate, VCHBATCH Discount, VCHBATCH ItemDiscount, VCHBATCH Value, VCHBATCH AddlValue  ; Commented out more fields

Local: Field: VCHBATCH ActualQty: Skip: Yes  ; Skips actual quantity field
Local: Field: VCHBATCH BilledQty: Skip: yes  ; Skips billed quantity field
;; {05.Jun.15 12:08} Local: Field: VCHBATCH BilledQty: Set As: $cwAutoQuantity:stockitem:$stockitemname  ;;if $$isempty:$cwAutoQuantity:stockitem:$stockitemname then $cwAutoQuantity:stockitem:$stockitemname else $$value  ; Commented out set as condition


;------------------------------ "End" --------------------------------

; Miscellaneous settings section
; Line definition for miscellaneous details title
[line:lnMiscDetailstitle]
 use : lncapbautodet  ; Uses batch details title line as base
 Local: Field: sp: info: "Misc Details:"  ; Sets the title text
 
 ; Line definition for party code display setting
 [line:lnmiscdetails1]
 field: sp,cwlogical  ; Defines fields for the line
 Local: Field: sp: info: "Show Party Code (Ledger Alias) during Entry?"  ; Sets the prompt text
 Local: Field: cwlogical: storage: cwShowPartyAliasinEntry  ; Links field to storage variable
 Local: field: sp: Width:0  ; Sets field width to 0
 
 ; Line definition for barcode template by voucher type
 [line : lnmiscdetails2]
 field : sp,cwlogical  ; Defines fields for the line
 Local: Field: sp: info: "Barcode Template by Voucher Type:"  ; Sets the prompt text
 Local: Field: sp: width: 0  ; Sets field width to 0
 Local: Field: cwlogical: storage: cwBarcodeTemplatebyVchType  ; Links field to storage variable
 
 
 ; Formula for party alias display setting
 [System: Formula]
 cwShowPartyAliasinEntry :  $cwShowPartyAliasinEntry:COMPANY:##SVCURRENTCOMPANY  ; Gets party alias display setting

`;
export default tdl;
