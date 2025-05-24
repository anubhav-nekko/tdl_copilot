// Auto-generated from VCHINVCHANGES.TXT
const tdl = `
;===============================================================================
; VCHINVCHANGES.TXT
; Created By: Taniya on 2019-11-29 14:33, ID:
; Purpose: Customizes the export inventory (EXPINV) part in Tally to use a
;          combined item aggregation for inventory details, with enhanced
;          grouping and field logic for rate and MRP value.
;===============================================================================

;------------------------------------------------------------------------------
; MODIFY EXPINV INVINFO PART TO USE COMBINED ITEM COLLECTION
;   - Adds an option to switch to a new inventory info part if the combined item
;     option is enabled (controlled by @@cwcomitemopt).
;------------------------------------------------------------------------------

[#Part: EXPINV InvInfo]
    add: option: cwEXPINVInvInfonew: @@cwcomitemopt

;------------------------------------------------------------------------------
; NEW PART: Use combined item collection instead of standard inventory entries
;   - Deletes the default repeat over Inventory Entries and adds repeat over
;     colcombineditem (the new aggregated collection).
;   - Sets field logic for Rate and MRPValue.
;------------------------------------------------------------------------------

[!part: cwEXPINVInvInfonew]
    delete: Repeat: EXPINV InvDetails: Inventory Entries
    add: Repeat: EXPINV InvDetails: colcombineditem

    local: line: EXPINV InvDetails: local: field: EXPINV Rate: set as: $$asrate:$rate
    local: line: EXPINV InvDetails: local: field: EXPINV MRPValue: set as: @@cwitemmrprate

;------------------------------------------------------------------------------
; COLLECTION: AGGREGATED INVENTORY ENTRIES (colcombineditem)
;   - Walks through inventory entries and aggregates them by key fields:
;     stockitemname, rate, GST fields, and discount.
;   - Sums billedqty and amount for each group.
;------------------------------------------------------------------------------

[collection: colcombineditem]
    source collection: default
    walk: inventoryentries

    by: stockitemname: $stockitemname
    aggr compute: billedqty: sum: $billedqty
    by: rate: $rate
    by: GSTIsTransLedEx: $GSTIsTransLedEx
    by: GSTItemHSNCodeEx: $GSTItemHSNCodeEx
    by: GSTClsfnIGSTRateEx: $GSTClsfnIGSTRateEx
    by: discount: $discount
    aggr compute: amount: sum: $amount

`;
export default tdl;
