// Auto-generated from stockitemchg.txt
const tdl = `
;===============================================================================
; STOCKITEMCHG.TXT
; Created By: Khokan on 2014-05-17 12:38, ID:
; Purpose: Adds company, type, generic, potency, pack size, and MRP fields to
;          the Stock Item master in Tally, with table lookups and dynamic name
;          generation for Rose Homeo scenario.
;===============================================================================

;------------------------------------------------------------------------------
; EXTEND STOCK ITEM MASTER FORM WITH COMPANY AND PRODUCT FIELDS
;------------------------------------------------------------------------------

[#Form: Stock Item]
    add: option: newStockItem: @@RoseHomeoEnabled

[!form: newStockItem]
    add: part: at beginning: cwcompanypart

;------------------------------------------------------------------------------
; COMPANY AND PRODUCT DETAILS PART
;------------------------------------------------------------------------------

[part: cwcompanypart]
    line: cwcompanyline, cwtypeline, cwGenericNameline

[line: cwcompanyline]
    field: sp, snf, snfx
    Local: Field: sp: Set As: "Company Name"
    Local: Field: snf: storage: cwCompanyName
    Local: Field: snfx: Set As: $$ReptField:Name:2:CostCentre:$cwCompanyName
    Local: Field: snfx: storage: cwCompanyalias
    Local: Field: snf: table: colcwCompanyName, Not Applicable
    Local: Field: snf: Show table: Always
    local: field: snf: variable: svcost centre
    local: field: SNF: key: Create Cost Centre, Alter CstCtr
    Local: field: sp: Width: 14
    Local: Field: snf: Style: Normal Bold
    Local: Field: snfx: Skip: Yes

[line: cwtypeline]
    field: sp2, snf2
    Local: Field: sp2: Set As: "Type"
    Local: Field: snf2: storage: cwsortno
    Local: Field: snf2: table: colcwType, Not Applicable
    Local: Field: snf2: Show table: Always
    local: field: snf2: variable: svcost centre
    local: field: SNF2: key: Create Cost Centre, Alter CstCtr
    Local: Field: snf2: Style: Normal Bold
    Local: field: sp2: Width: 14

[line: cwGenericNameline]
    field: sp, snf3, sp2, snf4, sp3, snf5, sp4, snf6
    Local: Field: sp: Set As: "Generic Name"
    Local: Field: snf3: storage: cwsize
    Local: Field: snf3: table: colGeneric, Not Applicable
    Local: Field: snf3: Show table: Always
    Local: Field: snf3: Key: Create Stock Category, Alter StkCat
    Local: Field: snf3: Variable: SV Stock Category
    Local: Field: snf3: Style: Normal Bold
    Local: field: sp: Width: 14
    local: field: snf3: inactive: $$issysname:$cwCompanyName

    Local: Field: sp2: Set As: "Potency"
    Local: Field: snf4: storage: cwproduct
    Local: Field: snf4: table: colcwPotency, Not Applicable
    Local: Field: snf4: Show table: Always
    local: field: snf4: variable: svcost centre
    local: field: SNF4: key: Create Cost Centre, Alter CstCtr
    Local: Field: snf4: Style: Normal Bold
    Local: field: snf4: Width: 8
    local: field: snf4: inactive: $$issysname:$cwCompanyName

    Local: Field: sp3: Set As: "Pack Size"
    Local: Field: snf5: storage: cwproduct2
    Local: Field: snf5: table: colcwPackSize, Not Applicable
    Local: Field: snf5: Show table: Always
    local: field: snf5: variable: svcost centre
    local: field: SNF5: key: Create Cost Centre, Alter CstCtr
    Local: Field: snf5: Style: Normal Bold
    local: field: snf5: inactive: $$issysname:$cwCompanyName

    Local: Field: sp4: Set As: "MRP"
    Local: Field: snf6: storage: cwproduct3
    Local: Field: snf6: Style: Normal Bold
    Local: field: sp4: Width: 6
    Local: field: snf6: Width: 6
    local: field: snf6: inactive: $$issysname:$cwCompanyName

;------------------------------------------------------------------------------
; REMOVE UNWANTED FIELDS FROM SORT LINES
;------------------------------------------------------------------------------

[#line: lnItemsortno]
    delete: field: stksnf, stksnf2, stksnf3

[#line: lnItemsortno2]
    delete: field: stksnf4, stksnf5

;------------------------------------------------------------------------------
; COLLECTIONS FOR TABLE LOOKUPS
;------------------------------------------------------------------------------

[Collection: colcwCompanyName]
    title: "List of Company Name"
    type: Cost Centre
    child of: "Company"

[Collection: colcwType]
    title: "List of Type"
    type: Cost Centre
    child of: "Type"

[Collection: colGeneric]
    title: "List of Generic"
    type: StockCategory

[Collection: colcwPotency]
    title: "List of Potency"
    type: Cost Centre
    child of: "Potency"

[Collection: colcwPackSize]
    title: "List of Pack Size"
    type: Cost Centre
    child of: "Pack Size"

[Collection: colcwMrp]
    title: "List of MRP"
    type: Cost Centre
    child of: "MRP"

;------------------------------------------------------------------------------
; AUTO-GENERATE STOCK ITEM NAME
;------------------------------------------------------------------------------

[#form: stock item]
    add: option: newStockItemx: @@RoseHomeoEnabled

[!form: newStockItemx]
    local: field: mst name: set as: @@cwstockitemnamex
    local: field: mst name: set always: yes

[System: Formula]
    cwstockitemnamex: if @@cwstockitemnamexx = " " then $$value else @@cwstockitemnamexx
    cwstockitemnamexx: @@xs1 + " " + " " + @@xs3 + " " + @@xs4 + @@xs5x + " " + @@xs8
    xs1: if not $$issysname:#snf then #snf else ""
    xs2: if not $$issysname:#snf2 then #snf2 else ""
    xs3: if not $$issysname:#snf3 then #snf3 else ""
    xs4: if not $$issysname:#snf4 then #snf4 else ""
    xs5: if not $$issysname:#snf5 then #snf5 else ""
    xs5x: if not $$issysname:#snf5 then " - " + @@xs5 else ""
    xs6: if not $$issysname:#snf6 then #snf6 else ""
    xs7: "(" + @@xs6 + ")"
    xs8: if not $$issysname:#snf6 then "(" + @@xs6 + ")" else ""

;------------------------------------------------------------------------------
; AUTO-GENERATE DESCRIPTION FROM GENERIC AND POTENCY
;------------------------------------------------------------------------------

[#Line: STKI Desc]
    add: option: newDesc: @@RoseHomeoEnabled

[!line: newDesc]
    Local: Field: STKI Desc: Set As: @@cwdesc
    local: field: STKI Desc: set always: yes

[System: Formula]
    cwdesc: if @@cwdesc2 = " " then $$value else @@cwdesc2
    cwdesc2: @@xs3 + " " + @@xs4

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
