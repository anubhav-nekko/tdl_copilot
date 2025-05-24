// Auto-generated from COMPERATIVENETSALEANDCOLLECTION.TXT
const tdl = `
;===============================================================================
; COMPERATIVENETSALEANDCOLLECTION.TXT
; Created By: khokan on 2022-06-20 12:55, ID:
; Purpose: Provides a "Comparative Net Sales and Collection" report in Tally,
;          allowing users to compare net sales and collections across up to
;          three companies and date ranges, with agent/party-wise breakdown,
;          sale and collection variations, and filtering.
;===============================================================================

[#menu: Gateway of Tally]
;; {15.May.23 11:07}         add: Option: ComperativeNetsaleCollectionLock ;; : @@ComperativeNetsaleCollectionDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@ComperativeNetsaleCollectionReport: Display Collection: collRepComperativeNetsaleCollection
    add: Item: before: @@locQuit: Blank

[!menu: ComperativeNetsaleCollectionLock]
    add: Item: before: @@locQuit: @@ComperativeNetsaleCollectionReport: Display Collection: collRepComperativeNetsaleCollection
    add: Item: before: @@locQuit: Blank

[System: formula]
    ComperativeNetsaleCollectionReport: "Comparative Net Sales and Collection"
;; ComperativeNetsaleCollectionDemoLock: $$MachineDate < $$Date:"01/04/2013"

[Collection: collRepComperativeNetsaleCollection]
    Use: Extract Alias Collection
    Source Collection: List of ledgers
    Title: $$LocaleString:"List of"
    Report: RepComperativeNetsaleCollection
    Variable: str1, str2, str3
    variable: ledgername
    Trigger: Svcompanyx

;------------------------------------------------------------------------------
; COMPANY AND DATE SELECTION FORM
;------------------------------------------------------------------------------

[Report: Svcompanyx]
    Use: Collection Variable
    Title: $$LocaleString:""
    Local: Line: Collection Variable: Field: sp, Svcompanyx, snfx, Companysdf, snfx2, Companysdf2
    Local: Line: Collection Variable: Local: Field: sp: info: "Company Name:"
    Local: Line: Collection Variable: Local: Field: sp2: info: "Company Dt:"
    Local: Line: Collection Variable: Local: Field: snfx: info: "From:"
    Local: Line: Collection Variable: Local: Field: snfx2: info: "To:"
    Local: field: sp: Width: 17
    Local: Field: MV Title: Info: $$LocaleString:"Name of Company"
    Local: Part: Modify Variables: add: line: CompanyNameline, ledNameline
    Variable: str1, str2, str3, sdf1, sdf2, sdf3, sdf4, sdf5, sdf6

[Field: Svcompanyx]
    Use: Name Field
    Table: collnameCompany
    Show Table: Always
    set always: yes
    Modifies: str1
    Width: 40

[field: Companysdf]
    use: short date field
    style: normal
    set always: yes
    width: @@shortwidth - 1
    Modifies: sdf1

[field: Companysdf2]
    use: short date field
    style: normal
    set always: yes
    width: @@shortwidth - 1
    Modifies: sdf2

[collection: collnameCompany]
    Type: Company
    title: "List of Companies"

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION
;------------------------------------------------------------------------------

[Report: RepComperativeNetsaleCollection]
    use: Dsp Template
    Title: @@ComperativeNetsaleCollectionReport
    Printset: Report Title: @@ComperativeNetsaleCollectionReport
    Form: FrmComperativeNetsaleCollection
    Export: Yes
    set: svfromdate: ##svcurrentdate
    set: svTodate: ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes
    variable: num1
    set: num1: $$cwFillDetails
    variable: str8, str9
    set: str8: ""
    set: str9: ""

[Form: FrmComperativeNetsaleCollection]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0ComperativeNetsaleCollection, PrtComperativeNetsaleCollection
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: ComperativeNetsaleCollectionbotbrk, ComperativeNetsaleCollectionbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    add: button: Comperativenetbotton

[part: ComperativeNetsaleCollectionbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: ComperativeNetsaleCollectionbotopbrk]
    use: dspacctitles
    add: part: ComperativeNetsaleCollectionTitlePart

[part: ComperativeNetsaleCollectionTitlePart]
    line: LnComperativeNetsaleCollectionTitle, LnComperativeNetsaleCollectionTitle2, LnComperativeNetsaleCollectionTitle3

[line: LnComperativeNetsaleCollectionCurrPeriod]
    field: fwf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0ComperativeNetsaleCollection]
    line: LnComperativeNetsaleCollectionCurrPeriod

;------------------------------------------------------------------------------
; MAIN DATA PART: COMPARATIVE NET SALES & COLLECTION
;------------------------------------------------------------------------------

[Part: PrtComperativeNetsaleCollection]
    Line: LnComperativeNetsaleCollectionTitle, LnComperativeNetsaleCollectionTitle2, LnComperativeNetsaleCollectionTitle3, LnComperativeNetsaleCollection
    bottom Line: LnComperativeNetsaleCollectionTotals
    repeat: LnComperativeNetsaleCollection: varComperativeNetsale
    scroll: Vertical
    Common Border: Yes
    Total: numf, amtf, amtf2, numf2, amtf3, amtf4, numf3, amtf, amtf6, amtf10, amtf11, amtf12, amtf13

[Line: LnComperativeNetsaleCollectionTitle]
    use: LnComperativeNetsaleCollection
    option: titleopt
    local: field: newnumf: set as: ##str1
    local: field: newnumf2: set as: ##str2
    local: field: newnumf3: set as: ##str3
    local: field: newnumf: delete: FIELD
    local: field: newnumf2: delete: FIELD
    local: field: newnumf3: delete: FIELD
    Local: field: newnumf: Align: centre
    Local: field: newnumf2: Align: centre
    Local: field: newnumf3: Align: centre
    Local: Field: newnumf: Sub title: Yes
    Local: Field: newnumf2: Sub title: Yes
    Local: Field: newnumf3: Sub title: Yes
    local: field: FWF: style: styleCalisto2

[Line: LnComperativeNetsaleCollectionTitle2]
    use: LnComperativeNetsaleCollection
    option: titleopt
    local: field: newnumf: set as: $$string:##sdf1 +" to "+$$string:##sdf2
    local: field: newnumf2: set as: $$string:##sdf3 +" to "+$$string:##sdf4
    local: field: newnumf3: set as: $$string:##sdf5 +" to "+$$string:##sdf6
    local: field: newnumf: type: String
    local: field: newnumf1: type: String
    local: field: newnumf2: type: String
    local: field: newnumf3: type: String
    Local: field: newnumf: Align: centre
    Local: field: newnumf2: Align: centre
    Local: field: newnumf3: Align: centre
    local: field: newnumf: delete: FIELD
    local: field: newnumf2: delete: FIELD
    local: field: newnumf3: delete: FIELD

[Line: LnComperativeNetsaleCollectionTitle3]
    use: LnComperativeNetsaleCollection
    option: titleopt
    local: field: fwf: set as: "Party Name"
    local: field: nf: set as: "Agent Name"
    local: field: numf: set as: "Net Sale Qty"
    local: field: amtf: set as: "Net Sale Amt"
    local: field: amtf2: set as: "Collection"
    local: field: numf2: set as: "Net Sale Qty"
    local: field: amtf3: set as: "Net Sale Amt"
    local: field: amtf4: set as: "Collection"
    local: field: numf3: set as: "Net Sale Qty"
    local: field: amtf5: set as: "Net Sale Amt"
    local: field: amtf6: set as: "Collection"
    local: field: amtf10: set as: "Sale Variation"
    local: field: amtf11: set as: "Sale Varn %"
    local: field: amtf12: set as: "Coll Variation"
    local: field: amtf13: set as: "Coll Varn %"
    Local: field: DEFAULT: Align: centre
    Local: field: FWF: Align: LEFT

[Line: LnComperativeNetsaleCollection]
    Fields: nf, fwf
    right field: newnumf, newnumf2, AMTF10, AMTF11, AMTF12, AMTF13, amtf14, amtf15, amtf16, amtf17, amtf18, amtf19, amtf20, amtf21, amtf22, amtf23
    Local: Field: nf: Set As: if $$line = 1 or $$prevobj:$agentName <> $agentName then $agentName else ""
    Local: Field: fwf: Set As: $varPartyName
    Local: Field: numf: set as: $varNetSalesQty1
    Local: Field: amtf: set as: $varNetSalesAmt1
    Local: Field: amtf2: set as: $varnetsalescoll1
    Local: Field: numf2: set as: $varnetsalesqty2
    Local: Field: amtf3: set as: $varnetsalesamt2
    Local: Field: amtf4: set as: $varnetsalescoll2
    Local: Field: amtf10: set as: $varnetsalesamt2 - $varnetsalesamt1
    Local: Field: amtf11: set as: 100 * (#amtf10 / #amtf)
    Local: Field: amtf12: set as: $varnetsalescoll2 - $varnetsalescoll1
    Local: Field: amtf13: set as: 100 * (#amtf12 / #amtf2)
    Local: Field: DEFAULT: Border: thin right

[line: LnComperativeNetsaleCollectionTotals]
    use: LnComperativeNetsaleCollection
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: fwf: set as: "Total"
    local: field: numf: set as: $$TOTAL:NUMF
    local: field: amtf: set as: $$TOTAL:AMTF
    local: field: amtf2: set as: $$TOTAL:AMTF2
    local: field: numf2: set as: $$TOTAL:NUMF2
    local: field: amtf3: set as: $$TOTAL:AMTF3
    local: field: amtf4: set as: $$TOTAL:AMTF4
    local: field: numf3: set as: $$TOTAL:NUMF3
    local: field: amtf5: set as: $$TOTAL:AMTF5
    local: field: amtf6: set as: $$TOTAL:AMTF6
    local: field: amtf10: set as: $$TOTAL:AMTF10
    local: field: amtf12: set as: $$TOTAL:AMTF12

;------------------------------------------------------------------------------
; DATA AGGREGATION LOGIC (FUNCTIONS AND COLLECTIONS)
;------------------------------------------------------------------------------

[variable: varComperativeNetsale]
    variable: uniqueRow: string
    variable: agentName: String
    variable: varpartyname: string
    variable: varnetsalesqty1: number
    variable: varnetsalesamt1: amount
    variable: varnetsalescoll1: amount
    variable: varnetsalesqty2: number
    variable: varnetsalesamt2: amount
    variable: varnetsalescoll2: amount
    variable: varSaleVariation: amount
    variable: varSaleVarn: amount
    variable: varCollVariation: amount
    variable: varCollVarn: amount

[system: variable]
    list variable: varComperativeNetsale

[collection: varComperativeNetsale]
    data source: variable: varComperativeNetsale
    format: $agentName,10
    format: $varpartyname,10
    format: $varnetsalesqty1,10
    format: $varnetsalesamt1,10
    format: $varnetsalescoll1,10
    format: $varnetsalesqty2,10
    format: $varnetsalesamt2,10
    format: $varnetsalescoll2,10
    format: $varnetsalesqty3,10
    format: $varnetsalesamt3,10
    format: $varnetsalescoll3,10
    format: $varSaleVariation,10
    format: $varSaleVarn,10
    format: $varCollVariation,10
    format: $varCollVarn,10
    filter: cwpartycomfilter, cwcvaragentfilter

[System: Formula]
    cwpartycomfilter: if $$issysname:##str8 then yes else $varpartyname = ##str8
    cwcvaragentfilter: if $$issysname:##str9 then yes else $agentName = ##str9

;------------------------------------------------------------------------------
; FILTER BUTTON
;------------------------------------------------------------------------------

[button: Comperativenetbotton]
    key: f7
    title: "Filter"
    Action: Modify Variables: Comperativenetbotton

[report: Comperativenetbotton]
    form: Comperativenetbotton

[form: Comperativenetbotton]
    part: Comperativenetbotton
    WIDTH: 30% PAGE

[part: Comperativenetbotton]
    line: titlelinexn1, Customernameline1, Agentlinex1

[line: titlelinexn1]
    field: fwfc
    Local: Field: fwfc: info: "Filter"
    Local: Field: fwfc: Border: thin bottom
    Local: Field: fwfc: Style: Normal Bold
    space bottom: 0.5

[line: Customernameline1]
    field: sp, nf
    Local: Field: sp: Set As: "Customer Name"
    Local: Field: nf: modifies: str8
    space bottom: 0.5
    Local: field: sp: Width: 18
    Local: Field: sp: Style: Normal Bold

[line: Agentlinex1]
    field: sp, nf
    Local: Field: sp: Set As: $cwcaption1:COMPANY:##SVCURRENTCOMPANY
    Local: Field: nf: modifies: str9
    space bottom: 0.5
    Local: field: sp: Width: 18
    Local: Field: sp: Style: Normal Bold

;------------------------------------------------------------------------------
; CORE LOGIC: DATA FILLING FUNCTIONS
;------------------------------------------------------------------------------

[function: cwFillDetails]
; Fills varComperativeNetsale with agent/party-wise net sales and collection
; for up to two companies and date ranges, using ColAgentPartyPerformance
; and ColAgentPartyPerformance2 collections, with sale/collection variations.

; ... (Function implementation as in the file)

`;
export default tdl;
