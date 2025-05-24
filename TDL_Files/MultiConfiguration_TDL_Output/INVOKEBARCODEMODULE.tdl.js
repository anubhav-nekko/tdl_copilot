// Auto-generated from INVOKEBARCODEMODULE.TXT
const tdl = `
;===============================================================================
; INVOKEBARCODEMODULE.TXT
; Created By: pg on 2012-02-11 16:41
; Purpose: Adds a "BarCode" button to voucher forms in Tally, enabling barcode
;          module invocation for Purchase, Sales, and Stock Journal vouchers.
;===============================================================================

;------------------------------------------------------------------------------
; ADD "BARCODE" BUTTON TO VOUCHER ENTRY AND DISPLAY FORMS
;------------------------------------------------------------------------------

[#form : Voucher]
    add : option : BarCodebuttonOpt : @@cwCustomizationEnabled

[!form : BarCodebuttonOpt]
    add : button : BarCodeButton
    on : form accept : @@GenBarCodeOnSave : exec command : @@tallysmsclient  : @@paramstr

[#Form : VCHDisplay]
    add : option : BarCodebuttonOpt : @@cwCustomizationEnabled

[#Report: VCH Display]
    Object : Voucher : ##VoucherID

;------------------------------------------------------------------------------
; BARCODE BUTTON DEFINITION
;------------------------------------------------------------------------------

[key : BarCodeButton]
    title : "BarCode"
    key : Alt + B
    action : exec command : @@tallysmsclient  : @@paramstr
    ;inactive : not @@GetBarcodeBtnStatus

;------------------------------------------------------------------------------
; SUPPORT FUNCTIONS AND SYSTEM FORMULAS
;------------------------------------------------------------------------------

[function : cwx]
    parameter : str : string
    10 : log : ##str
    20 : return : ##str

[System: Formula]
    ;; paramstr is a string containing GUID, date, voucher type, separated by delimiter
    paramstr : @@cwxguid+@@dlr+@@xxdate+@@dlr+$vouchertypename
    ;; cwxguid picks the correct GUID (uses masterid if available, else current voucher id)
    cwxguid : if $masterid = 0 then $$string:@@CurrVchId else $$string:$masterid
    tallysmsclient : @@cwAppLocation
    xxdate : $$string:$date:"shortdate"
    ;; GetBarcodeBtnStatus can be used to conditionally enable the button
    GetBarcodeBtnStatus : if @@BarCodeInPurchase and $$ispurchase:##SVVouchertype then yes else if @@BarCodeInSales and $$issales:##svvouchertype then yes else if @@BarCodeInStkJrnl and $$isstockjrnl:##Svvouchertype then yes else no

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
