// Auto-generated from TOPSALESPRODUCTSVALUEWISE.TXT
const tdl = `
;===============================================================================
; TOPSALESPRODUCTSVALUEWISE.TXT
; Created By: khokan on 2022-06-28 17:00, ID:
; Purpose: Implements a "Top Sales Products - Value wise" report in Tally,
;          ranking products by sales amount, sales return, and net points,
;          with advanced filtering, ranking logic, and professional formatting.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    ;; add: Option: TopSalesProductsValuewiseLock ;; : @@TopSalesProductsValuewiseDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@TopSalesProductsValuewiseReport: Display Collection: collRepTopSalesProductsValuewise

[!menu: TopSalesProductsValuewiseLock]
    add: Item: before: @@locQuit: @@TopSalesProductsValuewiseReport: Display Collection: collRepTopSalesProductsValuewise
    add: Item: before: @@locQuit: Blank

[System: formula]
    TopSalesProductsValuewiseReport: "Top Sales Products - Value wise"
;; TopSalesProductsValuewiseDemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; STOCK GROUP SELECTION: Popup for group selection
;;------------------------------------------------------------------------------

[Collection: collRepTopSalesProductsValuewise]
    Use                : Extract Alias Collection
    Source Collection  : List of StockGroups
    Title              : $$LocaleString:"List of Stock Groups"
    delete:Collection  : Primary
    Variable           : Stock Group Name
    Report             : RepTopSalesProductsValuewise
    Trigger            : Stock Group Name
    Fetch              : Name

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: RepTopSalesProductsValuewise]
    use        : Dsp Template
    Title      : @@TopSalesProductsValuewiseReport
    Printset   : Report Title: @@TopSalesProductsValuewiseReport
    Form       : FrmTopSalesProductsValuewise
    Export     : Yes
    set        : svTodate : ##svcurrentdate
    Local      : Button   : RelReports : Inactive : Yes
    list variable : cwTopSellersamt
    list variable : cwTopSellersFinalamt
    variable   : num1, logi1, str1, num2, num3, num4
    set        : logi1: no
    set        : str1: ""
    set        : num2: 0
    set        : num3: 0
    set        : num4: 0

;;------------------------------------------------------------------------------
;; DATA AGGREGATION & RANKING LOGIC
;;------------------------------------------------------------------------------

[collection: ColTopSellersMainCollectionamt]
    datasource : variable : cwTopSellersFinalamt
    format: $itemname,30
    format: $SaleValue,30
    format: $saleRank,10
    format: $SaleReturnValue,30
    format: $saleReturnRank,10
    format: $netRank,10
    sort : @@default : -1*$netRank
    filter: cwtopsalesstockitemnamesfilter, cwsaleRankfilternew2, saleReturnRankfilternew2

[System: Formula]
    cwsaleRankfilternew2: if $$isempty:##num2 then yes else $saleRank = ##num2
    saleReturnRankfilternew2: if $$isempty:##num3 then yes else $saleReturnRank = ##num3

[collection: ColTopSellersSalesamt]
    datasource : variable : cwTopSellersamt
    format: $itemname,30
    format: $saleReturnqty,30
    format: $saleRank,10
    format: $saleReturnRank,10
    format: $saleValue,40
    format: $SaleReturnValue,50
    sort : @@default : $$number:$SaleValue

[variable: cwTopSellersFinalamt]
    variable : itemname : string
    variable : saleqty : quantity
    variable : saleReturnqty : quantity
    variable : saleRank: number
    variable : saleReturnRank : number
    variable : saleValue : amount
    variable : SaleReturnValue : amount
    variable : netRank: number

[variable: cwTopSellersamt]
    variable : itemname : string
    variable : saleqty : quantity
    variable : saleReturnqty : quantity
    variable : saleValue : amount
    variable : saleRank: number
    variable : SaleReturnValue : amount
    variable : saleReturnRank : number

[function: cwfillTopSellersamt]
    variable: rowIndex : number
    variable : itemname : string
    variable : ctr : number: 1
    10 : list delete : cwTopSellersamt
    20 : walk collection: ColTopSellersamt
    25 : set : itemname : $itemname
    30 : list add : cwTopSellersamt: ##itemname
    40 : set : rowIndex : $$listIndex:cwTopSellersamt:##itemname
    50 : set : cwTopSellersamt[##rowIndex].itemname : ##itemname
    60 : set : cwTopSellersamt[##rowIndex].saleValue : $saleValue
    70 : set : cwTopSellersamt[##rowIndex].SaleReturnValue : $SaleReturnValue
    80 : set : cwTopSellersamt[##rowIndex].saleReturnRank: if $$isempty:$SaleReturnValue then 1 else ##ctr
    90 : set : ctr : ##ctr + 1
    100: end walk
    105: set : ctr : 1
    110 : list delete : cwTopSellersFinalamt
    120 : walk collection: ColTopSellersSalesamt
    125 : set : itemname : $itemname
    130 : list add : cwTopSellersFinalamt : ##itemname
    140 : set : rowIndex : $$listIndex:cwTopSellersFinalamt:##itemname
    150 : set : cwTopSellersFinalamt[##rowIndex].itemname : ##itemname
    160 : set : cwTopSellersFinalamt[##rowIndex].saleRank: if $$isempty:$saleValue then 1 else ##ctr
    165 : set : cwTopSellersFinalamt[##rowIndex].saleReturnRank : $saleReturnRank
    168 : set : cwTopSellersFinalamt[##rowIndex].saleValue : $saleValue
    170 : set : cwTopSellersFinalamt[##rowIndex].SaleReturnValue : $SaleReturnValue
    185 : set : cwTopSellersFinalamt[##rowIndex].netRank: ##ctr * $saleReturnRank
    190 : set : ctr : ##ctr + 1
    200 : end walk

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: FrmTopSalesProductsValuewise]
    use     : DSP Template
    Part    : DspAccTitles, PrtTitle0TopSalesProductsValuewise, PrtTopSalesProductsValuewise
    Width   : 100% Page
    Height  : 100% Page
    Background: @@SV_STOCKSUMMARY
    delete  : page break
    add     : page break: TopSalesProductsValuewisebotbrk, TopSalesProductsValuewisebotOpbrk
    Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    add:button:showRankbotton
    add:button:TopSalesProductsbotton
    set : num1 : $$cwfillTopSellersamt
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

[button:showRankbotton]
    key: f12
    Title: If ##logi1 Then $$LocaleString:"Hide Rank" Else $$LocaleString:"Show Rank"
    Action : SET:logi1:Not ##logi1

[part: TopSalesProductsValuewisebotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: TopSalesProductsValuewisebotopbrk]
    use: dspacctitles
    add: part: TopSalesProductsValuewiseTitlePart

[part: TopSalesProductsValuewiseTitlePart]
    line: LnTopSalesProductsValuewiseTitle

[line: LnTopSalesProductsValuewiseCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    local: field: fwf : style:styleCalisto2
    local: field: fwf2 : style:styleCalisto2
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf: Set As: ##StockGroupName
    Local: Field: fwf2: invisible: $$inprintmode

[part: PrtTitle0TopSalesProductsValuewise]
    line : LnTopSalesProductsValuewiseCurrPeriod

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of top sales products with ranks and points
;;------------------------------------------------------------------------------

[Part: PrtTopSalesProductsValuewise]
    Line: LnTopSalesProductsValuewiseTitle, LnTopSalesProductsValuewise
    bottom Line: LnTopSalesProductsValuewiseTotals
    repeat: LnTopSalesProductsValuewise: ColTopSellersMainCollectionamt
    scroll: Vertical
    Common Border: YEs
    Total: Qtyf, amtf, amtf1, amtf2

[Collection: ColTopSellersamt]
    source Collection: sourColTopSalesProductsQtyWise
    walk: inventoryentries
    by: itemname: $stockitemname
    aggr compute: SaleValue: sum: if $$issales:$vouchertypename then $amount else $$InitValue:"amount"
    aggr compute: SaleReturnValue: sum: if $$IsCreditNote:$vouchertypename then $amount else $$InitValue:"amount"
    filter: cwStockGroupNamefilter

[system: Formula]
    ColTopSalesProductsValuewiseFilter: Yes

;;------------------------------------------------------------------------------
;; HEADER LINE: Column titles for the report
;;------------------------------------------------------------------------------

[Line: LnTopSalesProductsValuewiseTitle]
    use: LnTopSalesProductsValuewise
    option: titleopt
    local: field: fwf: set as: "Product"
    local: field: amtf: set as: "Sales Amount"
    local: field: numf: set as: "Sales Rank"
    local: field: amtf2: set as: "Sales Return Amount"
    local: field: numf2: set as: "Sales Return Rank"
    local: field: numf3: set as: "Total Point"
    local: field: numf4: set as: "Rank"
    local: field: fwf : style:styleCalisto2
    local: field: numf : style:styleCalisto2
    local: field: amtf : style:styleCalisto2
    local: field: amtf2 : style:styleCalisto2
    local: field: numf2 : style:styleCalisto2
    local: field: numf3 : style:styleCalisto2
    local: field: numf4 : style:styleCalisto2
    Local : field : default: Lines : 0
    Local: field: default: Align: centre
    Local: field: fwf: Align: left

;;------------------------------------------------------------------------------
;; DATA LINE: Main line showing all calculated columns per product
;;------------------------------------------------------------------------------

[Line: LnTopSalesProductsValuewise]
    Fields: fwf
    right field: amtf, numf, amtf2, numf2, numf3, numf4
    Option: Alter on Enter
    local: field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    local: field: fwf: set as: $itemname
    local: field: amtf: set as: $SaleValue
    local: field: numf: set as: $saleRank
    local: field: amtf2: set as: $SaleReturnValue
    local: field: numf2: set as: $saleReturnRank
    local: field: numf3: set as: $netRank
    Local: Field: numf4: Set As: if $$line = 1 then 1 else if $$prevobj:$netRank = $netRank then $$prevlinefield else $$prevlinefield + 1
    local: field: default : style:styleCalisto
    Local: Field:default: Border: thin right
    local: field: numf: Invisible:Not ##logi1
    local: field: numf2: Invisible:Not ##logi1
    local: field: numf3: Invisible:Not ##logi1
    empty : if ##num4 = 0 then no else  $$line > ##num4

;;------------------------------------------------------------------------------
;; TOTALS LINE: Running totals for all columns
;;------------------------------------------------------------------------------

[line: LnTopSalesProductsValuewiseTotals]
    use: LnTopSalesProductsValuewise
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: ""
    local: field: fwf: set as: ""
    local: field: amtf: set as: ""
    local: field: numf: set as: ""
    local: field: amtf2: set as: ""
    local: field: numf2: set as: ""
    local: field: numf3: set as: ""
    local: field: numf4: set as: ""
    local: field: fwf : style:styleCalisto2
    local: field: numf : style:styleCalisto2
    local: field: amtf : style:styleCalisto2
    local: field: amtf2 : style:styleCalisto2
    local: field: numf2 : style:styleCalisto2
    local: field: numf3 : style:styleCalisto2
    local: field: numf4 : style:styleCalisto2

;===============================================================================
; End of TOPSALESPRODUCTSVALUEWISE.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
