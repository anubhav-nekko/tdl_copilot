// Auto-generated from T.TXT
const tdl = `
;===============================================================================
; T.TXT
; Created By: Suman on 2014-10-16 10:31, ID:
; Purpose: Master include file for Barcode Labels solution in Tally. Integrates
;          all core, utility, and feature modules required for barcode, item,
;          batch, and reporting functionalities.
;===============================================================================

;; PRODUCT: Barcode Labels
;; PRODUCT-ID: d87debb4-dcc8-4805-ba3b-7f75d2f47a6f
;; AUTHOR: Circuit World 9903002059/9903039753 circuit.world@yahoo.co.in
;; serial: 715012857

;------------------------------------------------------------------------------
; Core and Utility Module Includes
;------------------------------------------------------------------------------

[include: c:\d7comps\tcommon\tallyserial.txt]           ;; Serial number and version utilities
[include: c:\d7comps\tcommon\servervouchers.txt]        ;; Voucher/master list export/import
[include: c:\d7comps\tcommon\commonfields2.txt]         ;; Common field templates
[include: c:\d7comps\tcommon\commonUDF.txt]             ;; UDF declarations
[include: c:\d7comps\tcommon\commonformulae.txt]        ;; Common system formulas
;;[Include: itemprefix.txt]                             ;; (Optional) Item prefix logic
[include: c:\d7comps\tcommon\refreshtdl.txt]            ;; TDL refresh utility
[include : c:\d7comps\tcommon\commoncollection.txt]     ;; Common collections
[include : c:\d7comps\tcommon\commonvars.txt]           ;; Common variables
[include : c:\d7comps\tcommon\commonbarcodereport.txt]  ;; Barcode reporting utilities
[include : C:\d7comps\tcommon\EnableCustomization.txt]  ;; Customization enablement
[include : c:\d7comps\tcommon\AutoPartNo.txt]           ;; Auto Bar Code Numbering in Part No.
;[include : c:\d7comps\tcommon\pricelistnamesfromtally.txt] ;; (Optional) Price list integration
[include : c:\d7comps\tcommon\AppLocation.txt]          ;; App location logic
;; {29.Jan.13 17:56} [include : C:\d7comps\tcommon\broker.txt] ;; (Optional) Broker module

;[include : StockSummaryInNumber.txt]                   ;; (Optional) Stock summary by number

[include : test.txt]                                   ;; Test utilities

; For KD Fabrics
;[include : kdFabrics.txt]                             ;; (Optional) KD Fabrics customization

; For Image n Style
;;[include : c:\d7comps\tcommon\rateincvat.txt]         ;; (Optional) Rate including VAT

;------------------------------------------------------------------------------
; System Formulas and Feature Flags
;------------------------------------------------------------------------------

[System: Formula]
cwItemVatRateShowCondition : @@issales
cwVatrateIncShowCondition : @@issales
cwExchangeEnabled : no

usecwPriceLevel : yes
cwPriceLevelName : $pricelevel

useCustomValue : no
;; getcustomRate : no

BarCodeInPurchase : yes
BarCodeInSales : yes
BarCodeInStkJrnl : yes
cwCustomizationStr : "Barcode Module"

;------------------------------------------------------------------------------
; Barcode and Item Feature Modules
;------------------------------------------------------------------------------

[include : BarCodeLabelsUdf.txt]                       ;; Barcode UDF declarations

[include : SupplierCodeInVouchers.txt]                 ;; Supplier code in vouchers
[include : newcollections.txt]                         ;; Attribute collections

;;[include: StockGroupSkipping.txt]                    ;; (Optional) Skip barcode for selected stock groups
[include : ItemOpening.txt]                            ;; Item opening balance report

;; {22.May.13 15:45} [include: newworks.txt]           ;; (Optional) New works/test utilities

[include: invokeBarCodeModule.txt]                     ;; Barcode module button in voucher

[include: BarCodeDetailsExtractReport.txt]             ;; Barcode extraction report

[include : shirt\stockitemmaster.txt]                  ;; Item master customization (Shirt vertical)

[include : MultiBatch.txt]                             ;; Multi-batch logic

;------------------------------------------------------------------------------
; Additional UDFs and Negative Stock Control
;------------------------------------------------------------------------------

[System: UDF]
;cwPurchasedFrom :string : 1001                        ;; (Example) UDF declaration

[include : metia.txt]                                  ;; Negative stock control

;------------------------------------------------------------------------------
; UI Logic: Hide barcode exe path field if customization not enabled
;------------------------------------------------------------------------------

[#line : cwBarCodeExePath]
Local: Field: nf: inactive: not #CMPcwEnableCustomization

;------------------------------------------------------------------------------
; Auto Item Quantity Logic
;------------------------------------------------------------------------------

[include:CwItemAutoQty.txt]                            ;; Auto item quantity logic


`;
export default tdl;
