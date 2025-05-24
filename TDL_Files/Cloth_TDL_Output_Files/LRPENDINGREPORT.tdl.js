/**
 * ==============================================================================
 *  "LR Report" Menu & Report customisation
 *  --------------------------------------------------------------------------
 *  • Original Snippet Date : 25-Aug-2021
 * -----------------------------------------------------------------------------
 */

/**
 * ==============================================================================
 * 1.  MAIN MENU HOOKS
 * ==============================================================================
 */

TDL.addMenu("Gateway of Tally", {
  // Top-level Gateway menu
  // {25.Aug.21 17:28} add: Option: LrreportLock // : @@LrreportDemoLock
  // When active, will create a child menu "LrreportLock" (see section 1.2).
  // Demo lock logic can be re-enabled by setting @@LrreportDemoLock formula.
});

/**
 * ------------------------- 1.1  Debug Menu hook --------------------------------
 */
TDL.addMenu("cw_Debug_menu", {
  // An existing custom menu
  // {25.Aug.21 17:28} add: Item: before: @@locQuit: @@LrreportReport: Display: RepLrreport
  // Adds "LR Report" item just above the quit option inside debug menu.
});

/**
 * ------------------------- 1.2  Child Menu definition --------------------------
 */
TDL.defineMenu("LrreportLock", {
  // Shows when option added
  add: {
    item: {
      before: "@@locQuit",
      value: "@@LrreportReport: Display: RepLrreport"
    }
  },
  add: {
    item: {
      before: "@@locQuit",
      value: "Blank"
    }
  }
  // Provides "LR Report" and a blank spacer right before Quit
});

/**
 * ------------------------------------------------------------------------------
 * 1.3  Formula names for menu captions / demo lock
 * ------------------------------------------------------------------------------
 */
TDL.defineSystemFormula({
  LrreportReport: "\"LR Report\"" // Caption text
  // LrreportDemoLock: "$$MachineDate < $$Date:\"01/04/2013\"" // Demo expiry logic
});

/**
 * ==============================================================================
 * 2.  REPORT SHELL & BASIC PROPERTIES
 * ==============================================================================
 */
TDL.defineReport("RepLrreport", {
  use: "Dsp Template",
  title: "@@LrreportReport",
  printset: {
    "Report Title": "@@LrreportReport"
  },
  form: "FrmLrreport",
  export: "Yes",
  set: {
    svfromdate: "##svcurrentdate",
    svTodate: "##svcurrentdate"
  },
  local: {
    button: {
      RelReports: {
        inactive: "Yes"
      }
    }
  }
  // Uses default display template but locks "Related Reports" button.
});

/**
 * ==============================================================================
 * 3.  MAIN FORM LAYOUT
 * ==============================================================================
 */
TDL.defineForm("FrmLrreport", {
  use: "DSP Template",
  part: "DspAccTitles, PrtTitle0Lrreport, PrtLrreport",
  width: "100% Page",
  height: "100% Page",
  background: "@@SV_STOCKSUMMARY",
  delete: {
    "page break": true
  },
  add: {
    "page break": "Lrreportbotbrk, LrreportbotOpbrk"
  },
  "Bottom Toolbar Buttons": "BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12"
  // BottomToolBarBtn2, BottomToolBarBtn4, BottomToolBarBtn5,BottomToolBarBtn6, BottomToolBarBtn7,
  // 1 Quit, 2 Accept, 3 Delete, 4 Cancel, 5 Duplicate Voucher, 6 Add Voucher, 7 Insert Voucher, 8 Remove Line, 9 Restore Line, 10 Restore all, 11 Select, 12 Select All
  // local : button : report config : action :modify variable: MyPLConfigure
});

