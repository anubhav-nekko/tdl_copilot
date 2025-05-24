/**
 * =============================================================================
 *  INVOICE TITLE / PRINT-FORMAT CUSTOMISATION
 *  ---------------------------------------------------------------------------
 *  Original fragments : Khokan • 2021-04-13 17:08  and 2024-01-02 15:05
 * =============================================================================
 */

/**
 * ========================= 1. TITLE OUTPUT MEDIUM =============================
 *  Adds extra options when Minu Saree feature is enabled (Sales / Cr-Note)
 * -----------------------------------------------------------------------------
 */
TDL.addPart("Title Output Medium", {
  options: {
    cwtitleoutputmiumopt: "@@issales && @@MinuSareeEnabled",
    cwtitleoutputmiumcrnotopt: "@@isCreditNote && @@MinuSareeEnabled"
  }
});

/**
 * ---- 1.1 Option for normal Sales voucher ------------------------------------
 */
TDL.definePart("cwtitleoutputmiumopt", {
  lines: ["titlelinenewp"]
});

TDL.defineLine("titlelinenewp", {
  fields: ["medium prompt", "snf", "snf1", "snf2"],
  local: {
    "Medium Prompt": {
      info: "$$LocaleString:\"Title :\""
    },
    // Display texts – can be replaced by variables (##PRNTYPE / ##str1 / ##str2)
    snf: {
      setAs: "\"Normal Invoice\""
    },
    snf1: {
      setAs: "\"F/N\"", // Front-Note toggle
      invisible: "if @@cwenablefn=\"yes\" then \"no\" else \"yes\""
    },
    snf2: {
      setAs: "\"Packingslip\""
    },
    snf3: {
      setAs: "##PRNTYPE" // Hidden field (not declared here)
    },
    default: {
      style: "normal bold",
      color: "blue"
    }
  },
  spaceTop: 0.5
});

/**
 * ==================== 2. ALTERNATE TITLE (F/N enabled) =======================
 */
TDL.addPart("Title Output Medium", {
  // {18.May.23 11:18} two more options when only F/N feature (no saree)
  // options: {
  //   cwtitleoutputmiumopt2: "@@issales && @@cwenablefn",
  //   cwtitleoutputmiumcrnotopt2: "@@isCreditNote && @@cwenablefn"
  // }
});

TDL.definePart("cwtitleoutputmiumopt2", {
  lines: ["titlelinenewp2x"]
});

TDL.defineLine("titlelinenewp2x", {
  fields: ["medium prompt", "snf", "snf1", "snf2"],
  local: {
    "Medium Prompt": {
      info: "$$LocaleString:\"Title :\""
    },
    snf: {
      setAs: "\"Normal Invoice\""
    },
    snf1: {
      setAs: "\"F/N\""
    },
    snf2: {
      setAs: "\"Packingslip\""
    },
    snf3: {
      setAs: "##PRNTYPE"
    },
    default: {
      style: "normal bold",
      color: "blue"
    }
  },
  spaceTop: 0.5
});

/**
 * ========================= 3. STYLE DEFINITIONS ===============================
 */
TDL.defineStyle("style1xnew", {
  // {18.Aug.21 14:52} font:"Calibri"
  // {18.Aug.21 14:55} font:"normal"
  font: "\"Times New Roman\"",
  height: 20,
  bold: "yes"
});

/**
 * ===== 4. CREDIT-NOTE VARIANT OF TITLE =======================================
 */
TDL.definePart("cwtitleoutputmiumcrnotopt", {
  lines: ["titlelinenewp2"]
});

TDL.defineLine("titlelinenewp2", {
  fields: ["medium prompt", "snf2"],
  local: {
    "Medium Prompt": {
      info: "$$LocaleString:\"Title :\""
    },
    snf: {
      setAs: "\"Packingslip\""
    },
    snf1: {
      setAs: "\"F/N\""
    },
    snf2: {
      setAs: "\"Normal Invoice\""
    },
    default: {
      style: "Normal Bold",
      color: "blue"
    }
  },
  spaceTop: 0.5
});

/**
 * ========================== 5. TOOLBAR BUTTON =================================
 */
TDL.addForm("VCHPRN Sales", {
  // Add Ctrl + F8 button to switch print format (Normal / Packing Slip)
  // {13.Apr.21 18:11}
  bottomButton: {
    atBeginning: "salrepnew2"
  }
});

