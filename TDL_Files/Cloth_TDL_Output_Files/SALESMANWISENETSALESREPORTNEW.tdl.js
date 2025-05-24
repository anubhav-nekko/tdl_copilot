// Auto-generated from SALESMANWISENETSALESREPORTNEW.TXT
const tdl = `
;===============================================================================
; SALESMANWISENETSALESREPORTNEW.TXT
; Purpose: Implements an enhanced "Salesman Wise Net Sales Report" in Tally,
;          showing net sales, returns, discounts, and collections for each party
;          under a selected salesman, with advanced calculation, aggregation,
;          filtering, and professional formatting.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;; Optionally lock demo access by date if needed
;; add: Option: salesmanwisenetsalesreportnewLock ;; : @@salesmanwisenetsalesreportnewDemoLock

[#menu : cw_Debug_menu]
    ;; Add the report to the debug menu for quick access
    add: Item: before: @@locQuit: @@salesmanwisenetsalesreportnewReport: Display Collection: colllRepsalesmanwisenetsalesreportnew

[!menu: salesmanwisenetsalesreportnewLock]
    ;; Add the report to a custom menu if lock enabled
    add: Item: before: @@locQuit: @@salesmanwisenetsalesreportnewReport: Display Collection: colllRepsalesmanwisenetsalesreportnew
    add: Item: before: @@locQuit: Blank

[System: formula]
    ;; Dynamic report title using company’s salesman caption
    salesmanwisenetsalesreportnewReport:@@cwcaption2tableundernew+" "+"wise net sales report (New)"
;; salesmanwisenetsalesreportnewDemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; LEDGER SELECTION: Collection-driven popup for salesman selection
;;------------------------------------------------------------------------------

[Collection: colllRepsalesmanwisenetsalesreportnew]
    Use              : Extract Alias Collection
    Source Collection: List of Ledgers
    Variable         : Ledger Name
    Report           : Repsalesmanwisenetsalesreportnew
    Trigger          : cwLedgerName2
    Fetch            : Name

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: Repsalesmanwisenetsalesreportnew]
    use        : Dsp Template
    Title      : @@salesmanwisenetsalesreportnewReport
    Printset   : Report Title: @@salesmanwisenetsalesreportnewReport
    Form       : Frmsalesmanwisenetsalesreportnew
    Export     : Yes
    set        : svfromdate : ##svcurrentdate
    set        : svTodate   : ##svcurrentdate
    Local      : Button: RelReports: Inactive: Yes
    variable   : str1
    set        : str1: ""

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: Frmsalesmanwisenetsalesreportnew]
    use     : DSP Template
    Part    : DspAccTitles, PrtTitle0salesmanwisenetsalesreportnew, Prtsalesmanwisenetsalesreportnew
    Width   : 100% Page
    Height  : 100% Page
    Background: @@SV_STOCKSUMMARY
    delete  : page break
    add     : page break: salesmanwisenetsalesreportnewbotbrk, salesmanwisenetsalesreportnewbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    add:button:agentnetsalesbotton
    ;; Styling for header parts
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;;------------------------------------------------------------------------------
;; PAGE BREAK PARTS FOR PRINT/EXPORT
;;------------------------------------------------------------------------------

[part: salesmanwisenetsalesreportnewbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: salesmanwisenetsalesreportnewbotopbrk]
    use: dspacctitles
    add: part: salesmanwisenetsalesreportnewTitlePart

[part: salesmanwisenetsalesreportnewTitlePart]
    line: LnsalesmanwisenetsalesreportnewTitle

[line: LnsalesmanwisenetsalesreportnewCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style:style3x
    Local: Field: fwf2: Style:style3x
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf: Set As:##LedgerName
    Local: Field: fwf2:invisible: $$inprintmode

[part: PrtTitle0salesmanwisenetsalesreportnew]
    line : LnsalesmanwisenetsalesreportnewCurrPeriod

;;------------------------------------------------------------------------------
;; MAIN PART: Data lines, headers, and totals
;;------------------------------------------------------------------------------

[Part: Prtsalesmanwisenetsalesreportnew]
    Line: LnsalesmanwisenetsalesreportnewTitle, LnsalesmanwisenetsalesreportnewTitle2, Lnsalesmanwisenetsalesreportnew
    bottom Line: LnsalesmanwisenetsalesreportnewTotals
    repeat: Lnsalesmanwisenetsalesreportnew: Colsalesmanwisenetsalesreportnew
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf, amtf1, amtf2, amtf3, amtf4, amtf5, numf, numf1, numf2, numf3, numf4

;;------------------------------------------------------------------------------
;; MAIN DATA COLLECTION: Aggregates sales, returns, discounts, and collections
;;------------------------------------------------------------------------------

[Collection: Colsalesmanwisenetsalesreportnew]
    source Collection: sourceColsalesmanwisenetsalesreportnew
    by:partyledgername:$partyledgername
    by:cwcaption1vch2:$..cwcaption2vch
    by:parent1:$parent:ledger:$partyledgername
    by:parent2:$grandparent:ledger:$partyledgername

    ;; Aggregated and computed fields for sales, returns, and discounts
    aggr compute:salesbilledqty:sum:if $$issales:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"
    compute:cwEnableNetSalesReport1:$cwEnableNetSalesReport:vouchertype:$vouchertypename
    aggr compute:salescrbilledqty:sum:if $$IsCreditNote:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"
    aggr compute:salesamount:sum:if $$issales:$vouchertypename then $amount else $$InitValue:"amount"
    aggr compute:salesinvamt1:sum:if $$issales:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"
    aggr compute:salescramount:sum:if $$IsCreditNote:$vouchertypename then $amount else $$InitValue:"amount"
    aggr compute:crnoteinvamt1:sum:if $$IsCreditNote:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"
    aggr compute:cwsalesdiscamt1x:sum:if $$issales:$vouchertypename then (@@cwsalesdiscamt/@@cwinvamt)*@@salesinvamt2 else $$InitValue:"amount"
    aggr compute:cwcrnotediscamt1x:sum:if $$IsCreditNote:$vouchertypename then (@@cwsalesdiscamt/@@cwinvamt)*@@salesinvamt2 else $$InitValue:"amount"

    filter: cwGroupsundrydebtorsfilter, cwnetsalesmannewfilter, cwColAGENTpartyFilter
    filter: ColsalesmanwisenetsalesreportnewFilter
    sort:@@default:$cwcaption1vch2

[Collection: sourceColsalesmanwisenetsalesreportnew]
    Use: Vouchers of Company
    delete: filter : daybookfilter
    Filter: ColareasalessrFilterx, IsNonOptionalCancelledVchs

[System: Formula]
    ColsalesmanwisenetsalesreportnewFilter: $cwcaption1vch2=##LedgerName

;;------------------------------------------------------------------------------
;; HEADER LINES: Main column headers and subheaders
;;------------------------------------------------------------------------------

[Line: LnsalesmanwisenetsalesreportnewTitle]
    use: Lnsalesmanwisenetsalesreportnew
    option: titleopt
    local:field: fwf: set as:"Party Name"
    local:field: grsales: set as:"Net Sales"
    local:field: grSRIN: set as:"Net Sals Return"
    local:field: snetsales: set as:"S.Net Sales "
    local:field: numf3: set as:"Net Sales"
    local:field: amtf3: set as:"Gross Sale Less Gross Sales Return"
    local:field: amtf4: set as:"Net Sale Without Gst"
    local:field: amtf5: set as:"Colleection"
    local: field: default : style: normal bold
    local: field: default: Align:centre
    local: field: fwf: Align:left

[Line: LnsalesmanwisenetsalesreportnewTitle2]
    use: Lnsalesmanwisenetsalesreportnew
    option: titleopt
    local:field: fwf: set as: ""
    local:field: numf: set as:"Pcs"
    local:field: numf2: set as: "Pcs"
    local:field: amtf: set as: "Amount"
    local:field: amtf2: set as: "Amount"
    local:field: numf3: set as: "Pcs"
    local:field: amtf3: set as: "Amount"
    local:field: amtf4: set as: "Amount"
    local:field: amtf5: set as: "Amount"
    local: field: default: Align:centre
    local: field: fwf: Align:left

;;------------------------------------------------------------------------------
;; DATA LINE: Main line showing all calculated columns per party
;;------------------------------------------------------------------------------

[Line: Lnsalesmanwisenetsalesreportnew]
    Fields:fwf
    right field:nf,grsales,grSRIN,snetsales,amtf6,amtf4,amtf5,amtf7,amtf8,amtf9,amtf10,numf7,numf8,amtf12,amtf13,amtf14,amtf15
    Option: Alter on Enter
    local:field: fwf: set as:$partyledgername
    local:field: numf: set as:$salesbilledqty
    local:field: numf2: set as:$salescrbilledqty
    local:field: amtf: set as:$$nettamount:#amtf12:#amtf13
    local:field: amtf12: set as:$$nettamount:$salesinvamt1:$cwsalesdiscamt1x
    local:field: amtf13: set as:(#amtf12*5)/100
    local:field: amtf14: set as:$$nettamount:$crnoteinvamt1:$cwcrnotediscamt1x
    local:field: amtf15: set as:(#amtf14*5)/100
    local:field: amtf2: set as:$$nettamount:#amtf14:#amtf15
    local:field: numf3: set as:#numf-#numf2
    local:field: amtf3: set as:#amtf-#amtf2
    local:field: amtf4: set as:#amtf3-#amtf6
    local:field: amtf6: set as:(#amtf3*5)/100
    local:field: amtf5: set as:$$reportobject:$$collectionfieldbykey:$rcptvalue:#fwf:Colreceipt
    Local: Field: default: Border: thin right

;;------------------------------------------------------------------------------
;; TOTALS LINE: Running totals for all columns
;;------------------------------------------------------------------------------

[line: LnsalesmanwisenetsalesreportnewTotals]
    use: Lnsalesmanwisenetsalesreportnew
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local:field: numf: set as:$$total:numf
    local:field: numf2: set as:$$total:numf2
    local:field: amtf: set as:$$total:amtf
    local:field: amtf2: set as:$$total:amtf2
    local:field: numf3: set as:$$total:numf3
    local:field: amtf3: set as:#amtf9
    local:field: amtf4: set as:#amtf10
    local:field: amtf5: set as:$$total:amtf5

;===============================================================================
; End of SALESMANWISENETSALESREPORTNEW.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
