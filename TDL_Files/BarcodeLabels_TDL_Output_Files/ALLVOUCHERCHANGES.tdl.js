// Auto-generated from ALLVOUCHERCHANGES.TXT
const tdl = `
;===============================================================================
; ALLVOUCHERCHANGES.TXT
; Created By: Suman on 2016-11-08 15:04, ID: 100337001
; Purpose: Customizes inventory voucher entry screens in Tally with enhanced
;          skip, batch, and POS-like logic for rate, value, and batch fields.
;===============================================================================

;------------------------------------------------------------------------------
; Add skip and POS-like options to Inventory Info lines in Entry and Credit forms
;------------------------------------------------------------------------------

[#Line: EI InvInfo]
    add: option: cweiinvinfooptx: @@cwenableskipopt
    add: option: cweiinvinfoLikePOS: $cwSkipLikePOS:Vouchertype:##SVVoucherType

[#Line: CI InvInfo]
    add: option: cweiinvinfoLikePOS: $cwSkipLikePOS:Vouchertype:##SVVoucherType

;------------------------------------------------------------------------------
; Option: Skip forward for Rate and Value fields if skip option is enabled
;------------------------------------------------------------------------------

[!line: cweiinvinfooptx]
    local: field: VCH Rate: Skip Forward: yes
    local: field: VCH Value: Skip Forward: yes

;------------------------------------------------------------------------------
; Option: POS-like skip and auto-set logic for fields in Inventory Info line
;------------------------------------------------------------------------------

/* New Changes for Batch and skip Pg: 2018.11.02 Begin v*/
[!line : cweiinvinfoLikePOS]
    local: field: VCH Rate: Skip Forward: yes
    local: field: VCH Value: Skip Forward: yes
    local: field: vchstockitem: skip forward: not $$isempty:#snf

    ; Set ActualQty and BilledQty to 1 or sum of batch allocations if not present
    local: field: vchactualqty: set as: if $$issysname:$stockitemname then $$value else if $$isempty:$$value then $$asqty:1 else if @HasInvAlloc then $$CollQtyTotal:BatchAllocations:$ActualQty else  $$value
    local: field: vchbilledqty: set as: if $$issysname:$stockitemname then $$value else if $$isempty:$$value then $$asqty:1 else if @HasInvAlloc then $$CollQtyTotal:BatchAllocations:$billedqty else  $$value

    ; Calculate value based on rate, discount, and billed qty
    local: field: vchvalue: set as: $rate * ((100 - $discount) / 100) * $billedqty

    ; Option to use MRP-inclusive or standard rate logic in POS mode
    option: cwStorageMRPIncPOs: ($$increatemode) and @@issetincrate  ;; added on 2023.10.13 ($$increatemode)    jain zari store
    option: cwStorageRatePOs: ($$increatemode) and Not @@issetincrate ;; added on 2023.10.13 ($$increatemode) jain zari store

    ; Add extra batch/godown/qty/rate fields in create mode
    add: option: cwADDFields: $$inCreateMode ;; or $$isfieldedited:snf  ;; added on 2023.10.13 for issue pertaining to jain zari store.

;------------------------------------------------------------------------------
; Option: Add batch, godown, qty, and rate fields at the beginning of line (create mode)
;------------------------------------------------------------------------------

[!line : cwAddFields]
    add: right field: at beginning: cwvchbatch, cwVchGodown, cwvchAqty, cwvchBQty, cwvchbatchrate

;------------------------------------------------------------------------------
; POS Mode: Set rate fields based on MRP-inclusive logic
;------------------------------------------------------------------------------

[!line : cwStorageMRPIncPOs]
    local: field: vchrateincl: set as: if $$issysname:$stockitemname then $$value else @@cwPOSTypeRate
    local: field: vchrate: set as: if $$issysname:$stockitemname then $$value else if $$isempty:$$value then #vchrateincl - (#vchrateincl * @@GSTItemRate /(100 + @@GSTItemRate)) else $$Value

;------------------------------------------------------------------------------
; POS Mode: Set rate field based on standard logic
;------------------------------------------------------------------------------

[!line : cwStorageRatePOs]
    local: field: vchrate: set as: if $$issysname:$stockitemname then $$value else if $$increatemode then @@cwPOSTypeRate else $$value

;------------------------------------------------------------------------------
; System formula: Get POS type rate, using MRP batch if enabled
;------------------------------------------------------------------------------

[System: Formula]
    cwPOSTypeRate: if $cwmrpenable:COMPANY:##SVCURRENTCOMPANY then $$FilterValue:$cwmrpbatch:cwBatchofItemVch:1:cwbsame else $$value

;------------------------------------------------------------------------------
; Collection: Get batch info for current stock item
;------------------------------------------------------------------------------

[collection: cwBatchofItemVch]
    type: batch
    child of: #vchstockitem
    fetch: cwmrp

[System: Formula]
    cwbsame: $batchname = #snf

;------------------------------------------------------------------------------
; Field: Show batch name or "Primary batch" if not batch-wise
;------------------------------------------------------------------------------

[field: cwvchbatch]
    use: nf
    set as: if $IsBatchWiseOn:stockitem:$stockitemname then #snf else "Primary batch"
    skip: yes
    invisible: yes
    storage: batchname: batchallocations: first

;------------------------------------------------------------------------------
; Field: Show godown name or "Main Location" if not set
;------------------------------------------------------------------------------

[field: cwVchGodown]
    use: nf
    set as: if not $$issysname:$$value or $$issysname:#cwvchbatch then $$value else if $$IsMultiGodownOn then $$cwgetGodownvalue:#cwvchbatch else "Main Location"
    invisible: yes
    read only: yes
    storage: godownname: batchallocations: first

;------------------------------------------------------------------------------
; Field: Set ActualQty and BilledQty to 1, store if batch-wise
;------------------------------------------------------------------------------

[field: cwvchAqty]
    use: qtyf
    set as: $$asqty:1
    option: cwvchbatchSkipAqtyStorage: $IsBatchWiseOn:stockitem:#vchstockitem
    skip: yes
    invisible: yes

[!field: cwvchbatchSkipAqtyStorage]
    storage: Actualqty: batchallocations: first

[field: cwvchBQty]
    use: qtyf
    set as: $$asqty:1
    option: cwvchbatchSkipBqtyStorage: $IsBatchWiseOn:stockitem:#vchstockitem
    skip: yes
    invisible: yes

[!field: cwvchbatchSkipBqtyStorage]
    storage: Actualqty: batchallocations: first

;------------------------------------------------------------------------------
; Field: Set batch rate, store if batch-wise
;------------------------------------------------------------------------------

[field: cwvchbatchrate]
    use: ratepf
    set as: if $$issysname:$stockitemname then $$value else @@cwPOSTypeRate
    option: cwvchbatchSkipRateStorage: $IsBatchWiseOn:stockitem:#vchstockitem
    skip: yes
    invisible: yes

[!field: cwvchbatchSkipRateStorage]
    storage: batchrate: batchallocations: first

/* New Changes for Batch and skip Pg: 2018.11.02 End ^*/

;------------------------------------------------------------------------------
; Add skip option to Credit InvInfo line
;------------------------------------------------------------------------------

[#Line: CI InvInfo]
    add: option: cwciinvinfooptx: @@cwenableskipopt

[!line: cwciinvinfooptx]
    local: field: VCH Rate: Skip Forward: yes
    local: field: VCH Value: Skip Forward: yes

;------------------------------------------------------------------------------
; Add skip option to Stock Voucher Batch line
;------------------------------------------------------------------------------

[#Line: STKVCH Batch2]
    add: option: cwstkvchbatchopt: @@cwenableskipopt

[!line: cwstkvchbatchopt]
    Local: Field: VCHBATCH Rate: Skip Forward: not $$isempty:$$value
    Local: Field: VCHBATCH RateUnits: Skip Forward: Yes
    Local: Field: VCHBATCH Value: Skip Forward: not $$isempty:$$value

`;
export default tdl;
