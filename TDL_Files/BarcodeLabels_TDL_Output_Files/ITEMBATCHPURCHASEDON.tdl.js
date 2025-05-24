// Auto-generated from ITEMBATCHPURCHASEDON.TXT
const tdl = `
;===============================================================================
; ITEMBATCHPURCHASEDON.TXT
; Purpose: Provides an "Item Batch Purchased On" report in Tally, displaying
;          all purchase (or sales) vouchers for a given stock item and batch,
;          with party, quantity, and value details.
;===============================================================================

;------------------------------------------------------------------------------
; (Optional) Menu integration for Gateway of Tally and Debug menu
;------------------------------------------------------------------------------
[#menu: Gateway of Tally]
;    add: Option: ItemBatchPurchasedOnLock ;; : @@ItemBatchPurchasedOnDemoLock

;; {15.Mar.23 16:28}      [#menu : cw_Debug_menu]   
;; {15.Mar.23 16:28}         add: Item: before: @@locQuit: @@ItemBatchPurchasedOnReport: Display: RepItemBatchPurchasedOnx

[!menu: ItemBatchPurchasedOnLock]
    add: Item: before: @@locQuit: @@ItemBatchPurchasedOnReport: Display: RepItemBatchPurchasedOnx
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; System formula for report title
;------------------------------------------------------------------------------
[System: formula]
   ItemBatchPurchasedOnReport: "Item Batch Purchased On"
;; ItemBatchPurchasedOnDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; Main report definition for Item Batch Purchased On
;------------------------------------------------------------------------------
[Report: RepItemBatchPurchasedOn]
    use: Dsp Template
    Title: @@ItemBatchPurchasedOnReport
    Printset: Report Title: @@ItemBatchPurchasedOnReport
    Form: FrmItemBatchPurchasedOn
    Export: Yes
;; {30.Jun.15 16:42}      set  : svfromdate : ##svcurrentdate
;; {30.Jun.15 16:42}      set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes
    variable : stockitemname
    variable : IsItemBatchReport
    variable : num1
    set : IsItemBatchReport : yes
    variable : IsGodownReport
    set : IsGodownReport : no

;------------------------------------------------------------------------------
; Example report variant with hardcoded stock item and batch
;------------------------------------------------------------------------------
[Report: RepItemBatchPurchasedOnx]
    use : RepItemBatchPurchasedOn
    set : stockitemname : 'Item54'
    set : DSPBatchName : '0000400010'
    set : num1 : 2

;------------------------------------------------------------------------------
; Main form layout and toolbar buttons
;------------------------------------------------------------------------------
[Form: FrmItemBatchPurchasedOn]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0ItemBatchPurchasedOn,PrtItemBatchPurchasedOn
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: ItemBatchPurchasedOnbotbrk,ItemBatchPurchasedOnbotOpbrk
    Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
;; BottomToolBarBtn2, BottomToolBarBtn4, BottomToolBarBtn5,BottomToolBarBtn6, BottomToolBarBtn7,
;;                        1 Quit, 2 Accept, 3 Delete, 4 Cancel, 5 Duplicate Voucher, 6 Add Voucher, 7 Insert Voucher, 8 Remove Line, 9 Restore Line, 10 Restore all, 11 Select, 12 Select All
;;    local : button : report config : action :modify variable: MyPLConfigure

[part: ItemBatchPurchasedOnbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: ItemBatchPurchasedOnbotopbrk]
    use: dspacctitles
    add: part: ItemBatchPurchasedOnTitlePart

[part: ItemBatchPurchasedOnTitlePart]
    line: LnItemBatchPurchasedOnTitle

[line: LnItemBatchPurchasedOnCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf: Set As: #stockitemname + " ~ " + ##dspbatchname
    invisible: $$inprintmode

[part: PrtTitle0ItemBatchPurchasedOn]
    line : LnItemBatchPurchasedOnCurrPeriod

;------------------------------------------------------------------------------
; Main data part: repeat lines for each relevant voucher
;------------------------------------------------------------------------------
[Part: PrtItemBatchPurchasedOn]
    Line: LnItemBatchPurchasedOnTitle,LnItemBatchPurchasedOn
    bottom Line: LnItemBatchPurchasedOnTotals
    repeat: LnItemBatchPurchasedOn: ColItemBatchPurchasedOn
    scroll: Vertical
    Common Border: YEs
    Total: Qtyf,amtf

;------------------------------------------------------------------------------
; Collection: Vouchers of Stock Item, filtered for batch and type
;------------------------------------------------------------------------------
[Collection: ColItemBatchPurchasedOn]
    Use: Vouchers of Stock Item
    child of : #stockitemname
    delete : filter ;: inoutfilter,IsVCHGodownExist,IsVchGodownBatchExist,IsBatchGodownVouchers
    add : filter : IsVCHBatchExistsx, setinout

    compute : mypartyname :  if not $$isstockjrnl:$vouchertypename then $partyledgername else "Transfer"
    compute : cwinqty : $$FilterQtyTotal:InventoryEntries:OwnItemInEntries:$BatchAutoActualQty
    compute : cwoutqty :$$FilterQtyTotal:InventoryEntries:OwnItemOutEntries:$BatchAutoActualQty

    sort : @@default : $mypartyname

[system: Formula]
ColItemBatchPurchasedOnFilter: Yes
IsVCHBatchExistsx : NOT $$IsEmpty:$AllInventoryEntries[1,@@IsBatchExist].StockItemName
setinout : if ##num1 = 1 then $$ispurchase:$vouchertypename or ($$isstockjrnl:$vouchertypename and not $$isempty:$$FilterQtyTotal:InventoryEntries:OwnItemInEntries:$BatchAutoActualQty) else $$issales:$vouchertypename
;;not $$isempty:$stkinqty else not $$isempty:$stkoutqty

;------------------------------------------------------------------------------
; Column headers for the report
;------------------------------------------------------------------------------
[Line: LnItemBatchPurchasedOnTitle]
    use: LnItemBatchPurchasedOn
    option: titleopt
;;     local: field:default: set as: $$DescName
    local:field: sdf: set as: "Date"
    local:field: nf: set as: "Name"
    local:field: fwf: set as: "Description"
    local:field: qtyf: set as: "Qty."
    local:field: amtf: set as: "Value"
    local:field: ratepf : set as : "Rate"
    local: field: default : style: normal bold

;------------------------------------------------------------------------------
; Main data line: voucher details for the batch
;------------------------------------------------------------------------------
[Line: LnItemBatchPurchasedOn]
    Fields: numf,d1,fwf
    right field: d2,Qtyf,d3,sdf,d4,snf,d5,amtf
    Option: Alter on Enter
    local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
    local:field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
;; local : field : fwf : alter : ledger : $$isledger
    local: field: sdf : set as : $date
    Local: Field: fwf: Set As: $mypartyname
    Local: Field: qtyf: Set As:  if ##num1 =1 then $cwInQty else $$FilterQtyTotal:allInventoryEntries:OwnItemOutEntries:$BatchAutoActualQty
    Local: Field: snf: Set As: $vouchernumber
    Local: Field: amtf: Set As: if ##num1 =2 then $$CollAmtTotal:AllLedgerEntries:$OwnBatchGdwnItemOutAmounts else $$CollAmtTotal:AllLedgerEntries:$OwnBatchGdwnItemInAmounts

    OPTION : CW_SETW : $$INEXPORTMODE

;------------------------------------------------------------------------------
; Totals line for the report
;------------------------------------------------------------------------------
[line: LnItemBatchPurchasedOnTotals]
    use: LnItemBatchPurchasedOn
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: fwf: set as: ""
    local: field: amtf : set as :  $$total:amtf

`;
export default tdl;
