// Auto-generated from ITEMOPENING.TXT
const tdl = `
;===============================================================================
; ITEMOPENING.TXT
; Purpose: Displays an "Item Opening" report in Tally, showing opening, closing,
;          inward, and outward balances of stock items, with rich item details.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION (OPTIONAL)
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    ;; Optionally add: Option: cwstockitemLock ;; : @@cwDebug

[!menu: cwstockitemLock]
    add: Item: before: @@locQuit: @@cwstockitemReport: Display: Repcwstockitemx
    add: Item: before: @@locQuit: Blank

[System: formula]
    cwstockitemReport: "Item Opening"
    cwstockitemDemoLock: $$MachineDate < $$Date:"02/02/2012"

;------------------------------------------------------------------------------
; MAIN REPORT AND FORM
;------------------------------------------------------------------------------

[report: Repcwstockitemx]
    use: Repcwstockitem
    set: NUM1: 0
    set: NUM2: 0
    set: STR1: ""
    set: NUM3: 0
    set: str2: ""
    ; set: stockgroupname: "a300"
    title: ##stockgroupname

[Report: Repcwstockitem]
    use: Dsp Template
    Title: @@cwstockitemReport
    Printset: Report Title: @@cwstockitemReport
    Form: Frmcwstockitem
    Export: Yes
    variable: num1, num2, str1, num2, str2, sdf1, stockgroupname, stockcategoryname

/*
num1: 0 Opening, 1 Closing, 2 In, 3 Out
num2: 0 Std. Sale Price, 1 From Price List, 2 Closing Rate, 3 Opening Rate, 4 Std. Cost Price, 5 in rate, 6 out rate
str1 = pricelistname
*/

[Form: Frmcwstockitem]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0cwstockitem, Prtcwstockitem
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: cwstockitembotbrk, cwstockitembotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12

[part: cwstockitembotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: cwstockitembotopbrk]
    use: dspacctitles
    add: part: cwstockitemTitlePart

[part: cwstockitemTitlePart]
    line: LncwstockitemTitle

[line: LncwstockitemCurrPeriod]
    field: fwf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0cwstockitem]
    line: LncwstockitemCurrPeriod

[Part: Prtcwstockitem]
    Line: LncwstockitemTitle, Lncwstockitem
    bottom Line: LncwstockitemTotals
    repeat: Lncwstockitem: Colcwstockitem
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf, qtyf2

;------------------------------------------------------------------------------
; DATA COLLECTION: STOCK ITEMS
;------------------------------------------------------------------------------

[Collection: Colcwstockitem]
    Use: STOCK ITEM
    Filter: ColcwstockitemFilter
    fetch: alias

[system: Formula]
    ColcwstockitemFilter: @@cwChkAliasPartNo and @@cwChkStockGroupCategory
    cwChkAliasPartNo: if ##num4 = 0 then yes else if ##num4 = 1 then not $$isempty:$mailingname else $$numitems:name > 1
    cwChkStockGroupCategory: if not $$issysname:##Stockgroupname then $$isobjectbelongsto:stockgroup:$parent:##Stockgroupname else if not $$issysname:##stockcategoryname then $$isobjectbelongsto:stockcategory:$category:##StockCategoryname else yes

;------------------------------------------------------------------------------
; COLUMN HEADERS
;------------------------------------------------------------------------------

[Line: LncwstockitemTitle]
    use: Lncwstockitem
    option: titleopt
    Local: Field: nf: Set As: "Name"
    Local: Field: snf: Set As: "Alias"
    Local: Field: snf2: Set As: "Part No"
    Local: Field: snf3: Set As: "UOM"
    Local: Field: NF2: Set As: "Description"
    Local: Field: qtyf: Set As: "Op. Qty"
    Local: Field: ratepf: Set As: "Op. Rate"
    local: field: default: style: normal bold

;------------------------------------------------------------------------------
; MAIN DATA LINE
;------------------------------------------------------------------------------

[Line: Lncwstockitem]
    ; Extensive field and local logic for displaying item and batch details
    ; (See full file for all field assignments and calculations)
    Option: Alter on Enter
    local: field: qtyf: Format : "NoSymbol"
    local: field: qtyf2: Format : "NoSymbol"
    explode: mybatch1

;------------------------------------------------------------------------------
; BATCH EXPLOSION PART AND LINE
;------------------------------------------------------------------------------

[part: mybatch1]
    line: mybatch1
    repeat: mybatch1: cwbatchofitem

[line: mybatch1]
    use: Lncwstockitem
    delete: explode
    empty: $$line = $$numitems

[Collection: cwbatchofitem]
    type: batch
    child of: #nf

;------------------------------------------------------------------------------
; FUNCTION: DYNAMIC QTY/RATE CALCULATION BY CONTEXT
;------------------------------------------------------------------------------

[function : myfuncx]
    parameter : myexplodelevel : number
    parameter : myline : number
    parameter : mytype : number ; 0 = opening, 1= closing , 2 = in , 3 = out
    ; (Returns the relevant batch field value based on context)

;------------------------------------------------------------------------------
; TOTALS LINE
;------------------------------------------------------------------------------

[line: LncwstockitemTotals]
    use: Lncwstockitem
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: fwf: set as: ""
    local: field: amtf: set as: $$total:amtf
    local: field: qtyf2: set as: $$total:qtyf2

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
