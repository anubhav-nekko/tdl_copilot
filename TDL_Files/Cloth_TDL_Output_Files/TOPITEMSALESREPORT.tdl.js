// Auto-generated from TOPITEMSALESREPORT.TXT
const tdl = `
;===============================================================================
; TOPITEMSALESREPORT.TXT
; Created By: Khokan on 2021-12-10 10:08, ID:
; Purpose: Implements a "Top N Item Sale" report in Tally, listing top-selling
;          items by quantity and amount, with professional formatting, sorting,
;          and totals. Supports print/export and is accessible from the menu.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    ;; Optionally lock demo access by date if needed
    ;; add: Option: TopNitemsaleLock ;; : @@TopNitemsaleDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@TopNitemsaleReport: Display: RepTopNitemsale
    add: Item: before: @@locQuit: Blank

[System: formula]
    TopNitemsaleReport: "Top N Item Sale"
;; TopNitemsaleDemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: RepTopNitemsale]
    use: Dsp Template
    Title: @@TopNitemsaleReport
    Printset: Report Title: @@TopNitemsaleReport
    Form: FrmTopNitemsale
    Export: Yes
    set  : svTodate : ##svcurrentdate
    Local: Button   : RelReports        : Inactive : Yes

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: FrmTopNitemsale]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0TopNitemsale, PrtTopNitemsale
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: TopNitemsalebotbrk, TopNitemsalebotOpbrk
    Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

[part: TopNitemsalebotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: TopNitemsalebotopbrk]
    use: dspacctitles
    add: part: TopNitemsaleTitlePart

[part: TopNitemsaleTitlePart]
    line: LnTopNitemsaleTitle

[line: LnTopNitemsaleCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode
    Local: Field: fwf2: Style:styleCalisto
    Local: Field: fwf: Style:styleCalisto

[part: PrtTitle0TopNitemsale]
    line : LnTopNitemsaleCurrPeriod

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of top N item sales
;;------------------------------------------------------------------------------

[Part: PrtTopNitemsale]
    Line: LnTopNitemsaleTitle, LnTopNitemsale
    bottom Line: LnTopNitemsaleTotals
    repeat: LnTopNitemsale: ColTopNitemsale
    set:10
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf

[Collection: ColTopNitemsale]
    source collection: sourColTopNitemsale
    walk: inventoryentries
    by: stockitemname: $stockitemname
    by: cwminuitem1: $cwminuitem
    aggr compute: billedqty: sum: $billedqty
    aggr compute: amount: sum: $amount
    sort:@@default:$billedqty

[collection: sourColTopNitemsale]
    Type : Vouchers:VoucherType
    ChildOf : $$VchTypesales
    Belongs To : Yes

;;------------------------------------------------------------------------------
;; HEADER LINE: Column titles for the report
;;------------------------------------------------------------------------------

[Line: LnTopNitemsaleTitle]
    use: LnTopNitemsale
    option: titleopt
    local: field: SnfX: set as: "SL"
    local: field: nf: set as: "ITEM"
    local: field: fwf: set as: "DESCRIPTION"
    local: field: amtf: set as: "SALE AMT (GROSS)"
    local: field: qtyf: set as: "SALE PCS"
    local: field: qtyf2: set as: "MTR"
    local: field: qtyf3: set as: "KGS"
    local: field: qtyf4: set as: "OTH"
    local: field: snfx: style:styleCalisto2
    local: field: amtf: style:styleCalisto2
    local: field: fwf: style:styleCalisto2
    local: field: nf: style:styleCalisto2
    local: field: qtyf: style:styleCalisto2
    local: field: qtyf2: style:styleCalisto2
    local: field: qtyf3: style:styleCalisto2
    local: field: qtyf4: style:styleCalisto2
    Local: field: default: Align: centre
    Local: field: fwf: Align: left
    Local: field: fwf: indent: 4

;;------------------------------------------------------------------------------
;; DATA LINE: Main line showing all calculated columns per item
;;------------------------------------------------------------------------------

[Line: LnTopNitemsale]
    Fields: snfx, nf, fwf
    right field: amtf, qtyf, qtyf2, qtyf3, qtyf4
    Option: Alter on Enter
    local: field: qtyf: Format: "NoSymbol, Short Form, No Compact, NoZero"
    local: field: qtyf1: Format: "NoSymbol, Short Form, No Compact, NoZero"
    local: field: qtyf2: Format: "NoSymbol, Short Form, No Compact, NoZero"
    local: field: qtyf3: Format: "NoSymbol, Short Form, No Compact, NoZero"
    local: field: qtyf4: Format: "NoSymbol, Short Form, No Compact, NoZero"
    local: field: ratepf: setas: #amtf/#qtyf
    local: field: fwf: alter: voucher: $$isvoucher
    option: alter on enter
    local: field: fwf: alter: voucher: $$isvoucher
    local: field: SnfX: set as: $$line
    local: field: nf: set as: $$CollectionField:$stockitemname:$$line:ColTopNitemsale
    local: field: fwf: set as: $$CollectionField:$cwminuitem1:$$line:ColTopNitemsale
    local: field: amtf: set as: $$CollectionField:$amount:$$line:ColTopNitemsale
    local: field: qtyf: set as: $$CollectionField:$billedqty:$$line:ColTopNitemsale
    local: field: qtyf2: set as: ""
    local: field: qtyf3: set as: ""
    local: field: qtyf4: set as: ""
    local: field: DEFAULT: style:styleCalisto
    Local: field: NF: Width:25
    Local: field: AMTF: Width:20
    Local: field: QTYF: Width:12
    Local: field: QTYF1: Width:12
    Local: field: QTYF2: Width:12
    Local: field: QTYF3: Width:12
    Local: Field: DEFAULT: Border: thin right
    border: thin bottom

;;------------------------------------------------------------------------------
;; TOTALS LINE: Running totals for all columns
;;------------------------------------------------------------------------------

[line: LnTopNitemsaleTotals]
    use: LnTopNitemsale
    option: totalOpt
    local: field: fwf: align: right
    local: field: SnfX: set as: ""
    local: field: fwf: set as: "Report Total"
    local: field: amtf: set as: $$total:amtf
    local: field: qtyf: set as: $$total:qtyf
    local: field: qtyf2: set as: $$total:qtyf2
    local: field: qtyf3: set as: $$total:qtyf3
    local: field: qtyf4: set as: $$total:qtyf4
    local: field: amtf: style:styleCalisto2
    local: field: qtyf: style:styleCalisto2
    local: field: qtyf2: style:styleCalisto2
    local: field: qtyf3: style:styleCalisto2
    local: field: qtyf4: style:styleCalisto2

;===============================================================================
; End of TOPITEMSALESREPORT.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
