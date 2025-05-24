// DailySalesRegister.tdl.js

exports.config = {
  Name: "DailySalesRegister",
  Version: "1.0",
  Author: "Khokan",
  Created: "2022-04-13",
  Description: "Detailed day-wise sales register with multi-level filters",
};

exports.modules = [
  {
    Name: "MenuIntegration",
    Type: "Menu",
    Menu: "Gateway of Tally",
    Items: [
      {
        Name: "Daily Sales Register",
        Action: "Display",
        Target: "RepDailySalesRegister",
        Position: "Before: @@locQuit",
      },
    ],
  },
  {
    Name: "DebugMenuIntegration",
    Type: "Menu",
    Menu: "cw_Debug_menu",
    Items: [
      {
        Name: "@@DailySalesRegisterReport",
        Action: "Display",
        Target: "RepDailySalesRegister",
        Position: "Before: @@locQuit",
      },
    ],
  },
  {
    Name: "ReportDefinition",
    Type: "Report",
    Report: {
      Name: "RepDailySalesRegister",
      Use: "Dsp Template",
      Title: "@@DailySalesRegisterReport",
      Form: "FrmDailySalesRegister",
      Export: "Yes",
      Variables: [
        "str2", "str3", "str4", "str5", "str6", "str7", "str8", "str9", "str10"
      ],
      DefaultValues: {
        svfromdate: "##svcurrentdate",
        svtodate: "##svcurrentdate",
        str2: "",
        str3: "",
        str4: "",
        str5: "",
        str6: "",
        str7: "",
        str8: "",
        str9: "",
        str10: "",
      },
    },
  },
  {
    Name: "FormDefinition",
    Type: "Form",
    Form: {
      Name: "FrmDailySalesRegister",
      Use: "DSP Template",
      Parts: [
        "DspAccTitles",
        "PrtTitle0DailySalesRegister",
        "PrtDailySalesRegister",
        "DailySalesRegisterbotbrk",
        "DailySalesRegisterbotOpbrk",
      ],
      Dimensions: {
        Width: "100% Page",
        Height: "100% Page",
      },
      Background: "@@SV_STOCKSUMMARY",
      BottomToolbar: [
        "BottomToolBarBtn1", "BottomToolBarBtn3", "BottomToolBarBtn8",
        "BottomToolBarBtn9", "BottomToolBarBtn10", "BottomToolBarBtn11",
        "BottomToolBarBtn12"
      ],
    },
  },
  {
    Name: "CollectionDefinition",
    Type: "Collection",
    Collection: {
      Name: "ColDailySalesRegister",
      Source: "sourceColDailySalesRegister",
      Walk: "inventoryentries",
      GroupBy: ["date", "vouchernumber", "partyledgername", "stockitemname"],
      Aggregations: [
        { Field: "billedqty", Method: "sum" },
        { Field: "amount1", Compute: "$..amount" },
        { Field: "cwledcity1", Compute: "$cwledcity : ledger : $partyledgername" },
        { Field: "cwledpincode1", Compute: "$pincode : ledger : $partyledgername" },
        { Field: "BillDate1", Compute: "@@cwbillOverDue" },
        { Field: "cwcaption1vch1", Compute: "$..cwcaption1vch" },
        { Field: "cwcaption2vch1", Compute: "$..cwcaption2vch" },
        { Field: "cwcaption3vch1", Compute: "$..cwcaption3vch" },
        { Field: "masterid", Compute: "$masterid" },
      ],
      Filters: [
        "cwcwledcity1filterds",
        "cwnspartymsnfilterds",
        "cwmsitemnamefilterds",
        "cwnsagentfilterds",
        "cwnssalesmfilternewds",
        "cwareafilterds",
        "cwcwledpincodefilterds",
      ],
    },
  },
  {
    Name: "SourceCollection",
    Type: "Collection",
    Collection: {
      Name: "sourceColDailySalesRegister",
      Type: "Vouchers",
      ChildOf: "$$VchTypesales",
      BelongsTo: "Yes",
    },
  },
  {
    Name: "FilterLogic",
    Type: "Formula",
    Formulae: {
      cwnspartymsnfilterds: 'if $$issysname:##str8 then yes else $partyledgername = ##str8',
      cwcwledcity1filterds: 'if $$issysname:##str9 then yes else $cwledcity1 = ##str9',
      cwcwledpincodefilterds: 'if $$issysname:##str10 then yes else $cwledpincode1 = ##str10',
      cwmsitemnamefilterds: 'if $$issysname:##str3 then yes else $stockitemname = ##str3',
      cwnsagentfilterds: 'if $$issysname:##str4 then yes else $cwcaption1vch1 = ##str4',
      cwnssalesmfilternewds: 'if $$issysname:##str5 then yes else $cwcaption2vch1 = ##str5',
      cwareafilterds: 'if $$issysname:##str6 then yes else $cwcaption3vch1 = ##str6',
      cwbillOverDue: 'If ($$IsEmpty:$ClosingBalance AND NOT $$IsEmpty:@BillClearedDate) Then @BillClearedDate - @@CreditPeriod Else ##DSPToDate - @@CreditPeriod',
    },
  },
];
