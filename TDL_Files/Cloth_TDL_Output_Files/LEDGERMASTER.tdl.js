/**
 * ==============================================================================
 *  Custom Ledger & Voucher Enhancements for "Minu Saree" Add-on
 *  --------------------------------------------------------------------------
 *  • Original Author : Khokan (09-Feb-2021)
 *  • Toggle Feature  : Controlled by logical report-level formula
 *        @@MinuSareeEnabled
 *  • Major Features  :
 *      – Discount-% and Transporter-Name fields in Ledger master
 *      – Optional flags to enable Item/Voucher/Party discounts
 *      – City field in Mailing Address
 *      – Six (extendable to ten) user-defined captions at master & voucher
 *        level, with auto-filtered selection lists
 *      – Voucher Cost-Allocation screen patched to show / store those captions
 * -----------------------------------------------------------------------------
 */

/**
 * ============================= 1. LEDGER MASTER – SUNDRY ======================
 */
TDL.addPart("MST LED Explode Sundry", {
  // Add new controls inside Std ledger explode
  option: "cwMSTLEDDetailsoptnew:@@MinuSareeEnabled"
});

TDL.definePart("cwMSTLEDDetailsoptnew", {
  // Executes only when feature ON
  line: "msdiscline,cwTransporternameLEDline"
});

/**
 * ---------------------- 1.1  Discount % (numeric) ----------------------------
 */
TDL.defineLine("msdiscline", {
  field: "long prompt,numf",
  local: {
    "long prompt": {
      setAs: "\"Discount %\""
    },
    numf: {
      storage: "cwdiscper", // Numeric storage
      style: "Normal Bold",
      align: "left",
      format: "\"percentage\""
    }
  }
});

/**
 * ---------------------- 1.2  Transporter Name (ledger) -----------------------
 */
TDL.defineLine("cwTransporternameLEDline", {
  field: "Medium Prompt,nf",
  local: {
    "Medium Prompt": {
      setAs: "$$LocaleString:\"Transporter Name\""
    },
    nf: {
      storage: "cwtempGSTewayTransporterName",
      style: "Normal Bold",
      table: "collTransporternled,Not Applicable",
      "Show table": "Always",
      key: "Create Ledger, Alter Ledger", // Create/alter keys
      variable: "SV Ledger"
    }
  }
});

/**
 * ------------- Collection holding only transporter-group ledgers -------------
 */
TDL.defineCollection("collTransporternled", {
  type: "ledger",
  title: "\"List of Transporter Name\"",
  childOf: "\"Transporter\""
});

/**
 * ==============================================================================
 * ================ 2. LEDGER MASTER – (Indirect Exp / Sales) ===================
 */
TDL.addPart("MST LED Explode IndirExp", {
  option: "cwMSTLEDDetailsoptnewopt:@@MinuSareeEnabled"
});

TDL.addPart("MST LED Explode Sales", {
  option: "cwMSTLEDDetailsoptnewopt:@@MinuSareeEnabled"
});

TDL.definePart("cwMSTLEDDetailsoptnewopt", {
  line: "enabledisline,enableProductdisline,enablevchlevline"
});

/**
 * ------------------- 2.1 Party-wise Discount flag ----------------------------
 */
TDL.defineLine("enabledisline", {
  field: "long prompt,cwlogical",
  local: {
    "long prompt": {
      setAs: "\"Use for Partywise Discount:\""
    },
    cwlogical: {
      storage: "cwdiscpernew"
    },
    default: {
      style: "Normal Bold"
    }
  }
});

/**
 * ------------------- 2.2 Product-wise Discount flag --------------------------
 */
TDL.defineLine("enableProductdisline", {
  field: "long prompt,cwlogical",
  local: {
    "long prompt": {
      setAs: "\"Use for Productwise Discount:\""
    },
    cwlogical: {
      storage: "cwproductdiscpernew"
    },
    default: {
      style: "Normal Bold"
    }
  }
});

/**
 * ------------------- 2.3 Voucher-level Discount flag -------------------------
 */
TDL.defineLine("enablevchlevline", {
  field: "long prompt,cwlogical",
  local: {
    "long prompt": {
      setAs: "\"Use for Vch Level Discount (Qty X Rate):\""
    },
    cwlogical: {
      storage: "cwuseforvchlevdisc"
    },
    default: {
      style: "Normal Bold"
    }
  }
});

