// Auto-generated from ITEMPREFIX.TXT
const tdl = `
;===============================================================================
; ITEMPREFIX.TXT
; Created By: pg on 2011-09-15 20:29
; Purpose: Auto-generates a prefix-based Part No for stock items in Tally,
;          using Godown, Stock Group, and Supplier Code logic, with dynamic
;          name generation and UI fields for MRP and supplier details.
;===============================================================================

;------------------------------------------------------------------------------
; EXTEND STOCK ITEM MASTER WITH PREFIX LOGIC AND UI FIELDS
;------------------------------------------------------------------------------

[#form : Stock Item]
    add : part : at beginning : cwItemDetails
    ; Optionally add MRP part after STKI Basic
    ; add : part : after : STKI Basic : cwMRP
    ;;local : Part: STKI TaxDetails : add : line : cwmrp
    ;;local : field : MST Name : set as : if $$increatemode  then $$getmyvalue else $$value
    local : field : STKI PartNo : set as : if $$increatemode and $$line = 1 and not $$isempty:#nf10 then $$getmyvalue else $$value
    local : field : STKI PartNo : set always : yes

;------------------------------------------------------------------------------
; PART FOR MRP FIELD (OPTIONAL)
;------------------------------------------------------------------------------

[part : cwMRP]
    line : cwmrp

[line : cwmrp]
    field : mp,numf
    Local: Field: mp: info:"MRP:"
    Local: Field: numf: storage:cwmrp
    Local: field: numf: Format: "Decimal:2,NoZero"
    Local: field: numf: Align: Left

;------------------------------------------------------------------------------
; MAIN ITEM DETAILS PART: GODOWN, GROUP, SUPPLIER, AUTO PART NO
;------------------------------------------------------------------------------

[part: cwItemDetails]
    line : cwItemDetails

[line : cwItemDetails]
    field : sp3,snf3,nf10,NF11

    Local: Field: sp: info: "Godown:"
    Local: Field: snf: storage: cwGodown
    Local: Field: snf: table: Stockable Godown VchExtract, Not Applicable
    Local: Field: snf: Keys        : Create Godown, Alter Godown
    Local: Field: snf: Variable    : SV Godown

    Local: Field: sp2: info:"Parent:"
    Local: Field: snf2 : storage: Parent
    Local: Field: snf2: table: Stock Group Extract, Primary
    Local: Field: snf2: Show Table  : Always
    Local: Field: snf2: Key         : Create Stock Group, Alter StkGrp
    Local: Field: snf2: Variable    : SV Stock Group
    Local: Field: snf2: Set as      : ##DEFStockGroupName
    Local: Field: snf2: Modifies    : DEFStockGroupName
    Local: Field: snf2: Common Table: No		

    Local: Field: sp3: info: "Supplier Code:"
    Local: Field: snf3: table: cwCrledger, Not Applicable
    Local: Field: snf3: Keys        : Create Ledger, Alter Ledger
    Local: Field: snf3: Variable    : SV Ledger
    Local: Field: snf3: show table : always
    Local: Field: SNF3: storage: cwPurchasedFrom

    Local: Field: nf10: Set As: if $$increateMode then @@cwItemX else $$value
    Local: Field: NF11: Set As: IF $$issysname:$cwPurchasedFrom then "" else $$getmyvalue
    LOCAL : FIELD : NF10 : SKIP : YES
    LOCAL : FIELD : NF10 : WIDTH : @@SHORTWIDTH
    LOCAL : FIELD : NF11 : SKIP : YES
    LOCAL : FIELD : NF11 : WIDTH : @@SHORTWIDTH
    local: field: NF10: Invisible: yes
    ;;local: field: NF11: Invisible: yes

    local : field : default : skip : not $$increatemode

;------------------------------------------------------------------------------
; AUTO-GENERATE PART NO/PREFIX LOGIC (FORMULAS & FUNCTION)
;------------------------------------------------------------------------------

[System: Formula]
    cwItemX : @@HASSAME
    cwGodownPrefix : if $$issysname:#snf then "" else $mycode:godown:#snf +"/"
    cwParentPrefix : if $$issysname:#snf2 then "" else $mycode:STOCKGROUP:#snf2 +"/"
    cwCrPrefix : if $$issysname:#snf3 then "" else $$ReptField:Name:2:ledger:#snf3
    cwCrPrefix1 : IF $$issysname:#snf3 then "" else @@cwCrPrefix +$$STRING:@@CWiTEMcNTR
    CWiTEMcNTR : $$NUMBER:@@CWITMCNTRX +1
    CWITMCNTRX : $$FILTERVALUE:$NAME:STOCKITEM:LAST:HASSAMEX
    hASSAME :  @@cwCrPrefix
    HASSAMEX : $NAME STARTING WITH #NF10

[COLLECTION: CWITEMX]
    USE : STOCKITEM
    ;;FILTER : HASSAMEX
    SORT : @@DEFAULT : -1 * $$NUMBER:$mailingname

[Function: getmyvalue]
    return : string
    variable : mystr : string
    variable : myid : number
    variable : myyr : string
    01 : set : myYr : $$yearofdate:$$machinedate - 2000
    06 : set : mystr :  @@cwcrprefix
    07 : set : myid : 1
    20 : set : myid : $$filtercount:CWITEMX:myfilterx  +1
    30 : return : ##mystr + $$zerofill:##myid:5

[System: Formula]
    myfilterx :$mailingname starting with ##mystr

`;
export default tdl;
