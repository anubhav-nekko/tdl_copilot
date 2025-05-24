// Auto-generated from posvoucherchanges.txt
const tdl = `
; Created By: suman on 2021-08-26 14:01, ID: 

;; {26.Aug.21 16:22} [#Form:pos invoice]
;; {26.Aug.21 16:22} add:option:cwposinvopt1:@@cwDSEnabled  and not $$indisplaymode
;; {26.Aug.21 16:22} add:option:cwposinvopt2:@@cwDSEnabled  and $$indisplaymode


[!form:cwposinvopt1]
   add:button:posUploadFin
   
 [!form:cwposinvopt2]
   add:button:posUploadFin2

[Button: posUploadFin]
title : "Upload Fin."
key : alt + 7
action : call :cwExportforSigning2


[key : posUploadFin2]
title : "Upload Fin."
key : alt + 8
action : call :cwExportforSigning2

[#Form: Voucher]
;; {28.Aug.21 18:22} add:option:cwposinvopt1:@@cwDSEnabled  and not $$indisplaymode
;; {28.Aug.21 18:22} add:option:cwposinvopt2:@@cwDSEnabled  and $$indisplaymode



`;
export default tdl;
