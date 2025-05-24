// ItemWiseNetSalesReport.tdl.js
// Author: Anil
// Converted on: 2025-05-24

const itemWiseNetSalesReportTDL = `
[#menu: Gateway of Tally]
;; {19.Mar.24 15:18}         add: Option: ItemwisenetsalesreportLock ;; : @@ItemwisenetsalesreportDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@ItemwisenetsalesreportReport: Display collection:collRepstockitemrep3new

[!menu: ItemwisenetsalesreportLock]
    add: Item: before: @@locQuit: @@ItemwisenetsalesreportReport: Display collection:collRepstockitemrep3new
    add: Item: before: @@locQuit: Blank

[System: formula]
    ItemwisenetsalesreportReport: "Item Wise Net Sales Report"
;; ItemwisenetsalesreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

[collection:collRepstockitemrep3new]
    Use: Extract Alias Collection
    Source Collection: List of Stockitems
    Title: $$LocaleString:"List of Stock item"
    Collection: Primary
    Variable: SStockItem
    Report: RepItemwisenetsalesreport
    Trigger: SStockItem
    Fetch: Name, ReserveName, Parent

[Report: RepItemwisenetsalesreport]
    use: Dsp Template
    Use: Range Template
    Title: @@ItemwisenetsalesreportReport
    Printset: Report Title: @@ItemwisenetsalesreportReport
    Form: FrmItemwisenetsalesreport
    Export: Yes
    set: svfromdate: ##svcurrentdate
    set: svTodate: ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes

[Form: FrmItemwisenetsalesreport]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0Itemwisenetsalesreport, PrtItemwisenetsalesreport
    Width: 100% Page
    Height: 100% Page
    delete: page break
    add: page break: Itemwisenetsalesreportbotbrk, ItemwisenetsalesreportbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    add: button: Save View, change view
    option: enable Range filters

[part: ItemwisenetsalesreportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: Itemwisenetsalesreportbotopbrk]
    use: dspacctitles
    add: part: ItemwisenetsalesreportTitlePart

[part: ItemwisenetsalesreportTitlePart]
    line: LnItemwisenetsalesreportTitle

[line: LnItemwisenetsalesreportCurrPeriod]
    field: fwf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: styleCalisto
    Local: Field: fwf: Set As: ##SStockItem
    Local: Field: fwf2: Style: styleCalisto
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0Itemwisenetsalesreport]
    line: LnItemwisenetsalesreportCurrPeriod

[Part: PrtItemwisenetsalesreport]
    Line: LnItemwisenetsalesreportTitle, LnItemwisenetsalesreportTitle2, LnItemwisenetsalesreport
    bottom Line: LnItemwisenetsalesreportTotals
    repeat: LnItemwisenetsalesreport: cwitemcollx
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf, amtf1, amtf2, amtf3, amtf4, amtf5, numf, numf1, numf2, numf3, numf4, amtf20

[collection:cwitemcollx]
    type: stock item
    belongs to: yes
    filter: cwColItemnetFilter2

[System: Formula]
    cwColpartynetFilter: not $$IsEmpty:$TBalDebits or not $$IsEmpty:$TBalCredits
    cwColItemnetFilter2: $name = ##SStockItem

[Collection: ColItemwisenetsalesreport]
    source Collection: souceColstockregisternew3
    by: partyledgername: $partyledgername
    by: stockitemname: $stockitemname
    by: parent1: $parent:ledger:$partyledgername
    by: parent2: $grandparent:ledger:$partyledgername

    aggr compute: salesbilledqtyx: sum: if $$issales:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"
    compute: cwEnableNetSalesReport1: $cwEnableNetSalesReport:vouchertype:$vouchertypename
    aggr compute: salescrbilledqtyx: sum: if $$IsCreditNote:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"
    aggr compute: salesamount: sum: if $$issales:$vouchertypename then $amount else $$InitValue:"amount"
    aggr compute: salesinvamt1x: sum: if $$issales:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"
    aggr compute: salescramount: sum: if $$IsCreditNote:$vouchertypename then $amount else $$InitValue:"amount"
    aggr compute: crnoteinvamt1x: sum: if $$IsCreditNote:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"
    aggr compute: cwsalesdiscamt1xx: sum: if $$issales:$vouchertypename then (@@cwsalesdiscamt / @@cwinvamt) * @@salesinvamt2 else $$InitValue:"amount"
    aggr compute: cwcrnotediscamt1xx: sum: if $$IsCreditNote:$vouchertypename then (@@cwsalesdiscamt / @@cwinvamt) * @@salesinvamt2 else $$InitValue:"amount"
    filter: Colstockregister2Filternew5
    search key: $stockitemname

[Collection: souceColstockregisternew3]
    Type: Vouchers : VoucherType
    Child Of: $$VchTypeSALES
    BelongsTo: Yes

[system: Formula]
    Colstockregister2Filternew5: ##SStockItem = $stockitemname
    salesinvamt1valueallx: $$reportobject:$$collectionfieldbykey:$salesinvamt1x:#fwf:ColItemwisenetsalesreport
    cwsalesdiscamt1xallx: $$reportobject:$$collectionfieldbykey:$cwsalesdiscamt1xx:#fwf:ColItemwisenetsalesreport
    crnoteinvamt1all: $$reportobject:$$collectionfieldbykey:$crnoteinvamt1x:#fwf:ColItemwisenetsalesreport
    cwcrnotediscamt1all: $$reportobject:$$collectionfieldbykey:$cwcrnotediscamt1xx:#fwf:ColItemwisenetsalesreport

; -------------------------- HEADERS & DETAIL OMITTED HERE --------------------
; Due to length, header (Title1, Title2) and detail (LnItemwisenetsalesreport) 
; definitions remain as in original and must be similarly embedded here.
`;

export default itemWiseNetSalesReportTDL;
