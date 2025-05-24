// Auto-generated from invoicechg.txt
const tdl = `
;===============================================================================
; INVOICECHG.TXT
; Created By: Khokan on 2014-05-23 16:45, ID:
; Purpose: Customizes printed invoice and simple invoice forms for Rose Homeo,
;          with advanced inventory entry aggregation, HSN, GST, MRP, and layout.
;===============================================================================

;------------------------------------------------------------------------------
; COLLECTION: AGGREGATED INVENTORY ENTRIES
;------------------------------------------------------------------------------

[collection : cwInventoryEntriesnew]
    source collection: default
    walk: inventoryentries

    compute: stockitemname : $stockitemname
    by: myparentinv : $parent:stockitem:$stockitemname

    compute: itemhsncode : If NOT $GSTIsTransLedEx Then "" Else $GSTItemHSNCodeEx
    compute: rate : $rate
    compute: mrprate : @@cwnewmrp
    compute: gstratex : If NOT $GSTIsTransLedEx Then "" Else $GSTClsfnIGSTRateEx
    compute: InclusiveTaxValue : $InclusiveTaxValue

    aggr compute: billedqty : sum : $billedqty
    aggr compute: amount : sum : $amount
    compute: discount : $discount
    aggr compute: cwrmvchpcsnew1 : sum : $cwrmvchpcsnew

    sort: @@default : $parent:stockitem:$stockitemname

[System: Formula]
cwnewmrp : If $$IsEnd:$StockItemName Then "" Else +
           If NOT $$IsEmpty:$MRPRate Then $MRPRate +
           Else If $$IsEmpty:@PartyStateName OR $$IsSysName:@PartyStateName Then $$GetEIStkItemMRP:$StockItemName:$Date Else +
           $$GetEIStkItemMRP:$StockItemName:$Date:@PartyStateName

;------------------------------------------------------------------------------
; PRINTED INVOICE & SIMPLE INVOICE (COMMENTED EXAMPLES)
;------------------------------------------------------------------------------

;; [#Form: Printed Invoice]
;;     FetchObject: Stock Item: @@InvEntryList : myparentinv,IsBatchWiseOn, AdditionalUnits,PartNo,parent, Description, OnlyAlias, HasMfgDate,IsPerishableOn

;; [#Form: Simple Printed Invoice]
;;     delete:parts
;;     delete:bottom parts
;;     delete: Page Break
;;     add:Parts: STDInvoiceTop, EXPINV OpPageBreak, EXPINV Details
;;     add: BottomParts: EXPINV Totals, EXPINV SignOff, EXPINV Customer, EXPINV Jurisdiction, EXPINV InvoiceCompGen
;;     Width: @@InvWidth Inch
;;     Height: @@InvHeight Inch
;;     Space Top: @@InvSpace inch
;;     Space Right: 0.5 inch
;;     Space Left: @@InvSpaceLeft inch
;;     Space Bottom: 0.25 inch
;;     add:Page Break: EXPINV ClPageBreak, EXPINV OpPageBreak

;------------------------------------------------------------------------------
; PART & LINE EXTENSIONS FOR ROSE HOMEO SALES
;------------------------------------------------------------------------------

[#Part: EXPSMP InvDetails]
    add: option : newEXPINVInvInfo : @@RoseHomeoSales and @@RoseHomeoEnabled

[!part: newEXPINVInvInfo]
    delete: Repeat: EXPSMP InvDetails : Inventory Entries
    add: Repeat: EXPSMP InvDetails : cwInventoryEntriesnew

[#Line: EXPSMP Column1]
    add: option : newEXPINVColumn1 : @@RoseHomeoSales and @@RoseHomeoEnabled

[!Line: newEXPINVColumn1]
    Local: field: EXPINV AmountTitle: Width: 9
    Local: field: EXPINV QtyTitle: Width: 4
    Local: field: EXPINV RateTitle: Width: 3
    local: field: EXPINVQtyTitle: Info : $$LocaleString:"Qty."

[#Line: EXPSMP Column2]
    add: option : newColumn2 : @@RoseHomeoSales and @@RoseHomeoEnabled

[!Line: newColumn2]
    Local: field: EXPINV ActualQtyTitle: Width: 4
    Local: field: EXPINV BilledQtyTitle: Width: 4
    Local: field: EXPINV AmountTitle: Width: 9
    Local: field: EXPINV RateTitle: Width: 3

[#Line: EXPSMP AccDetails]
    add: option : newEXPINVAccDetails : @@RoseHomeoSales and @@RoseHomeoEnabled

[!Line: newEXPINVAccDetails]
    Local: field: EXPINV AccQty: Width: 4
    Local: field: EXPINV AccActualQty: Width: 4
    Local: field: EXPINV AccRate: Width: 3
    Local: field: EXPINV AccAmount: Width: 9

[#Line: EXPSMP InvDetails]
    add: option : newEXPINVInvDetailss : @@RoseHomeoSales and @@RoseHomeoEnabled

[!Line: newEXPINVInvDetailss]
    Local: Field: EXPINV Desc: Set As: $myparentinv
    Local: Field: EXPINVRatePer: Set As: $baseunits
    local: field: EXPINVActualQty: delete : inactive
    local: field: EXPINVbilledQty: delete : inactive
    local: field: EXPINVQty: delete : inactive
    local: field: EXPINVActualQty: delete : inactive
    local: field: EXPINVRate: delete : inactive
    local: field: EXPINVSLNo: delete : inactive
    local: field: EXPINVRatePer: delete : inactive
    local: field: EXPINVDiscTotal: delete : inactive
    local: field: EXPINVTotal: delete : inactive

    local: field: EXPINVRate: type: number
    local: field: EXPINVRatePer: type: string
    Local: field: EXPINV ActualQty: Width: 4
    Local: field: EXPINV Qty: Width: 4
    Local: field: EXPINV Rate: Width: 3
    Local: field: EXPINV Amount: Width: 9
    Local: field: EXPINVActualQty: Format: "nosymbol "
    Local: field: EXPINV Qty: Format: "nosymbol "
    delete: explode

    local: field: EXPSMP GST InvDetails: set as: $itemhsncode
    Local: Field: EXPINV IGSTRate: Set As: $gstratex
    Local: Field: EXPINV MRPValue: Set As: $mrprate

[#Line: EXPINV HSNSACDetails]
    add: option : cwexpinvhsndet : @@RoseHomeoSales and @@RoseHomeoEnabled

[!line: cwexpinvhsndet]
    Local: Field: EXPINV HSNSACDetails: Set As: $itemhsncode
    Local: Field: EXPINV IGSTRate: Set As: $gstratex

[#Line: EXPSMP Totals]
    add: option : newEXPINVTotals : @@RoseHomeoSales and @@RoseHomeoEnabled

[!Line: newEXPINVTotals]
    add: right field: before: EXPINV BilledQtyTotal : numf
    Local: Field: numf: set as: $$total:numf
    Local: field: numf: Width: 10
    local: field: numf: align: centre
    local: field: numf: border: thin left
    Local: field: numf: Format: "decimals:2,no zero"
    Local: field: EXPINV ActualQtyTotal: Width: 4
    Local: field: EXPINV BilledQtyTotal: Width: 4
    Local: field: EXPINV RateTotal: Width: 3
    Local: field: EXPINV Total: Width: 9

[#line: EXPINV InvSubTotal]
    add: option : newEXPINVInvSubTotal : @@RoseHomeoSales and @@RoseHomeoEnabled

[!Line: newEXPINVInvSubTotal]
    Local: field: EXPINV ValueSubTotal: Width: 9

[#Line: EXPINV InvDetails]
    add: option : cwexpinvinvdet : @@RoseHomeoSales and @@RoseHomeoEnabled

[!line: cwexpinvinvdet]
    Local: Field: EXPINV Desc: Set As: $myparentinv
    local: field: EXPINV HSNSACDetails: set as: $itemhsncode
    Local: Field: EXPINV IGSTRate: Set As: $gstratex
    Local: Field: default: Style: newstyle

[#Part: EXPINV InvInfo]
    add: option: cwexpinvinvinfoopt : @@RoseHomeoSales and @@RoseHomeoEnabled

[!part: cwexpinvinvinfoopt]
    delete: Repeat: EXPINV InvDetails : Inventory Entries
    add: Repeat: EXPINV InvDetails : cwInventoryEntriesnew

[#Line: EXPINV AccDetails]
    add: option: cwexpinvaccdetopt : @@RoseHomeoSales and @@RoseHomeoEnabled

[!line: cwexpinvaccdetopt]
    Local: Field: default: Style: newstyle
    Local: Field: EXPINV AccDesc: style: newstyle
    Local: Field: EXPINV AccName: style: newstyle

[#Line: EXPINV InvSubTotal]
    add: option: cwexpinvinvsubtotopt : @@RoseHomeoSales and @@RoseHomeoEnabled

[!line: cwexpinvinvsubtotopt]
    Local: Field: default: Style: newstyle

[#Report: Printed Invoice]
    delete: Form: GST InvoiceWithItemAnalysis

[#Form: GST Comprehensive Invoice Default]
    add: option: cwcompinvopt : @@RoseHomeoSales and @@RoseHomeoEnabled

[!form: cwcompinvopt]
    delete: bottom part
    Add: Part: EXPINV Totals, newgstpart, EXPINV Totals, EXPINV SignOff, EXPINV Customer, EXPINV Jurisdiction, EXPINV InvoiceCompGen

[part: newgstpart]
    part: VCH GST AnalysisAmtDetails, VCH GST AnalysisDetails
    vertical: yes

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
