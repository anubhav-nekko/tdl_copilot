// Auto-generated from AUTOBATCHTRANSFER.TXT
const tdl = `
;===============================================================================
; AUTOBATCHTRANSFER.TXT
; Created By: Khokan on 2019-04-03 10:49, ID:
; Purpose: Facilitates batch-wise transfer of item data between companies in Tally.
;          Provides a UI for selecting source and target companies, collects batch
;          details, and updates the target company accordingly.
;===============================================================================

;------------------------------------------------------------------------------
; Add "Batch Transfer" button to List of Accounts when viewing Stock Items
;------------------------------------------------------------------------------

[#Form: List of Accounts]
add:option:cwnewgatewayoftallyBarcode : ##accounttype = $$sysname:StockItems

;------------------------------------------------------------------------------
; Add "Batch Transfer" button to relevant menu and form
;------------------------------------------------------------------------------

[!menu:cwnewgatewayoftallyBarcode]
add:button:cwfileitemBarcode

[!form:cwnewgatewayoftallyBarcode]
add:button: at beginning : cwfileitemBarcode

;------------------------------------------------------------------------------
; Define "Batch Transfer" button with Alt+B shortcut
;------------------------------------------------------------------------------

[button:cwfileitemBarcode]
key:alt+B
TITLE:"Batch Transfer"
action:modify variable:cwBatchTransferrep

;------------------------------------------------------------------------------
; Batch Transfer Report and Form
;------------------------------------------------------------------------------

[report:cwBatchTransferrep]
form:cwBatchTransferrep

[form:cwBatchTransferrep]
part:cwBatchTransferrep
HEIGHT:30% PAGE
WIDTH:40% PAGE
on : form accept : yes : call :cwBatchTransferfun:#nf:#nf2

[part:cwBatchTransferrep]
line:cwsourcecompany,cwtargetcompany

;------------------------------------------------------------------------------
; Source Company selection line
;------------------------------------------------------------------------------

[line:cwsourcecompany]
field:sp,nf
Local: Field: sp: Set As:"Source Company"
Local: field: sp: Width:15
Local: field: NF: Width:40
Local: Field: nf: table:cwcollSourceCompany
Local: Field: nf: Show table: Always
SPACE BOTTOM:0.5

[Collection:cwcollSourceCompany]
use:listofcompanies

;------------------------------------------------------------------------------
; Target Company selection line
;------------------------------------------------------------------------------

[line:cwtargetcompany]
field:sp,nf2
Local: Field: sp: Set As:"Target Company"
Local: field: sp: Width:15
Local: field: NF2: Width:40
Local: Field: nf2: table:cwcollSourceCompany
Local: Field: nf2: Show table: Always

;------------------------------------------------------------------------------
; Variables for batch/item/godown details and captions
;------------------------------------------------------------------------------

[variable:cwmyitem2]
variable: cwitembatchgodown : string
variable: cwmyitem : string
variable: cwmygodown : string
variable: cwmybatch : string
variable:cwmycwBaleNo:string
variable:cwmycwbatchcaption1:string
variable:cwmycwbatchcaption2:string
variable:cwmycwbatchcaption3:string
variable:cwmycwmrpbatch:string
variable:MyActualQty : quantity

[collection : cwCollmyitemnew]
data source : variable : cwmyitem2
format:$cwitembatchgodown,10
format:$cwmyitem,10
format:$cwmygodown ,10
format:$cwmybatch,10
format:$cwmytype,10
format:$cwmycwBaleNo,10
format:$cwmycwBiltyNo,10
format:$cwmycwbatchcaption1,10
format:$cwmycwbatchcaption2,10
format:$cwmycwbatchcaption3,10
format:$cwmycwmrpbatch,10

[system : variable]
list variable :cwmyitem2

;------------------------------------------------------------------------------
; Main function: Transfers batch data from source to target company
;------------------------------------------------------------------------------

[Function: cwBatchTransferfun]
parameter:cwSourceCompany:string
parameter:cwTargetCompany:string

variable : myitem : string
variable : mygodown : string
variable : mybatch : string
variable : cwtype : string
variable:mycwBaleNo:string
variable:mycwBiltyNo:string
variable:mycwbatchcaption1:string
variable:mycwbatchcaption2:string
variable:mycwbatchcaption3:string
variable:mycwmrpbatch:string
Variable : cwProgressCount : Number :1
Variable : cwProgressCount2 : Number :1
variable : BatchIndex : number
variable : ctr : number : $$numitems:cwcollstockitem  ; required for Progress Bar
variable:itembatchgodown:string
ListVariable:cwmyitem2

;--- Confirm transfer
02:Querybox:"Batch Transfer?":yes:no
03:do if :not $$lastresult:continue

;--- Switch to source company and prepare progress
10:set:SVCURRENTCOMPANY:##cwSourceCompany
11:set:cwProgressCount:$$numitems:cwcollstockitem
12: LIST DELETE	:cwmyitem2
04: start Progress : ##cwProgressCount:"Gathering Items":"":"Please Wait...."

;--- Walk through all stock items in source company
20:walk collection:cwcollstockitem
05:Show Progress: ##cwProgressCount2
06:incr:cwProgressCount2
21 : set : myitem : $stockitemname

;--- Walk through all batches for current item
29:walk collection:cwcollbatchnew
30 : set : mygodown :$godownname
31 : set : mybatch :$name
32:set:itembatchgodown:##myitem+##mygodown+##mybatch
33b:set:mycwbatchcaption1:$cwbatchcaption1
33c:set:mycwbatchcaption2:$cwbatchcaption2
33d:set:mycwbatchcaption3:$cwbatchcaption3
33f:set:mycwmrpbatch:$cwmrpbatch

;--- Add batch info to list variable
002 : list add : cwmyitem2 : ##itembatchgodown
005:set : BatchIndex : $$listIndex:cwmyitem2:##itembatchgodown
0009 : set : cwmyitem2[##BatchIndex].cwitembatchgodown : ##itembatchgodown
0009a : set : cwmyitem2[##BatchIndex].cwmybatch : ##mybatch
0012 : set : cwmyitem2[##BatchIndex].cwmycwbatchcaption1 : ##mycwbatchcaption1
0013 : set : cwmyitem2[##BatchIndex].cwmycwbatchcaption2 : ##mycwbatchcaption2
0014 : set : cwmyitem2[##BatchIndex].cwmycwbatchcaption3 : ##mycwbatchcaption3
0015 : set : cwmyitem2[##BatchIndex].cwmycwmrpbatch : ##mycwmrpbatch
00120 : set : cwmyitem2[##BatchIndex].cwmyitem : ##myitem	
00131 : set : cwmyitem2[##BatchIndex].cwmygodown : ##mygodown
0022: set :cwmyitem2[##BatchIndex].MyActualQty  :  ##cwmyitem2[##BatchIndex].MyActualQty +$actualqty
61 : end walk ;;29:
62 : end walk
180 : END Progress

;--- Switch to target company and update batches
186a: set: cwProgressCount : $$numitems:cwCollmyitemnew
186b: start Progress : ##cwProgressCount:"Updadting Items" :"":"Please Wait...."
186c: set : cwProgressCount2 : 1
187:set:SVCURRENTCOMPANY:##cwTargetCompany
188: walk collection:cwCollmyitemnew
35x : set : mygodown :$cwmygodown
40x : set : mybatch :$cwmybatch
41c : set : mycwbatchcaption1 : $cwmycwbatchcaption1
41d : set : mycwbatchcaption2 : $cwmycwbatchcaption2
41e : set : mycwbatchcaption3 : $cwmycwbatchcaption3
41f : set : mycwmrpbatch : $cwmycwmrpbatch
;--- Update batch captions and MRP in target company
188a : modifyobject: (stockitem,$cwmyitem).batchallocations[1,@@cwaFormula].cwbatchcaption1[1].cwbatchcaption1:##mycwbatchcaption1,cwbatchcaption2[1].cwbatchcaption2:##mycwbatchcaption2,cwbatchcaption3[1].cwbatchcaption3:##mycwbatchcaption3,cwmrpbatch[1].cwmrpbatch:##mycwmrpbatch
305:Show Progress: ##cwProgressCount2
306:incr:cwProgressCount2
350 : end walk
450 : return

;------------------------------------------------------------------------------
; Formula: Match batch and godown for updating target company
;------------------------------------------------------------------------------

[System: Formula]
cwaFormula : $batchname = ##mybatch and $godownname=##mygodown

;------------------------------------------------------------------------------
; Collection: All stock items with non-empty closing balance in source company
;------------------------------------------------------------------------------

[Collection: cwcollstockitem]
type:stockitem
filter:cwitembatchfilter
fetch : batchallocations.*
fetch : closingbalance,name

[System: Formula]
cwitembatchfilter:not $$isempty:$closingbalance

;------------------------------------------------------------------------------
; Collection: All batches for a given item with non-empty closing balance
;------------------------------------------------------------------------------

[Collection: cwcollbatchnew]
use : Active Batches VchExtract
filter:cwitembatchfilter2
child of:##myitem
Fetch	:cwbatchcaption1,cwbatchcaption2,cwbatchcaption3,cwmrpbatch,Name, Parent, ExpiryPeriod, ClosingBalance, GodownName, MfdOn, ClosingAsOnDate,cwtype,cwChasissno,cwEngineno,cwColorcode,cwMfgyear,cwkeyNo,cwFSCno,cwBatteryslno,cwBatterymake

[System: Formula]
cwitembatchfilter2:not $$isempty:$closingbalance

`;
export default tdl;
