// Auto-generated from crDaysdemo.txt
const tdl = `
;; ===================================================================
;; PRODUCT INFORMATION
;; ===================================================================
;; PRODUCT: Credit Days Lock
;; PRODUCT-ID: cdf460a1-f397-4526-ad54-8b5eb627f25e
;; AUTHOR: Circuit World
;; 722315430
;; PRODUCT: Cr Days Lock

;; ===================================================================
;; INVOCATION OF DEITIES
;; ===================================================================
;; Sri Ganeshji Maharaj : Sri Pitreshwarji Maharaj :
;; Sri Balaji Maharaj : Sri Durgaji : Sri Venkateshwara

;; ===================================================================
;; CONFIGURATION FLAGS
;; ===================================================================
;; credit days lock
;;lockcw : no ;; lock on account and advance allocations in receipts and payments
;;        crDDRmo : $date < $$date:"15/04/2011"
;;lockcwNewRef : yes

;; ===================================================================
;; MENU CONFIGURATION
;; ===================================================================
[#menu : gateway of tally]
;;add : item : credit days lock

;; ===================================================================
;; VARIABLE DEFINITIONS
;; ===================================================================
[#Variable : ICFGDefaultBill]
  Persistent  : yes

[#system : Variable]
 ICFGDefaultBill : No

;; ===================================================================
;; FIELD DEFINITIONS AND CUSTOMIZATIONS
;; ===================================================================
[#field : VCH NrmlRate]
add : option : mysalesx : @@issales

[#field : VCH POS Rate]
add : option : mysalesx : @@issales

[#FIELD : VCH NrmlValue]
add : option : mysalesx : @@issales

;; Custom field definition with skip condition
[!field : mysalesx]
skip : yes ;;not $$isempty:$$value

;; ===================================================================
;; SYSTEM FORMULAS AND PROMPTS
;; ===================================================================
[System : Formula]
VcOsFailPrompt  : "Credit Period Exceeded"      ;; Prompt for credit period exceeded
VcOnAccPrompt   : "On Account not allowed"      ;; Prompt for on account not allowed
VcAdvancePrompt : "Advance not allowed"         ;; Prompt for advance not allowed
VcNewREfPrompt : "New Ref Not Allowed"          ;; Prompt for new reference not allowed (lockcwNewRef)

;; ===================================================================
;; CREDIT PERIOD VALIDATION FORMULAS
;; ===================================================================
;; Condition to display : Credit Period Exceeded
Vcosfail: if @@crDDRmo then @@Vcosfail2 else 0  ;; Main condition check for credit days
Vcosfail2 : if $$Number:$BillCreditPeriod:Ledger:$PartyLedgerName = 0  then 0 else  if $$IsDr:@@EIConBal then ($Date -  $$FilterValue:$BillDate:PendingBills:First:HasDr > $$Number:$BillCreditPeriod:Ledger:$PartyLedgerName) else 0
;; {19.Feb.18 18:51} Vcosfail2 : if $$Number:$BillCreditPeriod:Ledger:$PartyLedgerName = 0  then 0 else  if $$IsDr:@@EIConBal then ($Date -  $$FilterValue:$BillDate:PendingBills:First:HasDr > $$Number:$BillCreditPeriod:Ledger:$PartyLedgerName) else 0
HasDr :  $$IsDr:$BaseClosing  ;; Check if the balance is debit
;;$$CollectionField:$BillDate:1:PendingBills

;; ===================================================================
;; FORM CUSTOMIZATIONS - SALES COLOR
;; ===================================================================
[#Form : Sales Color]
control : VcOsFailPrompt : @@VcOsfail  ;; Control to display credit period exceeded prompt

;; ===================================================================
;; COLLECTION CUSTOMIZATIONS - PENDING BILLS
;; ===================================================================
[#Collection : PendingBills]
           Add : Format : $BillCreditPeriod:UniversalDate  ;; Add credit period to pending bills collection

;; ===================================================================
;; CONSIGNEE PART CUSTOMIZATIONS
;; ===================================================================
;; {22.Sep.21 12:10}      [#Line:EI Consignee]
     [#Part:EI Consignee]
        add: option : VCOSCons : @@IsSales  ;; Add option for sales consignee
        
[!part : VCOsCons]
add:line:after:EI Consignee:cwCrDaysStatusLn  ;; Add credit days status line after consignee

[line:cwCrDaysStatusLn]
add : field:vcinfoos,vcPromptTitle  ;; Add info and prompt fields to the line

[!line:VCOsCons]
add : field:after:inv mailname :vcinfoos,vcPromptTitle  ;; Add fields after mail name

;; ===================================================================
;; FIELD DEFINITIONS FOR CREDIT DAYS STATUS
;; ===================================================================
[field:vcinfoos]
info :"Credit Days Status:"  ;; Label for credit days status
 Width:20
;;set as : $$FilterValue:$BillDate:PendingBills:First:HasDr

[field : vcPromptTitle]
    set as : if @@Vcosfail then @@VcosFailPrompt else "Within Credit Days"  ;; Dynamic status display
set always : yes  ;; Always set this field
     width :28 ;; 20
     skip  : yes  ;; Skip this field during data entry
Border : Thin Box  ;; Display with thin box border
type:string:forced  ;; Force as string type

;; ===================================================================
;; BILL TYPE VALIDATIONS
;; ===================================================================
;; to disable On Account and Advance Type of Adjustments from all vouchers
[#Field:VchBilltype]
control : VCOnAccPrompt   : $BillType = $$SysName:OnAccount and @@lockcw  ;; Control for on account
control : VcAdvancePrompt : $BillType = $$SysName:Advance  and @@lockcw   ;; Control for advance
control : VcNewREfPrompt  : $BillType = $$SysName:NewRef  and @@lockcwNewRef  ;; Control for new reference

;; ===================================================================
;; MULTI LEDGER LIMIT REPORT CUSTOMIZATIONS
;; ===================================================================
[#Report : Multi Ledger Limit]
variable:varamtfcr       ;; Variable for credit limit amount
variable:varcdaysf       ;; Variable for credit days
variable:varsetledbill   ;; Variable for bill-by-bill setting
set :varamtfcr:0         ;; Initialize credit limit to 0
set :varcdaysf:""        ;; Initialize credit days to empty
set :varsetledbill:"no"  ;; Initialize bill-by-bill to "no"

;; ===================================================================
;; MULTI LEDGER LIMIT FORM CUSTOMIZATIONS
;; ===================================================================
[#Form: Multi Ledger Limit]
add:Buttons:cwsetcrlimit    ;; Add button for setting credit limit
add:Buttons:cwsetcrdays     ;; Add button for setting credit days
add:Buttons:cwsetbillbybill ;; Add button for setting bill-by-bill

;; ===================================================================
;; MULTI LEDGER LIMIT TITLE LINE CUSTOMIZATIONS
;; ===================================================================
[#Line: MLEDLIM Titles]
add:Right Fields    : before:MLEDLimitTitle:snf  ;; Add field before limit title

Local: Field: snf: info:"Bill-by-Bill"  ;; Set field info to "Bill-by-Bill"
Local: field: snf: Width:7              ;; Set field width
Local: Field: snf: Border: thin left    ;; Set left border

;; ===================================================================
;; MULTI LEDGER LIMIT BODY LINE CUSTOMIZATIONS
;; ===================================================================
[#Line: MLEDLIM Body]
add: Right Fields : before:LED Limit :cwlogical  ;; Add logical field before limit
Local: Field: LED Limit: Set As:##varamtfcr      ;; Set limit field from variable
;; {22.Feb.18 11:43} Local: Field:  LED Credit: Local: Field: LEDCreditper: Set As:if $$isfieldedited then $$value else if $$isempty:##varcdaysf or ##varcdaysf=0 then $$value else $$string:##varcdaysf +" days"
Local: Field: LED Limit: Set always:yes          ;; Always set limit field
;; {22.Feb.18 11:41} Local: Field: LEDCreditStr: Set always:yes
Local: Field: cwlogical: storage:IsBillWiseOn    ;; Set storage for logical field
Local: Field: cwlogical: Set As:##varsetledbill  ;; Set logical field from variable

;; {22.Feb.18 11:35} Local: Field: LED Credit: Border: thin box ;;left right
;; {22.Feb.18 11:33} Local: Field: LED Limit: Border: thin box ;;left right

;; ===================================================================
;; BUTTON DEFINITIONS FOR CREDIT LIMIT
;; ===================================================================
[Button: cwsetcrlimit]
    Key         :ctrl+ F6                    ;; Keyboard shortcut
    action : modify variable : butsetcrllimit ;; Action to modify variable
    Title       : $$LocaleString:"Set Cr.Limit" ;; Button title

;; ===================================================================
;; BUTTON DEFINITIONS FOR CREDIT DAYS
;; ===================================================================
[Button: cwsetcrdays]
    Key         :ctrl+  F7                  ;; Keyboard shortcut
    action : modify variable : butsetcrldays ;; Action to modify variable
    Title       : $$LocaleString:"Set Cr.Days" ;; Button title
    
;; ===================================================================
;; BUTTON DEFINITIONS FOR BILL-BY-BILL
;; ===================================================================
[Button: cwsetbillbybill]
    Key         :ctrl+  F5                     ;; Keyboard shortcut
    action : modify variable : butsetbillbybill ;; Action to modify variable
    Title       : $$LocaleString:"Set Bill-by-Bill" ;; Button title

;; ===================================================================
;; REPORT DEFINITION FOR CREDIT LIMIT SETTING
;; ===================================================================
[report:butsetcrllimit]
 title  : "Set Cr.Limit"       ;; Report title
               form   : butsetcrllimit ;; Form to use
               [form  : butsetcrllimit] ;; Form definition
               part   : butsetcrllimit  ;; Part to use
               Background  : @@SV_CMPCONFIG ;; Background configuration

               [part  : butsetcrllimit] ;; Part definition
               line:lncrtitleset,lncrvalueset ;; Lines to include

                       [line:lncrvalueset] ;; Value line definition
                       space top:0.5       ;; Space at top
                     Fields : amtf         ;; Fields to include
                     Local: Field: amtf: Modifies  : varamtfcr ;; Field modifies variable
                     Local: field: amtf: Width:@@shortnamewidth ;; Field width

                 [line:lncrtitleset] ;; Title line definition
                 option:opttotals    ;; Option for totals
                  field:snf          ;; Field to include
                  Local: Field: snf: info:"Credit Limit" ;; Field info
                  Local: Field: snf: Color :blue         ;; Field color
                  Local: Field: snf: Border: thin bottom ;; Field border
                  
;; ===================================================================
;; REPORT DEFINITION FOR CREDIT DAYS SETTING
;; ===================================================================
[report:butsetcrldays]
              title  : "Set Cr.Days"      ;; Report title
               form   : butsetcrldays     ;; Form to use
               [form  : butsetcrldays]    ;; Form definition
               part   : butsetcrldays     ;; Part to use
               Background  : @@SV_CMPCONFIG ;; Background configuration

               [part  : butsetcrldays]    ;; Part definition
               line:lncrtitleset2,lncrvalueset2 ;; Lines to include

                       [line:lncrvalueset2] ;; Value line definition
                       space top:0.5        ;; Space at top
                     Fields : snf           ;; Fields to include
                     Local: Field: snf: Modifies  : varcdaysf ;; Field modifies variable

                 [line:lncrtitleset2] ;; Title line definition
                 option:opttotals     ;; Option for totals
                  field:snf           ;; Field to include
                  Local: Field: snf: info:"Credit Days" ;; Field info
                  Local: Field: snf: Color :blue        ;; Field color
                  Local: Field: snf: Border: thin bottom ;; Field border
                  
;; ===================================================================
;; REPORT DEFINITION FOR BILL-BY-BILL SETTING
;; ===================================================================
[report:butsetbillbybill]
              title  : "Set Bill-by-Bill"   ;; Report title
               form   : butsetbillbybill    ;; Form to use
               [form  : butsetbillbybill]   ;; Form definition
               part   : butsetbillbybill    ;; Part to use
               Background  : @@SV_CMPCONFIG ;; Background configuration

               [part  : butsetbillbybill]   ;; Part definition
               line:butsetbillbybill        ;; Line to include

                       [line:butsetbillbybill] ;; Line definition
                     Fields : long Prompt, fldsetbill ;; Fields to include
                  Local       : Field : Long Prompt 	: Setas   : $$LocaleString:"Maintain balances bill-by-bill ?" ;; Field text
                    Local       : Field : long Prompt :width:25 ;; Field width

                                     [Field: fldsetbill] ;; Field definition
 				Use         : logical field     ;; Field type
				Modifies    : varsetledbill     ;; Field modifies variable

;; ===================================================================
;; VARIABLE DEFINITIONS FOR CREDIT SETTINGS
;; ===================================================================
[variable : varamtfcr]
type: amount     ;; Variable type
default : 0      ;; Default value
persistent : no  ;; Not persistent

[variable : varcdaysf]
     type : string  ;; Variable type
  default : ""      ;; Default value
persistent: no      ;; Not persistent

[variable : varsetledbill]
     type : logical ;; Variable type
  default : no      ;; Default value
persistent: no      ;; Not persistent

;; ===================================================================
;; SYSTEM VARIABLE INITIALIZATIONS
;; ===================================================================
[system : variable]
varamtfcr: 0       ;; Initialize credit limit to 0
varcdaysf: ""      ;; Initialize credit days to empty
varsetledbill:"no" ;; Initialize bill-by-bill to "no"

`;
export default tdl;
