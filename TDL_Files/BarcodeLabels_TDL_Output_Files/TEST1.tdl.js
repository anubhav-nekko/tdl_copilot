// Auto-generated from TEST1.TXT
const tdl = `
;===============================================================================
; TEST1.TXT
; Created By: Akshay on 2016-11-14 12:32, ID:
; Purpose: Demonstrates inclusion of refresh utility, rate-including-VAT logic,
;          and sets up system formulas and variables for item pricing and
;          custom rate handling in Tally. Contains experimental/commented code
;          for batch rate field logic.
;===============================================================================

;------------------------------------------------------------------------------
; Include refresh TDL utility and (optionally) rate including VAT logic
;------------------------------------------------------------------------------

[include: E:\d7comps\tcommon\refreshtdl.txt]
;; {14.Nov.16 15:20} [include: E:\d7comps\tcommon\rateincvat.txt]

;------------------------------------------------------------------------------
; System formulas for item VAT rate and price level settings
;------------------------------------------------------------------------------

[System: Formula]
cwItemVatRateShowCondition : @@issales
cwVatrateIncShowCondition : @@issales
cwExchangeEnabled : no

usecwPriceLevel : no
cwPriceLevelName : $pricelevel

useCustomValue : yes
getcustomRate    : 400

;------------------------------------------------------------------------------
; (Commented) Experimental logic for batch rate calculation and field handling
;------------------------------------------------------------------------------

/*
[#Line: STKVCHBatch2]

add : option : cwrateincl

[!line : cwrateincl]
;; {14.Nov.16 12:23} add: right field:before: vchrateincl: ratef

;; {14.Nov.16 12:23} Local: Field: ratef: Set As : ;;$$InclusiveTaxValue:@@ExItemRate:@@STItemRate:@@VATItemRate:@@TCSItemRate:@@ExItemMRPDutyValue:@@VATItemMRPDutyValue:@@ExItemQuantum
;; {14.Nov.16 12:23} Local: Field: numf10: Border: thin box ;;left right

;; {14.Nov.16 13:49} Local: Field:vchrateincl :Set As:$$GetPriceFromLevel:$StockItemName:$PriceLevel:$Date:$BilledQty
;; {14.Nov.16 13:50}   Local: Field:VCHBATCH Rate :Set by Condition    : ($$IsValidPriceLevel:$PriceLevel) And (Not $$IsEmpty:$$Value) : $$Value
local : field: vchbatchrate : delete : set by condition
local : field: vchbatchrate : add: Set by Condition	: not $$isempty:$InclusiveTaxValue and (($$IsValidPriceLevel:$PriceLevel) AND ($Amount != 0) AND ($Amount != @@CalcedAmt)) :
If $$IsEmpty:$$Value Then $$asrate:10 Else If $$IsFieldEdited:VCHBatchValue Then  @@NrmlAmount / $BilledQty Else $$asrate:20

 add : right field : after : vchbatchrate : ratef2x

 local : field : ratef2x : storage : batchrate
 Local: Field: ratef2x: Set As: $$asamount:100
 Local: Field: ratef2x: Skip: Yes

;; {14.Nov.16 13:45}  border : thin box

 [#field : VCHBATCH Value]
 delete : on accept

 [field : ratef2x]
 use : ratefield
 set always : yes

[#field : vchbatchrate]
delete  : set by condition
delete : set as
border : thin box
set as : $$asrate:200 ;;* $InclusiveTaxValue / (100 + $InclusiveTaxValue)
set always : yes
;; {14.Nov.16 13:31} delete: option

;; {14.Nov.16 13:32} [#system:formula]
;; {14.Nov.16 13:32}     NrmlAmount          : if not $$IsValidPriceLevel:$PriceLevel then (100 * $Amount) / (100 - $Discount) else $rate * $billedqty

*/

;------------------------------------------------------------------------------
; (Partial) Field option for batch rate field, with commented logic for edit detection
;------------------------------------------------------------------------------

[#field: vch batch rate]
;; {14.Nov.16 15:34} IsBilledQtyEdited 	: (($$IsValidPriceLevel:$PriceLevel) and (@@InvoiceinCreate) and ($$IsFieldEdited:VCHBATCHBilledQty) and $$IsEmpty:@TableRate And ( (@@IsPrevPLRate)))

`;
export default tdl;