TDL.defineKey("salrepnew2", {
  title: "\"Print Format\"",
  key: "CTRL+F8",
  title: "\"F/N\"",
  action: "set : logi3"
});

/**
 * ================= 6. SIMPLE / COMPREHENSIVE INVOICE OPTIONS ==================
 */
TDL.addForm("Simple Printed Invoice", {
  // {17.Aug.21 17:34} add option when transporter details required
  // option: "fnsalesinvOpt:@@cwtransport"
});

TDL.addForm("ComprehensiveInvoice", {
  // {13.Apr.21 17:11}
  option: "fnsalesinvOpt:@@cwtransport"
});

/**
 * -------------------- Option form overriding original invoice -----------------
 */
TDL.defineForm("fnsalesinvOpt", {
  // Remove original framework …
  delete: {
    part: true,
    "Bottom Part": true,
    "Page Break": true
  },

  // …and insert F/N specific parts + page setup using user margins
  add: {
    "Top part": "fnsalesinvTopPart1,fnsalesinvTopPart,fnsalesinvTopPart2,fnsalesinvTopPart3,fnsalesinvInvACCPart,fnsalesinvBottomPart",
    "Part": "fnsalesinvTopPart1XX,fnsalesinvTopPart1X,fnsalesinvTopPartX,fnsalesinvTopPart2X,fnsalesinvTopPart3X,fnsalesinvInvACCPartX,fnsalesinvBottomPartX",
    "page Break": "fnsalesinvCLBreak, fnsalesinvOPBreak"
  },

  delete: {
    "Space Top": "@@InvSmpSpace inch"
  },

  add: {
    "space left": "##spaceLeftnew inch",
    "space top": "##spacetopnew inch",
    "space right": "##spaceRightnew inch",
    "width": "##spacewidthnew inch",
    "height": "##spaceHeightnew inch"
  }
});

/**
 * -------- Same override for second variant (cwfnsalesinvOptms) ---------------
 */
TDL.defineForm("cwfnsalesinvOptms", {
  delete: {
    part: true,
    "Bottom Part": true,
    "Page Break": true
  },
  add: {
    "Top part": "fnsalesinvTopPart1,fnsalesinvTopPart,fnsalesinvTopPart2,fnsalesinvTopPart3,fnsalesinvInvACCPart,fnsalesinvBottomPart",
    "Part": "fnsalesinvTopPart1XX,fnsalesinvTopPart1X,fnsalesinvTopPartX,fnsalesinvTopPart2X,fnsalesinvTopPart3X,fnsalesinvInvACCPartX,fnsalesinvBottomPartX",
    "page Break": "fnsalesinvCLBreak, fnsalesinvOPBreak"
  },
  delete: {
    "Space Top": "@@InvSmpSpace inch"
  },
  add: {
    "space left": "##spaceLeftnew inch",
    "space top": "##spacetopnew inch",
    "space right": "##spaceRightnew inch",
    "width": "##spacewidthnew inch",
    "height": "##spaceHeightnew inch"
  }
});

/**
 * ======================= 7. WRAPPER PARTS (X variants) ========================
 *  "XX / X" wrappers reuse existing parts but allow individual borders/heights.
 * -----------------------------------------------------------------------------
 */
TDL.definePart("fnsalesinvTopPart1XX", {
  // Blank spacer
  line: "CWBLANKLINE",
  height: 10
});

TDL.definePart("fnsalesinvTopPart1X", {
  // Direct re-use of original part
  use: "fnsalesinvTopPart1"
});

TDL.definePart("fnsalesinvTopPartX", {
  // and so on…
  use: "fnsalesinvTopPart"
});

TDL.definePart("fnsalesinvTopPart2X", {
  use: "fnsalesinvTopPart2"
});

TDL.definePart("fnsalesinvTopPart3X", {
  use: "fnsalesinvTopPart3"
});

TDL.definePart("fnsalesinvInvACCPartX", {
  use: "fnsalesinvInvACCPart"
});

TDL.definePart("fnsalesinvBottomPartX", {
  use: "fnsalesinvBottomPart"
});

/**
 * ======================= 8. PAGE BREAK PLACEHOLDERS ===========================
 */
TDL.definePart("fnsalesinvCLBreak", {
  use: "fnsalesinvBottomPart"
});

TDL.definePart("fnsalesinvOpBreak", {
  part: "fnsalesinvTopPart"
});

/**
 * ========================= 9. TOP-HEADER (F/N) ================================
 */