/**
 * ==============================================================================
 * ====================== 3. LEDGER – MAILING ADDRESS ==========================
 */
TDL.addPart("LED Mailing Address", {
  option: "cwLEDMailingAddressnew:@@MinuSareeEnabled"
});

TDL.definePart("cwLEDMailingAddressnew", {
  bottomLine: {
    after: "LEDState",
    value: "ledcityline"
  }
});

/**
 * ---------------------- 3.1 City Field in Address ----------------------------
 */
TDL.defineLine("ledcityline", {
  fields: "Medium Prompt,snf",
  local: {
    "Medium Prompt": {
      setAs: "$$LocaleString:\"City\""
    },
    snf: {
      storage: "cwledcity",
      style: "Normal Bold"
    }
  }
  // Optional dynamic city list removed (commented)
});

/**
 * ==============================================================================
 * ====================== 4. MASTER "Details" CAPTIONS =========================
 */
TDL.addPart("MST LED Details", {
  option: "cwMSTLEDDetailsopt:@@MinuSareeEnabled"
});

TDL.addPart("MST LED Explode Sundry", {
  option: "cwMSTLEDDetailsopt:@@MinuSareeEnabled"
});

TDL.definePart("cwMSTLEDDetailsopt", {
  /**
   * *** IMPORTANT *** : Up to ten dynamic captions (itemcaption1-itemcaption10).
   * First 6 are active; 7-10 remain disabled unless Company level caption text
   * is provided. Each caption inherits its lookup type (CostCentre / StockCat /
   * Ledger) from separate company-level table-type field.
   */
  line: "itemcaption1,itemcaption2,itemcaption3,itemcaption4,itemcaption5,itemcaption6"
});

/**
 * -------------------- 4.0 Section Label "Machine Details" --------------------
 */
TDL.defineLine("MachineDetails1", {
  field: "fwfc",
  local: {
    fwfc: {
      info: "\"Machine Details\"",
      border: "thin bottom",
      style: "Normal Bold"
    }
  }
});

/**
 * -------------------- 4.1 Caption-1 (dynamic) --------------------------------
 */
TDL.defineLine("itemcaption1", {
  field: "sp,nf",
  local: {
    sp: {
      setAs: "$cwcaption1:COMPANY:##SVCURRENTCOMPANY",
      width: 28
    },
    nf: {
      storage: "cwcaption1item",
      table: "cwcaption1tableundercc,Not Applicable:$cwcaption1table:COMPANY:##SVCURRENTCOMPANY=\"Cost Centre\"",
      "Show table": "Always",
      style: "Normal Bold"
    }
  },
  spaceTop: 0.5
});

// Lookup table selection logic based on company config
TDL.addField("itemcaption1.nf", {
  table: "cwcaption1tableundersc,Not Applicable:$cwcaption1table:COMPANY:##SVCURRENTCOMPANY=\"Stock Category\"",
  table: "cwcaption1tableunderled,Not Applicable:$cwcaption1table:COMPANY:##SVCURRENTCOMPANY=\"ledger\"",
  option: "optcc:$cwcaption1table:COMPANY:##SVCURRENTCOMPANY=\"Cost Centre\"",
  option: "optsc:$cwcaption1table:COMPANY:##SVCURRENTCOMPANY=\"Stock Category\"",
  option: "optled:$cwcaption1table:COMPANY:##SVCURRENTCOMPANY=\"ledger\""
});

/**
 * ---- Option definitions for CostCentre / StockCat / Ledger ------------------
 */
TDL.defineField("optcc", {
  variable: "svcost centre",
  key: "Create Cost Centre, Alter CstCtr"
});

TDL.defineField("optsc", {
  keys: "Create Stock Category, Alter StkCat",
  variable: "SV Stock Category"
});

TDL.defineField("optled", {
  keys: "Create Ledger, Alter Ledger",
  variable: "SVLedger"
});

/**
 * ---- Collections that feed the lookup tables --------------------------------
 */
TDL.defineCollection("cwcaption1tableunderled", {
  type: "ledger",
  title: "\"List of \"+@@cwcaption1title",
  childOf: "@@cwcaption1tableundernew"
});

