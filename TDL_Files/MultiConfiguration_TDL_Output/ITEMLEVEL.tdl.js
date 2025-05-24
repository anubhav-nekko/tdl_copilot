// Auto-generated from ITEMLEVEL.TXT
const tdl = `
;===============================================================================
; ITEMLEVEL.TXT
; Created By: Taniya on 2019-11-29 11:10, ID:
; Purpose: Adds item-level image viewing capability to inventory voucher lines
;          and batch allocations in Tally, with a "Show Image" button and dynamic
;          image path logic based on company and item master fields.
;===============================================================================

;------------------------------------------------------------------------------
; ADD "VIEW" COLUMN TO INVENTORY LINES WHEN IMAGE MANAGEMENT IS ENABLED
;------------------------------------------------------------------------------

[#Line: EI ColumnOne]
    add: option: cweicoloptimg: @@cwdocManagementEnable

[!line: cweicoloptimg]
    add: right fields: at beginning: snf8
    Local: Field: snf8: info: "View"
    Local: Field: snf8: Style: Normal Bold
    Local: field: snf8: Align: right

[#Line: EI Columntwo]
    add: option: cweicomtwooptimg: @@cwdocManagementEnable

[!line: cweicomtwooptimg]
    add: right fields: at beginning: snf8
    Local: Field: snf8: info: ""

;------------------------------------------------------------------------------
; ADD IMAGE BUTTON/FIELD TO INVENTORY INFO LINES
;------------------------------------------------------------------------------

[#line: eiinvinfo]
    add: option: eiinvinfooptimg: @@cwdocManagementEnable

[!line: eiinvinfooptimg]
    add: right fields: at beginning: cwlogical
    Local: Field: cwlogical: SubForm: photoreport: $$value
    Local: field: cwlogical: Align: centre
    Local: field: cwlogical: Skip Forward: yes
    Local: Field: cwlogical: Inactive: $$IsEnd:$StockItemName

[#line: ciinvinfo]
    add: option: cweiinvinfooptimg: @@cwdocManagementEnable

[!line: cweiinvinfooptimg]
    add: right fields: at beginning: cwlogical
    Local: Field: cwlogical: SubForm: photoreport: $$value
    Local: field: cwlogical: Align: centre
    Local: field: cwlogical: Skip Forward: yes
    Local: Field: cwlogical: Inactive: $$IsEnd:$StockItemName

;------------------------------------------------------------------------------
; ADD "SHOW IMAGE" BUTTON TO BATCH ALLOCATIONS FORM
;------------------------------------------------------------------------------

[#Form: STKVCH BatchAllocations]
    add: option: cwSTKVCHBatchAllocationsimgopt: @@cwdocManagementEnable

[!form: cwSTKVCHBatchAllocationsimgopt]
    add: Button: cwshowimagebttn

[Button: cwshowimagebttn]
    Title: $$LocaleString:"Show Image"
    Key: Alt + I
    action: modify variable: photoreport

;------------------------------------------------------------------------------
; IMAGE VIEWER SUBFORM & REPORT
;------------------------------------------------------------------------------

[report: photoreport]
    form: photoforma

[form: photoforma]
    part: photopartax, photopartax2, photoparta

[part: photopartax]
    line: photopartaxline

[line: photopartaxline]
    field: sp, nf
    Local: Field: sp: info: "Item Name"
    Local: Field: nf: Set As: $stockitemname
    Local: field: nf: read only: yes
    Local: Field: nf: Style: Normal Bold

[part: photopartax2]
    line: photopartaxline2

[line: photopartaxline2]
    field: sp, nf
    Local: Field: sp: info: "Base Path"
    Local: Field: nf: Set As: @@cwphotoform
    Local: field: nf: read only: yes
    Local: Field: nf: Style: Normal Bold

[part: photoparta]
    line: photoimaline
    graph type: @@cwphotoform

[line: photoimaline]
    field: fwf
    Local: Field: fwf: set as: ""

;------------------------------------------------------------------------------
; SYSTEM FORMULAS FOR IMAGE PATH RESOLUTION
;------------------------------------------------------------------------------

[System: Formula]
    cwphotoform: @@cwBasePath + @@cwbasepathlogo
    cwbasepathlogo: $cwdoc:stockitem:$stockitemname

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