TDL.definePart("fnsalesinvTopPart1", {
  line: "mstitlelinex",
  border: "thin box"
});

TDL.defineLine("mstitlelinex", {
  field: "nf,fwfc,nf1,copyfield",
  local: {
    fwfc: {
      setAs: "\"F/NOTE\"",
      border: "thin bottom",
      style: "large Bold"
    },
    nf1: {
      setAs: "#copyfield"
    },
    copyfield: {
      invisible: "yes"
    }
  },
  height: 2,
  spaceTop: 0.5
});

/**
 * ---------------------- Company name + address block --------------------------
 */
TDL.definePart("fnsalesinvTopPart", {
  part: "fnsalesinvTopParta,fnsalesinvTopPartb",
  border: "thin box",
  height: 12
});

/**
 * ----- 9.1 Company details (name / address / GST) -----------------------------
 */
TDL.definePart("fnsalesinvTopPartA", {
  line: "cmpfnline,cmpaddxline,gstcmpline",
  repeat: "cmpaddxline:cwCompanyAddress"
});

TDL.defineCollection("cwCompanyAddress", {
  type: "Address : Company",
  childOf: "##SVCurrentCompany",
  compute: {
    isNumber: "No",
    fixedDirection: "No"
  },
  delete: {
    object: "Company State, Company CINumber, Company Contacts, Company FaxNo, Company Email, Company Website"
  },
  filter: "IsNotBlankAddr",
  delete: {
    option: {
      "Company GSTINumber": "(##IsVoucher OR ##IsMultiVchReport) AND @@IsGSTOnAppl",
      "Company TINTRNNumber": "(##IsVoucher OR ##IsMultiVchReport) AND @@IsVChGVATApplicable"
    }
  }
});

TDL.defineLine("cmpfnline", {
  field: "fwf",
  local: {
    fwf: {
      setAs: "@@cmpmailname",
      style: "large Bold"
    }
  },
  spaceTop: 0.5
});

TDL.defineLine("cmpaddxline", {
  field: "fwf",
  local: {
    fwf: {
      setAs: "$address"
    }
  },
  spaceTop: 0.5
});

TDL.defineLine("gstcmpline", {
  field: "sp,nf,sp2,nf2",
  local: {
    sp: {
      setAs: "\"GSTIN :\"",
      width: 8
    },
    nf: {
      setAs: "@@VATCMPGSTNumber"
    },
    sp2: {
      setAs: "\"Phone :\"",
      width: 7
    },
    nf2: {
      setAs: "@@cwCmpMobile"
    }
  },
  spaceTop: 0.5
});

/**
 * ----- 9.2 Date / From / To block --------------------------------------------
 */
TDL.definePart("fnsalesinvTopPartB", {
  line: "dtline,fromline,toline"
});

TDL.defineLine("dtline", {
  field: "sp,sdf",
  local: {
    sp: {
      setAs: "\"Date\"",
      width: 8
    },
    sdf: {
      setAs: "@@cwshortmfdm",
      type: "String",
      align: "left",
      width: 20
    }
  },
  spaceTop: 0.5
});

TDL.defineLine("fromline", {
  field: "sp,snf",
  local: {
    sp: {
      setAs: "\"From\"",
      width: 8
    },
    snf: {
      setAs: "$cwfromfn",
      width: 20
    }
  },
  spaceTop: 0.5
});

TDL.defineLine("toline", {
  field: "sp,snf",
  local: {
    sp: {
      setAs: "\"To\"",
      width: 8
    },
    snf: {
      setAs: "$cwtofn",
      width: 20
    }
  },
  spaceTop: 0.5
});

/**
 * ===================== 10. TRANSPORTER / CONSIGNEE BOXES ======================
 *  10.1 Transporter (left), 10.2 Consignee (right)
 * -----------------------------------------------------------------------------
 */
TDL.definePart("fnsalesinvTopPart2", {
  part: "fnsalesinvTopPart2a,fnsalesinvTopPart2b",
  border: "thin box",
  height: 10
});

/**
 * ---- 10.1 Transporter details -----------------------------------------------
 */
TDL.definePart("fnsalesinvTopPart2a", {
  line: "transline,transline1,traddline,trphline,gsttrline",
  repeat: "traddline:colllcwTRANSPORTER"
});

TDL.defineCollection("colllcwTRANSPORTER", {
  type: "address : ledger",
  childOf: "$cwtempGSTewayTransporterName"
});