TDL.defineCollection("cwcaption1tableundersc", {
  type: "Stock Category",
  title: "\"List of \"+@@cwcaption1title",
  childOf: "@@cwcaption1tableundernew"
});

TDL.defineCollection("cwcaption1tableundercc", {
  type: "Cost Centre",
  title: "\"List of \"+@@cwcaption1title",
  childOf: "@@cwcaption1tableundernew"
});

TDL.defineSystemFormula({
  cwcaption1title: "$cwcaption1:COMPANY:##SVCURRENTCOMPANY",
  cwcaption1tableundernew: "$cwcaption1tableunder:COMPANY:##SVCURRENTCOMPANY"
});

/**
 * -------------------- 4.2 Caption-2 (dynamic) --------------------------------
 */
TDL.defineLine("itemcaption2", {
  field: "sp,nf",
  local: {
    sp: {
      setAs: "$cwcaption2:COMPANY:##SVCURRENTCOMPANY",
      width: 28
    },
    nf: {
      storage: "cwcaption2item",
      table: "cwcaption2tableundercc,Not Applicable:$cwcaption2table:COMPANY:##SVCURRENTCOMPANY=\"Cost Centre\"",
      "Show table": "Always",
      style: "Normal Bold"
    }
  },
  removeIf: "$$isempty:$cwcaption1:COMPANY:##SVCURRENTCOMPANY",
  spaceTop: 0.5
});

// Identical table/option logic as Caption-1 but bound to *2* variables
TDL.addField("itemcaption2.nf", {
  table: "cwcaption2tableundersc,Not Applicable:$cwcaption2table:COMPANY:##SVCURRENTCOMPANY=\"Stock Category\"",
  table: "cwcaption2tableunderled,Not Applicable:$cwcaption2table:COMPANY:##SVCURRENTCOMPANY=\"ledger\"",
  option: "optcc:$cwcaption2table:COMPANY:##SVCURRENTCOMPANY=\"Cost Centre\"",
  option: "optsc:$cwcaption2table:COMPANY:##SVCURRENTCOMPANY=\"Stock Category\"",
  option: "optled:$cwcaption2table:COMPANY:##SVCURRENTCOMPANY=\"ledger\""
});

TDL.defineCollection("cwcaption2tableunderled", {
  type: "ledger",
  title: "\"List of \"+@@cwcaption2title",
  childOf: "@@cwcaption2tableundernew"
});

TDL.defineCollection("cwcaption2tableundersc", {
  type: "Stock Category",
  title: "\"List of \"+@@cwcaption2title",
  childOf: "@@cwcaption2tableundernew"
});

TDL.defineCollection("cwcaption2tableundercc", {
  type: "Cost Centre",
  title: "\"List of \"+@@cwcaption2title",
  childOf: "@@cwcaption2tableundernew"
});

TDL.defineSystemFormula({
  cwcaption2title: "$cwcaption2:COMPANY:##SVCURRENTCOMPANY",
  cwcaption2tableundernew: "$cwcaption2tableunder:COMPANY:##SVCURRENTCOMPANY"
});

/**
 * -------------------- 4.3 Caption-3 (dynamic) --------------------------------
 */
TDL.defineLine("itemcaption3", {
  field: "sp,nf",
  local: {
    sp: {
      setAs: "$cwcaption3:COMPANY:##SVCURRENTCOMPANY",
      type: "String:forced",
      width: 28
    },
    nf: {
      storage: "cwcaption3item",
      table: "cwcaption3tableundercc,Not Applicable:$cwcaption3table:COMPANY:##SVCURRENTCOMPANY=\"Cost Centre\"",
      "Show table": "Always",
      style: "Normal Bold"
    }
  },
  removeIf: "$$isempty:$cwcaption2:COMPANY:##SVCURRENTCOMPANY",
  spaceTop: 0.5
});

TDL.addField("itemcaption3.nf", {
  table: "cwcaption3tableundersc,Not Applicable:$cwcaption3table:COMPANY:##SVCURRENTCOMPANY=\"Stock Category\"",
  table: "cwcaption3tableunderled,Not Applicable:$cwcaption3table:COMPANY:##SVCURRENTCOMPANY=\"ledger\"",
  option: "optcc:$cwcaption3table:COMPANY:##SVCURRENTCOMPANY=\"Cost Centre\"",
  option: "optsc:$cwcaption3table:COMPANY:##SVCURRENTCOMPANY=\"Stock Category\"",
  option: "optled:$cwcaption3table:COMPANY:##SVCURRENTCOMPANY=\"ledger\""
});

