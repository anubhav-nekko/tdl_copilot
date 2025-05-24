// Auto-generated from ALLPARTYWISENETSALESREPORT.TXT
const tdl = `
;===============================================================================
; ALLPARTYWISENETSALESREPORT.TXT
; Created By: Khokan on 2021-08-27 13:37, ID:
; Purpose: Provides an "All Party Wise Net Sales Report" in Tally, showing
;          net sales, returns, collections, and related metrics per party,
;          with filtering, grouping, and aggregation features.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;; {14.Jun.22 15:23}         add: Option: allPartywisenetsalesreportLock ;; : @@allPartywisenetsalesreportDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@allPartywisenetsalesreportReport: Display: RepallPartywisenetsalesreport

[!menu: allPartywisenetsalesreportLock]
    add: Item: before: @@locQuit: @@allPartywisenetsalesreportReport: Display: RepallPartywisenetsalesreport
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    allPartywisenetsalesreportReport: "All Party wise net sales report"
;; allPartywisenetsalesreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION: All Party Wise Net Sales Report
;------------------------------------------------------------------------------

[Report: RepallPartywisenetsalesreport]
    use: Dsp Template
    Title: @@allPartywisenetsalesreportReport
    Printset: Report Title: @@allPartywisenetsalesreportReport
    Form: FrmallPartywisenetsalesreport
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes
    variable: str2
    set: str2: ""

;------------------------------------------------------------------------------
; MAIN FORM LAYOUT AND TOOLBAR BUTTONS
;------------------------------------------------------------------------------

[Form: FrmallPartywisenetsalesreport]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0allPartywisenetsalesreport,PrtallPartywisenetsalesreport
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: allPartywisenetsalesreportbotbrk,allPartywisenetsalesreportbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
    add:button:allpartynetsalesbotton

    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;------------------------------------------------------------------------------
; FILTER BUTTON AND FILTER REPORT
;------------------------------------------------------------------------------

[button:allpartynetsalesbotton]
    key: f7
    title: "Filter"
    Action : Modify Variables:allpartynetsalesbotton

[report:allpartynetsalesbotton]
    form:allpartynetsalesbotton

[form:allpartynetsalesbotton]
    part:allpartynetsalesbotton
    HEIGHT:20
    WIDTH:30

[part:allpartynetsalesbotton]
    line:cwtitlelinex,allpartynetsalesbotton

[line:allpartynetsalesbotton]
    field:sp,nf
    Local: Field: sp: Set As:"Party Name"
    Local: Field: nf:modifies:str2
    space bottom:0.5
    Local: field: sp: Width:12
    Local: Field: sp: Style: Normal Bold
    Local: Field: nf: table:collpartyall,Not Applicable
    Local: Field: nf: Show table: Always

[Collection: collpartyall]
    type:ledger
    title:"List of Ledger"

;------------------------------------------------------------------------------
; PAGE BREAK AND TITLE PARTS
;------------------------------------------------------------------------------

[part: allPartywisenetsalesreportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: allPartywisenetsalesreportbotopbrk]
    use: dspacctitles
    add: part: allPartywisenetsalesreportTitlePart

[part: allPartywisenetsalesreportTitlePart]
    line: LnallPartywisenetsalesreportTitle,LnallPartywisenetsalesreportTitle2

[line: LnallPartywisenetsalesreportCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style:styleCalisto
    Local: Field: fwf2: Style:styleCalisto
    Local: Field: fwf: Set As: ##LedgerName
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0allPartywisenetsalesreport]
    line : LnallPartywisenetsalesreportCurrPeriod

;------------------------------------------------------------------------------
; MAIN DATA PART: REPEAT LINES FOR EACH PARTY
;------------------------------------------------------------------------------

[Part: PrtallPartywisenetsalesreport]
    Line: LnallPartywisenetsalesreportTitle,LnallPartywisenetsalesreportTitle2,LnallPartywisenetsalesreport
    bottom Line: LnallPartywisenetsalesreportTotals
    repeat: LnallPartywisenetsalesreport:ColallPartywisenetsales
    scroll: Vertical
    Common Border: Yes
    Total:Qtyf,amtf,amtf1,amtf2,amtf3,amtf4,amtf5,numf,numf1,numf2,numf3,numf4,amtf20,amtf16,amtf12

;------------------------------------------------------------------------------
; COLLECTION: Party-wise ledgers under Sundry Debtors
;------------------------------------------------------------------------------

[Collection: ColallPartywisenetsales]
    type:ledger
    child of:$$Groupsundrydebtors
    belongs to:yes
    filter:cwColpartyFilter
    filter:cwallpartyfilter2
    fetch:cwcaption1item

[System: Formula]
    cwColpartyFilter:not $$IsEmpty:$TBalDebits or not $$IsEmpty:$TBalCredits
    cwallpartyfilter:if $$issysname:##str2 then yes else $partyledgername =##str2
    cwallpartyfilter2:if $$issysname:##str2 then yes else $name =##str2

;------------------------------------------------------------------------------
; AGGREGATE COMPUTATION: Net sales, returns, collections, etc. (via sourceColallAREAWISEnetsalesReport)
;------------------------------------------------------------------------------

[Collection: ColallPartywisenetsalesreport]
    source Collection: sourColallAREAWISEnetsalesReport
    by: partyledgername:$partyledgername
    by: parent1:$parent:ledger:$partyledgername
    by: parent2:$grandparent:ledger:$partyledgername
    aggr compute:salesbilledqty:sum:if $$issales:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"
    compute:cwEnableNetSalesReport1:$cwEnableNetSalesReport:vouchertype:$vouchertypename
    aggr compute:salescrbilledqty:sum:if $$IsCreditNote:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"
    aggr compute:salesamount:sum:if $$issales:$vouchertypename then $amount else $$InitValue:"amount"
    aggr compute:salesinvamt1:sum:if $$issales:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"
    aggr compute:salescramount:sum:if $$IsCreditNote:$vouchertypename then $amount else $$InitValue:"amount"
    aggr compute:crnoteinvamt1:sum:if $$IsCreditNote:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"
    aggr compute:cwsalesdiscamt1x:sum:if $$issales:$vouchertypename then (@@cwsalesdiscamt/@@cwinvamt)*@@salesinvamt2 else $$InitValue:"amount"
    aggr compute:cwcrnotediscamt1x:sum:if $$IsCreditNote:$vouchertypename then (@@cwsalesdiscamt/@@cwinvamt)*@@salesinvamt2 else $$InitValue:"amount"
    search key:$partyledgername

;------------------------------------------------------------------------------
; COLUMN HEADERS: Main and secondary title lines
;------------------------------------------------------------------------------

[Line: LnallPartywisenetsalesreportTitle]
    use: LnallPartywisenetsalesreport
    option: titleopt
    local:field: fwf: set as:"Party Name"
    local:field: grsales: set as:"Net Sales"
    local:field: grSRIN: set as:"Net Sals Return"
    local:field: snetsales: set as:"S.Net Sales "
    local:field: numf3: set as:"Net Sales"
    local:field: amtf3: set as:"Gross Sale Less Gross Sales Return"
    local:field: amtf4: set as:"Net Sale Without Gst"
    local:field: amtf5: set as:"Colleection"
    local: field: grsales: cells:2
    local: field: grSRIN: cells:2
    local: field: snetsales: cells:2
    local: field: default : style: normal bold
    local: field: grsales: delete: field
    local: field: grSRIN: delete: field
    local: field: snetsales: delete: field
    Local: Field:grsales : Sub title : Yes
    Local: Field:grSRIN : Sub title : Yes
    Local: Field:snetsales : Sub title : Yes
    Local: field: grSRIN: Align:centre
    Local: field: grsales: Align:centre
    Local: field: snetsales: Align:centre
    Local: field: default: Align:centre
    Local: field: snf: Align:left
    Local: field: fwf: Align:left
    Local: field: nf: Align:left
    Local: field: default: Lines: 0
    local: field: grsales : style:styleCalisto2
    local: field: grSRIN : style:styleCalisto2
    local: field: snetsales : style:styleCalisto2
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

[Line: LnallPartywisenetsalesreportTitle2]
    use: LnallPartywisenetsalesreport
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
    local: field: grSRIN : style:styleCalisto2
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

;------------------------------------------------------------------------------
; MAIN DATA LINE: Party-wise net sales, returns, collections, etc.
;------------------------------------------------------------------------------

[Line: LnallPartywisenetsalesreport]
    Fields:fwf
    right field:nf,grsales,grSRIN,snetsales,amtf6,amtf4,amtf5,amtf7,amtf8,amtf9,amtf10,numf7,numf8,amtf12,amtf13,amtf14,amtf15
    Option: Alter on Enter
    local: field: fwf: alter : voucher : $$isvoucher
    option: alter on enter
    local: field: fwf: alter : voucher : $$isvoucher
    local:field: snfx: set as:$cwShowinReport1
    local:field: nf: set as:$cwcaption1vch1
    local:field: fwf: set as:$name
    local:field: numf: set as:$$reportobject:$$collectionfieldbykey:$salesbilledqty:#fwf:ColallPartywisenetsalesreport
    local:field: qtyf1: set as:$salesbilledqty
    local:field: qtyf: set as:$salescrbilledqty
    local:field: amtf: set as:$$nettamount:#amtf12:#amtf13
    local:field: amtf12: set as:$$nettamount:@@salesinvamt1valueall:@@cwsalesdiscamt1xall
    local:field: amtf13: set as:(#amtf12*5)/100
    local:field: amtf14: set as:$$nettamount:@@crnoteinvamt1all:@@cwcrnotediscamt1all
    local:field: amtf15: set as:(#amtf14*5)/100
    local:field: numf2: set as:$$reportobject:$$collectionfieldbykey:$salescrbilledqty:#fwf:ColallPartywisenetsalesreport
    local:field: amtf2: set as:$$nettamount:#amtf14:#amtf15
    local:field: numf3: set as:#numf-#numf2
    local:field: amtf3: set as:#amtf-#amtf2
    local:field: amtf4: set as:#amtf3-#amtf6
    local:field: amtf6: set as:(#amtf3*5)/100
    local:field: amtf5: set as:$$reportobject:$$collectionfieldbykey:$rcptvalue:#fwf:Colreceipt
    local:field: amtf16: set as:@@cwnetreceipt
    local:field: amtf20: set as:@@cwnetpayment
    local:field: numf7: set as:if $$line=1 then #numf else $$prevlinefield+#numf
    local:field: numf8: set as:if $$line=1 then #numf2 else $$prevlinefield+#numf2
    local:field: amtf7: set as:if $$line=1 then #amtf else $$prevlinefield+#amtf
    local:field: amtf8: set as:if $$line=1 then #amtf2 else $$prevlinefield+#amtf2
    local:field: amtf9: set as:if $$line=1 then #amtf3 else $$prevlinefield+#amtf3
    local:field: amtf10: set as:if $$line=1 then #amtf4 else $$prevlinefield+#amtf4
    local:field: qtyf10: set as:if $$line=1 then #qtyf else $$prevlinefield+#qtyf
    local: field: amtf6: Invisible: yes
    local: field: amtf12: Invisible: yes
    local: field: amtf13: Invisible: yes
    local: field: amtf14: Invisible: yes
    local: field: amtf15: Invisible: yes
    local: field: amtf7: Invisible: yes
    local: field: NUMF7: Invisible: yes
    local: field: NUMF8: Invisible: yes
    local: field: amtf8: Invisible: yes
    local: field: amtf16: Invisible: yes
    local: field: amtf20: Invisible: yes
    local: field: amtf9: Invisible: yes
    local: field: amtf10: Invisible: yes
    local: field: default : style:styleCalisto
    local: field: nf: Invisible: yes
    Local: field: numf: Width:7
    Local: field: numf2: Width:7
    Local: field: numf3: Width:7
    Local: field: amtf: Width:10
    Local: field: amtf2: Width:10
    Local: field: amtf3: Width:10
    Local: field: nf: Width:30
    border:thin bottom

;------------------------------------------------------------------------------
; TOTALS LINE: Display totals for all columns
;------------------------------------------------------------------------------

[line: LnallPartywisenetsalesreportTotals]
    use: LnallPartywisenetsalesreport
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local:field: numf: set as:$$total:numf
    local:field: numf2: set as:$$total:numf2
    local:field: amtf: set as:#amtf7
    local:field: amtf20: set as:$$total:amtf20
    local:field: amtf16: set as:$$total:amtf16
    local:field: amtf12: set as:$$total:amtf12
    local:field: amtf2: set as:#amtf8
    local:field: numf3: set as:$$total:numf3
    local:field: amtf3: set as:#amtf9
    local:field: amtf4: set as:#amtf10
    local:field: amtf5: set as:$$total:amtf5
    local:field: amtf6: set as:$$total:amtf6
    local:field: amtf7: set as:$$prevlinefield
    local:field: amtf8: set as:$$prevlinefield
    local:field: amtf9: set as:$$prevlinefield
    local:field: amtf10: set as:$$prevlinefield
    local:field: amtf11: set as:$$prevlinefield
    local:field: numf7: set as:$$prevlinefield
    local:field: numf8: set as:$$prevlinefield
    local:field: qtyf10: set as:$$prevlinefield
    local: field: grsales : style:styleCalisto2
    local: field: grSRIN : style:styleCalisto2
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


`;
export default tdl;
