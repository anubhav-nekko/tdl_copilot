// Auto-generated from VCHUSER.TXT
const tdl = `
;===============================================================================
; VCHUSER.TXT
; Created By: Khokan on 2021-09-14 15:42, ID:
; Purpose: Adds user tracking, "Created by" and "Altered by" info, and log details
;          to vouchers, ledgers, and stock items in Tally. Includes UI integration,
;          storage, and a log details popup for audit trails.
;===============================================================================

;;------------------------------------------------------------------------------
;; VOUCHER & STOCK JOURNAL FORM EXTENSIONS: Add user info and log button
;;------------------------------------------------------------------------------

[#Form: GTRN StkJrnl]
    add:option:nrmlvoucheropt:@@MinuSareeEnabled

[#Form: NRML StkJrnl]
    add:option:nrmlvoucheropt:@@MinuSareeEnabled

[!form:nrmlvoucheropt]
    add:part:lnusernamepart
    add:button:cwLogDetailsBtn

[part:lnusernamepart]
    line:userCreatebyline,lnusername
    local: line: userCreatebyline:local:field:default: Invisible: yes
    local: line: lnusername:local:field:default: Invisible: yes

[#Form: voucher]
    add:option:voucheropt:@@MinuSareeEnabled

[!form:voucheropt]
    Local : Part : VCH Narration : Add : Line : Before : VCH NarrPrompt :userCreatebyline,lnusername
    add:button:cwLogDetailsBtn
    local: line: userCreatebyline:local:field:default: Invisible: yes
    local: line: lnusername:local:field:default: Invisible: yes

;;------------------------------------------------------------------------------
;; USERNAME LINES: Show/Store "Created by" and "Altered by" info
;;------------------------------------------------------------------------------

[Line: lnusername]
    field:sp,snf,fwf
    Local: Field: fwf: Skip: Yes
    Local: Field: fwf: Set As: if $$increatemode then $$value else $$fulllist:cwusername:$cwusername
    Local: Field: snf: Set As: if $$increatemode then $$value else ##svusername+" , "+$$CWuserdate+" , "+$$Machinetime
    Local: Field: snf: storage:cwusername:cwusername:last:no
    Local: Field: snf2: storage:cwlastusername:cwlastusername:last:no
    Local: Field: snf2: Set As: if $$increatemode then $$value else ##svusername+" , "+$$CWuserdate+" , "+$$Machinetime
    Local: Field: snf2: Color : red
    Local: Field: default: Color : blue
    Local: Field: snf: Set always:yes
    Local: Field: snf2: Set always:yes
    local: field: snf: Invisible: yes
    local: field: snf2: Invisible: yes
    Local: Field: sp: info: "Alter by :"
    Local : field : fwf: Lines : 0

[Line: ledusername]
    field:sp,snf,fwf,snf2,sdf
    Local: Field: fwf: Skip: Yes
    Local: Field: fwf: Set As: if $$increatemode then $$value else $$fulllist:cwusername:$cwusername
    Local: Field: snf: Set As: if $$increatemode then $$value else ##svusername+" , "+$$CWuserdate+" , "+$$Machinetime
    Local: Field: snf: storage:cwusername:cwusername:last:no
    Local: Field: snf2: storage:cwlastusername:cwlastusername:last:no
    Local: Field: snf2: Set As: if $$increatemode then $$value else ##svusername+" , "+$$CWuserdate+" , "+$$Machinetime
    Local: Field: snf2: Color : red
    Local: Field: sdf: storage:cwlastuserdate
    Local: Field: sdf: Set As: $$MachineDate
    Local: Field: default: Color : blue
    Local: Field: snf: Set always:yes
    Local: Field: sdf: Set always:yes
    Local: Field: snf2: Set always:yes
    local: field: snf: Invisible: yes
    local: field: snf2: Invisible: yes
    local: field: sdf: Invisible: yes
    Local: Field: sp: info: "User Name :"
    Local: field: sp: Width:12
    Local : field : fwf: Lines : 0

;;------------------------------------------------------------------------------
;; FUNCTION: Format user date as DD-YYYY-MM
;;------------------------------------------------------------------------------

[FUNCTION : CWuserdate]
    PARAMETER : MYDATE : date : $$MachineDate
    VARIABLE : D : NUMBER
    VARIABLE : Y : NUMBER
    VARIABLE : M : NUMBER
    VARIABLE : SEP : STRING : "-"
    10 : SET : D : $$DAYOFDATE:##MYDATE
    20 : SET : Y : $$yearOFDATE:##MYDATE
    30 : SET : M : $$monthOFDATE:##MYDATE
    40 : RETURN : $$ZEROFILL:##D:2 + ##SEP +  $$STRING:##Y + ##SEP +$$ZEROFILL:##M:2

[Collection: cwusername]
    type :cwusername:ledger
    child of:$name

;;------------------------------------------------------------------------------
;; LEDGER FORM EXTENSIONS: Add user info and log button to ledgers
;;------------------------------------------------------------------------------

[#Form: Ledger]
    add:option:Ledgeruseropt:@@MinuSareeEnabled

[!form:Ledgeruseropt]
    add:button:cwLogDetailsBtn

[#Part: MST LED Details]
    add:line:userCreatebyline,usenalineled
    local: line: userCreatebyline:local:field:default: Invisible: yes
    local: line: usenalineled:local:field:default: Invisible: yes

[line:usenalineled]
    field:sp,snf,fwf
    Local: Field: fwf: Skip: Yes
    Local: Field: fwf: Set As: if $$increatemode then $$value else $$fulllist:cwusername:$cwusername
    Local: Field: snf: Set As: if $$increatemode then $$value else ##svusername+" , "+$$CWuserdate+" , "+$$Machinetime
    Local: Field: snf: storage:cwusername:cwusername:last:no
    Local: Field: snf2: storage:cwlastusername:cwlastusername:last:no
    Local: Field: snf2: Set As: if $$increatemode then $$value else ##svusername+" , "+$$CWuserdate+" , "+$$Machinetime
    Local: Field: snf2: Color : red
    Local: Field: default: Color : blue
    Local: Field: snf: Set always:yes
    Local: Field: snf2: Set always:yes
    local: field: snf: Invisible: yes
    Local: Field: sp: info: "Alter by :"
    Local : field : fwf: Lines : 0

[#Part: STKI Basic Features]
    add:option:STKIBasicFeaturesopt:@@MinuSareeEnabled

[!part:STKIBasicFeaturesopt]
    add:part:usenalineledpart

[part:usenalineledpart]
    line:userCreatebyline,usenalineled
    local: line: userCreatebyline:local:field:default: Invisible: yes
    local: line: usenalineled:local:field:default: Invisible: yes
    local: line: usenalinelednew:local:field:default: Invisible: yes

[line:userCreatebyline]
    field:sp,nf,snfx,sdf,snfx2,snf2
    Local: Field: sp:setas:"Create by"
    Local: Field: snfx:info:"Dated :"
    Local: Field: snfx2:info:"On :"
    Local: Field: nf:set as: if $$increatemode then ##svusername else $$value
    Local: Field: sdf:set as: if $$increatemode then $$Machinedate else $$value
    Local: Field:snf2:set as: if $$increatemode then $$Machinetime else $$value
    Local: Field: nf: storage:cwCreatebyms
    Local: Field: sdf: storage:cwCreatedatems
    Local: Field: snf2: storage:cwCreattimems
    Local: Field: default: Skip: Yes
    Local: Field: default: Style: Normal Bold
    Local: Field: default: Color : blue
    Local: field: snfx: Width:10
    Border: thin bottom

;;------------------------------------------------------------------------------
;; STOCK ITEM FORM EXTENSION: Add log details button
;;------------------------------------------------------------------------------

[#Form: stockitem]
    add:option:Ledgeruseropt:@@MinuSareeEnabled

;;------------------------------------------------------------------------------
;; LOG DETAILS BUTTON & POPUP: Show user log info on Ctrl+U
;;------------------------------------------------------------------------------

[Button: cwLogDetailsBtn]
    Key   : Ctrl + U
    Title : $$LocaleString:"Log Details"
    Action: Modify Variables:logdebotton

[report:logdebotton]
    form:logdebotton

[form:logdebotton]
    part:logdebotton
    width:45  ;;% page

[part:logdebotton]
    line: userCreatebyline,usenalineled2x

[line:usenalineled2x]
    field:sp,fwf
    Local: Field:sp: Set As:"Alter by :"
    Local: Field:fwf: Set As:$$fulllist:cwusername:$cwusername
    Local : field : fwf: Lines : 0
    Local: Field: fwf: Skip: Yes
    Local: Field: default: Color : blue

[line:usenalineled2]
    field:snfx

;===============================================================================
; End of VCHUSER.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