TDL.defineLine("transline", {
  field: "fwf",
  local: {
    fwf: {
      setAs: "\"TRANSPORTER\""
    }
  },
  border: "thin bottom",
  spaceTop: 0.5,
  height: 1.5
});

TDL.defineLine("transline1", {
  field: "snfx,fwf",
  local: {
    snfx: {
      setAs: "\"To ,\"",
      width: 3
    },
    fwf: {
      setAs: "if $$issysname:$cwtempGSTewayTransporterName then \"\" else $cwtempGSTewayTransporterName",
      style: "Normal Bold"
    }
  },
  spaceTop: 0.5
});

TDL.defineLine("traddline", {
  field: "fwf",
  local: {
    fwf: {
      setAs: "$address"
    }
  }
});

TDL.defineLine("traddline2", {
  field: "fwf",
  local: {
    fwf: {
      setAs: "$cwTransporteradd2"
    }
  }
});

TDL.defineLine("trnmacontpersline1x", {
  field: "fwf",
  local: {
    fwf: {
      setAs: "\"Contact Person :\"+$cwTransportercontperson"
    }
  },
  spaceTop: 0.5
});

TDL.defineLine("trphline", {
  field: "fwf",
  local: {
    fwf: {
      setAs: "if $$isempty:@@cwtrphno then \"\" else \"Ph :\"+$LedgerPhone:ledger:$cwtempGSTewayTransporterName+\" \"+$LedgerMobile:ledger:$cwtempGSTewayTransporterName"
    }
  },
  spaceTop: 0.5
});

TDL.defineSystemFormula({
  cwtrphno: "$LedgerMobile:ledger:$cwtempGSTewayTransporterName"
});

TDL.defineLine("gsttrline", {
  field: "nf,nf2",
  local: {
    nf: {
      setAs: "$cwledcity:ledger:$cwtempGSTewayTransporterName +\" \"+$PinCode:LEDGER:$cwtempGSTewayTransporterName+\" \"+@@cwconLedStateNamenew",
      width: 40
    },
    nf2: {
      setAs: "if $$isempty:($PartyGSTIN:ledger:$cwtempGSTewayTransporterName) then \"\" else \"GSTIN : \"+$PartyGSTIN:ledger:$cwtempGSTewayTransporterName",
      style: "Normal Bold"
    }
  },
  spaceTop: 0.5
});

TDL.defineSystemFormula({
  cwconLedStateNamenew: "if $$issysname:@@cwconLedStateNamenew2 then \"\" else @@cwconLedStateNamenew2",
  cwconLedStateNamenew2: "$LedStateName:ledger:$cwtempGSTewayTransporterName"
});

/**
 * ---- 10.2 Consignee details --------------------------------------------------
 */
TDL.definePart("fnsalesinvTopPart2b", {
  line: "consline,consnameline,consaddline,CONSphline,gstconsline",
  repeat: "consaddline : BASICBUYERADDRESS",
  border: "THIN LEFT"
});

TDL.defineLine("consline", {
  field: "fwf",
  local: {
    fwf: {
      setAs: "\"CONSIGNEE\""
    }
  },
  border: "THIN BOTTOM",
  spaceTop: 0.5,
  height: 1.5
});

TDL.defineLine("consnameline", {
  field: "fwf",
  local: {
    fwf: {
      setAs: "@@cwmstitle+\" \"+$CONSIGNEEMAILINGNAME",
      style: "Normal Bold"
    }
  },
  spaceTop: 0.5
});

TDL.defineSystemFormula({
  cwmstitle: "$cwmstitle:COMPANY:##SVCURRENTCOMPANY"
});

TDL.defineLine("consaddline", {
  field: "fwf",
  local: {
    fwf: {
      setAs: "$BASICBUYERADDRESS"
    }
  }
});

TDL.defineLine("CONSphline", {
  field: "fwf",
  local: {
    fwf: {
      setAs: "if $$isempty:($LedgerMobile:ledger:$BASICBUYERNAME) then \"\" else \"Ph :\"+$LedgerPhone:ledger:$BASICBUYERNAME+\" \"+$LedgerMobile:ledger:$BASICBUYERNAME"
    }
  },
  spaceTop: 0.5
});

