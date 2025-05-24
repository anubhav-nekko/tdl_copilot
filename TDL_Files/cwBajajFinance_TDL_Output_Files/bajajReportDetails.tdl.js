module.exports = () => `
;; =============================================================================
;; BUTTON DEFINITION: Get Details Button
;; =============================================================================

[Button: cwDetailsBtn]
    title : "Get Details"
    key : Alt + i
    scope : Selected
    Inactive: $$NumLinesInScope>1
    action : display :cwVchDetailsrep

;; =============================================================================
;; REPORT DEFINITION: Voucher Details Report
;; =============================================================================

[report: cwVchDetailsrep]
    form: cwVchDetailsfrm
    set: svvouchertype : $$CollectionField:$vouchertypename:First:cwParentSelectedSrc
    title: ##svVouchertype

;; =============================================================================
;; FORM DEFINITION: Voucher Details Form
;; =============================================================================

[form: cwVchDetailsfrm]
    part: cwVchDetailsTop, RepInvPart
    part: cwVchPart
    WIDTH: 95% PAGE
    height: 85% PAGE

;; =============================================================================
;; OPTION DEFINITIONS
;; =============================================================================

option: cwShowUpdateButton : $$CollectionField:($$filtercount:InventoryEntries:cwHasDeal):First:cwParentSelectedSrc > 0
option: cwShowUpdateButtonDummy : $$CollectionField:($$filtercount:InventoryEntries:cwHasDeal):First:cwParentSelectedSrc = 0

;; =============================================================================
;; FORMULA
;; =============================================================================

[System: Formula]
cwhasDeal : if $$isempty:$cwdealid then yes else no

;; =============================================================================
;; CONDITIONAL FORM EXTENSIONS
;; =============================================================================

[!form: cwShowUpdateButton]
    add: button : cwupdateDealBtn
    add: option : cwShowUpdateButton2 : $$CollectionField:($$numitems:InventoryEntries):First:cwParentSelectedSrc > 1

[!form : cwShowUpdateButton2]
    add: button : cwupdateDealBtn2

[!form: cwShowUpdateButtonDummy]
    add: button : cwupdateDealBtnDummy

;; =============================================================================
;; BUTTON DEFINITIONS: Update Buttons
;; =============================================================================

[button : cwupdateDealBtnDummy]
    key  : Alt + U
    title : "Update"
    inactive : yes

[button : cwupdateDealBtn]
    key  : Alt + U
    title : "Update"
    Action : Modify Variables : cwRepFinanceDetails

[button : cwupdateDealBtn2]
    key  : Alt + 2
    title : "Update2"
    Action : Modify Variables : cwRepFinanceDetails2

;; =============================================================================
;; PART: Repeating Part for Voucher Entries
;; =============================================================================

[part: cwVchPart]
    line : cwVchLine
    repeat : cwVchLine : cwParentSelectedSrc
    scroll : vertical

[line : cwVchLine]
    field : nf
    explode : cwVchDetailsTop
    explode : RepInvPart

;; =============================================================================
;; PART: Voucher Details - Top Information
;; =============================================================================

[part: cwVchDetailsTop]
    line: cwRepVchNoln, cwRepPartyLn

[line: cwRepVchNoln]
    field: sp, nf
    right fields: sp2, sdf
    Local: Field: sp: Set As:"No."
    Local: Field: nf: Set As: $vouchernumber
    Local: Field: sp2: Set As:"Date."
    Local: Field: sdf: Set As:$date
    space bottom: 0.4
    Local: field: sp: Width: 14

[line: cwRepPartyLn]
    field: sp, nf
    Local: Field: sp: Set As:"Party A/c Name"
    Local: Field: nf: Set As: $partyledgername
    Local: field: sp: Width: 14
    space bottom: 0.6

;; =============================================================================
;; PART: Inventory Entries Display
;; =============================================================================

[part: RepInvPart]
    line: cwInvTit, cwInvMain
    bottom lines: cwInvBottom
    repeat: cwInvMain: InventoryEntries
    scroll: Vertical

[line: cwInvTit]
    field: nf, SNF, snf2
    Local: Field: snf2: info: "DO Number"
    right fields: numf, numf2, amtf
    Local: Field: nf: info: "Name of Item"
    Local: Field: numf: info: "Quantity"
    Local: Field: numf2: info: "Rate"
    Local: Field: amtf: info: "Amount"
    Local: Field: default: Style: Normal Bold
    Local: field: nf: Width: 40
    Local: field: numf2: Width: 12
    border: thin top bottom
    height: 1.5

[line: cwInvMain]
    field: nf, snf5, snf2
    Local: Field: snf5: Skip: Yes
    right fields: numf, numf2, amtf
    Local: Field: nf: Set As: $stockitemname
    Local: Field: numf: Set As: $billedqty
    Local: Field: numf2: Set As: $rate
    Local: Field: amtf: Set As: $Amount
    Local: field: numf2: Format: "Decimal:2,nozero"
    Local: field: numf2: Width: 12
    Local: field: nf: Width: 40
    Local: Field: snf2: Set As: $cwdealid

[line: cwInvBottom]
    field: sp, nf
    Local: Field: sp: Set As:"Narration"
    Local: Field: nf: Set As: $narration
    Local: field: nf: Width: 80
    Local : field : nf: Lines : 3

;; =============================================================================
;; COLLECTION: Selected Source from Parent Report
;; =============================================================================

[Collection: cwParentSelectedSrc]
    Data Source: Parent Report: Selected

;; =============================================================================
;; REPORT: Update Deal ID - Bajaj Finance
;; =============================================================================

[report: cwRepFinanceDetails]
    use: cwFinanceDetails
    delete: form
    add: form: cwRepFinanceDetails

[form: cwRepFinanceDetails]
    option: small size form
    width: 20% page
    height: 10% page
    part : cwFinanceDetails
    local: part : cwFinanceDetails : delete : line : cwFinanceDetails
    on : form accept : yes : form accept
    on : form accept : yes : call : cwUpdteDealDetails2

;; =============================================================================
;; REPORT: Update Deal ID - Alternate
;; =============================================================================

[report: cwRepFinanceDetails2]
    use: cwFinanceDetails
    delete: form
    add: form: cwRepFinanceDetails2

[form: cwRepFinanceDetails2]
    option: small size form
    width: 20% page
    height: 10% page
    part : cwFinanceDetails
    local: part : cwFinanceDetails : delete : line : cwFinanceDetails
    on : form accept : yes : form accept
    on : form accept : yes : call : cwUpdteDealDetails2:2

;; =============================================================================
;; FUNCTION: Update Deal Details Logic
;; =============================================================================

[function : cwUpdteDealDetails2]
    parameter : cwInvRowNo : number : 1
    variable : myid : string
    00: set : myid : $$SPrintf:@@VCHMasterID:@@cwMymasterid
    20: call: cwgetDODetails

[System: Formula]
cwMyMasterId : $$CollectionField:$masterid:First:cwParentSelectedSrc
`;
