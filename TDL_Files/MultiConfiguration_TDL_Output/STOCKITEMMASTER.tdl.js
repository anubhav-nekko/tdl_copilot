// Auto-generated from STOCKITEMMASTER.TXT
const tdl = `
; Created By: Akshay on 2013-01-05 10:52, ID: 

;--------------- CONFIGURATION SECTION ---------------
; This section handles the loading of configuration settings and version-specific features

; Define the main form for company operations
[#Form: Company Operations]
                ; Switch between different configurations based on product version
                ; For versions below 3.2
                Switch   : cwCustomFldsLowerRel  : cwCustomFldsNotFor3.2  : ($$Number:$$ProdInfo:ProdReleaseAsStr) < 3.2
                ; For versions 3.2 and above
                Switch   : cwCustomFldsCurrenRel : cwCustomFldsFor3.2     : ($$Number:$$ProdInfo:ProdReleaseAsStr) >= 3.2


;--------------- VERSION-SPECIFIC CONFIGURATIONS ---------------

; Configuration for versions below 3.2
[!Form : cwCustomFldsNOTFor3.2]
;; {12.Nov.16 11:22} Local: Part : CMP AccFeat Left : Add : Line : At End : cwCostTracking,cwCustomFldsConfig ,lnCaption2,lnCaption3,lnCaption4,lnCaption5,lnCaption6 +
;; {12.Nov.16 11:22} ,lnbcodeforeachqty ,lncmpbatchfieldcaption,lncmpbarcodefrombatch    ;;,lnCaption7

; Configuration for versions 3.2 and above
[!Form : cwCustomFldsFor3.2]
;; {12.Nov.16 11:22} Local  : Part  : CMP TallyShopFeatures Left        : Add :  Line : At End  : cwCostTracking,cwCustomFldsConfig ,lnCaption2,lnCaption3,lnCaption4,lnCaption5,lnCaption6 +
;; {12.Nov.16 11:22} ,lnbcodeforeachqty,lncmpbatchfieldcaption ,lncmpbarcodefrombatch

;--------------- CUSTOM FIELDS CONFIGURATION LINE ---------------
; This section defines the main configuration line for custom fields

[Line : cwCustomFldsConfig]
Field : cwCustomFldsConfigTitle,cwCustomFldsConfig
;; {07.Jan.13 13:26} right field : Short name field
; Contact information field
Local: Field: short name field : info: "sales@circuitworld.in"
Local: Field: short name field: case : normal
Local: Field: short name field: Color : blue
;;Local: Field: short name field: border : thin bottom
Local: Field: short name field: width : 0

; Empty field for spacing
Local: Field: nf: info: ""
; Table selection fields
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
; Storage fields for table selection
Local: Field: nf2: storage:cwtableFrom1
Local: Field: snf: storage:cwUnder1
; Table configuration
Local: Field: nf2: table:coltableFrom ,Not Applicable
Local: Field: nf2: Show table: Always

; Field visibility conditions - fields are inactive when custom fields are disabled
local: field:cwbcsp : inactive: not #cwCustomFldsConfig
local: field:cwbcnf : inactive: not #cwCustomFldsConfig
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig

; Additional field dependencies
local: field: snf: inactive:$$issysname:#nf2
local: field: nf2: inactive:$$issysname:#cwbcnf
 
;; {26.Feb.14 18:35}  Local: Field: cwbcnf:set as:"Brand"
;; {26.Feb.14 18:34}   local:field:cwbcnf:skip:yes


;--------------- CAPTION 2 CONFIGURATION ---------------
; Configuration for the second caption line (Style)

[Line: lnCaption2]
field:cwbcsp2,cwbcnf2,sp,nf3,sp2,snf2

; Field definitions similar to first caption line
Local: Field: nf: info: ""
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
Local: Field: nf3: storage:cwtableFrom2
Local: Field: snf2: storage:cwUnder2
Local: Field: nf3: table:coltableFrom ,Not Applicable
Local: Field: nf3: Show table: Always

; Field visibility conditions
local: field:cwbcsp2 : inactive: not #cwCustomFldsConfig
local: field:cwbcnf2 : inactive: not #cwCustomFldsConfig
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig
local: field:nf3 : inactive: not #cwCustomFldsConfig
local: field:nf: inactive: not #cwCustomFldsConfig

; Field width and dependencies
Local: field: nf: Width:30
local: field: snf2: inactive:$$issysname:#nf3
local: field: nf3: inactive:$$issysname:#cwbcnf2
;; {26.Feb.14 18:35} Local: Field: cwbcnf2:set as:"Style"
;; {26.Feb.14 18:35}  local:field:cwbcnf2:skip:yes
space top :0.5


;--------------- CAPTION 3 CONFIGURATION ---------------
; Configuration for the third caption line (Season)

[Line:lnCaption3 ]
field:cwbcsp3,cwbcnf3,sp,nf4,sp2,snf3
; Field definitions
Local: Field: nf: info: ""
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
Local: Field: nf4: storage:cwtableFrom3
Local: Field: snf3: storage:cwUnder3
Local: Field: nf4: table:coltableFrom ,Not Applicable
Local: Field: nf4: Show table: Always

; Field visibility conditions
local: field:cwbcsp3 : inactive: not #cwCustomFldsConfig
local: field:cwbcnf3 : inactive: not #cwCustomFldsConfig
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig
local: field:nf4 : inactive: not #cwCustomFldsConfig
local: field:nf: inactive: not #cwCustomFldsConfig
local: field: snf3: inactive:$$issysname:#nf4
local: field: nf4: inactive:$$issysname:#cwbcnf3
Local: field: nf: Width:30
;; {26.Feb.14 18:35}  Local: Field: cwbcnf3:set as:"Season"
;; {26.Feb.14 18:35}  local:field:cwbcnf3:skip:yes
space top :0.5
 
;--------------- CAPTION 4 CONFIGURATION ---------------
; Configuration for the fourth caption line (Size)

[Line:lnCaption4 ]
field:cwbcsp4,cwbcnf4,sp,nf5,sp2,snf3
; Field definitions
Local: Field: nf: info: ""
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
Local: Field: nf5: storage:cwtableFrom4
Local: Field: snf3: storage:cwUnder4
Local: Field: nf5: table:coltableFrom ,Not Applicable
Local: Field: nf5: Show table: Always

; Field visibility conditions
local: field:cwbcsp4 : inactive: not #cwCustomFldsConfig
local: field:cwbcnf4 : inactive: not #cwCustomFldsConfig
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig
local: field:nf5 : inactive: not #cwCustomFldsConfig
local: field:nf: inactive: not #cwCustomFldsConfig
local: field: snf3: inactive:$$issysname:#nf5
local: field: nf5: inactive:$$issysname:#cwbcnf4
Local: field: nf: Width:30
;; {26.Feb.14 18:35}  Local: Field: cwbcnf4:set as:"Size"
;; {26.Feb.14 18:35}   local:field:cwbcnf4:skip:yes
space top :0.5

;--------------- CAPTION 5 CONFIGURATION ---------------
; Configuration for the fifth caption line (Color)

[Line:lnCaption5 ]
field:cwbcsp5,cwbcnf5,sp,nf6,sp2,snf3
; Field definitions
Local: Field: nf: info: ""
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
Local: Field: nf6: storage:cwtableFrom5
Local: Field: snf3: storage:cwUnder5
Local: Field: nf6: table:coltableFrom ,Not Applicable
Local: Field: nf6: Show table: Always

; Field visibility conditions
local: field:cwbcsp5 : inactive: not #cwCustomFldsConfig
local: field:cwbcnf5 : inactive: not #cwCustomFldsConfig
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig
local: field:nf6 : inactive: not #cwCustomFldsConfig
local: field:nf: inactive: not #cwCustomFldsConfig
local: field: snf3: inactive:$$issysname:#nf6
local: field: nf6: inactive:$$issysname:#cwbcnf5
Local: field: nf: Width:30
;; {26.Feb.14 18:35}  Local: Field: cwbcnf5:set as:"Color"
;; {26.Feb.14 18:35}   local:field:cwbcnf5:skip:yes
space top :0.5

;--------------- CAPTION 6 CONFIGURATION ---------------
; Configuration for the sixth caption line (Feature)

[Line:lnCaption6 ]
field:cwbcsp6,cwbcnf6,sp,nf7,sp2,snf3
; Field definitions
Local: Field: nf: info: ""
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
Local: Field: nf7: storage:cwtableFrom6
Local: Field: snf3: storage:cwUnder6
Local: Field: nf7: table:coltableFrom ,Not Applicable
Local: Field: nf7: Show table: Always

; Field visibility conditions
local: field:cwbcsp6 : inactive: not #cwCustomFldsConfig
local: field:cwbcnf6 : inactive: not #cwCustomFldsConfig
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig
local: field:nf7 : inactive: not #cwCustomFldsConfig
local: field:nf: inactive: not #cwCustomFldsConfig
local: field: snf3: inactive:$$issysname:#nf7
local: field: nf7: inactive:$$issysname:#cwbcnf6
Local: field: nf: Width:30
;; {26.Feb.14 18:35}  Local: Field: cwbcnf6:set as:"Featurre"
;; {26.Feb.14 18:35}   local:field:cwbcnf6:skip:yes
space top :0.5

;--------------- CAPTION 7 CONFIGURATION ---------------
; Configuration for the seventh caption line

[Line:lnCaption7]
field:cwbcsp7,cwbcnf7,sp,nf8,sp2,snf3
; Field definitions
Local: Field: nf: info: ""
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
Local: Field: nf8: storage:cwtableFrom7
Local: Field: snf3: storage:cwUnder7
Local: Field: nf8: table:coltableFrom ,Not Applicable
Local: Field: nf8: Show table: Always

; Field visibility conditions
local: field:cwbcsp7 : inactive: not #cwCustomFldsConfig
local: field:cwbcnf7 : inactive: not #cwCustomFldsConfig
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig
local: field:nf8 : inactive: not #cwCustomFldsConfig
local: field:nf: inactive: not #cwCustomFldsConfig
local: field: snf3: inactive:$$issysname:#nf8
local: field: nf8: inactive:$$issysname:#cwbcnf7
Local: field: nf: Width:30

;--------------- FIELD DEFINITIONS FOR CAPTION PROMPTS ---------------
; These sections define the short prompt fields for each caption

[field : cwbcsp]
use : short prompt
info: "Caption1:"

[field : cwbcsp2]
use : short prompt
info: "Caption2:"

[field : cwbcsp3]
use : short prompt
info: "Caption3:"

[field : cwbcsp4]
use : short prompt
info: "Caption4:"

[field : cwbcsp5]
use : short prompt
info: "Caption5:"

[field : cwbcsp6]
use : short prompt
info: "Caption6:"

[field : cwbcsp7]
use : short prompt
info: "Caption7:"


;--------------- FIELD DEFINITIONS FOR CAPTION VALUES ---------------
; These sections define the name fields for each caption value

[field : cwbcnf]
use : name field
;; {26.Feb.14 18:19} info:"Brand"
storage : cwsortnoStr

[field : cwbcnf2]
use : cwbcnf
;; {26.Feb.14 18:19} info:"Style "
storage: cwsizeStr

[field : cwbcnf3]
use : cwbcnf
storage : cwproductStr

[field : cwbcnf4]
use : cwbcnf
storage : cwproductStr2

[field : cwbcnf5]
use : cwbcnf
storage : cwproductStr3

[field : cwbcnf6]
use : cwbcnf
storage : cwproductStr4

[field : cwbcnf7]
use : cwbcnf
storage : cwproductStr5

;--------------- ADDITIONAL CAPTION PROMPT FIELDS (7-14) ---------------
; These sections define additional caption prompt fields

[field : cwbcsp9]
use : short prompt
info: "Caption7:"

[field : cwbcsp10]
use : short prompt
info: "Caption8:"

[field : cwbcsp11]
use : short prompt
info: "Caption9:"

[field : cwbcsp12]
use : short prompt
info: "Caption10:"

[field : cwbcsp13]
use : short prompt
info: "Caption11:"

[field : cwbcsp14]
use : short prompt
info: "Caption12:"

;--------------- ADDITIONAL CAPTION VALUE FIELDS (9-14) ---------------
; These sections define additional caption value fields

[field : cwbcnf9]
use : cwbcnf
storage : cwproductStr9

[field : cwbcnf10]
use : cwbcnf
storage : cwproductStr10

[field : cwbcnf11]
use : cwbcnf
storage : cwproductStr11

[field : cwbcnf12]
use : cwbcnf
storage : cwproductStr12

[field : cwbcnf13]
use : cwbcnf
storage : cwproductStr13

[field : cwbcnf14]
use : cwbcnf
storage : cwproductStr14

;--------------- ADDITIONAL CAPTION CONFIGURATIONS (9-14) ---------------
; Configuration for additional caption lines

[Line:lnCaption9 ]
field:cwbcsp9,cwbcnf9,sp,nf9,sp2,snf3
; Field definitions
Local: Field: nf: info: ""
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
Local: Field: nf9: storage:cwtableFrom9
Local: Field: snf3: storage:cwUnder9
Local: Field: nf9: table:coltableFrom ,Not Applicable
Local: Field: nf9: Show table: Always

; Field visibility conditions
local: field:cwbcsp9 : inactive: not #cwCustomFldsConfig
local: field:cwbcnf9 : inactive: not #cwCustomFldsConfig
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig
local: field:nf9 : inactive: not #cwCustomFldsConfig
local: field:nf: inactive: not #cwCustomFldsConfig
local: field: snf3: inactive:$$issysname:#nf9
local: field: nf9: inactive:$$issysname:#cwbcnf9
Local: field: nf: Width:30

space top :0.5


[Line:lnCaption10]
field:cwbcsp10,cwbcnf10,sp,nf10,sp2,snf3
; Field definitions
Local: Field: nf: info: ""
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
Local: Field: nf10: storage:cwtableFrom10
Local: Field: snf3: storage:cwUnder10
Local: Field: nf10: table:coltableFrom ,Not Applicable
Local: Field: nf10: Show table: Always

; Field visibility conditions
local: field:cwbcsp9 : inactive: not #cwCustomFldsConfig
local: field:cwbcnf9 : inactive: not #cwCustomFldsConfig
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig
local: field:nf10 : inactive: not #cwCustomFldsConfig
local: field:nf: inactive: not #cwCustomFldsConfig
local: field: snf3: inactive:$$issysname:#nf10
local: field: nf10: inactive:$$issysname:#cwbcnf10
Local: field: nf: Width:30

space top :0.5


[Line:lnCaption11]
field:cwbcsp11,cwbcnf11,sp,nf11,sp2,snf3
; Field definitions
Local: Field: nf: info: ""
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
Local: Field: nf11: storage:cwtableFrom11
Local: Field: snf3: storage:cwUnder11
Local: Field: nf11: table:coltableFrom ,Not Applicable
Local: Field: nf11: Show table: Always

; Field visibility conditions
local: field:cwbcsp11 : inactive: not #cwCustomFldsConfig
local: field:cwbcnf11 : inactive: not #cwCustomFldsConfig
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig
local: field:nf11 : inactive: not #cwCustomFldsConfig
local: field:nf: inactive: not #cwCustomFldsConfig
local: field: snf3: inactive:$$issysname:#nf11
local: field: nf11: inactive:$$issysname:#cwbcnf11
Local: field: nf: Width:30

space top :0.5


[Line:lnCaption12]
field:cwbcsp12,cwbcnf12,sp,nf12,sp2,snf3
; Field definitions
Local: Field: nf: info: ""
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
Local: Field: nf12: storage:cwtableFrom12
Local: Field: snf3: storage:cwUnder12
Local: Field: nf12: table:coltableFrom ,Not Applicable
Local: Field: nf12: Show table: Always

; Field visibility conditions
local: field:cwbcsp12 : inactive: not #cwCustomFldsConfig
local: field:cwbcnf12 : inactive: not #cwCustomFldsConfig
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig
local: field:nf12 : inactive: not #cwCustomFldsConfig
local: field:nf1: inactive: not #cwCustomFldsConfig
local: field: snf3: inactive:$$issysname:#nf12
local: field: nf12: inactive:$$issysname:#cwbcnf12
Local: field: nf: Width:30

space top :0.5

[Line:lnCaption13]
field:cwbcsp13,cwbcnf13,sp,nf13,sp2,snf3
; Field definitions
Local: Field: nf: info: ""
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
Local: Field: nf13: storage:cwtableFrom13
Local: Field: snf3: storage:cwUnder13
Local: Field: nf13: table:coltableFrom ,Not Applicable
Local: Field: nf13: Show table: Always

; Field visibility conditions
local: field:cwbcsp13 : inactive: not #cwCustomFldsConfig
local: field:cwbcnf13 : inactive: not #cwCustomFldsConfig
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig
local: field:nf13 : inactive: not #cwCustomFldsConfig
local: field:nf13: inactive: not #cwCustomFldsConfig
local: field: snf3: inactive:$$issysname:#nf13
local: field: nf13: inactive:$$issysname:#cwbcnf13
Local: field: nf: Width:30
space top :0.5


[Line:lnCaption14]
field:cwbcsp14,cwbcnf14,sp,nf14,sp2,snf3
; Field definitions
Local: Field: nf: info: ""
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
Local: Field: nf14: storage:cwtableFrom14
Local: Field: snf3: storage:cwUnder14
Local: Field: nf14: table:coltableFrom ,Not Applicable
Local: Field: nf14: Show table: Always

; Field visibility conditions
local: field:cwbcsp14 : inactive: not #cwCustomFldsConfig
local: field:cwbcnf14 : inactive: not #cwCustomFldsConfig
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig
local: field:nf114 : inactive: not #cwCustomFldsConfig
local: field:nf: inactive: not #cwCustomFldsConfig
local: field: snf3: inactive:$$issysname:#nf14
local: field: nf14: inactive:$$issysname:#cwbcnf14
Local: field: nf: Width:30

space top :0.5


;--------------- CUSTOM FIELDS CONFIGURATION TITLE ---------------
; Definition for the main configuration title field

[Field: cwCustomFldsConfigTitle]
Use : long prompt
info: "Stock Item has Additional Fields ?"
;; {12.Nov.16 11:45} width : 0

;--------------- CUSTOM FIELDS CONFIGURATION CHECKBOX ---------------
; Definition for the main configuration checkbox field

[Field: cwCustomFldsConfig]
Use: logical field
Set As: $cwCustomFldsEnabled
storage: cwCustomFldsEnabled
SubForm :stockitemcaptionfrm : $$value

;--------------- STOCK ITEM CAPTION REPORT AND FORM ---------------
; Report definition for stock item captions

[Report: stockitemcaptionfrm]
title :"Stock Item Additional Fields"
Form: stockitemcaptionfrm

; Form definition for stock item captions
[Form: stockitemcaptionfrm]
Part: stockitemcaptionfrm
width : 80% page

;--------------- STOCK ITEM CAPTION PART ---------------
; Part definition listing all caption lines

[Part: stockitemcaptionfrm]
line :lnCaption0,lnCaption0a,lnCaption1,lnCaption2,lnCaption3,lnCaption4,lnCaption5,lnCaption6,lnCaption9,lnCaption10,lnCaption11,lnCaption12,lnCaption13,lnCaption14


;--------------- STOCK SUMMARY DISPLAY OPTION ---------------
; Configuration for stock summary display option

[line : lnCaption0a]
field : sp3,cwlogical
Local: Field: sp3: Set As: "Show in Stock Summary?"
Local: Field: cwlogical: storage:cwShowItemsInStockSummary
Local: field: sp3: Width: 20

;--------------- STOCK ITEM ADDITIONAL FIELDS HEADER ---------------
; Header line for stock item additional fields

[Line: lnCaption0]
field:fwfc
Local: Field: fwfc: info: "Stock Item Additional Fields"
Local: Field: fwfc: Style: Normal Bold
Local: Field: fwfc: Border: thin bottom ;;left right

;--------------- CAPTION 1 CONFIGURATION ---------------
; Configuration for the first caption line (Brand)

[Line: lnCaption1]
field:cwbcsp,cwbcnf,sp,nf2,sp2,snf
space top :0.5
; Field definitions
Local: Field: nf: info: ""
Local: Field: sp: info: "Table From :"
Local: Field: sp2: info: "Under :"
Local: Field: nf2: storage:cwtableFrom1
Local: Field: snf: storage:cwUnder1
Local: Field: nf2: table:coltableFrom ,Not Applicable
Local: Field: nf2: Show table: Always
; Field visibility conditions
local: field:sp : inactive: not #cwCustomFldsConfig
local: field:sp2 : inactive: not #cwCustomFldsConfig

; Field dependencies
local: field: snf: inactive:$$issysname:#nf2
local: field: cwbcinss: inactive:$$issysname:#nf2
local: field: nf2: inactive:$$issysname:#cwbcnf


;--------------- TABLE FROM COLLECTION ---------------
; Collection defining the available tables for selection

[Collection: coltableFrom]
title:"Table From "
listname:@@cwforledger
listname:@@cwforcostcentre
listname:@@cwforcostcategory
listname:@@cwforgroup
listname:@@cwforstockgroup
listname:@@cwforstockcategory

;--------------- SYSTEM FORMULAS ---------------
; System formulas for custom fields configuration and table options

[System: Formula]

; Get custom fields enabled setting from current company
cwCustomFldsEnabled :  $cwCustomFldsEnabled:COMPANY:##SVCURRENTCOMPANY

; Define table options
cwforledger:"Ledger"
cwforcostcentre:"Cost Centre"
cwforcostcategory:"Cost Category"
cwforgroup:"Group"
cwforstockgroup:"Stock Group"
cwforstockcategory:"Stock Category"

; Get "Under" values from current company
forunder1:$cwUnder1:COMPANY:##SVCURRENTCOMPANY
forunder2:$cwUnder2:COMPANY:##SVCURRENTCOMPANY
forunder3:$cwUnder3:COMPANY:##SVCURRENTCOMPANY
forunder4:$cwUnder4:COMPANY:##SVCURRENTCOMPANY
forunder5:$cwUnder5:COMPANY:##SVCURRENTCOMPANY
forunder6:$cwUnder6:COMPANY:##SVCURRENTCOMPANY

`;
export default tdl;
