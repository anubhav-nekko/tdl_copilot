// Auto-generated from SALESMANWISESALESCOLLECTIONSUMMERYREP1.TXT
const tdl = `
;===============================================================================
; SALESMANWISESALESCOLLECTIONSUMMERYREP1.TXT
; Created By: khokan on 2022-07-04 17:00, ID:
; Purpose: Implements a "Salesman Wise Sales & Collection Summary Report" in Tally,
;          showing net sales, returns, net sales after returns, and collection
;          for each salesman (agent/party), with quantity and amount columns,
;          totals, and professional formatting.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    add: Option: Salesmanwisesalescollectionsummeryrep1Lock ;; : @@Salesmanwisesalescollectionsummeryrep1DemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@Salesmanwisesalescollectionsummeryrep1Report: Display: RepSalesmanwisesalescollectionsummeryrep1
    add: Item: before: @@locQuit: Blank

[!menu: Salesmanwisesalescollectionsummeryrep1Lock]
    add: Item: before: @@locQuit: @@Salesmanwisesalescollectionsummeryrep1Report: Display: RepSalesmanwisesalescollectionsummeryrep1
    add: Item: before: @@locQuit: Blank

[System: formula]
    Salesmanwisesalescollectionsummeryrep1Report: "Salesmanwisesalescollectionsummeryrep1"
;; Salesmanwisesalescollectionsummeryrep1DemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: RepSalesmanwisesalescollectionsummeryrep1]
    use        : Dsp Template
    Title      : @@Salesmanwisesalescollectionsummeryrep1Report
    Printset   : Report Title: @@Salesmanwisesalescollectionsummeryrep1Report
    Form       : FrmSalesmanwisesalescollectionsummeryrep1
    Export     : Yes
    set        : svfromdate : ##svcurrentdate
    set        : svTodate   : ##svcurrentdate
    Local      : Button: RelReports: Inactive: Yes

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: FrmSalesmanwisesalescollectionsummeryrep1]
    use     : DSP Template
    Part    : DspAccTitles,PrtTitle0Salesmanwisesalescollectionsummeryrep1,PrtSalesmanwisesalescollectionsummeryrep1
    Width   : 100% Page
    Height  : 100% Page
    Background: @@SV_STOCKSUMMARY
    delete  : page break
    add     : page break: Salesmanwisesalescollectionsummeryrep1botbrk,Salesmanwisesalescollectionsummeryrep1botOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12

[part: Salesmanwisesalescollectionsummeryrep1botBrk]
    line: EXPINV PageBreak
    border: thin top

[part: Salesmanwisesalescollectionsummeryrep1botopbrk]
    use: dspacctitles
    add: part: Salesmanwisesalescollectionsummeryrep1TitlePart

[part: Salesmanwisesalescollectionsummeryrep1TitlePart]
    line: LnSalesmanwisesalescollectionsummeryrep1Title,LnSalesmanwisesalescollectionsummeryrep1Title2

[line: LnSalesmanwisesalescollectionsummeryrep1CurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0Salesmanwisesalescollectionsummeryrep1]
    line : LnSalesmanwisesalescollectionsummeryrep1CurrPeriod

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of salesman-wise sales & collection summary
;;------------------------------------------------------------------------------

[Part: PrtSalesmanwisesalescollectionsummeryrep1]
    Line: LnSalesmanwisesalescollectionsummeryrep1Title,LnSalesmanwisesalescollectionsummeryrep1Title2,LnSalesmanwisesalescollectionsummeryrep1
    bottom Line: LnSalesmanwisesalescollectionsummeryrep1Totals
    repeat: LnSalesmanwisesalescollectionsummeryrep1: ColSalesmanwisesalescollectionsummeryrep1
    scroll: Vertical
    Common Border: YEs
    Total: Qtyf,amtf

;;------------------------------------------------------------------------------
;; DATA COLLECTION: Aggregates sales, returns, discounts, and collections
;;------------------------------------------------------------------------------

[Collection: ColSalesmanwisesalescollectionsummeryrep1]
    source Collection: sourceColsalesmanwisenetsalesreport
    by:cwcaption1vch2:$..cwcaption2vch
    aggr compute:salesbilledqty:sum:if $$issales:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"
    compute:cwEnableNetSalesReport1:$cwEnableNetSalesReport:vouchertype:$vouchertypename
    aggr compute:salescrbilledqty:sum:if $$IsCreditNote:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"
    aggr compute:salesamount:sum:if $$issales:$vouchertypename then $amount else $$InitValue:"amount"
    aggr compute:salesinvamt1:sum:if $$issales:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"
    aggr compute:salescramount:sum:if $$IsCreditNote:$vouchertypename then $amount else $$InitValue:"amount"
    aggr compute:crnoteinvamt1:sum:if $$IsCreditNote:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"
    aggr compute:cwsalesdiscamt1x:sum:if $$issales:$vouchertypename then (@@cwsalesdiscamt/@@cwinvamt)*@@salesinvamt2 else $$InitValue:"amount"
    aggr compute:cwcrnotediscamt1x:sum:if $$IsCreditNote:$vouchertypename then (@@cwsalesdiscamt/@@cwinvamt)*@@salesinvamt2 else $$InitValue:"amount"
    sort:@@default:$cwcaption1vch2

[system: Formula]
    ColSalesmanwisesalescollectionsummeryrep1Filter: Yes

;;------------------------------------------------------------------------------
;; HEADER LINES: Main column headers and subheaders
;;------------------------------------------------------------------------------

[Line: LnSalesmanwisesalescollectionsummeryrep1Title]
    use: LnSalesmanwisesalescollectionsummeryrep1
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
    local: field: grsales : style:styleCalisto2
    local: field: grSRIN : style:styleCalisto2
    local: field: snetsales : style:styleCalisto2
    local: field: fwf : style:styleCalisto2
    local: field: numf : style:styleCalisto2
    local: field: numf1 : style:styleCalisto2
    local: field: numf2 : style:styleCalisto2
    local: field: numf3 : style:styleCalisto2
    local: field: amtf : style:styleCalisto2
    local: field: amtf1 : style:styleCalisto2
    local: field: amtf2 : style:styleCalisto2
    local: field: amtf3 : style:styleCalisto2
    local: field: amtf4 : style:styleCalisto2
    local: field: amtf5 : style:styleCalisto2

[Line: LnSalesmanwisesalescollectionsummeryrep1Title2]
    use: LnSalesmanwisesalescollectionsummeryrep1
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
    Local: field: default: Align:centre
    Local: field: fwf: Align:left
    local: field: grsales : style:styleCalisto2
    local: field: grSRIN : style:styleCalisto
    local: field: fwf : style:styleCalisto2
    local: field: numf : style:styleCalisto2
    local: field: snf2 : style:styleCalisto2
    local: field: numf1 : style:styleCalisto2
    local: field: numf2 : style:styleCalisto2
    local: field: numf3 : style:styleCalisto2
    local: field: amtf : style:styleCalisto2
    local: field: amtf1 : style:styleCalisto2
    local: field: amtf2 : style:styleCalisto2
    local: field: amtf3 : style:styleCalisto2
    local: field: amtf4 : style:styleCalisto2
    local: field: amtf5 : style:styleCalisto2

;;------------------------------------------------------------------------------
;; DATA LINE: Main line showing all calculated columns per salesman/party
;;------------------------------------------------------------------------------

[Line: LnSalesmanwisesalescollectionsummeryrep1]
    Fields:fwf
    right field:nf,grsales,grSRIN,snetsales,amtf6,amtf4,amtf5,amtf7,amtf8,amtf9,amtf10,numf7,numf8,amtf12,amtf13,amtf14,amtf15
    Option: Alter on Enter
    local:field: fwf: set as:$cwcaption1vch2
    local:field: numf: set as:$salesbilledqty
    local:field: qtyf1: set as:$salesbilledqty
    local:field: qtyf: set as:$salescrbilledqty
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

[line: LnSalesmanwisesalescollectionsummeryrep1Totals]
    use: LnSalesmanwisesalescollectionsummeryrep1
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
; End of SALESMANWISESALESCOLLECTIONSUMMERYREP1.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
