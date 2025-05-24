// Auto-generated from VCH1.TXT
const tdl = `
;===============================================================================
; VCH1.TXT
; Created By: Khokan on 2021-03-24 15:48, ID:
; Purpose: Adds mobile number field to Consignee, enables "Show Previous Item"
;          popup in Sales Color form, and displays previous sales vouchers with
;          mobile and item details, supporting advanced filtering and reporting.
;===============================================================================

;;------------------------------------------------------------------------------
;; CONSIGNEE MOBILE NUMBER FIELD (Sales Voucher Entry)
;;------------------------------------------------------------------------------

[#Line: EI Consignee]
    add:option:cwmuleiconsigopt:@@issales

[!line:cwmuleiconsigopt]
    add:field:sp4,nf4
    Local: Field: sp4: Set As:"Mobile No"
    Local: Field: nf4: storage:cwmobilenoled
    Local: Field: nf4: Set As:$LedgerMobile:ledger:$partyledgername

;;------------------------------------------------------------------------------
;; SALES COLOR FORM: Add "Show Previous Item" Button (Ctrl+P)
;;------------------------------------------------------------------------------

[#Form: Sales Color]
    add:option:cwmulSalesColoropt:$$increatemode

[!form:cwmulSalesColoropt]
    add:button:SalesPrevitembotton

[button:SalesPrevitembotton]
    key:Ctrl+P
    title:"Show Previous Item"
    Action : Modify Variables:SalesPrevitembotton

[report:SalesPrevitembotton]
    form:SalesPrevitembotton

[form:SalesPrevitembotton]
    part:SalesPrevitembotton,SalesPrevitembotton2
    HEIGHT:40  ;;% PAGE
    WIDTH:30   ;;% PAGE

;;------------------------------------------------------------------------------
;; PREVIOUS ITEM POPUP: Ledger Name and Mobile No
;;------------------------------------------------------------------------------

[part:SalesPrevitembotton]
    line:SalesPrevitembotton,mobilenoline

[line:SalesPrevitembotton]
    field:sp,nf7
    Local: Field: sp: Set As:"Ledger Name:"
    Local: Field: nf7: Set As:$partyledgername
    Local: Field: nf7: storage:cwpartynamemobno
    local: field: nf7: type: String:forced
    Local: Field: nf7: Skip: Yes
    Local: field: sp: Width:15
    Local: Field: nf7: Style: Normal Bold
    space bottom:0.5

[line:mobilenoline]
    field:sp,nf8
    Local: Field: sp: Set As:"Mobile No:"
    Local: Field: nf8: storage:cwmobilenoled2
    Local: Field: nf8: set as:$cwmobilenoled
    local: field: nf8: type: String:forced
    Local: Field: nf8: Skip: Yes
    Local: field: sp: Width:15
    Local: Field: nf8: Style: Normal Bold
    space bottom:0.5

[Collection: collledgerprv]
    type:ledger
    title:"List of Ledger"
    filter:cwledgerpartyfil

[System: Formula]
    cwledgerpartyfil:$$IsBelongsTo:$$GroupSundryDebtors OR $$IsBelongsTo:$$GroupSundryCreditors

;;------------------------------------------------------------------------------
;; PREVIOUS VOUCHERS PART: List previous sales vouchers for party
;;------------------------------------------------------------------------------

[part:SalesPrevitembotton2]
    line:vchpevline,vchpevline2
    border:thin box
    repeat:vchpevline2:collLastpartyvch
    scroll: vertical
    option: small size part
    common border:yes

[Collection: collvchpev]
    type:collvchpev:voucher

[line:vchpevline]
    use:vchpevline2
    Local: Field: snf: info: "Vch No"
    Local: Field: sdf: info: "Vch Date"
    Local: Field: amtf: info: "Amount"
    Local: Field: snf2: info: "Item Count"
    Local: Field: cwlogical: info: "Details"
    local: field: cwlogical: type: String
    Local: field: default: Align: centre
    local : field : sdf : delete : storage
    local : field : snf : delete : storage
    local : field : amtf : delete : storage
    local : field : numf : delete : storage
    local : field : snfx : delete : storage
    local : field : snf2 : delete : storage
    local : field : cwlogical : delete : storage
    local : field : sdf : delete : inactive
    local : field : snf : delete : inactive
    local : field : amtf : delete : inactive
    local : field : numf : delete : inactive
    local : field : snfx : delete : inactive
    local : field : snf2 : delete : inactive
    local : field : cwlogical : delete : inactive
    border:thin bottom
    Local: Field: default: Style: Normal Bold

[line:vchpevline2]
    field:snf,sdf,amtf,snf2,cwlogical
    Local: Field: snf: storage:cwVchNolast
    Local: Field: sdf:  storage:cwVchDate
    Local: Field: amtf: storage:cwAmount
    Local: Field: snf2: storage:cwItemCount
    Local: Field: cwlogical: storage:cwDetails
    Local: Field: snf3: Set As:$cwmobilenoled
    Local: Field: snf: Set As:$vouchernumber
    Local: Field: sdf: Set As:$date
    Local: Field: amtf: Set As:$myitemamt1
    Local: Field: snf2: Set As:$myitemcount1
    Local: Field: default: Border: thin right
    local: field: snf: type:string:forced
    local: field: sdf: type: date:forced
    Local: Field : cwlogical : SubForm : cwvchnorep: $$value
    Local: Field: snf: Skip: Yes
    Local: Field: sdf: Skip: Yes
    Local: Field: amtf: Skip: Yes
    Local: Field: snf2: Skip: Yes
    Local: Field: numf: Skip: Yes
    Local: Field: snf9: table:collLastpartyvch
    Local: Field: snf9: Show table: Always
    remove if:$$line>5

;;------------------------------------------------------------------------------
;; PREVIOUS VOUCHERS COLLECTION: Fetch last sales vouchers for party
;;------------------------------------------------------------------------------

[collection :collLastpartyvch]
    Type : Vouchers :ledger
    Child of :$partyledgername
    Belongs To : Yes
    compute:myitemcount1:$$filtercount:inventoryentries:myitem2
    compute:myitemamt1:$$CollAmtTotal:inventoryentries:$amount
    fetch:cwmobilenoled
    filter:msffilter
    sort:@@default:-$date,$vouchernumber

[system: formula]
    msffilter : $$IsSales:$VoucherTypeName
    cwmobilenoledfilter:if $$isempty:$cwmobilenoled then $$reportobject:$partyledgername=$partyledgername else ($$reportobject:$partyledgername=$partyledgername and $$reportobject:$cwmobilenoled=$cwmobilenoled)
    cwmobilenoledfilter1:$cwmobilenoledx=$$reportobject:$cwmobilenoled
    myitem :$StockItemName=#vchstockitem
    myitem2:yes
    myitemcount:$$filtercount:inventoryentries:myitem2

;===============================================================================
; End of VCH1.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
