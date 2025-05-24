// Auto-generated from LRPENDINGUPDATEREPORT.TXT
const tdl = `
;; ================================================================================
;; Created By : Khokan
;; Created On : 2021-05-18 11:11
;; Description: Custom menu and report definitions for "LR Pending Update Report"
;; ================================================================================

;; ----------------------------------------
;; Custom System Formula to Allow Actions
;; ----------------------------------------
[System: Formula]
AllowCurrReportActionxx : ($$InDisplayMode or $$InalterMode) AND NOT ($$IsSubReport OR $$IsAutoReport)

;; ----------------------------------------
;; Print Menu Modifications
;; ----------------------------------------
[#Menu: Print TopMenu]
    delete:Key Item : @@locCurrentReport : R : Print Report : (.) : @@AllowCurrReportAction
    add:Key Item    : before:@@locOtherReport : @@locCurrentReport : R : Print Report : (.) : @@AllowCurrReportActionxx

;; ----------------------------------------
;; Export Menu Modifications
;; ----------------------------------------
[#Menu: Export TopMenu]
    Indent : @@locIndentReports
    delete:Key Item : @@locCurrentReport : R : Export Report : (.) : @@AllowCurrReportAction
    add:Key Item    : before:@@locOtherReport : @@locCurrentReport : R : Export Report : (.) : @@AllowCurrReportActionxx

;; ================================================================================
;; Gateway of Tally Menu Extension
;; ================================================================================
[#menu: Gateway of Tally]
;; {25.May.21 13:02}
;; Uncomment below to activate LRpendingUpdatereportLock option
;; add: Option: LRpendingUpdatereportLock ;; : @@LRpendingUpdatereportDemoLock

;; Debug Menu Extension
[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit : @@LRpendingUpdatereportReport : alter: RepLRpendingUpdatereport

;; Lock Menu Definition for Restricted Use
[!menu: LRpendingUpdatereportLock]
    add: Item: before: @@locQuit : @@LRpendingUpdatereportReport : alter: RepLRpendingUpdatereport
    add: Item: before: @@locQuit : Blank

[System: formula]
LRpendingUpdatereportReport : "LR Pending Update Report"
;; LRpendingUpdatereportDemoLock : $$MachineDate < $$Date:"01/04/2013"

;; ================================================================================
;; Report Definition
;; ================================================================================
[Report: RepLRpendingUpdatereport]
    use: Dsp Template
    Title : @@LRpendingUpdatereportReport
    Printset : Report Title : @@LRpendingUpdatereportReport
    Form : FrmLRpendingUpdatereport
    Export : Yes
    Set : svfromdate : ##svcurrentdate
    Set : svTodate : ##svcurrentdate
    Local : Button : RelReports : Inactive : Yes
    Multi Objects : ColLRpendingUpdatereport

;; ================================================================================
;; Form Definition
;; ================================================================================
[Form: FrmLRpendingUpdatereport]
    use: DSP Template
    Part : DspAccTitles, PrtTitle0LRpendingUpdatereport, PrtLRpendingUpdatereport
    Width : 100% Page
    Height : 100% Page
    Background : @@SV_STOCKSUMMARY
    delete : page break
    add : page break : LRpendingUpdatereportbotbrk, LRpendingUpdatereportbotOpbrk

    Bottom Toolbar Buttons : BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12

    ;; Set custom print styles
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;; ================================================================================
;; Page Break and Title Sections
;; ================================================================================
[part: LRpendingUpdatereportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: LRpendingUpdatereportbotopbrk]
    use: dspacctitles
    add: part: LRpendingUpdatereportTitlePart

[part: LRpendingUpdatereportTitlePart]
    line: LnLRpendingUpdatereportTitle

[line: LnLRpendingUpdatereportCurrPeriod]
    field: fwf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf, fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: default: Skip: Yes
    invisible: $$inprintmode

;; ================================================================================
;; Print Title and Main Report Sections
;; ================================================================================
[part: PrtTitle0LRpendingUpdatereport]
    line : LnLRpendingUpdatereportCurrPeriod

[Part: PrtLRpendingUpdatereport]
    Line : LnLRpendingUpdatereportTitle, LnLRpendingUpdatereport
    bottom Line : LnLRpendingUpdatereportTotals
    repeat : LnLRpendingUpdatereport : ColLRpendingUpdatereport
    scroll : both
    Common Border : Yes
    Total : Qtyf, qtyf2, qtyf3, numf

;; ================================================================================
;; Data Collection and Filtering
;; ================================================================================
[Collection: ColLRpendingUpdatereport]
    Use: Vouchers of Company
    delete: filter : daybookfilter
    Filter: ColhFilter, cwledcityfilter, ColLRpendingUpdatereportFilter, IsNonOptionalCancelledVchs

[system: Formula]
ColLRpendingUpdatereportFilter : $$isempty:$BillofLadingNo
ColhFilter : $$issales:$vouchertypename
cwledcityfilter : not ($cwledcity:ledger:$partyledgername = "kolkata")

;; ================================================================================
;; Header Row of Report
;; ================================================================================
[Line: LnLRpendingUpdatereportTitle]
    use: LnLRpendingUpdatereport
    option: titleopt
    ;; Set header titles
    local: field: snf : set as: "Bill No"
    local: field: sdf : set as: "Date"
    local: field: fwf : set as: "Party Name"
    local: field: snf2 : set as: "Area"
    local: field: snf3 : set as: "Booked Party"
    local: field: nf : set as: "Dispatch From"
    local: field: numf : set as: "No of Bales"
    local: field: qtyf2 : set as: "Pcs"
    local: field: nf2 : set as: "Transporters"
    local: field: nf3 : set as: "Direct Disp"
    local: field: nf4 : set as: "LR No"
    local: field: sdf2 : set as: "LR Date"
    local: field: snf5 : set as: "Agent"
    local: field: snf6 : set as: "SalesMan"
    local : field : nf4, sdf2 : delete : storage
    local: field: qtyf : type: String
    Local: field: default: Align:centre
    local: field: default : style: normal bold

;; ================================================================================
;; Detail Row for Each Entry
;; ================================================================================
[Line: LnLRpendingUpdatereport]
    Fields: snf, sdf, fwf
    right field: snf2, snf3, nf, numf, qtyf2, nf2, nf3, nf4, sdf2
    Option: Alter on Enter

    ;; Field formatting
    local: field: qtyf, qtyf2, qtyf3 : Format : "NoSymbol, Short Form, No Compact,NoZero"
    local: field: fwf : alter : voucher : $$isvoucher
    option : alter on enter

    ;; Data bindings
    local:field: snf : set as: $vouchernumber
    local:field: sdf : set as: $date
    local:field: fwf : set as: $partyledgername
    local:field: snf2 : set as: $cwledcity:ledger:$partyledgername
    local:field: snf3 : set as: ""
    local:field: nf : set as: $BasicShippedBy
    local:field: qtyf, qtyf2 : set as: @@cwinvbQty
    local:field: nf2 : set as: $cwtempGSTewayTransporterName
    local:field: nf3 : set as: "SHOP"
    Local: Field: nf4 : Set As: $BillofLadingNo
    Local: Field: sdf2 : Set As: $BillofLadingDate
    Local: Field: nf4 : storage: BillofLadingNo
    Local: Field: sdf2 : storage: BillofLadingDate
    Local: Field: qtyf3 : Set As: if $$line=1 then #qtyf else $$prevlinefield + #qtyf
    local:field: snf5 : set as: $cwcaption1vch
    local:field: snf6 : set as: $cwcaption2vch
    local: field: qtyf, qtyf3 : type: quantity: Secondary units
    Local: Field: numf : Set As: @@cwSecondarysalesQty
    Local: Field: snf9 : Set As: @@cwSecondarysalesQty

    ;; Skipping fields during print
    Local: Field: fwf, snf, sdf, snf2, snf3, snf4, snf5, snf6, nf, qtyf, qtyf2, nf2, numf, nf3 : Skip: Yes
    Local: Field: default: Border: thin right

[System: Formula]
cwSecondarysalesQty : $$string:@@cwsalesQty:"Secondary,shortform,compact"
cwsalesQty : $$collqtytotal:inventoryentries:$billedqty

;; ================================================================================
;; Totals Row
;; ================================================================================
[line: LnLRpendingUpdatereportTotals]
    use: LnLRpendingUpdatereport
    option: totalOpt

    ;; Total formatting
    local: field: fwf : align: right
    local: field: default : style: normal bold
    local: field: qtyf : set as: #qtyf3
    local: field: fwf : set as: "Total"
    local:field: snf, sdf, snf2, snf3, nf, nf2, nf3, nf4, sdf2, snf5, snf6 : set as: ""
    local:field: qtyf2 : set as: $$total:qtyf2
    local:field: numf : set as: $$total:numf
    Local: Field: qtyf3 : Set As: $$prevlinefield
    local : field : nf4, sdf2 : delete : storage
    local: field: qtyf, qtyf3 : type: quantity: Secondary units

`;
export default tdl;
