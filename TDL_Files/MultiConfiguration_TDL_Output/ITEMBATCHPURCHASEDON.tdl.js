// Auto-generated from ITEMBATCHPURCHASEDON.TXT
const tdl = `
;===============================================================================
; ITEMBATCHPURCHASEDON.TXT
; Purpose: Displays a report of "Item Batch Purchased On" in Tally, showing
;          purchase/sale transactions for a specific item batch, with party,
;          date, quantity, and value details.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION (OPTIONAL)
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;    add: Option: ItemBatchPurchasedOnLock ;; : @@ItemBatchPurchasedOnDemoLock

;; [#menu : cw_Debug_menu]
;;     add: Item: before: @@locQuit: @@ItemBatchPurchasedOnReport: Display: RepItemBatchPurchasedOnx

[!menu: ItemBatchPurchasedOnLock]
    add: Item: before: @@locQuit: @@ItemBatchPurchasedOnReport: Display: RepItemBatchPurchasedOnx
    add: Item: before: @@locQuit: Blank

[System: formula]
    ItemBatchPurchasedOnReport: "Item Batch Purchased On"
;; ItemBatchPurchasedOnDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN REPORT AND FORM
;------------------------------------------------------------------------------

[Report: RepItemBatchPurchasedOn]
    use: Dsp Template
    Title: @@ItemBatchPurchasedOnReport
    Printset: Report Title: @@ItemBatchPurchasedOnReport
    Form: FrmItemBatchPurchasedOn
    Export: Yes
    Local: Button: RelReports: Inactive: Yes
    variable: stockitemname
    variable: IsItemBatchReport
    variable: num1
    set: IsItemBatchReport: yes
    variable: IsGodownReport
    set: IsGodownReport: no

[Report: RepItemBatchPurchasedOnx]
    use: RepItemBatchPurchasedOn
    set: stockitemname: 'Item54'
    set: DSPBatchName: '0000400010'
    set: num1: 2

[Form: FrmItemBatchPurchasedOn]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0ItemBatchPurchasedOn, PrtItemBatchPurchasedOn
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: ItemBatchPurchasedOnbotbrk, ItemBatchPurchasedOnbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12

[part: ItemBatchPurchasedOnbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: ItemBatchPurchasedOnbotopbrk]
    use: dspacctitles
    add: part: ItemBatchPurchasedOnTitlePart

[part: ItemBatchPurchasedOnTitlePart]
    line: LnItemBatchPurchasedOnTitle

[line: LnItemBatchPurchasedOnCurrPeriod]
    field: fwf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf: Set As: #stockitemname + " ~ " + ##dspbatchname
    invisible: $$inprintmode

[part: PrtTitle0ItemBatchPurchasedOn]
    line: LnItemBatchPurchasedOnCurrPeriod

[Part: PrtItemBatchPurchasedOn]
    Line: LnItemBatchPurchasedOnTitle, LnItemBatchPurchasedOn
    bottom Line: LnItemBatchPurchasedOnTotals
    repeat: LnItemBatchPurchasedOn: ColItemBatchPurchasedOn
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf

;------------------------------------------------------------------------------
; DATA COLLECTION: VOUCHERS FOR SELECTED ITEM & BATCH
;------------------------------------------------------------------------------

[Collection: ColItemBatchPurchasedOn]
    Use: Vouchers of Stock Item
    child of: #stockitemname
    delete: filter ;: inoutfilter,IsVCHGodownExist,IsVchGodownBatchExist,IsBatchGodownVouchers
    add: filter: IsVCHBatchExistsx, setinout
    compute: mypartyname: if not $$isstockjrnl:$vouchertypename then $partyledgername else "Transfer"
    compute: cwinqty: $$FilterQtyTotal:InventoryEntries:OwnItemInEntries:$BatchAutoActualQty
    compute: cwoutqty: $$FilterQtyTotal:InventoryEntries:OwnItemOutEntries:$BatchAutoActualQty
    sort: @@default: $mypartyname

[system: Formula]
    ColItemBatchPurchasedOnFilter: Yes
    IsVCHBatchExistsx: NOT $$IsEmpty:$AllInventoryEntries[1,@@IsBatchExist].StockItemName
    setinout: if ##num1 = 1 then $$ispurchase:$vouchertypename or ($$isstockjrnl:$vouchertypename and not $$isempty:$$FilterQtyTotal:InventoryEntries:OwnItemInEntries:$BatchAutoActualQty) else $$issales:$vouchertypename

;------------------------------------------------------------------------------
; COLUMN HEADERS
;------------------------------------------------------------------------------

[Line: LnItemBatchPurchasedOnTitle]
    use: LnItemBatchPurchasedOn
    option: titleopt
    local: field: sdf: set as: "Date"
    local: field: nf: set as: "Name"
    local: field: fwf: set as: "Description"
    local: field: qtyf: set as: "Qty."
    local: field: amtf: set as: "Value"
    local: field: ratepf: set as: "Rate"
    local: field: default: style: normal bold

;------------------------------------------------------------------------------
; MAIN DATA LINE
;------------------------------------------------------------------------------

[Line: LnItemBatchPurchasedOn]
    Fields: numf, d1, fwf
    right field: d2, Qtyf, d3, sdf, d4, snf, d5, amtf
    Option: Alter on Enter
    local: field: qtyf: Format: "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf: setas: #amtf/#qtyf
    local: field: fwf: alter: voucher: $$isvoucher
    option: alter on enter
    local: field: fwf: alter: voucher: $$isvoucher
    local: field: sdf: set as: $date
    Local: Field: fwf: Set As: $mypartyname
    Local: Field: qtyf: Set As: if ##num1 = 1 then $cwInQty else $$FilterQtyTotal:allInventoryEntries:OwnItemOutEntries:$BatchAutoActualQty
    Local: Field: snf: Set As: $vouchernumber
    Local: Field: amtf: Set As: if ##num1 = 2 then $$CollAmtTotal:AllLedgerEntries:$OwnBatchGdwnItemOutAmounts else $$CollAmtTotal:AllLedgerEntries:$OwnBatchGdwnItemInAmounts

    OPTION: CW_SETW: $$INEXPORTMODE

;------------------------------------------------------------------------------
; TOTALS LINE
;------------------------------------------------------------------------------

[line: LnItemBatchPurchasedOnTotals]
    use: LnItemBatchPurchasedOn
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: fwf: set as: ""
    local: field: amtf: set as: $$total:amtf

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
