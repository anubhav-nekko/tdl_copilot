// Auto-generated from ExportforEsigning3.txt
const tdl = `
;==============================================================================
; REVISION HISTORY
;==============================================================================
; Created By: suman on 2021-08-28 17:58, ID: 
; Created By: suman on 2021-07-29 14:15, ID:
; Created By: Taniya on 2020-09-11 18:51, ID:
; Created By: Pg on 2018-09-12 11:01, ID:

;==============================================================================
; COLLECTION DEFINITION: cwSelectedColx
;==============================================================================
; Purpose: Collection to store selected vouchers for bulk processing
; Data Source: Uses the "Report: Selected" data source
[collection : cwSelectedColx]
Data Source: Report: Selected

;; {14.Nov.19 17:04} Fetch		: *.*
;; {27.Mar.21 13:28} fetch:vouchernumber

;==============================================================================
; FUNCTION: cwExportforSigningBulk
;==============================================================================
; Purpose: Exports multiple invoices for digital signing in bulk
; Processes each selected voucher and prepares it for signing
/* ss
[function : cwExportforSigningBulk]
	Variable	: Counter	: Number	: $$numitems:cwSelectedColx
	variable : pcount : number : 1
        variable : mydate : date
        variable : myid : number
        variable : myvchtypename : string
	VARIABLE : VCHID  : STRING


;;05 : log : ##Counter	


0030		: Start Progress				: ##Counter	: "Exporting Invoices"

10 : walk collection : cwSelectedColx
0050		:	Show Progress				: ##PCount
11 : if : $cwDSEnabled:Vouchertype:$vouchertypename
;; {27.Mar.21 13:29} 11a: log : $$string:$date + " " +$$string:$masterid + " " +$$string:$vouchertypename

11b : set : mydate : $date
11c : set : myid : $masterid
11d : set : myvchtypename : $vouchertypename

11f : walk : cwBulkColl
11g : log : $vouchernumber


	01 : SET : VCHID  : $$SPrintf:"ID:%s":$myid
	05	 : SET OBJECT 	: (Voucher, ##VchId).


12 : call : cwExportforSigningx:yes

13 : end walk
14 : end if
20 : end walk
25 : end progress
                      ss */

;==============================================================================
; COLLECTION: cwBulkColl
;==============================================================================
; Purpose: Collection to retrieve voucher details for the current company
; Filters vouchers based on date and voucher type parameters
/* ss
[collection: cwBulkColl]
        Use: Vouchers of Company
     delete: filter : daybookfilter
     Filter: ColdddFilter
     parmvar : svfromdate : date : ##mydate
     parmvar : svtodate : date :   ##mydate
     fetch : *.*, AllInventoryEntries.*, AllLedgerEntries.*,

     fetch:vouchernumber

[System: Formula]
ColdddFilter : $vouchertypename = ##myvchtypename and $masterid = ##myid
                ss */

;==============================================================================
; SYSTEM FORMULAS
;==============================================================================
; Purpose: Define system-wide variables and configuration settings
; Includes email settings, export paths, and other configuration parameters
[System: Formula]
cwemailid2 : "" ; 2nd Email Id, e.g: Broker Email-Id
cwemailStr2: "" ; Caption of 2nd Email Id, e.g:Broker Name

; To be used in future, or with other tcp.
cwOthers1 : ""
cwOthers2 : ""
cwOthers3 : ""
cwOthers4 : ""
cwOthers5 : ""

; Export Location
cwExportLocation :  if @@cwsperateparnewridenbopt then  $cwpathsavefile:Vouchertype:##SVVoucherType +"\" else  @@cwDSConfigPath  +"\"
;; {30.Jul.21 13:16} cwExportLocation :@@cwlocationpath  +"\"
;; {30.Jul.21 13:03} cwExportLocation :@@cwlocationpathvchtype  +"\"

; Export File Name
cwExportFileName :if $$isempty:$vouchernumber then #fsnf else $vouchernumber;;+ ".pdf"

; Export Function Version
cwESigningVersion : "1.0"

; Signature on page
cwOnPage : if $$issysname:$cwPutSignatureOn:Vouchertype:$vouchertypename or $$isempty:$cwPutSignatureOn:Vouchertype:$vouchertypename then @@cwDSLastPage else $cwPutSignatureOn:Vouchertype:$vouchertypename

;==============================================================================
; ADDITIONAL SYSTEM FORMULAS
;==============================================================================
; Purpose: Define path-related formulas for file operations
[System: Formula]
cwlocationpath:if not $$isempty:@@cwlocationpath then @@cwlocationpath else @@cwlocationpathvchtype
cwlocationpathvchtype:$cwpathsavefile:Vouchertype:$vouchertypename

;==============================================================================
; LINE DEFINITION: VCH Display Number
;==============================================================================
; Purpose: Define field for voucher display number
[#Line: VCH Display Number]
add:field:fsnf

Local: Field: fsnf: Set As:$vouchernumber
Local: Field: fsnf:storage:cwdisvouchernumber
Local: Field: fsnf:invisible:yes

;==============================================================================
; SYSTEM UDF DEFINITION
;==============================================================================
; Purpose: Define user-defined field for voucher display number
[System: UDF]
cwdisvouchernumber:string:908

;==============================================================================
; SYSTEM VARIABLE DEFINITION
;==============================================================================
; Purpose: Define system variable for temporary storage
[system : variable]
cwxx1 : ""

[variable : cwxx1]
type : string
persistent : no
    /*

;==============================================================================
; FUNCTION: cwExportforSigning2
;==============================================================================
; Purpose: Export voucher for signing with party ledger information
[function : cwExportforSigning2]
object : voucher : ##VoucherID
10 : log:$partyledgername
20 : call : cwExportforSigningx


;==============================================================================
; FUNCTION: cwbfDealID
;==============================================================================
; Purpose: Retrieve and format deal IDs from inventory entries
; Returns: String containing concatenated deal IDs
[function: cwbfDealID]
returns : string
variable : str: string : ""
01 : set : num1 : 0
;; {02.Aug.21 14:27} 05 : log : "in function"
10 : walk : AllInventoryEntries
;; {02.Aug.21 14:26} 11 : log object
20 : if :not $$isempty:$cwbfDonumber
30 : if : $$isempty:##str
31 : set : str : $cwbfDonumber
32 : else
33 : set : str : ##str + ";" + $cwbfDonumber
34 : end if
34a: set : num1 : ##num1 + 1
35 : end if
37 : end walk

;; {02.Aug.21 14:27} 40 : log : "Deal id: " +##str
44 : return : ##str
                              */

;==============================================================================
; FUNCTION: cwrepstrx
;==============================================================================
; Purpose: Sanitize voucher number by removing special characters
; Returns: Sanitized string that can be safely used in filenames
[function: cwrepstrx]
returns : string
variable : str : string : $vouchernumber
 A10 : set : str : $$ReplaceCharacters:##str:"\\":""
 A11 : set : str : $$ReplaceCharacters:##str:"/":""
 A12 : set : str : $$ReplaceCharacters:##str:"?":""
 A13 : set : str : $$ReplaceCharacters:##str:":":""
 A14 : set : str : $$ReplaceCharacters:##str:"*":""
 A15 : set : str : $$ReplaceCharacters:##str:'"':""
 A16 : set : str : $$ReplaceCharacters:##str:"<":""
 A17 : set : str : $$ReplaceCharacters:##str:">":""
 A18 : set : str : $$ReplaceCharacters:##str:"|":""
 A19 : set : str : $$ReplaceCharacters:##str:" ":""
 A20 : set : str : $$ReplaceCharacters:##str:"-":""
 A21 : set : str : $$ReplaceCharacters:##str:"_":""

 A50 : return : ##str

;==============================================================================
; FUNCTION: cwExportforSigningx
;==============================================================================
; Purpose: Main function to export voucher for digital signing
; Creates both PDF and supporting text file with metadata
; Parameters:
;   fromBulk - Logical flag indicating if called from bulk process
[function : cwExportforSigningx]
parameter : fromBulk : logical : false

; Variables for file paths and names
variable : cwExportLocation : string : @@cwExportLocation
variable : cwExportFileName : string : @@cwExportFileName
variable : CwPDfFileNameWithPath : string : ##cwExportLocation + ##cwExportFileName

variable : cwTxtFilename : string

; Variables for voucher data
variable : cwpartyledger  : string : if not $$isempty:@@AllLedName then @@AllLedName else if not $$isempty:$partyledgername then $partyledgername else if not $$isempty:$FirstLedger then $FirstLedger else ""

VARIABLE : isfexists : LOGICAL : NO

; Control variables
VARIABLE : CWSENDeMAIL : LOGICAL : yes
variable : istr : string
variable : temp : string
variable : strno : string
variable : tempcopies : number
variable : exefilepath : string : if @@cwsperateparnewridenbopt then $cwInvoiceUploader:vouchertype:##svvouchertype else  $cwInvoiceUploader:COMPANY:##SVCURRENTCOMPANY

variable : str : string : ""

variable : invamount : amount : if not $$isempty:$amount then $amount else if not $$isempty:$daybookamount then $daybookamount else ""

; Set voucher type name for display
0111: set : strno : if $$isempty:$vouchertypename then #FormSubTitle else $vouchertypename ;;$vouchertypename;; $cwPrintCopies:vouchertype:$vouchertypename

; Sanitize export filename by removing special characters
 A10 : set : cwExportFileName : $$ReplaceCharacters:##cwExportFileName:"\\":""
 A11 : set : cwExportFileName : $$ReplaceCharacters:##cwExportFileName:"/":""
 A12 : set : cwExportFileName : $$ReplaceCharacters:##cwExportFileName:"?":""
 A13 : set : cwExportFileName : $$ReplaceCharacters:##cwExportFileName:":":""
 A14 : set : cwExportFileName : $$ReplaceCharacters:##cwExportFileName:"*":""
 A15 : set : cwExportFileName : $$ReplaceCharacters:##cwExportFileName:'"':""
 A16 : set : cwExportFileName : $$ReplaceCharacters:##cwExportFileName:"<":""
 A17 : set : cwExportFileName : $$ReplaceCharacters:##cwExportFileName:">":""
 A18 : set : cwExportFileName : $$ReplaceCharacters:##cwExportFileName:"|":""
 A19 : set : cwExportFileName : $$ReplaceCharacters:##cwExportFileName:" ":""
 A20 : set : cwExportFileName : $$ReplaceCharacters:##cwExportFileName:"_":""
 A21 : set : cwExportFileName : $$ReplaceCharacters:##cwExportFileName:"-":""


; Exporting Supporting Text File with metadata
        B00 : set : cwTxtFilename : ##cwExportLocation+"\"+##cwExportFileName+##istr+".txt"
;; {02.Aug.21 17:36}         B01 : log : ##cwTxtFilename
        B10 : OPEN FILE : ##cwTxtFilename  : TEXT : WRITE : ASCII
        B12 : TRUNCATE FILE

        ; Create JSON structure with voucher metadata
        B14: set : str : "{"
        B14A:set :str  : ##str + '"exportedon":"' + $$string:$$machinedate + " " + $$string:$$machinetime + '",'

        B14B: set : str : ##str + '"version":"'+@@cwESigningVersion + '",'

        B15 : set : str : ##str +  '"dealerid":"'+ @@cwpartner  + '",'

         ; VALUES From Voucher
       ; B45 : WRITE FILE LINE : '"partyledgername":"' + ##cwpartyledger  + '",'
       B50 : set : str : ##str +  '"dealid":"' + $$cwbfDealID  + '",'
        B51 : set : str : ##str + '"vouchernumber":"' + $$cwrepstrx  + '",'
        B52 : set : str : ##str+ '"voucherdate":"' + $$STRING:$DATE  + '",'
        B53 : set : str : ##str + '"counter":"' + $$STRING:##num1  + '",'

        B74 : set : str : ##str + '"subscriptionkey":"'+ @@cwsubprimarykeyforUpload + '",'

        ; Add additional metadata fields
        B75 :set : str : ##str +  '"txt1":"' + @@cwOthers1 + '",'
        B76 :set : str : ##str +  '"txt2":"' + @@cwOthers2  + '",'
        B77 :set : str : ##str + '"txt3":"' + @@cwOthers3 + '",'
        B78 :set : str : ##str +'"txt4":"' + @@cwOthers4  + '",'
        B79 :set : str : ##str + '"txt5":"' + @@cwOthers5  + '"'
        B80 :set : str : ##str +  "}"

        B81 : write file line : ##str

        C175 : CLOSE TARGET FILE

; Exporting PDF file
	A100	: SET			: SVExportLocation	: ##cwExportLocation ;; "."
	A110	: SET			: SVExportFormat	: $$SysName:PDF
	A120	: SET			: SVPrintFileName	: ##cwExportLocation+##cwExportFileName+##istr

	A140	: SET			: SVPrintFileName	: $$MakeExportName:##SVPrintFileName:##SVExportFormat
	A130    : set : isfexists : $$isfileexists:##SVPrintFileName
;        a2323 : log : "Exporting to: " + ##SVPrintFileName  + " " + ##SVPrintCopy

        ; Handle file existence and export settings
	A150 : do if : ##isfexists : TriggerKey:Enter
        A155 : set : SVOpenFileAfterExport : no
        safasd : set : cwxx1: ##SVPrintCopy
;f003 : log : ##strno

        ; Export report based on calling context
	A160	: do if : not ##fromBulk :  EXPORT REPORT	: cwxx1 : true
	A162	: do if : ##fromBulk :  EXPORT REPORT	:MyInvoice : true ;; cwxy : true

;; {30.Jul.21 16:28}         C090 : end for

;; {28.Aug.21 17:53} c999 : log: ##cwTxtFilename
       ; Execute external command to process the exported files
       C100 : do if : ##exefilepath <> "" : exec command : ##exefilepath :##cwTxtFilename+" " +##SVPrintFileName

        C980 : return : yes

;==============================================================================
; REPORT DEFINITION: cwxy (commented out)
;==============================================================================
; Purpose: Report definition for voucher export
     /* ss   [report : cwxy]
        use : cwxx1
        object : voucher : ##VCHID
        fetch object : voucher : ##VCHID : *.*

;; {15.Nov.19 15:07}         local : field: default : set as : ##myid     ss */

;==============================================================================
; REPORT DEFINITION: cwxx1
;==============================================================================
; Purpose: Report definition for invoice printing
; Sets up print format, copies, and page layout
[report : cwxx1]

         use :POS Invoice Print ;;

         set : svprintcopies : 1
         PrintSet : SVPrintCopies : 1

     ;    printset : svprintcopy : $$LocaleString:"Original" ;;##cwxx
         printset : svprintcopy :  if not $$isempty:##cwxx1 then ##cwxx1 else "Original"

        ; Page layout settings
	local : form : default : Space Left 	    :  5% Page
	local : form : default : Space Top 	    :  5% Page
	local : form : default : Space Bottom    :  3% Page

  local : form : default :   Space Top   : @@InvSpace  inch
  local : form : default :   Space Right : 0.25 inch
  local : form : default :   Space Left  : 0.25 inch
  local : form : default :   Space Bottom: 0.25 inch
;; {16.May.20 10:18}   local : form : default :  Set : SV Print Orientation : "Landscape"
local: form: default : 	Set: VCHPrintJurisdiction : If $$IsEmpty:@@DSPJurisdictionValue Then ##SAJurisdiction Else @@DSPJurisdictionValue
       option : cwcustomdimentsion :  @@cwdocformatlwidthnumfform <> 0

;==============================================================================
; ADDITIONAL DEFINITIONS (commented out)
;==============================================================================
      /* ss


       [System: Formula]
        cwsetprintformat:POS Invoice Print



       [!form : cwcustomdimentsion]

         local : form : default : Height  	    : @@cwdocformatlheightnumform inch;;100% Page
	local : form : default : Width  		    :@@cwdocformatlwidthnumfform inch;; 95% Page

        ;; {18.May.20 16:44}   local : form : default :    Height      : @@invheight ;;if ##SVPrintOrientation = "portrait" then @@invwidth else @@InvHeight inch
;; {18.May.20 16:44}   local : form : default :   Width       : @@invwidth ;;if ##SVPrintOrientation = "portrait" then @@InvHeight else @@invwidth    inch

; --------------------------------------------        ss */
 /*
[#Report: Day Book]
Pre Fetch Object : Voucher Type : ##VoucherTypeName	:MasterID, Name, IsReserved, IsDeemedPositive
 local: collection : default : fetch : *.*
     */


;;===============================================collection

`;
export default tdl;