// Custom print styles for company-name / address / titles
TDL.addFormLocal("FrmLrreport", {
  part: {
    DSPCompanyName: {
      line: {
        DSPCompanyName: {
          field: {
            "DSP CompanyName": {
              printStyle: "styleCalisto2"
            }
          }
        }
      }
    },
    DSPCompanyAddress: {
      line: {
        DSPCompanyAddress: {
          field: {
            DSPCompanyAddress: {
              printStyle: "style2n"
            }
          }
        }
      }
    },
    DSPReportTitle: {
      line: {
        DSPReportName: {
          field: {
            DSPReportName: {
              printStyle: "style3n"
            }
          }
        }
      }
    },
    DSPReportSubTitle: {
      line: {
        DSPReportSubTitle: {
          field: {
            DSPReportSubTitle: {
              printStyle: "style2n"
            }
          }
        }
      }
    },
    DSPReportTitle: {
      line: {
        DSPReportPeriod: {
          field: {
            DSPReportPeriod: {
              printStyle: "style2n" // Local: Field: DSPReportPeriod:border:thin box
            }
          }
        }
      }
    },
    DSPPageNo: {
      line: {
        DSPPageNo: {
          field: {
            DSPPageNo: {
              printStyle: "style2n"
            }
          }
        }
      }
    }
  }
});

/**
 * ==============================================================================
 * 4.  FOOTER & TITLE PARTS
 * ==============================================================================
 */
TDL.definePart("LrreportbotBrk", {
  line: "EXPINV PageBreak",
  border: "thin top"
});

TDL.definePart("Lrreportbotopbrk", {
  use: "dspacctitles",
  add: {
    part: "LrreportTitlePart"
  }
});

TDL.definePart("LrreportTitlePart", {
  line: "LnLrreportTitle"
});

TDL.defineLine("LnLrreportCurrPeriod", {
  field: "fwf, fwf2",
  local: {
    fwf2: {
      align: "Right",
      style: "style3x",
      setAs: "@@dspDateStr"
    },
    fwf: {
      style: "style3x"
    }
  },
  invisible: "$$inprintmode"
});

TDL.definePart("PrtTitle0Lrreport", {
  line: "LnLrreportCurrPeriod"
});

/**
 * ==============================================================================
 * 5.  BODY PART – TABULAR DETAILS
 * ==============================================================================
 */
TDL.definePart("PrtLrreport", {
  line: "LnLrreportTitle, LnLrreport",
  bottomLine: "LnLrreportTotals",
  repeat: "LnLrreport : ColLrreport",
  scroll: "Vertical",
  commonBorder: "Yes",
  total: "Qtyf, amtf"
});

/**
 * ----------------------- 5.1  Data Collection ----------------------------------
 */
TDL.defineCollection("ColLrreport", {
  use: "Vouchers of Company",
  delete: {
    filter: "daybookfilter"
  },
  filter: "ColLrreportFilter, ColLrreportFilter2, IsNonOptionalCancelledVchs",
  fetch: "BASICFINALDESTINATION, BILLOFLADINGNO, BILLOFLADINGDATE, CWTEMPGSTEWAYTRANSPORTERNAME"
});

TDL.defineSystemFormula({
  ColLrreportFilter: "$$issales:$vouchertypename",
  ColLrreportFilter2: "not $$isempty:$CWTEMPGSTEWAYTRANSPORTERNAME"
});

/**
 * ----------------------- 5.2  Title Row Layout ----------------------------------
 */
TDL.defineLine("LnLrreportTitle", {
  use: "LnLrreport",
  option: "titleopt",
  // Field captions
  local: {
    sdf: {
      setAs: "\"Date\"",
      style: "style2x"
    },
    snf: {
      setAs: "\"Invoice No.\"",
      style: "style2x"
    },
    fwf: {
      setAs: "\"Party Name\"",
      style: "style2x",
      align: "Left"
    },
    snf2: {
      setAs: "\"Area\"",
      style: "style2x"
    },
    snf3: {
      setAs: "\"Booked To\"",
      style: "style2x"
    },
    snf4: {
      setAs: "\"B/L\"",
      style: "style2x"
    },
    qtyf: {
      setAs: "\"Pcs\"",
      style: "style2x"
    },
    snf5: {
      setAs: "\"Transport Name\"",
      style: "style2x"
    },
    snf6: {
      setAs: "\"Dispatch From\"",
      style: "style2x"
    },
    snf7: {
      setAs: "\"LR No\"",
      style: "style2x",
      delete: {
        storage: true
      }
    },
    sdf2: {
      setAs: "\"LR Date\"",
      style: "style2x",
      delete: {
        storage: true
      }
    },
    default: {
      style: "Normal Bold",
      align: "Centre"
    },
    qtyf2: {
      style: "style2x"
    }
  }
});

