// Auto-generated from TOPSELLERS.TXT
const tdl = `
;===============================================================================
; TOPSELLERS.TXT
; Created By: khokan on 2022-06-27 16:33, ID:
; Purpose: Implements a "Top Sellers" report in Tally, ranking parties by sales,
;          collection, and net points, with advanced filtering, ranking logic,
;          and professional formatting.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    ;; add: Option: TopSellersLock ;; : @@TopSellersDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@TopSellersReport: Display collection : collRepTopSellers

[!menu: TopSellersLock]
    add: Item: before: @@locQuit: @@TopSellersReport: Display collection : collRepTopSellers
    add: Item: before: @@locQuit: Blank

[System: formula]
    TopSellersReport: "Top Sellers"
;; TopSellersDemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; GROUP SELECTION: Popup for group selection (Sundry Debtors)
;;------------------------------------------------------------------------------

[collection : collRepTopSellers]
    Use         : List of Groups
    Variable    : Group Name
    Trigger     : GroupNamexmsSellers
    Fetch       : Name

[Report: GroupNamexmsSellers]
    Use     : Collection Variable
    Local   : Line : Collection Variable : Field : GroupNamexmsSellers
    Local   : Field: MV Title            : Info  : $$LocaleString:"Name of Group"

[Field: GroupNamexmsSellers]
    Use         : Name Field
    Key         : Create group
    Modifies    : Group Name
    Table       : collledgrxSellers
    Show Table  : Always
    CommonTable : No

[Collection: collledgrxSellers]
    type:Group
    TITLE:"List of Group Name"
    add:filter:mycwGroupSellers

[System: Formula]
    mycwGroupSellers:$$isbelongsto:$$groupsundrydebtors

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: RepTopSellers]
    use: Dsp Template
    Title: @@TopSellersReport
    Printset: Report Title: @@TopSellersReport
    Form: FrmTopSellers
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate   : ##svcurrentdate
    Local: Button   : RelReports        : Inactive : Yes
    list variable : cwTopSellers
    list variable : cwTopSellersFinal
    variable: num1, logi1, str1, num2, num3, num4
    set:logi1:no
    set:num2:0
    set:num3:0
    set:num4:0
    set:str1:""

;;------------------------------------------------------------------------------
;; DATA AGGREGATION & RANKING LOGIC
;;------------------------------------------------------------------------------

[collection: ColTopSellersMainCollection]
    datasource : variable : cwTopSellersFinal
    format: $partyname,30
    format: $saleValue,40
    format: $receiptValue,50
    format: $saleRank,10
    format: $receiptRank,10
    format: $netRank,10
    sort : @@default : -1*$netRank
    filter: cwtopparentfilter, cwsaleRankfilternew, cwreceiptRankfilternew

[System: Formula]
    cwsaleRankfilternew: if $$isempty:##num2 then yes else $saleRank = ##num2
    cwreceiptRankfilternew: if $$isempty:##num3 then yes else $receiptRank = ##num3
    cwnetRankfilternew: if ##num4 = 0 then yes else $netRank <= ##num4
    cwtopparentfilter: if $$issysname:##str1 then yes else $partyname = ##str1

[collection: ColTopSellersSales]
    datasource : variable : cwTopSellers
    format: $partyname,30
    format: $saleValue,40
    format: $receiptValue,50
    format: $saleRank,10
    format: $receiptRank,10
    sort : @@default :  $$number:$saleValue

[variable: cwTopSellersFinal]
    variable : partyName : string
    variable : saleValue : amount
    variable : saleRank: number
    variable : receiptValue : amount
    variable : receiptRank : number
    variable : netRank: number

[variable: cwTopSellers]
    variable : partyName : string
    variable : saleValue : amount
    variable : saleRank: number
    variable : receiptValue : amount
    variable : receiptRank : number

[function: cwfillTopSellers]
    variable: rowIndex : number
    variable : partyname : string
    variable : ctr : number: 1
    10 : list delete : cwTopSellers
    20 : walk collection: ColTopSellers
    25 : set : partyname : $parent
    30 : list add : cwTopSellers : ##partyname
    40 : set : rowIndex : $$listIndex:cwTopSellers:##partyname
    50 : set : cwTopSellers[##rowIndex].partyName : ##partyname
    60 : set : cwTopSellers[##rowIndex].saleValue : $saleValue
    70 : set : cwTopSellers[##rowIndex].receiptValue : $receiptValue
    80 : set : cwTopSellers[##rowIndex].receiptRank: if $$isempty:$receiptValue then 1 else ##ctr
    90 : set : ctr : ##ctr + 1
    100: end walk
    105: set : ctr : 1
    110 : list delete : cwTopSellersFinal
    120 : walk collection: ColTopSellersSales
    125 : set : partyname : $partyname
    130 : list add : cwTopSellersFinal : ##partyname
    140 : set : rowIndex : $$listIndex:cwTopSellersFinal:##partyname
    150 : set : cwTopSellersFinal[##rowIndex].partyName : ##partyname
    160 : set : cwTopSellersFinal[##rowIndex].saleValue : $saleValue
    170 : set : cwTopSellersFinal[##rowIndex].receiptValue : $receiptValue
    175 : set : cwTopSellersFinal[##rowIndex].receiptRank : $receiptRank
    180 : set : cwTopSellersFinal[##rowIndex].saleRank: if $$isempty:$saleValue then 1 else ##ctr
    185 : set : cwTopSellersFinal[##rowIndex].netRank: ##ctr * $receiptRank
    190 : set : ctr : ##ctr + 1
    200 : end walk

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: FrmTopSellers]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0TopSellers, PrtTopSellers
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: TopSellersbotbrk, TopSellersbotOpbrk
    Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    add:button:showRankbotton
    add:button:TopSellersProductsbotton
    set : num1 : $$cwfillTopSellers
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

[part: TopSellersbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: TopSellersbotopbrk]
    use: dspacctitles
    add: part: TopSellersTitlePart

[part: TopSellersTitlePart]
    line: LnTopSellersTitle

[line: LnTopSellersCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf: Set As:##GroupName
    Local: Field: fwf2: Set As: @@dspDateStr
    local: field: fwf2 :invisible: $$inprintmode
    local: field: fwf : style:styleCalisto2
    local: field: fwf2 : style:styleCalisto2

[part: PrtTitle0TopSellers]
    line : LnTopSellersCurrPeriod

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of top sellers with ranks and points
;;------------------------------------------------------------------------------

[Part: PrtTopSellers]
    Line: LnTopSellersTitle, LnTopSellers
    repeat: LnTopSellers: ColTopSellersMainCollection
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf, amtf1, amtf2

[Collection: ColTopSellers]
    source collection : ColTopSellersSRc
    by : Parent  : $parent
    aggr compute : SaleValue    : sum : $cwSalesDuringThePeriodAmount
    aggr compute : ReceiptValue : sum : $cwReceiptDuringThePeriod
    sort : @@default :  $$number:$receiptValue
    filter : ColTopSellersFilter, cwledGroupNamefilter

[System: Formula]
    ColTopSellersFilter: not ($$isempty:$SaleQty and $$isEmpty:$saleVAlue and $$isempty:$receiptValue)
    cwledGroupNamefilter:$$isobjectbelongsto:group:($parent:ledger:$parent):##GroupName

[Collection: ColTopSellersSRc]
    Collection: ColTopSellersSRcPending
    Collection: ColTopSellersSRcCleared

[Collection: ColTopSellersSRcPending]
    Type : Bills
    fetch : cwcaption1vch
    fetch : LedgerEntries.InventoryEntries.BilledQty
    compute : cwSalesDuringThePeriodAmount : $$FilterNumTotal:LedgerEntries:cwtopSalesCrNoteDuringThePeriod:@@cwFNBillAllocTotal
    compute : cwReceiptDuringThePeriod : $$filterNumTotal:LedgerEntries:cwTOPReceiptsDuringThePeriod:@@cwFNBillAllocTotal
    filter: cwtopsalelersDebtorsBills
    keep source: no

[System: Formula]
    cwtopsalelersDebtorsBills: $$isobjectbelongsto:group:($parent:ledger:$parent):$$Groupsundrydebtors
    cwtopSalesCrNoteDuringThePeriod : $$isSales:$voucherTypeName or $$IsCreditNote:$voucherTypeName
    cwTOPReceiptsDuringThePeriod :$$isReceipt:$voucherTypeName

[Collection: ColTopSellersSRcCleared]
    use : ColTopSellersSRcPending
    cleared : yes

;;------------------------------------------------------------------------------
;; HEADER LINE: Column titles for the report
;;------------------------------------------------------------------------------

[Line: LnTopSellersTitle]
    use: LnTopSellers
    option: titleopt
    local:field: fwf: set as: "Party"
    local:field: amtf: set as: "Sales"
    local:field: numf: set as: "Sales Rank"
    local:field: amtf2: set as: "Collection"
    local:field: numf2: set as: "Collection Rank"
    local:field: numf3: set as: "Total Rank"
    Local: Field: numf4: Set As:"Rank"
    local: field: fwf : style:styleCalisto2
    local: field: numf : style:styleCalisto2
    local: field: amtf : style:styleCalisto2
    local: field: amtf2 : style:styleCalisto2
    local: field: numf2 : style:styleCalisto2
    local: field: numf3 : style:styleCalisto2
    local: field: numf4 : style:styleCalisto2
    Local : field : default: Lines : 0
    Local: field: default: Align:centre
    Local: field: fwf: Align:left

;;------------------------------------------------------------------------------
;; DATA LINE: Main line showing all calculated columns per party
;;------------------------------------------------------------------------------

[Line: LnTopSellers]
    Fields: fwf
    right field: Amtf, numf, amtf2, numf2, numf3, numf4
    Option: Alter on Enter
    local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
    local:field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    local:field: fwf: set as:$partyname
    local:field: amtf: set as:$SaleValue
    local:field: numf: set as: $saleRank
    local:field: amtf2: set as:$ReceiptValue
    local:field: numf2: set as:$receiptrank
    local:field: numf3: set as:$netRank
    Local: Field: numf4: Set As:if $$line = 1 then 1 else if $$prevobj:$netRank = $netRank then $$prevlinefield else $$prevlinefield + 1
    Local: Field:default: Border: thin right
    local: field: default : style:styleCalisto
    local: field: numf: Invisible:Not ##logi1
    local: field: numf2: Invisible:Not ##logi1
    local: field: numf3: Invisible:Not ##logi1
    empty : if ##num4 = 0 then no else  $$line > ##num4

;;------------------------------------------------------------------------------
;; TOTALS LINE: Running totals for all columns
;;------------------------------------------------------------------------------

[line: LnTopSellersTotals]
    use: LnTopSellers
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local:field: fwf: set as:"Total"
    local:field: amtf: set as:$$total:amtf
    local:field: numf: set as:""
    local:field: amtf2: set as:$$total:amtf2
    local:field: numf2: set as:""
    local:field: numf3: set as:""
    local:field: numf4: set as:""
    local: field: fwf : style:styleCalisto2
    local: field: numf : style:styleCalisto2
    local: field: amtf : style:styleCalisto2
    local: field: amtf2 : style:styleCalisto2
    local: field: numf2 : style:styleCalisto2
    local: field: numf3 : style:styleCalisto2
    local: field: numf4 : style:styleCalisto2

;;------------------------------------------------------------------------------
;; FILTER BUTTON: F7 filter popup for party/rank selection
;;------------------------------------------------------------------------------

[button:TopSellersProductsbotton]
    key:f7
    title:"Filter"
    Action : Modify Variables:TopSellersProductsbotton

[report:TopSellersProductsbotton]
    form:TopSellersProductsbotton

[form:TopSellersProductsbotton]
    part:TopSellersProductsbotton
    HEIGHT:30
    WIDTH:30

[part:TopSellersProductsbotton]
    line:cwtitlelinex,TopSalesledline,Salesrankline,Collectionrankline,Totalrankline

[line:TopSalesledline]
    field:sp,nf
    Local: Field: sp: Set As:"Party Name"
    space top:0.5
    Local: Field: nf:modifies:str1
    Local:Field:nf:table:cwcollparty,Not Applicable
    Local:Field:nf:Show table: Always
    Local: field: sp: Width:15
    local: field: default : style:styleCalisto2

[line:Salesrankline]
    field:sp,numf
    Local: Field: sp: Set As:"Sales Rank"
    Local: field: sp: Width:15
    space top:0.5
    Local: Field: numf:modifies:num2
    Local: field: sp: Width:15
    local: field: default : style:styleCalisto2
    Local: field: numf: Align:left

[line:Collectionrankline]
    field:sp,numf
    Local: Field: sp: Set As:"Collection Rank"
    space top:0.5
    Local: field: sp: Width:15
    local: field: default : style:styleCalisto2
    Local: Field: numf:modifies:num3
    Local: field: numf: Align:left

[line:Totalrankline]
    field:sp,numf
    Local: Field: sp: Set As:"Rank"
    Local: field: sp: Width:15
    local: field: default : style:styleCalisto2
    Local: field: numf: Align:left
    space top:0.5
    Local: Field: numf:modifies:num4

;===============================================================================
; End of TOPSELLERS.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
