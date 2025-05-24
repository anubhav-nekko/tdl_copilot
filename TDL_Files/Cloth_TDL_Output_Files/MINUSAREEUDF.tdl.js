// Auto-generated from MINUSAREEUDF.TXT
const tdl = `
; Created By: Khokan
; Created On: 2021-02-08 18:38
; ---------------------------------------------------------
; User Defined Fields (UDF) Definitions for Tally System
; ---------------------------------------------------------

[System: UDF]

; ---------------------------
; General Configuration Flags
; ---------------------------
cwiscustname           : logical : 9989 ; Flag for identifying customer name
cwmaillingname         : string  : 9990 ; Mailing name of the party
cwledpanno             : string  : 9991 ; PAN number of the ledger
cwEnableInvoiceCost    : logical : 9992 ; Enable invoice-wise costing
cwEnableCostnw         : logical : 9993 ; Enable cost-wise segregation
cwCreatebyms           : string  : 9994 ; Created by MS user
cwCreatedatems         : date    : 9995 ; Created date (MS format)
cwCreattimems          : string  : 9996 ; Created time (MS format)
cwSapceLeftqr          : number  : 9997 ; QR space left
cwChangePrintFormat    : logical : 9998 ; Allow print format change
cwEnableSalesReturn    : logical : 9999 ; Enable sales return module
cwShowinReport         : logical : 10000 ; Show in standard report
cwShowinReport2        : logical : 10001 ; Show in alternate report
cwEnableNetSalesReport : logical : 10002 ; Enable Net Sales reporting

; ----------------------
; Custom Captions Setup
; ----------------------
cwcaption1             : string  : 1000
cwcaption2             : string  : 1001
cwcaption3             : string  : 1002
cwcaption4             : string  : 1003
cwcaption5             : string  : 1004
cwcaption6             : string  : 1005
cwcaption7             : string  : 1006
cwcaption8             : string  : 1007
cwcaption9             : string  : 1008
cwcaption10            : string  : 1009

; -------------------------
; Table Captions & Options
; -------------------------
cwcaption1table        : string  : 1025
cwcaption2table        : string  : 1026
cwcaption3table        : string  : 1027
cwcaption4table        : string  : 1028
cwcaption5table        : string  : 1029
cwcaption6table        : string  : 1030
cwcaption7table        : string  : 1031
cwcaption8table        : string  : 1032
cwcaption9table        : string  : 1033
cwcaption10table       : string  : 1034

; ----------------------------
; Printing Options for Captions
; ----------------------------
cwcaption1printyn      : logical : 1050
cwcaption2printyn      : logical : 1051
cwcaption3printyn      : logical : 1052
cwcaption4printyn      : logical : 1053
cwcaption5printyn      : logical : 1054
cwcaption6printyn      : logical : 1055
cwcaption7printyn      : logical : 1056
cwcaption8printyn      : logical : 1057
cwcaption9printyn      : logical : 1058
cwcaption10printyn     : logical : 1059

; -----------------------------
; Table Under and Discount Info
; -----------------------------
cwcaption1tableunder   : STRING  : 1075
cwcaption2tableunder   : STRING  : 1076
cwcaption3tableunder   : STRING  : 1077
cwcaption4tableunder   : STRING  : 1078
cwcaption5tableunder   : STRING  : 1079
cwcaption6tableunder   : STRING  : 1080
cwcaptiont7ableunder   : STRING  : 1081 ; (Typo likely in field name)
cwcaption8tableunder   : STRING  : 1082
cwcaption9tableunder   : STRING  : 1083
cwcaption10tableunder  : STRING  : 1084
cwdiscper              : number  : 1085 ; Discount percentage
cwledcity              : string  : 1086 ; Ledger city
cwtempGSTewayTransporterName : string : 1087 ; Temp GST e-way transporter
cwnofobales            : string  : 1088 ; Number of bales
cwminuitem             : string  : 1089 ; Minimum item
cwdiscpernew           : logical : 1090 ; New discount flag
cwmsconsCity           : string  : 1091 ; MS consignee city
cwmsBuyerCity          : string  : 1092 ; MS buyer city
cwhsncode              : string  : 1093 ; HSN Code
cwgstper               : number  : 1094 ; GST Percentage
cwNoofPackages1        : string  : 1095 ; Number of Packages
cwNatureOfGoods        : string  : 1096 ; Nature of goods
cwPrivateMarks         : string  : 1097 ; Private marks
cwValueofInsurance     : string  : 1098 ; Insurance value
cwSpecialInstructions  : string  : 1099 ; Special Instructions
cwfromfn               : string  : 1100 ; From Function Name
cwtofn                 : string  : 1101 ; To Function Name
cwTransporteradd1      : string  : 1102 ; Transporter address line 1
cwTransporteradd2      : string  : 1103 ; Transporter address line 2
cwTransportercontperson: string  : 1104 ; Transporter contact person
cwTransportercontno    : string  : 1105 ; Transporter contact number
cwenicforparty         : logical : 1106 ; Enable NIC for party
cwPartymultiAddressCity: string  : 1107 ; Multi-address city
cwnetsales             : logical : 1108 ; Enable net sales
cwnewcityled           : string  : 1109 ; New ledger city
cwPartyAddressCity     : string  : 1110 ; Party address city
cwproductdiscpernew    : logical : 1111 ; New product discount %
cwminudisc             : number  : 1112 ; Minimum discount
cwminudiscamt          : amount  : 1113 ; Minimum discount amount
cwuseforvchlevdisc     : logical : 1114 ; Use at voucher-level discount
cwledateval            : number  : 11155 ; Ledger date validation
cwqtyrateval           : amount  : 1116 ; Quantity rate validation
cwSystemdatems         : logical : 1117 ; System date flag
cwfreshKata            : string  : 1118 ; Fresh kata (weighing info)
cwDelieveredFrom       : string  : 1119 ; Delivered from location
cwSellingRates         : number  : 1120 ; Selling rates
cwmstitle              : string  : 1121 ; MS title

; -----------------------
; Field Types (Custom UI)
; -----------------------
cwFieldType1           : STRING  : 1102
cwFieldType2           : STRING  : 1103
cwFieldType3           : STRING  : 1104
cwFieldType4           : STRING  : 1105
cwFieldType5           : STRING  : 1106
cwFieldType6           : STRING  : 1107
cwFieldType7           : STRING  : 1108
cwFieldType8           : STRING  : 1109
cwFieldType9           : STRING  : 1110
cwFieldType10          : STRING  : 1111

; -----------------------------
; Custom Item-Level Captions
; -----------------------------
cwcaption1item         : STRING  : 1128
cwcaption2item         : STRING  : 1129
cwcaption3item         : STRING  : 1130
cwcaption4item         : STRING  : 1131
cwcaption5item         : STRING  : 1132
cwcaption6item         : STRING  : 1133
cwcaption7item         : STRING  : 1134
cwcaption8item         : STRING  : 1135
cwcaption9item         : STRING  : 1136
cwcaption10item        : STRING  : 1137

; -----------------------------
; Custom Voucher-Level Captions
; -----------------------------
cwcaption1vch          : STRING  : 1228
cwcaption2vch          : STRING  : 1229
cwcaption3vch          : STRING  : 1230
cwcaption4vch          : STRING  : 1231
cwcaption5vch          : STRING  : 1232
cwcaption6vch          : STRING  : 1233
cwcaption7vch          : STRING  : 1234
cwcaption8vch          : STRING  : 1235
cwcaption9vch          : STRING  : 1236
cwcaption10vch         : STRING  : 1237
cwIsCashDiscount       : logical : 1238 ; Flag for cash discount

; -------------------
; User Audit Fields
; -------------------
cwusername             : string  : 2782 : yes ; Current user name
cwlastusername         : string  : 2783 : yes ; Last modified by user
cwlastuserdate         : date    : 2784       ; Last modification date

/*
; --------------------------------
; Sales & CRM Related UDFs (Block)
; --------------------------------
[System: UDF]
cwSalesperson          : STRING  : 8000
CWASM                  : STRING  : 8001
CWAgent                : STRING  : 8002
CWledZone              : STRING  : 8003
CWledCity              : STRING  : 8004
CWRSM                  : STRING  : 8005
cwSalespersonCC        : LOGICAL : 8006
cwASMCC                : LOGICAL : 8007
cwAgentCC              : LOGICAL : 8008
cwRSMCC                : LOGICAL : 8009
cwCityCC               : LOGICAL : 8010
*/

`;
export default tdl;
