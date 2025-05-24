// Auto-generated from ITEMOPENING.TXT
const tdl = `
;===============================================================================
; ITEMOPENING.TXT
; Purpose: Provides an "Item Opening" report in Tally, displaying stock item
;          opening balances, part numbers, aliases, UOM, descriptions, and
;          a wide range of custom fields, with batch explosion and totals.
;===============================================================================

;------------------------------------------------------------------------------
; (Optional) Menu integration for Gateway of Tally and Debug menu
;------------------------------------------------------------------------------
[#menu: Gateway of Tally]
;; {15.Mar.23 13:54}       [#menu : cw_Debug_menu]
;; {15.Mar.23 13:54}         add: Option: cwstockitemLock ;;: @@cwDebug

[!menu: cwstockitemLock]
    add: Item: before: @@locQuit: @@cwstockitemReport: Display: Repcwstockitemx
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; System formula for report title and demo lock
;------------------------------------------------------------------------------
[System: formula]
    cwstockitemReport: "Item Opening"
    cwstockitemDemoLock: $$MachineDate < $$Date:"02/02/2012"

;------------------------------------------------------------------------------
; Test report variant for Item Opening (sets up variables)
;------------------------------------------------------------------------------
[report: Repcwstockitemx]
    use: Repcwstockitem
    set: NUM1: 0
    set: NUM2: 0
    set: STR1: ""
    set: NUM3: 0
    set: str2: ""
    set: NUM4: 0
    set: stockgroupname: ""
    set: stockcategoryname: ""
    title: ##stockgroupname

;------------------------------------------------------------------------------
; Main report definition for Item Opening
;------------------------------------------------------------------------------
[Report: Repcwstockitem]
    use: Dsp Template
    Title: @@cwstockitemReport
    Printset: Report Title: @@cwstockitemReport
    Form: Frmcwstockitem
    Export: Yes
    variable: num1, num2, str1, num3, str2, num4, sdf1, stockgroupname, stockcategoryname

/*
num1   0 Opening,1 Closing,2 In,3 Out
num2   0 Std. Sale Price,1 From Price List,2 Closing Rate,3 Opening Rate,4 Std. Cost Price,5 in rate, 6 out rate
str1 = pricelistname
num4   Alias/PartNo filter
*/

;------------------------------------------------------------------------------
; Main form layout and toolbar buttons
;------------------------------------------------------------------------------
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
    line : LncwstockitemCurrPeriod

;------------------------------------------------------------------------------
; Main data part: repeat lines for each item, with batch explosion
;------------------------------------------------------------------------------
[Part: Prtcwstockitem]
    Line: LncwstockitemTitle, Lncwstockitem
    bottom Line: LncwstockitemTotals
    repeat: Lncwstockitem: Colcwstockitem
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf, qtyf2

;------------------------------------------------------------------------------
; Collection: Stock items with optional filters for alias/part no and group/category
;------------------------------------------------------------------------------
[Collection: Colcwstockitem]
    Use: STOCK ITEM
    Filter: ColcwstockitemFilter
    fetch : alias

[system: Formula]
    ColcwstockitemFilter: @@cwChkAliasPartNo and @@cwChkStockGroupCategory
    cwChkAliasPartNo : if ##num4 = 0 then yes else if ##num4 = 1 then not $$isempty:$mailingname else $$numitems:name > 1
    cwChkStockGroupCategory : if not $$issysname:##Stockgroupname then $$isobjectbelongsto:stockgroup:$parent:##Stockgroupname else if not $$issysname:##stockcategoryname then $$isobjectbelongsto:stockcategory:$category:##StockCategoryname  else yes

;------------------------------------------------------------------------------
; Column headers for the report
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
    local: field: default : style: normal bold

;------------------------------------------------------------------------------
; Main data line: item details, custom fields, batch explosion
;------------------------------------------------------------------------------
[Line: Lncwstockitem]
    Local: Field: snf2: Color : blue
    Local: Field: qtyf: Color : blue
    Fields: numf, d10, nf, d1, snf, d2, snf2, d3, snf3, d4, nf2, d5
    right field: qtyf, d6, ratepf, d7, ratepf2, d8, numf2, d9, snf4, d10bc, snf5, d11, snf6, d12, qtyf2, d13, snf7, d14, snf8, D15, SNF9, D16, SNF10, D17, SNF11, D18, SNF12, D19, SNF13, D20, SNF14, d21, snf15, d22, snf16, d23, snf18, d24, snf19, d25, snf20, d26, snf21, d27, snf22, d28, snf23, d29, snf24, d30, snf25, d31, snf26, d32, snf27, d33, snf28

    Local: Field: numf: Set As: $$explodelevel
    Local: Field: NF: Set As: $STOCKITEMNAME
    Local: Field: snf: Set As: if $$explodelevel = 0 then $$collectionfield:$name:2:name else ""
    Local: Field: snf2: Set As: if $$explodelevel = 0 then $MAILINGNAME else $$prevlinefield
    Local: Field: snf3: Set As: if $$explodelevel = 0 then $baseunits else $$prevlinefield
    Local: Field: NF2: Set As: if $$explodelevel = 0 then $DESCRIPTION  else $$prevlinefield
    Local: Field: numf2: Set As: if $$explodelevel = 0 then $rateofvat else $$prevlinefield
    Local: Field: snf7: Set As: if $$explodelevel = 0 then $ADDITIONALUNITS else $$prevlinefield

    local: field: nf: alter: stockitem:$$isstockitem
    local: field: qtyf: type: number
    Local: Field: qtyf: Set As: $$cwfqty:($$myfuncx:#numf:$$line:##num1):1
    local: field: qtyf2: type: number
    Local: Field: qtyf2: Set As: $$cwfqty:($$string:($$myfuncx:#numf:$$line:##num1):"Secondary"):2

    Local: Field: ratepf: Set As: if $$explodelevel = 0 then (if ##num2 = 0 then $$FilterValue:$Rate:StdRatePrice:Last:StandDate1 else if ##num2 = 1 then $$getpricefromlevel:$name:##str1:##svfromdate:$StartingFrom else if ##num2 = 3 then $openingvalue / $openingbalance else if ##num2 = 2 then $closingvalue / $closingbalance else if ##num2 = 4 then $$FilterValue:$Rate:StdPurCost:Last:StandDate1 else if ##num2 = 5 then $tbaldebits /  $stkinqty else if ##num2 = 6 then $tbalcredits / $stkoutqty else 0) else $$prevlinefield

    Local: Field: ratepf2: Set As: if $$explodelevel =0 then (if ##num3 = 0 then @@cwitemmrprate else if ##num3 = 1 then $$number:$$FilterValue:$Rate:StdRatePrice:Last:StandDate1 else if ##num3 = 2 then $$number:$$getpricefromlevel:$name:##str2:##sdf1:$StartingFrom else if ##num3 = 4 then $$number:$openingvalue / $$number:$openingbalance else if ##num3 = 3 then $$number:$closingvalue / $$number:$closingbalance else if ##num3 = 5 then $$number:$$FilterValue:$Rate:StdPurCost:Last:StandDate1 else if ##num3 = 6 then $$number:$tbaldebits /  $$number:$stkinqty else if ##num3 = 7 then $$number:$tbalcredits / $$number:$stkoutqty else 0) else $$prevlinefield
    local: field: ratepf2: type: number

    Local: Field: snf4: Set As: if $$explodelevel = 0 then $narration else $$prevlinefield
    Local: Field: snf5: Set As: if $$explodelevel =0 then $$cwbatch:$$collectionfield:$batchname:1:cwbatchofitem else $$cwbatch:$$owner:$$collectionfield:$batchname:@@linep1:cwbatchofitem
    Local: Field: snf6: Set As:  $$collectionfield:$godownname:@@linep1ex:cwbatchofitem
    Local: Field: snf8: Set As: $$collectionfield:$cwCartonSErial:@@linep1ex:cwbatchofitem

    Local: Field: SNF9 : Set As: if $$explodelevel = 0 then  $cwsortno else $$Prevlinefield
    Local: Field: SNF10 : Set As: if $$explodelevel = 0 then $cwsize else $$Prevlinefield
    Local: Field: SNF11 : Set As: if $$explodelevel = 0 then $cwproduct else $$Prevlinefield
    Local: Field: SNF12 : Set As: if $$explodelevel = 0 then $cwproduct2 else $$Prevlinefield
    Local: Field: SNF13 : Set As: if $$explodelevel = 0 then $cwproduct3 else $$Prevlinefield
    Local: Field: SNF14 : Set As: if $$explodelevel = 0 then $cwproduct4 else $$Prevlinefield
    Local: Field: SNF15 : Set As: if $$explodelevel = 0 then $parent else $$Prevlinefield
    Local: Field: SNF16 : Set As: if $$explodelevel = 0 then $grandparent else $$Prevlinefield

    Local: Field: snf18: Set As: if $$explodelevel = 0 then @@mycwwspricelistnew else $$Prevlinefield
    Local: Field: snf19: Set As: if $$explodelevel = 0 then @@MYcwrtlpricelistnew else $$Prevlinefield
    Local: Field: snf20: Set As: if $$explodelevel = 0 then $cwCostStr:COMPANY:##SVCURRENTCOMPANY else $$Prevlinefield
    local: field: snf18: type: number
    Local: field: snf18: Format: "nocomma,nosymbol,decimals:0"
    local: field: snf19: type: number
    Local: field: snf19: Format: "nocomma,nosymbol,decimals:0"

    Local: Field: snf21: Set As: if $$explodelevel = 0 then $cwproduct5  else $$prevlinefield
    Local: Field: snf22: Set As: if $$explodelevel = 0 then $cwproduct10  else $$prevlinefield
    Local: Field: snf23: Set As: if $$explodelevel = 0 then $cwproduct11  else $$prevlinefield
    Local: Field: snf24: Set As: if $$explodelevel = 0 then $cwproduct12  else $$prevlinefield
    Local: Field: snf25: Set As: if $$explodelevel = 0 then $cwproduct13  else $$prevlinefield
    Local: Field: snf26: Set As: if $$explodelevel = 0 then $cwproduct14  else $$prevlinefield

    Local: field: SNF9 : Width: 50
    Local: field: SNF10: Width: 50
    Local: field: SNF11: Width: 50
    Local: field: SNF12: Width: 50
    Local: field: SNF13: Width: 50
    Local: field: SNF14: Width: 50
    Local: field: SNF15: Width: 50

    explode: mybatch1

    Local: Field: snf21: width: 50
    Local: Field: snf22: width: 50
    Local: Field: snf23: width: 50
    Local: Field: snf24: width: 50
    Local: Field: snf25: width: 50
    Local: Field: snf26: width: 50

    Local: field: nf: Width: 100
    Local: field: snf: Width: 100
    Local: field: snf2: Width: 100
    Local: field: snf3: Width: 100
    Local: field: snf3: Width: 30
    Local: field: snf5: Width: 30
    Local: field: snf6: Width: 30
    Local: field: nf3: Width: 100

    Local: Field: snf27: Set As: if $$explodelevel =  0 then $$collectionfield:$mfdon:1:cwbatchofitem else $$collectionfield:$mfdon:@@linep1:cwbatchofitem
    Local: Field: snf28: Set As: if $$explodelevel =  0 then $$collectionfield:$EXPIRYPERIOD:1:cwbatchofitem else $$collectionfield:$EXPIRYPERIOD:@@linep1:cwbatchofitem

    Option: Alter on Enter
    local: field: qtyf: Format : "NoSymbol"
    local: field: qtyf2: Format : "NoSymbol"

;------------------------------------------------------------------------------
; Function: Returns batch name unless it is "Primary Batch"
;------------------------------------------------------------------------------
[function : cwbatch]
parameter : str : string
10 : if : ##str <> "Primary Batch"
20 : return : ##str
30 : else
40 : return : ""
50 : end if

[System: Formula]
    cwopxx : if $$explodelevel = 0 then 1 else 2

;------------------------------------------------------------------------------
; Batch explosion part for each item
;------------------------------------------------------------------------------
[part : mybatch1]
    line: mybatch1
    repeat : mybatch1 : cwbatchofitem

[line : mybatch1]
    use : Lncwstockitem
    delete : explode
    empty : $$line = $$numitems

[Collection: cwbatchofitem]
    type : batch
    child of : #nf ;; $name

;------------------------------------------------------------------------------
; System formula for filtering price list
;------------------------------------------------------------------------------
[System: Formula]
    StandDate1 : $Date <= ##svfromdate
    mycwwspricelistnew:$$getpricefromlevel:$name:@@cwwspricelist:##svfromdate:$StartingFrom
    cwwspricelist : ##str2

;------------------------------------------------------------------------------
; Totals line for the report
;------------------------------------------------------------------------------
[line: LncwstockitemTotals]
    use: Lncwstockitem
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: amtf : set as :  $$total:amtf
    local: field: qtyf2: set as: $$total:qtyf2

`;
export default tdl;