TDL.defineCollection("cwcaption3tableunderledccc", {
  // Reserved (not used)
  type: "ledger"
});

TDL.defineCollection("cwcaption3tableunderled", {
  type: "ledger",
  title: "\"List of \"+@@cwcaption3title",
  childOf: "@@cwcaption3tableundernew"
});

TDL.defineCollection("cwcaption3tableundersc", {
  type: "Stock Category",
  title: "\"List of \"+@@cwcaption3title",
  childOf: "@@cwcaption3tableundernew"
});

TDL.defineCollection("cwcaption3tableundercc", {
  type: "Cost Centre",
  title: "\"List of \"+@@cwcaption3title",
  childOf: "@@cwcaption3tableundernew"
});

TDL.defineSystemFormula({
  cwcaption3title: "$cwcaption3:COMPANY:##SVCURRENTCOMPANY",
  cwcaption3tableundernew: "$cwcaption3tableunder:COMPANY:##SVCURRENTCOMPANY"
});

/**
 * -------------------- 4.4 Caption-4 (dynamic) --------------------------------
 */
TDL.defineLine("itemcaption4", {
  field: "sp,nf",
  local: {
    sp: {
      setAs: "$cwcaption4:COMPANY:##SVCURRENTCOMPANY",
      width: 28
    },
    nf: {
      storage: "cwcaption4item",
      table: "cwcaption4tableundercc,Not Applicable:$cwcaption4table:COMPANY:##SVCURRENTCOMPANY=\"Cost Centre\"",
      "Show table": "Always",
      style: "Normal Bold"
    }
  },
  removeIf: "$$isempty:$cwcaption3:COMPANY:##SVCURRENTCOMPANY",
  spaceTop: 0.5
});

TDL.addField("itemcaption4.nf", {
  table: "cwcaption4tableundersc,Not Applicable:$cwcaption4table:COMPANY:##SVCURRENTCOMPANY=\"Stock Category\"",
  table: "cwcaption4tableunderled,Not Applicable:$cwcaption4table:COMPANY:##SVCURRENTCOMPANY=\"ledger\"",
  option: "optcc:$cwcaption4table:COMPANY:##SVCURRENTCOMPANY=\"Cost Centre\"",
  option: "optsc:$cwcaption4table:COMPANY:##SVCURRENTCOMPANY=\"Stock Category\"",
  option: "optled:$cwcaption4table:COMPANY:##SVCURRENTCOMPANY=\"ledger\""
});

TDL.defineCollection("cwcaption4tableunderled", {
  type: "ledger",
  title: "\"List of \"+@@cwcaption4title",
  childOf: "@@cwcaption4tableundernew"
});

TDL.defineCollection("cwcaption4tableundersc", {
  type: "Stock Category",
  title: "\"List of \"+@@cwcaption4title",
  childOf: "@@cwcaption4tableundernew"
});

TDL.defineCollection("cwcaption4tableundercc", {
  type: "Cost Centre",
  title: "\"List of \"+@@cwcaption4title",
  childOf: "@@cwcaption4tableundernew"
});

TDL.defineSystemFormula({
  cwcaption4title: "$cwcaption4:COMPANY:##SVCURRENTCOMPANY",
  cwcaption4tableundernew: "$cwcaption4tableunder:COMPANY:##SVCURRENTCOMPANY"
});

/**
 * -------------------- 4.5 Caption-5 (dynamic) --------------------------------
 */
TDL.defineLine("itemcaption5", {
  field: "sp,nf",
  local: {
    sp: {
      setAs: "$cwcaption5:COMPANY:##SVCURRENTCOMPANY",
      width: 28
    },
    nf: {
      storage: "cwcaption5item",
      table: "cwcaption5tableundercc,Not Applicable:$cwcaption5table:COMPANY:##SVCURRENTCOMPANY=\"Cost Centre\"",
      "Show table": "Always",
      style: "Normal Bold"
    }
  },
  removeIf: "$$isempty:$cwcaption4:COMPANY:##SVCURRENTCOMPANY",
  spaceTop: 0.5
});