TDL.defineLine("gstconsline", {
  field: "nf,nf2",
  local: {
    nf: {
      setAs: "$cwledcity:ledger:$BASICBUYERNAME +\" \"+$Consigneepincode+\" \"+$CONSIGNEESTATENAME",
      width: 40
    },
    nf2: {
      setAs: "if $$isempty:$CONSIGNEEGSTIN then \"\" else \"GSTIN : \"+$CONSIGNEEGSTIN",
      style: "Normal Bold"
    }
  },
  spaceTop: 0.5
});

/**
 * ======================== 11. TERMS / INSTRUCTIONS BOX ========================
 */
TDL.definePart("fnsalesinvTopPart3", {
  line: "plesline,plesline1",
  border: "thin box",
  height: 3
});

TDL.defineLine("plesline", {
  field: "fwf,nf",
  local: {
    fwf: {
      setAs: "\"Please receive the undermentioned consignment and forward  by roade to\""
    },
    nf: {
      border: "thin bottom",
      width: 55
    }
  }
});

TDL.defineLine("plesline1", {
  field: "fwf",
  local: {
    fwf: {
      setAs: "\"station as per particulars give below\""
    }
  }
});

/**
 * ======================= 12. INVENTORY & ACCOUNTS =============================
 *  Inv Part (packages & instructions) + Acc Part (ledger charges)
 * -----------------------------------------------------------------------------
 */
TDL.definePart("fnsalesinvINVACCPart", {
  parts: "fnsalesinvInvPart",
  commonBorder: "Yes",
  vertical: "Yes",
  float: "No",
  border: "thin box",
  height: 6
});

/**
 * ---------- 12.1 Inventory table ---------------------------------------------
 */
TDL.definePart("fnsalesinvInvPart", {
  line: "fnsalesinvInvLineTitle,fnsalesinvInvLine",
  commonBorder: "yes",
  float: "no"
});

TDL.defineLine("fnsalesinvInvLine", {
  field: "snf,snf2,nf,numf,fwf",
  local: {
    snf: {
      setAs: "$cwnofobales"
    },
    snf2: {
      setAs: "$cwNatureOfGoods"
    },
    nf: {
      setAs: "$cwPrivateMarks"
    },
    numf: {
      setAs: "$cwValueofInsurance",
      type: "string",
      format: "\"Decimals:2,NoZero\""
    },
    fwf: {
      setAs: "$cwSpecialInstructions"
    },
    ratef: {
      type: "number",
      align: "right"
    },
    default: {
      border: "thin right"
    },
    fwf: {
      delete: {
        border: "thin right"
      }
    }
  }
});

TDL.defineLine("fnsalesinvInvLineTitle", {
  use: "fnsalesinvInvLine",
  delete: "explode",
  local: {
    default: {
      type: "string",
      lines: 0,
      align: "centre"
    },
    snf: {
      setAs: "\"No of Packages\""
    },
    snf2: {
      setAs: "\"Nature of Goods\""
    },
    nf: {
      setAs: "\"Private Marks\""
    },
    numf: {
      setAs: "\"Value Insur\""
    },
    fwf: {
      setAs: "\"Special Instructions\""
    }
  },
  border: "thin bottom"
});

/**
 * ---------- 12.2 Ledger charges table ----------------------------------------
 */
TDL.definePart("fnsalesinvACCPart", {
  line: "fnsalesinvACCLine",
  repeat: "fnsalesinvACCLine : Ledger Entries",
  scroll: "vertical",
  commonBorder: "yes",
  float: "no"
});

TDL.defineLine("fnsalesinvACCLine", {
  use: "fnsalesinvINVLINE",
  empty: "$ledgername = $partyledgername or $$issysname:$ledgername or $$isempty:$amount",
  local: {
    ratef: {
      type: "number",
      align: "right",
      format: "\"NoZero,Percentage\"",
      setAs: "$basicrateofinvoicetax"
    },
    snf: {
      setAs: "\"\""
    },
    fwf: {
      setAs: "$ledgername"
    },
    qtyf: {
      setAs: "\"\""
    }
  },
  delete: "explode"
});

/**
 * ========================== 13. FOOTER REMARKS ================================
 */
TDL.definePart("fnsalesinvBottomPart", {
  line: "fnsalesinvTotLine"
});

TDL.defineLine("fnsalesinvTotLine", {
  field: "fwf",
  local: {
    fwf: {
      setAs: "\"Remaks : \" +$narration",
      style: "Normal Bold",
      lines: 4
    }
  }
});

/**
 * =============================================================================
 *  END OF FILE – Invoice Print-Format Overrides
 * =============================================================================
 */
