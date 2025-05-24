// Auto-generated from STOCKITEMMASTER2.TXT
const tdl = `
;===============================================================================
; STOCKITEMMASTER2.TXT
; Created By: Anil on 2023-07-18 17:33, ID:
; Created By: Akshay on 2013-01-05 10:52, ID:
; Purpose: Provides advanced configuration and UI for custom fields in Stock Item
;          master, supporting up to 14 additional attributes (brand, style, size, etc.),
;          cost tracking, and dynamic table/under selection in Tally.
;===============================================================================

;------------------------------------------------------------------------------
; CONFIGURATION UI: CUSTOM FIELDS FOR STOCK ITEMS
;------------------------------------------------------------------------------

[#Form: Company Operations]
    Switch   : cwCustomFldsLowerRel  : cwCustomFldsNotFor3.2  : ($$Number:$$ProdInfo:ProdReleaseAsStr) < 3.2
    Switch   : cwCustomFldsCurrenRel : cwCustomFldsFor3.2     : ($$Number:$$ProdInfo:ProdReleaseAsStr) >= 3.2

[!Form : cwCustomFldsNOTFor3.2]
[!Form : cwCustomFldsFor3.2]

; Adds lines for configuring custom fields (captions, tables, under, etc.)
[Line : cwCustomFldsConfig]
    Field : cwCustomFldsConfigTitle, cwCustomFldsConfig
    Local: Field: short name field : info: "sales@circuitworld.in"
    Local: Field: short name field: case : normal
    Local: Field: short name field: Color : blue
    Local: Field: short name field: width : 0

;------------------------------------------------------------------------------
; CONFIGURATION LINES FOR EACH CUSTOM FIELD (UP TO 14)
;------------------------------------------------------------------------------

; For each custom field (Brand, Style, Season, Size, etc.), a line is defined with:
; - Caption prompt
; - Table From (source master type)
; - Under (parent/group)
; - Table selection logic

[Line: lnCaption1] ... [Line: lnCaption14]
    field: (caption prompt), (caption storage), sp, nfN, sp2, snfN
    ; Each line stores table source, under/group, and provides table selection

; Field and line logic ensures inactive fields are hidden if not enabled or not configured.

;------------------------------------------------------------------------------
; FIELD DEFINITIONS FOR CAPTIONS, STORAGE, AND TABLE SELECTION
;------------------------------------------------------------------------------

[field: cwbcsp] ... [field: cwbcsp14]
    use: short prompt
    info: "CaptionN:"

[field: cwbcnf] ... [field: cwbcnf14]
    use: name field
    storage: cwCustomFieldNStr

; Each custom field has corresponding storage UDFs for value and caption.

;------------------------------------------------------------------------------
; DYNAMIC TABLE SELECTION FOR EACH FIELD (LEDGER, GROUP, COST CENTRE, ETC.)
;------------------------------------------------------------------------------

; For each "table from" selection, system formulas and options are defined:
[System: Formula]
    forunderN: $cwUnderN:COMPANY:##SVCURRENTCOMPANY
    fortableNled: $cwtableFromN:COMPANY:##SVCURRENTCOMPANY
    fortableNledx: @@fortableNled="ledger"
    ; ...similar for group, cost centre, cost category, stock group, stock category

;------------------------------------------------------------------------------
; COLLECTIONS FOR TABLES (USED IN FIELD TABLES)
;------------------------------------------------------------------------------

[Collection: coltableFrom]
    title: "Table From"
    listname: @@cwforledger
    listname: @@cwforcostcentre
    listname: @@cwforcostcategory
    listname: @@cwforgroup
    listname: @@cwforstockgroup
    listname: @@cwforstockcategory

;------------------------------------------------------------------------------
; SYSTEM FORMULAS FOR ENABLE FLAGS AND DYNAMIC TITLES
;------------------------------------------------------------------------------

[System: Formula]
    cwCustomFldsEnabled : $cwCustomFldsEnabled:COMPANY:##SVCURRENTCOMPANY
    cwforledger: "Ledger"
    cwforcostcentre: "Cost Centre"
    cwforcostcategory: "Cost Category"
    cwforgroup: "Group"
    cwforstockgroup: "Stock Group"
    cwforstockcategory: "Stock Category"

;------------------------------------------------------------------------------
; UI EXTENSION: ADDITIONAL FIELDS TO STOCK ITEM FORM
;------------------------------------------------------------------------------

[#Form: Stock Item]
    add: part: after: STKI Basic : prtItemCoal

[part: prtItemCoal]
    line: lnItemsortno, lnItemsortno2, lnItemsortno3, lnItemsortno4

; Each line displays up to 14 custom fields, with captions and dynamic tables.

;------------------------------------------------------------------------------
; FIELD DEFINITIONS FOR STOCK ITEM ATTRIBUTES
;------------------------------------------------------------------------------

[field: stksnf] ... [field: stksnf14]
    use: snf
    Style: Normal Bold
    storage: cwCustomFieldN
    set always: yes
    Show table: Always
    inactive: (not @@cwhascustomudf) or $$issysname:$cwCustomFieldNStr:COMPANY:##SVCURRENTCOMPANY
    ; Table and option logic for each possible master type (ledger, group, etc.)

;------------------------------------------------------------------------------
; COST TRACKING CONFIGURATION (OPTIONAL)
;------------------------------------------------------------------------------

[line : cwCostTracking]
    field : long prompt, cwlogical2, medium prompt, snf, sp4, snf2, snf3, sp3, numf, sp5, snf5
    Local: Field: long prompt: info: "Enable Cost Coding ?"
    Local: Field: cwlogical2: storage: cwCostTracking
    Local: Field: medium prompt: info: "Cost String [0-9] :"
    Local: Field: snf: storage: cwCostStr
    Local: Field: sp3: info: "Cost Multiplier:"
    Local: Field: numf: storage: cwCostMultiplier
    Local: Field: sp4: info: "Cost From:"
    Local: Field: snf2: storage: cwCostFrom
    Local: Field: snf2: table: costfrom
    Local: Field: snf3: storage: cwCostPL
    Local: Field: snf3: table: pricelevels
    Local: Field: sp5: info: "Cost Code2:"
    Local: Field: snf5: table: pricelevels
    Local: Field: snf5: storage: cwrtlpricelist

[collection : costfrom]
    title: "Cost from"
    listname: @@cwCFVoucherRate
    listname: @@cwCFPriceList
    listname: @@cwCFStandardCost
    listname: @@cwCFStandardSale

[System: Formula]
    cwCFVoucherRate: "Voucher Rate"
    cwCFPriceList: "Price List"
    cwCFStandardCost: "Standard Cost"
    cwCFStandardSale: "Standard Sale"

;------------------------------------------------------------------------------
; ADDITIONAL LOGIC AND FIELD INACTIVITY
;------------------------------------------------------------------------------

; All fields and lines are dynamically enabled/inactive based on company settings
; and the presence of custom UDFs/titles.

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