TDL.addField("itemcaption5.nf", {
  table: "cwcaption5tableundersc,Not Applicable:$cwcaption5table:COMPANY:##SVCURRENTCOMPANY=\"Stock Category\"",
  table: "cwcaption5tableunderled,Not Applicable:$cwcaption5table:COMPANY:##SVCURRENTCOMPANY=\"ledger\"",
  option: "optcc:$cwcaption5table:COMPANY:##SVCURRENTCOMPANY=\"Cost Centre\"",
  option: "optsc:$cwcaption5table:COMPANY:##SVCURRENTCOMPANY=\"Stock Category\"",
  option: "optled:$cwcaption5table:COMPANY:##SVCURRENTCOMPANY=\"ledger\""
});

TDL.defineCollection("cwcaption5tableunderled", {
  type: "ledger",
  title: "\"List of \"+@@cwcaption5title",
  childOf: "@@cwcaption5tableundernew"
});

TDL.defineCollection("cwcaption5tableundersc", {
  type: "Stock Category",
  title: "\"List of \"+@@cwcaption5title",
  childOf: "@@cwcaption5tableundernew"
});

TDL.defineCollection("cwcaption5tableundercc", {
  type: "Cost Centre",
  title: "\"List of \"+@@cwcaption5title",
  childOf: "@@cwcaption5tableundernew"
});

TDL.defineSystemFormula({
  cwcaption5title: "$cwcaption5:COMPANY:##SVCURRENTCOMPANY",
  cwcaption5tableundernew: "$cwcaption5tableunder:COMPANY:##SVCURRENTCOMPANY"
});

/**
 * -------------------- 4.6 Caption-6 (dynamic) --------------------------------
 */
TDL.defineLine("itemcaption6", {
  field: "sp,nf",
  local: {
    sp: {
      setAs: "$cwcaption6:COMPANY:##SVCURRENTCOMPANY",
      width: 28
    },
    nf: {
      storage: "cwcaption6item",
      table: "cwcaption6tableundercc,Not Applicable:$cwcaption6table:COMPANY:##SVCURRENTCOMPANY=\"Cost Centre\"",
      "Show table": "Always",
      style: "Normal Bold"
    }
  },
  removeIf: "$$isempty:$cwcaption5:COMPANY:##SVCURRENTCOMPANY",
  spaceTop: 0.5
});

TDL.addField("itemcaption6.nf", {
  table: "cwcaption6tableundersc,Not Applicable:$cwcaption6table:COMPANY:##SVCURRENTCOMPANY=\"Stock Category\"",
  table: "cwcaption6tableunderled,Not Applicable:$cwcaption6table:COMPANY:##SVCURRENTCOMPANY=\"ledger\"",
  option: "optcc:$cwcaption6table:COMPANY:##SVCURRENTCOMPANY=\"Cost Centre\"",
  option: "optsc:$cwcaption6table:COMPANY:##SVCURRENTCOMPANY=\"Stock Category\"",
  option: "optled:$cwcaption6table:COMPANY:##SVCURRENTCOMPANY=\"ledger\""
});

TDL.defineCollection("cwcaption6tableunderled", {
  type: "ledger",
  title: "\"List of \"+@@cwcaption6title",
  childOf: "@@cwcaption6tableundernew"
});

TDL.defineCollection("cwcaption6tableundersc", {
  type: "Stock Category",
  title: "\"List of \"+@@cwcaption6title",
  childOf: "@@cwcaption6tableundernew"
});

TDL.defineCollection("cwcaption6tableundercc", {
  type: "Cost Centre",
  title: "\"List of \"+@@cwcaption6title",
  childOf: "@@cwcaption6tableundernew"
});

TDL.defineSystemFormula({
  cwcaption6title: "$cwcaption6:COMPANY:##SVCURRENTCOMPANY",
  cwcaption6tableundernew: "$cwcaption6tableunder:COMPANY:##SVCURRENTCOMPANY"
});

/**
 * Note: Caption-7 / 8 / 9 / 10 blocks would be retained exactly as original
 * but are not included in this conversion as they were truncated in the source.
 */
