// Auto-generated from PARTYWISECOLLCTIONREPORT.TXT
const tdl = `
; Created By: Khokan on 2021-08-26 10:00, ID: 

;; Add report access to Gateway of Tally menu
[#menu: Gateway of Tally]
    ;; {26.Aug.21 11:48} Add locking option for demo version of party wise collection report
    add: Option: partywisecollctionreportLock ;; : @@partywisecollctionreportDemoLock

;; Debug Menu Entry
[#menu : cw_Debug_menu]   
    ;; Add display menu for party wise collection report
    add: Item: before: @@locQuit: @@partywisecollctionreportReport: Display Collection: colllReppartywisecollctionreport  ;;: Reppartywisecollctionreport

;; Lock Menu Configuration
[!menu: partywisecollctionreportLock]
    add: Item: before: @@locQuit: @@partywisecollctionreportReport: Display Collection: colllReppartywisecollctionreport  ;;: Reppartywisecollctionreport
    add: Item: before: @@locQuit: Blank

;; System Formulas
[System: formula]
    partywisecollctionreportReport: "Party wise collction report"
    ;; partywisecollctionreportDemoLock: $$MachineDate < $$Date:"01/04/2013" (commented condition for demo lock)

;; Collection for Ledger List to Drive Report
[Collection: colllReppartywisecollctionreport]
    Use                 : Extract Alias Collection
    Source Collection   : List of Ledgers
    Variable            : Ledger Name
    Report              : Reppartywisecollctionreport
    Trigger             : LedgerName
    Fetch               : Name

;; Report Configuration
[Report: Reppartywisecollctionreport]
    use                 : Dsp Template
    Title               : @@partywisecollctionreportReport
    Printset            : Report Title: @@partywisecollctionreportReport
    Form                : Frmpartywisecollctionreport
    Export              : Yes
    set                 : svfromdate : ##svcurrentdate
    set                 : svTodate : ##svcurrentdate
    Local               : Button : RelReports : Inactive : Yes

;; Form Layout
[Form: Frmpartywisecollctionreport]
    use                 : DSP Template
    Part                : DspAccTitles, PrtTitle0partywisecollctionreport, Prtpartywisecollctionreport
    Width               : 100% Page
    Height              : 100% Page
    Background          : @@SV_STOCKSUMMARY
    delete              : page break
    add                 : page break: partywisecollctionreportbotbrk, partywisecollctionreportbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12

    ;; Report Styling
    local:Part:DSPCompanyName:local:line:DSPCompanyName:Local:Field:DSPCompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress:Local:Field:DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName:Local:Field:DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle:Local:Field:DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local:Field:DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo:Local:Field:DSPPageNo:PrintStyle:style2n

;; Page Breaks and Title Section
[part: partywisecollctionreportbotBrk]
    line    : EXPINV PageBreak
    border  : thin top

[part: partywisecollctionreportbotopbrk]
    use     : dspacctitles
    add     : part: partywisecollctionreportTitlePart

[part: partywisecollctionreportTitlePart]
    line    : LnpartywisecollctionreportTitle

[line: LnpartywisecollctionreportCurrPeriod]
    field   : fwf, nf, fwf2
    Local   : field: fwf2: Align: Right
    Local   : Field: fwf: Style: normal bold
    Local   : Field: fwf2, fwf, NF: Style: style3x
    Local   : Field: fwf: Set As: ""
    Local   : Field: nf: Set As: $$ReptField:Name:2:ledger:##LedgerName
    Local   : Field: fwf2: Set As: @@dspDateStr
    Local   : Field: fwf2:invisible: $$inprintmode

[part: PrtTitle0partywisecollctionreport]
    line    : LnpartywisecollctionreportCurrPeriod

[Part: Prtpartywisecollctionreport]
    Line    : LnpartywisecollctionreportTitle, Lnpartywisecollctionreport
    bottom Line: LnpartywisecollctionreportTotals
    repeat  : Lnpartywisecollctionreport: Colpartywisecollctionreport
    scroll  : Vertical
    Common Border: Yes
    Total   : Qtyf, amtf

;; Data Source for Detailed Report
[Collection: Colpartywisecollctionreport]
    source Collection    : Colreceiptsouagentcoll
    by                  : date:$date
    by                  : vouchernumber:$vouchernumber
    by                  : partyledgername:$partyledgername
    compute             : cwcaption1item1:$cwcaption1item:ledger:$partyledgername
    by                  : vouchertypename:$vouchertypename
    aggr compute        : rcptvalue:sum:$amount
    compute             : chqno:$AllLedgerEntries[1, @@IsBankLedgr].BankAllocations[1].InstrumentNumber
    search key          : $partyledgername
    filter              : ColpartywisecollctionreportFilter

[system: Formula]
    ;; Filters for receipt entries of a specific ledger
    ColpartywisecollctionreportFilter  : $partyledgername=##LedgerName
    ColpartywisecollctionreportFilter2 : @@cwrecvchtype="Receipt"
    cwrecvchtype                        : $$CollectionField:$vouchertypename:First:ledgerentries

    ;; Check and fetch instrument numbers for receipts
    recmyNewChqNoa : $$filtervalue:@@recmyNewChqNo:ledgerentries:(-1):recColxFilter
    recmyNewChqNo  : $$filtervalue:@@recmyNewChqNo2:allledgerentries:1:reccwLedisBank
    recmyNewChqNo2 : $$collectionfield:$INSTRUMENTNUMBER:1:BANKALLOCATIONS

    ;; Define filters for receipt vouchers from bank ledgers
    recColxFilter  : $$isreceipt:$vouchertypename
    reccwLedisBank : $$IsLedofGrp:$ledgername:$$GroupBank OR $$IsLedofGrp:$ledgername:$$GroupBankOD OR $IsBankAcc:ledger:$ledgername

;; Title Line Definition
[Line: LnpartywisecollctionreportTitle]
    use: Lnpartywisecollctionreport
    option: titleopt
    local: field: sdf: set as: "Date"
    local: field: fwf: set as: "Party"
    local: field: SNF: set as: "Chq No"
    local: field: NF: set as: "Mode of Payment"
    local: field: amtf: set as: "Receipt"

    ;; Title Line Styling
    local: field: sdf, fwf, SNF, NF, amtf : style: style2x
    Local: field: default: Align: centre
    Local: field: fwf: Align: left

;; Main Data Line
[Line: Lnpartywisecollctionreport]
    Fields: sdf, fwf
    right field: SNF, nf, Amtf
    Option: Alter on Enter

    ;; Data Setup
    local: field: sdf: set as:$date
    local: field: fwf: set as:$partyledgername
    local: field: SNF: set as:$chqno
    local: field: NF: set as:$vouchernumber
    local: field: amtf: set as:$rcptvalue

    ;; Style and Formatting
    local: field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf : setas  : #amtf/#qtyf
    local: field: DEFAULT : style: style3x
    local: field: default: Border: thin right
    border: thin bottom

;; Total Line at the Bottom
[line: LnpartywisecollctionreportTotals]
    use: Lnpartywisecollctionreport
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: sdf, SNF, NF: set as: ""
    local: field: amtf : set as : $$total:amtf
    local: field: sdf, fwf, SNF, NF, amtf : style: style2x

`;
export default tdl;
