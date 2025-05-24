// Auto-generated from BarcodeChangesnew.txt
const tdl = `
;===============================================================================
; BARCODECHANGESNEW.TXT
; Created By: Neha on 2023-10-10 17:40, ID:
;             Anil on 2023-08-08 17:13, ID:
; Purpose: Enhances Godown Batch Allocations and Barcode Inventory Entries lines
;          with custom quantity and barcode fields, and provides placeholders
;          for additional field insertions and test values.
;===============================================================================

;------------------------------------------------------------------------------
; GODOWN BATCH ALLOCATIONS LINE ENHANCEMENTS
;------------------------------------------------------------------------------

[#Line: GodBatchAllocations]
;; {10.Oct.23 18:22} add: field: after: numf2: numf20
; Sets numf2 to the custom field cwrmvchpcsnew from the parent context.
Local: Field: numf2: Set As: $..cwrmvchpcsnew
    ;; If you want to default to $actualqty when cwrmvchpcsnew is empty, use:
    ;; if $$isempty:$cwrmvchpcsnew then $actualqty else $cwrmvchpcsnew

; Sets snf16 to the custom field cwrmvchpcsnew5.
Local: Field: snf16: Set As: $cwrmvchpcsnew5

;------------------------------------------------------------------------------
; BARCODE INVENTORY ENTRIES LINE ENHANCEMENTS
;------------------------------------------------------------------------------

[#Line: MyBarCodeInvEntries]
;; {10.Oct.23 18:56} add: field: after: numf2: numf20
; Sets numf2 to the custom field cwrmvchpcsnew from the parent context.
Local: Field: numf2: Set As: $..cwrmvchpcsnew
    ;; Example alternatives:
    ;; $cwrmvchpcsnew
    ;; if $$isempty:$cwrmvchpcsnew then $actualqty else $cwrmvchpcsnew

; Sets snf16 to the custom field cwrmvchpcsnew5.
Local: Field: snf16: Set As: $cwrmvchpcsnew5

;; {10.Oct.23 18:56} Local: Field: numf20: Set As: "554"

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