/**
 * ----------------------- 5.3  Detail Row Layout --------------------------------
 */
TDL.defineLine("LnLrreport", {
  fields: "sdf, snf, fwf",
  rightField: "snf2, snf3, SNF4, qtyf, snf5, snf6, snf7, sdf2",
  option: "Alter on Enter",
  local: {
    // Numeric formats & rate/pcs calc
    qtyf: {
      format: "\"NoSymbol, Short Form, No Compact,NoZero\"",
      setAs: "$$CollQtyTotal:inventoryentries:$billedqty",
      skip: "Yes",
      style: "style3x",
      border: "thin right"
    },
    qtyf2: {
      format: "\"NoSymbol, Short Form, No Compact,NoZero\"",
      type: "Secondary units",
      style: "style3x"
    },
    ratepf: {
      setAs: "#amtf / #qtyf"
    },
    
    // Double-click alter voucher on party-name
    fwf: {
      alter: "voucher : $$isvoucher",
      setAs: "$partyledgername",
      skip: "Yes",
      style: "style3x",
      border: "thin right"
    },
    
    // Populate column values from voucher
    sdf: {
      setAs: "$date",
      skip: "Yes",
      style: "style3x",
      border: "thin right"
    },
    snf: {
      setAs: "$vouchernumber",
      skip: "Yes",
      style: "style3x",
      border: "thin right"
    },
    snf1: {
      skip: "Yes",
      style: "style3x",
      border: "thin right"
    },
    snf2: {
      setAs: "$cwledcity:ledger:$partyledgername",
      skip: "Yes",
      style: "style3x",
      border: "thin right"
    },
    snf3: {
      setAs: "$BASICFINALDESTINATION",
      skip: "Yes",
      style: "style3x",
      border: "thin right"
    },
    snf4: {
      // {25.Aug.21 16:58} local:field: SNF4: set as:""
      setAs: "$cwnofobales",
      skip: "Yes",
      style: "style3x",
      border: "thin right"
    },
    snf5: {
      setAs: "$CWTEMPGSTEWAYTRANSPORTERNAME",
      skip: "Yes",
      style: "style3x",
      border: "thin right"
    },
    snf6: {
      setAs: "$$CollectionField:$godownname:First:inventoryentries",
      skip: "Yes",
      style: "style3x",
      border: "thin right"
    },
    snf7: {
      setAs: "$BILLOFLADINGNO",
      storage: "BILLOFLADINGNO",
      style: "style3x",
      border: "thin right"
    },
    sdf2: {
      setAs: "$BILLOFLADINGDATE",
      storage: "BILLOFLADINGDATE",
      style: "style3x",
      border: "thin right"
    },
    default: {
      style: "style3x",
      border: "thin right"
    }
  },
  border: "thin bottom"
});

/**
 * ----------------------- 5.4  Totals Row ---------------------------------------
 */
TDL.defineLine("LnLrreportTotals", {
  use: "LnLrreport",
  option: "totalOpt",
  local: {
    fwf: {
      align: "Right",
      setAs: "\"\"" // First set as "Total" then overridden to empty
    },
    default: {
      style: "Normal Bold"
    },
    qtyf: {
      setAs: "$$total:qtyf",
      style: "style2x"
    },
    amtf: {
      setAs: "$$total:amtf"
    },
    
    // Repeat header styling so totals match visual theme
    qtyf2: {
      type: "String",
      style: "style2x"
    },
    sdf: {
      style: "style2x"
    },
    sdf2: {
      style: "style2x"
    },
    snf: {
      style: "style2x"
    },
    snf2: {
      style: "style2x"
    },
    snf3: {
      style: "style2x"
    },
    snf4: {
      style: "style2x"
    },
    snf5: {
      style: "style2x"
    },
    snf6: {
      style: "style2x"
    },
    snf7: {
      style: "style2x"
    }
  }
});

/**
 * ==============================================================================
 *                               END OF FILE
 * ==============================================================================
 */
