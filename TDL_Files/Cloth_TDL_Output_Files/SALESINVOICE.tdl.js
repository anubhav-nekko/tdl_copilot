// Auto-generated from SALESINVOICE.TXT
const tdl = `
;===============================================================================
; SALESINVOICE.TXT
; Created By: Khokan on 2021-04-12 12:43, ID:
; Purpose: Customizes the Tally sales invoice print and entry experience,
;          providing selectable print formats (Normal Invoice, Packing Slip, F/Note),
;          enhanced transport and delivery fields, and company-specific logic for
;          the Minu Saree module. Enables professional, flexible invoice presentation.
;===============================================================================

;;------------------------------------------------------------------------------
;; FORM BUTTONS: Add print format selection buttons to the Sales Invoice print screen
;;------------------------------------------------------------------------------

[#Form: SV Print Config]

[#Form: VCHPRN Sales]
    ;; Add print format selection buttons for sales and credit note vouchers
    ;; Option for sales invoice
    ;; {29.Apr.22 18:04}
    add : option : myButtons: @@MinuSareeEnabled and @@issales
    ;; Option for credit note
    ;; {17.Aug.21 19:25}
    add : option : myButtons2: @@MinuSareeEnabled and @@IsCreditNote

[!form : mybuttons2]
    ;; Add bottom button for Normal Invoice (credit note context)
    add : bottom button : at beginning : cwNormalInvoice

[!form : mybuttons]
    ;; Add bottom buttons for all print types (sales context)
    add : bottom button : at beginning : cwNormalInvoice,cwSc,cwDC

;;------------------------------------------------------------------------------
;; BUTTON DEFINITIONS: Print format selection
;;------------------------------------------------------------------------------

[button : cwNormalInvoice]
    title : @@CWNORMALz
    ;; Set print type to Normal Invoice
    ACTION : SET : SASimple : YES
    action : set : Prntype : @@CWNORMALz
    key : alt + 1

[button : cwSC]
    title : @@cwBL1
    key : alt + 2
    action : set  : Prntype : @@cwBL1

[button : cwDC]
    title : @@cwBL2
    key : alt + 3
    action : set : prntype : @@cwBL2

;;------------------------------------------------------------------------------
;; VARIABLE: Persistent variable to store selected print format
;;------------------------------------------------------------------------------

[VARIABLE : PRNTYPE]
    TYPE : STRING
    PERSISTENT : YES
    DEFAULT : "Normal Invoice"

[system : variables]
    PRNTYPE : "Normal Invoice"

;;------------------------------------------------------------------------------
;; FORMULA: Print format title and logic
;;------------------------------------------------------------------------------

[SYSTEM : FORMULA]
    CWNORMALz : "Normal Invoice"
    CWBL1 : "Packing Slip"
    cwbl2 :"F/N"

[System: Formula]
    ;; Boolean formulas to determine which format is selected
    cwNormalInvoicenew:##PRNTYPE = @@CWNORMALz
    cwcustomization:##PRNTYPE = @@CWBL1  ;;Packing Slip
    cwtransport:##PRNTYPE = @@cwbl2      ;;F/N

;;======================================================
;; MODE/TERMS OF PAYMENT TOGGLE
;;======================================================

[#Collection: Sales VoucherDetails]
    ;; Add logical object for toggling Mode/Terms of Payment
    add:object:SAModeTermsnew

[Object: SAModeTermsnew]
    Use      : Vch Output Configuration
    Name     :@@SAModeTermsnew
    Value    : ##SAModeTermsnew
    Action   : ConfigAction :  Set: SAModeTermsnew : NOT ##SAModeTermsnew

[variable:SAModeTermsnew]
    Persistent  : Yes
    Type        : Logical

[System: Variables]
    SAModeTermsnew:no

[System: Formula]
    SAModeTermsnew:"Show Mode/Terms of Payment"

;;======================================================
;; CONDITIONAL DISPLAY: Hide Mode/Terms of Payment if toggle is off
;;======================================================

[#Part: EXPINV DueDate]
    add:option:cwEXPINVDueDateopt:@@issales and NOT ##SAModeTermsnew

[!part:cwEXPINVDueDateopt]
    ;; Hide the Mode/Terms of Payment subtitle
    Local: Field : EXPINV SubTitle : Info : $$LocaleString:""

[#Line: EXPINV DueDate]
    add:option:cwEXPINVDueDatelineopt:@@issales and NOT ##SAModeTermsnew

[!line:cwEXPINVDueDatelineopt]
    ;; Hide the due date field
    Local: Field : Name Field : Set as :""

;;======================================================
;; "DELIEVERED FROM" SECTION: Custom field for delivery location
;;======================================================

[#Part: EXPINV TopRight]
    add:option:cwTopRightToprightopt:@@issales and @@MinuSareeEnabled

[!part:cwTopRightToprightopt]
    ADD:PART:cwdelieveredfromPART

[PART:cwdelieveredfromPART]
    Line:cwdelieveredfromline1,cwdelieveredfromline2

[Line:cwdelieveredfromline1]
    Field : NF
    Local: Field : NF: Set as : if $$isempty:$cwDelieveredFrom then "" else "Delievered From"
    Local: Field: nf: Style: small

[Line:cwdelieveredfromline2]
    Field : NF
    Local: Field: nf: SET AS:$cwDelieveredFrom
    Local: field: NF: Width:40
    Local: Field: nf: Style: small Bold
    Local: field :nf: Lines : 0

;;======================================================
;; DESTINATION / BOOK TO: Custom destination field
;;======================================================

[#Part: EXPINV Destination]
    add:option:cwexpDestinationopt:@@issales and @@MinuSareeEnabled

[!part:cwexpDestinationopt]
    Local: Field : EXPINV SubTitle : Info : $$LocaleString:"Destination / Book To"

[#Line: EXPINV Destination]
    ;; Optionally set Book To as buyer's city or custom field (uncomment if needed)
    ;; Local: Field : Name Field : Set as : if $$isempty:$cwmsBuyerCity then $cwledcity:ledger:$BASICBUYERNAME else $cwmsBuyerCity

;;======================================================
;; "NO. OF BALES" SECTION: Custom field for number of bales
;;======================================================

[#Part: EXPINV BasicLeft]
    add:option:cwexpBasicLeftopt:@@issales and @@MinuSareeEnabled

[!part:cwexpBasicLeftopt]
    add:part:cwnofobales

[part:cwnofobales]
    Lines       : EXPINV SubTitle
    BottomLines : EXPINVnoofbale
    Local: Field : EXPINV SubTitle : Info : $$LocaleString:"No. of Bales"
    Local: Field : EXPINV SubTitle : Width : 25% Page
    Local: Field : EXPINV SubTitle : Cells : ($$Quotient:@@ExcelCellColumn:4)
    Height      : 9 mms
    Border      : Full Thin Bottom

[line:EXPINVnoofbale]
    field:name field
    Local: Field: name field: Set As:$cwnofobales
    Local: Field : Name Field : Width  : 25% Page
    Local: Field: default: Style: Normal Bold

;;======================================================
;; "TRANSPORTER NAME" SECTION: Custom field for transporter
;;======================================================

[#Part: EXPINV Basicright]
    add:option:cwexpBasicrightopt:@@issales and @@MinuSareeEnabled

[!part:cwexpBasicrightopt]
    add:part:trspart

[part:trspart]
    Lines       : EXPINV SubTitle
    BottomLines : EXPINVtrspart
    Local: Field : EXPINV SubTitle : Info : $$LocaleString:"Transporter Name"
    Local: Field : EXPINV SubTitle : Width : 25% Page
    Local: Field : EXPINV SubTitle : Cells : ($$Quotient:@@ExcelCellColumn:4)
    Height      : 9 mms
    Border      : Full Thin Bottom

[line:EXPINVtrspart]
    field:name field
    Local: Field: name field: Set As:$cwtempGSTewayTransporterName
    Local: Field : Name Field : Width  : 25% Page
    Local: Field: default: Style: Normal Bold

;;======================================================
;; ITEM DESCRIPTION: Custom field for item description
;;======================================================

[#Field: EXPINV Desc]
    add:option:cwexpdescopt:(@@issales or @@isCreditNote )and @@MinuSareeEnabled

[!field:cwexpdescopt]
    FullWidth   : Yes
    Width       : 0
    Lines       : 0
    Set as      :if $$isempty:$cwminuitem then $stockitemname else $cwminuitem

;;======================================================
;; TAX RATE FIELD: Conditional display of tax rate
;;======================================================

[#Field: EXPINV AccRate]
    add:option:cwexpaccrateopt:@@issales and @@MinuSareeEnabled

[!field:cwexpaccrateopt]
    Use         : Rate Price Field
    Type        : Number
    Align       : Right
    Format      : "NoZero,Decimals:-1"
    Style       : Normal Italic
    Set as      :if $cwdiscpernew:ledger:$ledgername="yes" then "" else (If @@IsTaxHeadSecEdCess then $$AsAmount:$$GETSTXRates:"SecondaryCessRate":"SerLedger" else IF @@IsTaxHeadEdCess then $$AsAmount:$$GETSTXRates:"CessRate":"SerLedger" else  If @@IsTaxHeadServiceTax then $$AsAmount:$$GETSTXRates:"ServiceTaxRate":"SerLedger" else +
                  If @@IsSBCTaxTypeLedger then @@STSBCRateInPrint else If @@IsKKCTaxTypeLedger then @@STKKCRateInPrint else if ##SATCSDetails AND @@TaxLedgerHasTCS AND NOT $$IsSysName:$TDSRateName:Ledger:$LedgerName then @@TCSITTaxRate else +
                  $BasicRateOfInvoiceTax)

[#Field: EXPINV AccRatePer]
    add:option:cwexpaccratepercopt:@@issales and @@MinuSareeEnabled

[!field:cwexpaccratepercopt]
    Use         : Rate Units Field
    Type        : String
    Align       : Left
    Style       : Normal Italic
    Border      : Thin Left
    Set as      :if $cwdiscpernew:ledger:$ledgername="yes" then "" else ( If ((@@IsTaxHeadSecEdCess OR @@IsTaxHeadEdCess OR @@IsTaxHeadServiceTax OR @@IsSBCTaxTypeLedger OR @@IsKKCTaxTypeLedger) AND ##vcatfound) then "%" else if $$IsEmpty:$BasicRateOfInvoiceTax then "" +
                  else If @@IsGSTCessOnQtyLed Then "Unit" Else "%")

;===============================================================================
; End of SALESINVOICE.TXT
;===============================================================================

`;
export default tdl;
