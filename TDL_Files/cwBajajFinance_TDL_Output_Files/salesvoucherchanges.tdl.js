// Auto-generated from salesvoucherchanges.txt
const tdl = `
; Created By: suman on 2021-07-29 10:30, ID: 

;; {30.Jul.21 15:23} [#form : voucher]
;; {30.Jul.21 15:23} add : option: cwFinanceDetailsOpt: @@isSales and @@cwBajajFinanceEnabled

;-------------------------------------------
; Define a form option "cwFinanceDetailsOpt"
; This option is added only if the voucher is a sales voucher and
; Bajaj Finance feature is enabled.
;-------------------------------------------
[!form : cwFinanceDetailsOpt]
;; {30.Jul.21 15:23} add : bottom button : cwGetDODetails

;-------------------------------------------
; Add a button named "cwGetDODetails" at the bottom of the form
; This button is part of the cwFinanceDetailsOpt form.
;-------------------------------------------

[System: Formula]
;-------------------------------------------
; Define a formula to enable Bajaj Finance customization in voucher
; The customization is enabled only if it is a sales voucher, 
; Bajaj Finance is enabled, and certain partner ID conditions are met.
;-------------------------------------------
cwBFLCustomizationEnabledInVoucher : @@issales and @@cwBajajFinanceEnabled and (not $cwSepratepatnerid:COMPANY:##SVCURRENTCOMPANY or $cwbfcustenbopt:Vouchertype:##SVVoucherType)

;-------------------------------------------
; Part: EI BaseInfo
;-------------------------------------------
; Within the EI BaseInfo part, modify the EI consignee part to add an option
; that controls display of Bajaj Finance related fields
;-------------------------------------------
[#Part: EI BaseInfo]
 [#Part: EI consignee]
   add:option:cweibaseinfoopt:@@cwBFLCustomizationEnabledInVoucher ;;@@issales and @@cwBajajFinanceEnabled

;-------------------------------------------
; Define option cweibaseinfoopt that is enabled only when Bajaj Finance customization is enabled in voucher
;-------------------------------------------
[!part:cweibaseinfoopt]
;-------------------------------------------
; Add a new line "cwbajfinapplicable" at the end of the part
; (Added at end because adding at beginning clashed with LG2021)
;-------------------------------------------
 add:line:at end :cwbajfinapplicable 

;-------------------------------------------
; Define the line "cwbajfinapplicable" which contains fields related to Bajaj Finance applicability
; Fields include logical flags and details such as DO Number and other details
;-------------------------------------------
[line:cwbajfinapplicable]
 field:sp,cwlogical ;;,sp2,nf2,sp3,cwlogical2
 Local: Field: sp: Set As:"Bajaj Finance Applicable:"
 Local: Field: cwlogical: storage:cwbajfinapplcable
 Local: Field: sp2: Set As:"DO Number:"
 Local: Field: nf2: storage:cwdealid
 Local: field: sp2: Align: Right ;;centre
 Local: Field: sp3: Set As:"Details:"
 ; Local: Field: cwlogical2: storage:cwindetails
 Local: field: sp: Width:25
 Local: field: sp2: Width:20
 Local: Field: nf2: Style: Normal Bold

 ; Make DO Number, Details, and other fields inactive (hidden/disabled) if Bajaj Finance is not applicable
 local: field: sp2: Inactive:not $cwbajfinapplcable="yes"
 local: field: nf2: Inactive:not $cwbajfinapplcable="yes"
 local: field: sp3: Inactive:not $cwbajfinapplcable="yes"
 local: field: cwlogical2: Inactive:not $cwbajfinapplcable="yes"

 ; Subform field for entering finance details
 Local: Field : cwlogical2 : SubForm : cwFinanceDetails: $$value

;-------------------------------------------
; Add options to EI ColumnOne line
; This adds fields snf, cwlogical, snf2 at the beginning of the line if Bajaj Finance customization is enabled
; and Bajaj Finance is applicable
;-------------------------------------------
[#Line: EI ColumnOne]
 add:option:cweicoloneopt: @@cwBFLCustomizationEnabledInVoucher ;;and $cwbajfinapplcable="yes"

[!line:cweicoloneopt]
 add:right field: at beginning : snf,cwlogical ,snf2
 Local: Field: snf: info:"DO Number"
 Local: Field:cwlogical : info:"Details"
 Local: Field: snf2: info: "Serial"
 local: field: cwlogical: type: String
 Local: Field: cwlogical: Style: Normal
 local: field:VCH ItemTitle : Width:45
 local: field: snf: Inactive:not $cwbajfinapplcable="yes"
 local: field: snf2: Inactive:not $cwbajfinapplcable="yes"
 local: field: cwlogical: Inactive:not $cwbajfinapplcable="yes"

 Local: Field: snf: Style: Normal Bold
 Local: Field: snf2: Style: Normal Bold
 Local: Field: cwlogical: Style: Normal Bold

 Local: field: snf: Width: 12
 ;; {02.Aug.21 16:31}    Local: field: snf2: Width: 12

;-------------------------------------------
; Add options to EI ColumnTwo line similarly
; This also adds snf, cwlogical, snf2 fields if Bajaj Finance customization is enabled
;-------------------------------------------
[#Line: EI ColumnTwo]
 add:option:cweicoloneopt2:@@cwBFLCustomizationEnabledInVoucher ;;@@issales and @@cwBajajFinanceEnabled

[!line:cweicoloneopt2]
 add:right field: at beginning : snf,cwlogical ,snf2
 Local: Field: snf: info:""
 Local: Field:cwlogical : info:""
 ;; {27.Aug.21 11:22}    Local: field:VCH ItemTitle : Width:45
 local: field: snf: Inactive:not $cwbajfinapplcable="yes"
 local: field: cwlogical: Inactive:not $cwbajfinapplcable="yes"
 local: field: snf2: Inactive:not $cwbajfinapplcable="yes"

 Local: field: snf: Width: 12
 ;; {02.Aug.21 16:31}    Local: field: snf2: Width: 12

;-------------------------------------------
; Add options to EI InvInfo line (Invoice Info)
; Fields added when Bajaj Finance customization enabled
;-------------------------------------------
[#Line: EI InvInfo]
 add:option:cweionvinfopt: @@cwBFLCustomizationEnabledInVoucher ;;@@issales and @@cwBajajFinanceEnabled  ;;and $cwbajfinapplcable="no"

;-------------------------------------------
; Add options to CI InvInfo line (possibly another invoice info section)
;-------------------------------------------
[#Line: CI InvInfo]
 add:option:cweionvinfopt:@@cwBFLCustomizationEnabledInVoucher ;;@@issales and @@cwBajajFinanceEnabled

[!line:cweionvinfopt]
 add:right field: at beginning : snf,cwlogical ,snf2
 Local: Field: snf:storage:cwvchdealid
 ;; {30.Jul.21 16:03}    Local: Field:cwlogical :storage:cwvchindetl
 Local: field: VCH StockItem: Width:46
 Local: Field: snf: storage:cwdealid
 local: field: snf: Inactive:not $$owner:$cwbajfinapplcable="yes" or $$IsEnd:$StockItemName OR @@NoBaseUnits
 local: field: cwlogical: Inactive:not $$owner:$cwbajfinapplcable="yes" or $$IsEnd:$StockItemName OR @@NoBaseUnits
 local: field: snf2: Inactive:not $$owner:$cwbajfinapplcable="yes" or $$IsEnd:$StockItemName OR @@NoBaseUnits
 ;; {31.Jul.21 11:26}    Local: Field: snf: Skip: if $$line=1 then Yes else no
 ;; {31.Jul.21 11:26}    Local: Field: cwlogical: Skip: if $$line=1 then Yes else no
 Local: Field : cwlogical : SubForm : cwFinanceDetails: $$value
 Local: Field: snf: Style: Normal Bold
 Local: Field: snf2: Style: Normal Bold

 Local: Field: snf2: storage: cwSerialNo

 Local: Field: snf2: Skip forward: not $$isempty:$$value

 Local: field: snf: Width: 12
 ;; {02.Aug.21 16:31}    Local: field: snf2: Width: 12

;-------------------------------------------
; Add option to POS PartyNameInfo part
; Add Bajaj Finance option flag to this part as well
;-------------------------------------------
[#Part: POS PartyNameInfo]
 add:option:cweibaseinfoopt :@@cwBFLCustomizationEnabledInVoucher

`;
export default tdl;
