// Auto-generated from ServerVouchers.txt
const tdl = `
;; PRODUCT: <Enter the product name>
;; PRODUCT-ID: ac089e4d-e5a8-4632-b473-c9262b026035
;; AUTHOR: TallyDeveloper

;; report: server vouchers, will give vouchers of specified voucher type
;; report: pgMasterList : will give master name list for a type
;; report: mytrialbalance will give trial balance.
;; changes in statutory to give statistics
;; report : PgMasterData1 : Gives XML for an Object parameter : accounttype and name

;;[include : masterlist.txt]
;;[include : PriceListNamesFromTally.txt] ;; call apl
;;[include : TallyMaster2.txt]
;;[include : commonlink.txt]
;;[include : TallyAlterId.txt]
;;[include : VchTypePrefix.txt]
;;[include : LastVchno.txt]
;;[include: VoucherTypeClass.txt]

;------------------------------------------------------------------------------
; MAIN REPORTS FOR VOUCHER AND MASTER EXPORT/IMPORT
;------------------------------------------------------------------------------

[REPORT : ServerVouchers] ;; for transfer of data from 1 co. to another.
    Use : Voucher Register
    set : familyvoucherflag : No

;;[#menu : gateway of tally]
;;add : item : at end: sv : display : specificvoucher

[REPORT : SpecificVoucher] ;; for transfer of data from 1 co. to another.
    Use : Voucher Register
    variable : str1
    set : familyvoucherflag : No
;;    set : vouchertypename : "receipt note"
;;    set : str1 : "1"
    Local  : Line  : DSP VchDetail : Empty : $vouchernumber <> ##str1

;------------------------------------------------------------------------------
; STATISTICS LINE EXTENSION FOR EXPORT
;------------------------------------------------------------------------------

[#Line: StatDetail]
    add : Field : after : STATName : dlr
    local : field : dlr : invisible: NOT ##SVExport
    local : field : statname : width : 100
    add : right field : dlr1,cwIsVoucher
    local : field : dlr1 : invisible : Not ##svexport
    local : field :  cwIsVoucher : invisible : Not ##svexport

[field : cwIsVoucher]
    use: shortname field
    width : 5
    set as : if $$IsVoucherType then True else False

;------------------------------------------------------------------------------
; MASTER DATA EXPORT REPORTS (XML/OBJECT)
;------------------------------------------------------------------------------

[Report : PgMasterData1]
    use : PgMasterList2
    LOCAL : LINE : EXPORT Master Full Object : ADD : eMPTY : $NAME <> ##MyFilterPassing

[Report : PgMasterValues]
    use : PgMasterList2
    local : line  : pgMasterList2 : add : field : dlr9,pgParent2,dlr10,pgUOM,dlr11,pgOpQty,dlr12,pgTrInQty,dlr13,pgTrOutQty,dlr14,pgClQty
    local : field : dlr9  : invisible  : Not ##ShowParent
    local : field : dlr10 : invisible :  (Not @@isStk)
    local : field : dlr11 : invisible : (Not @@isStk)
    local : field : dlr12 : invisible : (Not @@isStk)
    local : field : dlr13 : invisible : (Not @@isStk)
    local : field : dlr14 : invisible : (Not @@isStk)
    set : ShowParent : yes
    set : OnlyName : no
    set : CWShowAll : no
    set : dspshownett : yes

[field : pgOpQty]
    use : qtyprimary field
    format : "NoSymbol"
    set as : $OpeningBalance
    invisible : (Not @@isStk)

[Field : pgTrInQty]
    use : pgopQty
    set as : $StkInQty

[Field : pgTrOutQty]
    use : pgopQty
    set as : $StkOutQty

[Field : pgClQty]
    use : pgopQty
    set as : $ClosingBalance

;------------------------------------------------------------------------------
; VARIABLES FOR FILTERING AND DISPLAY OPTIONS
;------------------------------------------------------------------------------

[variable : CwShowAll]
    type : Logical
    Default : False

[variable : MyFilterPassing]
    type : String
    Default : ""

[variable : MyFilterPassing2]
    type : String
    Default : ""

[variable : ShowParent]
    type : Logical
    Default : False

[variable : OnlyName]
    type : Logical
    Default : True

[system : Variable]
    MyFilterPassing : ""
    MyFilterPassing2 : ""
    OnlyName : True
    ShowParent: False

;------------------------------------------------------------------------------
; SYSTEM FORMULAS FOR FILTERING AND DISPLAY
;------------------------------------------------------------------------------

[SYSTEM  : FORMULA]
    myitemstart : ($NAME STARTING WITH ##myfilterpassing)
    myRepfilter : if ##myfilterpassing = "" then @@MYREPFILTER2 else if $$StringLength:##myfilterpassing = 1 then (@@myitemstart AND @@MYREPFILTER2) else ($name = ##myfilterpassing AND @@MYREPFILTER2)
    MYREPFILTER2 : IF ##MYFILTERPASSING2 = "" THEN YES ELSE  $$isbelongsto:##MYFILTERPASSING2
    isNettVisible : ##OnlyName or Not ##dspShowNett
    IsDRCRVisible : ##OnlyName or Not ##CwShowAll

;------------------------------------------------------------------------------
; OBJECT SEARCH AND VOUCHER LOOKUP REPORTS
;------------------------------------------------------------------------------

[REPORT : SEARCHBYID]
    Use : Voucher Register
    set : familyvoucherflag : No
    VARIABLE : itmcnt
    Local : Collection : Specific Vouchers of Company : Filter : ISOFALTERID

[SYSTEM : FORMULA]
    ISOFALTERID : $ALTERID = $$NUMBER:##ITMCNT
    ISOFVoucherNumber : $VoucherNumber = ##MyFilterPassing

[REPORT : GetVch]
    Use : Voucher Register
    set : familyvoucherflag : No
    variable : MyFilterPassing
    Local : Collection : Specific Vouchers of Company : Filter : ISOFVoucherNumber

;------------------------------------------------------------------------------
; (COMMENTED) ADDITIONAL REPORTS AND MENU INTEGRATION
;------------------------------------------------------------------------------

;;[#menu : gateway of tally]
;;add : item : at end : CWVChBasicLedger : display : CWVChBasicLedger
;;add : item : at end : CWVChBasicgROUP : display : CWVChBasicGROUP

;; [report : CWVChBasicLedger] ... (commented out, see file for details)

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
