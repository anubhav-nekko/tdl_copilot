module.exports = {
  metadata: {
    name: "Party Ledger Creation Enhancements",
    author: "Khokan",
    date: "2021-03-24",
    description: "Enhances Ledger with Party Ledger creation logic including Mailing Name and PAN fields",
  },
  system: {
    formula: [
      {
        name: "cwenicforparty",
        value: "$cwenicforparty:COMPANY:##SVCURRENTCOMPANY",
      },
      {
        name: "cwledname",
        value: 'if @@cwledname1 == " " then $$value else @@cwledname1',
      },
      {
        name: "cwledname1",
        value: "@@xs1 + \"\" + @@xs2",
      },
      {
        name: "xs1",
        value: 'if not $$isempty:#maillingfield then #maillingfield else ""',
      },
      {
        name: "xs2",
        value: 'if not $$isempty:#Ledpanfield then #Ledpanfield else ""',
      },
    ],
  },
  forms: [
    {
      name: "Ledger",
      addOptions: [{ name: "newledopt", condition: "@@cwenicforparty" }],
    },
    {
      name: "newledopt",
      addParts: [{ name: "partyledcrline", position: "at beginning" }],
      locals: [
        {
          field: "mst name",
          setAs: "@@cwledname",
          setAlways: true,
          width: 60,
        },
      ],
    },
  ],
  parts: [
    {
      name: "partyledcrline",
      lines: ["partyledcrline", "panlinenew"],
    },
  ],
  lines: [
    {
      name: "partyledcrline",
      fields: ["sp", "cwlogical"],
      locals: [
        { field: "sp", setAs: '"Party Ledger Creation ?"', width: 20 },
        { field: "cwlogical", storage: "cwiscustname" },
        { field: "default", style: "Normal Bold" },
      ],
    },
    {
      name: "panlinenew",
      fields: ["sp", "maillingfield", "sp2", "Ledpanfield"],
      locals: [
        { field: "sp", setAs: '"Mailling Name"', width: 15 },
        { field: "sp2", setAs: '"PAN/IT No."', width: 15 },
        {
          field: "default",
          inactive: 'if $cwiscustname == "yes" then "no" else "yes"',
        },
      ],
    },
    {
      name: "cwLEDAddrTypeCity",
      fields: ["Medium Prompt", "snf"],
      locals: [
        { field: "Medium Prompt", setAs: "$$LocaleString:'City :'", width: "@@NameWidth" },
        { field: "Default", inactive: "NOT $$LocaleString:$CountryName == $$LocaleString:'India'" },
        { field: "snf", storage: "cwPartymultiAddressCity", style: "Normal Bold" },
      ],
    },
  ],
  fields: [
    {
      name: "maillingfield",
      use: "nf",
      setAlways: true,
      storage: "cwmaillingname",
      style: "Normal Bold",
      width: 40,
    },
    {
      name: "Ledpanfield",
      use: "nf",
      setAlways: true,
      storage: "cwledpanno",
      style: "Normal Bold",
    },
    {
      name: "LED Mailing Name",
      addOptions: [{ name: "LEDMailingNameopt", condition: "@@cwenicforparty" }],
    },
    {
      name: "LEDMailingNameopt",
      setAs: 'if not $$isempty:#maillingfield then #maillingfield else $name',
    },
    {
      name: "LED ITNo",
      addOptions: [{ name: "LEDitnoopt", condition: "@@cwenicforparty" }],
    },
    {
      name: "LEDitnoopt",
      setAs: 'if not $$isempty:#Ledpanfield then #Ledpanfield else $$value',
      setAlways: true,
    },
  ],
  partModifications: [
    {
      name: "LED AddrTypeStatePinCode",
      addLine: {
        position: "before",
        targetLine: "LED AddrTypePinCode",
        newLine: "cwLEDAddrTypeCity",
      },
    },
  ],
};
