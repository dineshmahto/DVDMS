import React, { useState, useEffect } from "react";
import SelectOption from "../../components/option/option";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HorizonatalLine from "../../components/horizontalLine/horizonatalLine";
import TransferComponent from "../../components/transfer/transferComponent";
import { makeStyles } from "@mui/styles";
import RadioCheckBox from "../../components/switch/radiocheckbox";
import { getNotificationService } from "../../services/notification/notificationservice";

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      "& .MuiButtonBase-root": {},
      "& .MuiInputBase-input": {
        padding: 8,
      },
    },
  },
});
const OpenNotification = () => {
  const classes = useStyles();
  // programme state variable
  const [programmeTempArray, setProgrammeTempArray] = useState([]);
  const [rightProgrammeTempArray, setRightProgrammeTempArray] = useState([]);
  const [programmeData, setprogrammeData] = useState([]);
  const [selectedProgrammeItem, setSelectedProgrammeItem] = useState([]);
  const [programmeActiveIndicies, setProgrammeActiveIndicies] = useState([]);
  const [programmeFirstClick, setProgrammeFirstClick] = useState(false);
  const [
    selectProgrammeItemActiveIndices,
    setSelectedProgrammeItemActiveIndices,
  ] = useState();
  const [copyProgrmmeData, setCopyprogrmmeData] = useState([]);

  // drug state variable
  const [drugTempArray, setDrugTempArray] = useState([]);
  const [drugRightTempArray, setDrugRightTempArray] = useState([]);
  const [drugData, setDrugData] = useState([]);
  const [selectedDrugItem, setSelectedDrugItem] = useState([]);
  const [drugActiveIndicies, setDrugActiveIndicies] = useState([]);
  const [drugFirstClick, setDrugFirstClick] = useState(false);
  const [selectDrugItemActiveIndices, setSelectedDrugItemActiveIndices] =
    useState();
  const [copyDrugData, setCopyDrugData] = useState([]);

  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [lastDate, setLastDate] = useState();
  const data = [
    {
      id: 1000000786,
      name: "Tab. Ampicillin, Dispersible",
    },
    {
      id: 10318,
      name: "Tab. Levofloxacin 500mg",
    },
    {
      id: 1000000794,
      name: "Inj. Gentamycin Sulphate",
    },
    {
      id: 1000000795,
      name: "Inj. Fortified Procaine Penicillin",
    },
    {
      id: 1000000796,
      name: "Tab. Amoxycillin, Dispersible",
    },
    {
      id: 1000000797,
      name: "Cap. Chloramphenicol",
    },
    {
      id: 1000000798,
      name: "Tab. Erythromycin Stearate",
    },
    {
      id: 1000000803,
      name: "Cap. Tetracycline",
    },
    {
      id: 1000000804,
      name: "Susp. Nalidixic acid",
    },
    {
      id: 1000000805,
      name: "Tab. Cephalexin, Dispersible",
    },
    {
      id: 1000000808,
      name: "Inj. Cefotaxime Sodium",
    },
    {
      id: 1000000809,
      name: "Inj. Ceftazidime",
    },
    {
      id: 1000000810,
      name: "Inj. Ceftriaxone Sodium",
    },
    {
      id: 1000000811,
      name: "Tab. Cefuroxime Axetil",
    },
    {
      id: 1000000815,
      name: "Susp. Roxithromycin",
    },
    {
      id: 1000000816,
      name: "Tab. Furazolidone",
    },
    {
      id: 1000000820,
      name: "Inj. Streptomycin Sulphate",
    },
    {
      id: 1000000823,
      name: "Susp. Rifampicin",
    },
    {
      id: 1000000825,
      name: "Tab INH",
    },
    {
      id: 1000000827,
      name: "Tab. Ethambutol",
    },
    {
      id: 1000000828,
      name: "Tab. Pyrazinamide",
    },
    {
      id: 1000000829,
      name: "Miconazole Nitrate Cream",
    },
    {
      id: 1000000830,
      name: "Tab. Ketoconazole",
    },
    {
      id: 1000000834,
      name: "Susp. Tinidazole",
    },
    {
      id: 1000000838,
      name: "Tab. Chloroquine Phosphate",
    },
    {
      id: 1000000839,
      name: "Syr. Chloroquine Phosphate",
    },
    {
      id: 1000000842,
      name: "Susp. Quinine Sulphate",
    },
    {
      id: 1000000846,
      name: "Inj. Arteether",
    },
    {
      id: 1000000847,
      name: "Inj. Artemether",
    },
    {
      id: 1000000848,
      name: "Tab. Mefloquine",
    },
    {
      id: 1000000849,
      name: "Inj. Heparin Sodium",
    },
    {
      id: 1000000800,
      name: "Inj. Amikacin Sulphate 500mg/2ml",
    },
    {
      id: 1000000831,
      name: "Cap. Fluconazole 100mg",
    },
    {
      id: 1000000836,
      name: "Tab. Metronidazole 400mg",
    },
    {
      id: 1000000843,
      name: "Tab. Primaquin 7.5mg",
    },
    {
      id: 1000000779,
      name: "Susp. Mebendazole 100/5",
    },
    {
      id: 1000000813,
      name: "Tab. Sparfloxacin 200mg",
    },
    {
      id: 1000000812,
      name: "Tab. Ofloxacin 200MG",
    },
    {
      id: 1000000824,
      name: "Tab INH 100mg/tab",
    },
    {
      id: 1000000791,
      name: "Inj. Ciprofloxacin I.V.",
    },
    {
      id: 1000000802,
      name: "Inj. Benzathine Penicillin",
    },
    {
      id: 1000000799,
      name: "Tab. Norfloxacin 400 MG",
    },
    {
      id: 1000000850,
      name: "Inj. Vit. K",
    },
    {
      id: 1000000851,
      name: "Tab. Iron & Folic Acid",
    },
    {
      id: 1000000852,
      name: "Inj. Ethamsylate",
    },
    {
      id: 1000000853,
      name: "Inj. Botropase",
    },
    {
      id: 1000000856,
      name: "Tab. Metoprolol Tartarate",
    },
    {
      id: 1000000792,
      name: "Cap. Doxycycline 100 mg",
    },
    {
      id: 1000000806,
      name: "Tab. Cefadroxil 500 mg",
    },
    {
      id: 1000000837,
      name: "Tab. Metronidazole 200MG",
    },
    {
      id: 1000000840,
      name: "Tab. Quinine Sulphate 300mg",
    },
    {
      id: 1000000785,
      name: "Susp. Cotrimoxazole 200mg + Trimethoprim 40mg/5ml",
    },
    {
      id: 1000000844,
      name: "Tab. Primaquin 2.5mg",
    },
    {
      id: 1000000854,
      name: "Tab. Isosorbide Dinitrate 5mg",
    },
    {
      id: 1000000857,
      name: "Tab. Hydrochlorothiazide 50mg",
    },
    {
      id: 1000000807,
      name: "Cefadroxyl Dry Syrup 125mg/5ml",
    },
    {
      id: 1000000817,
      name: "Tab. Dapsone 100mg",
    },
    {
      id: 1000000789,
      name: "Inj. Benzyl Penicillin IP 10 lakh unit",
    },
    {
      id: 1000000841,
      name: "Inj. Quinine DiHCl 300mg/ml",
    },
    {
      id: 1000000787,
      name: "Inj. Ampicillin 50mg",
    },
    {
      id: 1000000732,
      name: "Inj. Ketamine HCl 10mg/ml",
    },
    {
      id: 1000000835,
      name: "Inj. Metronidazole  100mg",
    },
    {
      id: 1000000784,
      name: "Tab. Cotrimoxazole 200mg + Trimethoprim 80mg",
    },
    {
      id: 1000000861,
      name: "Tab. Lisinopril",
    },
    {
      id: 1000000863,
      name: "Cap. Nifedipine",
    },
    {
      id: 1000000864,
      name: "Inj. Nitroglycerin",
    },
    {
      id: 1000000866,
      name: "Inj. Dobutamin",
    },
    {
      id: 1000000868,
      name: "Inj. Amiodarone",
    },
    {
      id: 1000000869,
      name: "Benzyl Benzoate Emulsion",
    },
    {
      id: 1000000870,
      name: "Gamma Benzene Hexa Chloride",
    },
    {
      id: 1000000872,
      name: "Glycerin",
    },
    {
      id: 1000000873,
      name: "Liquid Paraffin",
    },
    {
      id: 1000000878,
      name: "Lysol",
    },
    {
      id: 1000000879,
      name: "Surgical spirit",
    },
    {
      id: 1000000880,
      name: "Fornaldehyde Solution",
    },
    {
      id: 1000000881,
      name: "Chlorxylenol Solution",
    },
    {
      id: 1000000882,
      name: "Chlorhexidine Gluconate Solution",
    },
    {
      id: 1000000883,
      name: "Tab. Frusemide",
    },
    {
      id: 1000000884,
      name: "Inj. Frusemide",
    },
    {
      id: 1000000886,
      name: "Inj. Ranitidine HCl",
    },
    {
      id: 1000000888,
      name: "Tab. Dried Alu. Hydroxide + Mg. Hydroxide + Dimethicone/ Methyl Polysiloxane",
    },
    {
      id: 1000000889,
      name: "Inj. Metochlopropamide",
    },
    {
      id: 1000000890,
      name: "Inj. Promethazine HCl",
    },
    {
      id: 1000000891,
      name: "Syr. Promethazine",
    },
    {
      id: 1000000893,
      name: "Tab. Famotidine",
    },
    {
      id: 1000000897,
      name: "Tab. Dicyclomine HCl",
    },
    {
      id: 1000000899,
      name: "Dicyclomine Solution",
    },
    {
      id: 1000000900,
      name: "ORS (WHO-Citrate)",
    },
    {
      id: 1000000905,
      name: "Tab. Glipzide",
    },
    {
      id: 1000000907,
      name: "Inj ATS",
    },
    {
      id: 1000000908,
      name: "Inj. Lyophilised Anti Snake Venom Antiserum",
    },
    {
      id: 1000000909,
      name: "Inj. Polyvalent Anti Snake Venom Antiserum",
    },
    {
      id: 1000000910,
      name: "Inj. Mixed Gas Gangrene Antitoxin",
    },
    {
      id: 1000000912,
      name: "Inj. Tetanus Toxoid",
    },
    {
      id: 1000000913,
      name: "Tropicamide + Phenylephrine HCl Eye Drops",
    },
    {
      id: 1000000915,
      name: "Chloramphenicol Eye Drop",
    },
    {
      id: 1000000917,
      name: "Chloromycetin Eye Oint.",
    },
    {
      id: 1000000918,
      name: "Cifrfloxacin Eye Drops",
    },
    {
      id: 1000000922,
      name: "Tab. Methyergometrine Maleate",
    },
    {
      id: 1000000906,
      name: "Tab. Thyroxine Sodium 0.05mg/tab",
    },
    {
      id: 1000000894,
      name: "Cap. Omeperazole 20mg",
    },
    {
      id: 1000000887,
      name: "Tab. Ranitidine 150mg",
    },
    {
      id: 1000000895,
      name: "Tab. Domperidone 10 MG",
    },
    {
      id: 1000000924,
      name: "Inj. Chlorpromazine HCl",
    },
    {
      id: 1000000925,
      name: "Tab. Imipramine",
    },
    {
      id: 1000000927,
      name: "Tab. Haloperidol",
    },
    {
      id: 1000000928,
      name: "Inj. Haloperidol",
    },
    {
      id: 1000000929,
      name: "Tab. Trifluoperazine",
    },
    {
      id: 1000000874,
      name: "Povidone Iodine Oint.",
    },
    {
      id: 1000000877,
      name: "Cetrimide Solution 1%.",
    },
    {
      id: 1000000902,
      name: "Tab. Glibenclamide",
    },
    {
      id: 1000000901,
      name: "Tab. Pantoprazole",
    },
    {
      id: 1000000892,
      name: "Tab. Promethazine",
    },
    {
      id: 1000000914,
      name: "Timolol Maleate Eye Drops",
    },
    {
      id: 1000000858,
      name: "Tab. Enalapril Maleate 5mg",
    },
    {
      id: 1000000865,
      name: "Inj. Digoxin 0.25mg/ml",
    },
    {
      id: 1000000903,
      name: "Inj. Human Insulin 40 IU/ml",
    },
    {
      id: 1000000916,
      name: "Tab. Acetazolamide 250mg",
    },
    {
      id: 1000000898,
      name: "Inj. Dicyclomine HCl 10mg/ml",
    },
    {
      id: 1000000904,
      name: "Tab.Metformin",
    },
    {
      id: 1000000926,
      name: "Tab. Amitriptyline 25mg",
    },
    {
      id: 1000000896,
      name: "Susp. Domperidone 1mg/ml",
    },
    {
      id: 1000000919,
      name: "Ciprofloxacin Eye drop 0.3%.",
    },
    {
      id: 1000000920,
      name: "Inj. Methyergometrine Maleate 0.2 mg/ml",
    },
    {
      id: 1000000921,
      name: "Inj. Oxytocin 5 IU/ml",
    },
    {
      id: 1000000885,
      name: "Inj. Mannitol",
    },
    {
      id: 1000000860,
      name: "Inj. Dopamine HCl 40mg/ml 5ml",
    },
    {
      id: 1000000867,
      name: "Inj. Verapamil 2.5 mg/ml",
    },
    {
      id: 1000000875,
      name: "POVIDONE IODINE OINTMENT",
    },
    {
      id: 1000000911,
      name: "Inj. Anti Rabies Serum",
    },
    {
      id: 1000000930,
      name: "Tab. Thioridazine",
    },
    {
      id: 1000000935,
      name: "Inj. Theophylline & Etophylline",
    },
    {
      id: 1000000936,
      name: "Tab. Theophylline & Etophylline",
    },
    {
      id: 1000000937,
      name: "Inj. Aminophyllin",
    },
    {
      id: 1000000939,
      name: "Tab. Terbutaline Sulphate",
    },
    {
      id: 1000000941,
      name: "Tab. Salbutamol + Theophylline anhydrous",
    },
    {
      id: 1000000942,
      name: "Inj. Terbutaline Sulphate",
    },
    {
      id: 1000000944,
      name: "I.V. Dextrose & Sod. Chloride",
    },
    {
      id: 1000000946,
      name: "I.V. Dextrose 5%",
    },
    {
      id: 1000000948,
      name: "Inj. Sod. Bi-carb",
    },
    {
      id: 1000000949,
      name: "KCl Solution",
    },
    {
      id: 1000000950,
      name: "Inj. Electrolyte-P",
    },
    {
      id: 1000000951,
      name: "Inj/ Electrolyte-M",
    },
    {
      id: 1000000952,
      name: "Conc. Vit. A Solution",
    },
    {
      id: 1000000953,
      name: "Xinc Syr.",
    },
    {
      id: 1000000955,
      name: "Tab. Calcium Lactate",
    },
    {
      id: 1000000956,
      name: "Tab. Vit. B Complex",
    },
    {
      id: 1000000957,
      name: "Tab. Riboflavin",
    },
    {
      id: 1000000958,
      name: "Tab. Cyclophosphamide",
    },
    {
      id: 1000000959,
      name: "Tab. Myeleran",
    },
    {
      id: 1000000962,
      name: "Inj. 5 Fluorouracil",
    },
    {
      id: 1000000964,
      name: "Inj. Adriamycin/ Doxorubicin HCl",
    },
    {
      id: 1000000965,
      name: "Inj. Vincristine Sulphate",
    },
    {
      id: 1000000966,
      name: "Cap. Procarbazine",
    },
    {
      id: 1000000968,
      name: "Inj. Cisplatin",
    },
    {
      id: 1000000969,
      name: "Inj. Leucovorin Calcium",
    },
    {
      id: 1000000970,
      name: "Inj. Dacarbazine",
    },
    {
      id: 1000000971,
      name: "Cap. Etoposide",
    },
    {
      id: 1000000972,
      name: "Norfloxacin Ear/Eye Drops",
    },
    {
      id: 1000000973,
      name: "Ofloxacine Ear/Eye Drops",
    },
    {
      id: 1000000974,
      name: "Oxymetazoline HCL Nasal Drops",
    },
    {
      id: 1000000976,
      name: "Bleaching powder",
    },
    {
      id: 1000000977,
      name: "Tab. Halazone",
    },
    {
      id: 1000000978,
      name: "Phenyl",
    },
    {
      id: 1000000980,
      name: "Intra-Peritoneal Dialysis fluid",
    },
    {
      id: 1000000982,
      name: "X-Ray Fixer",
    },
    {
      id: 1000000983,
      name: "Adhesive Plaster",
    },
    {
      id: 1000000984,
      name: "Roller bandage",
    },
    {
      id: 1000000985,
      name: "Adhesive paper tape",
    },
    {
      id: 1000000832,
      name: "Clotrimazole Cream",
    },
    {
      id: 0,
      name: "All drugs",
    },
    {
      id: 1000000963,
      name: "Inj. Mitomycin",
    },
    {
      id: 1000000990,
      name: "Ampicillin Trihydrate Cap 250 mg",
    },
    {
      id: 1000000998,
      name: "Tetracyclin IP 250 mg",
    },
    {
      id: 1000000999,
      name: "Ascorbiic Acid Chewable Tablet",
    },
    {
      id: 1000001000,
      name: "Tetracyclin IP 500 mg",
    },
    {
      id: 1000001001,
      name: "Ascorbic Acid IP/Sukcee",
    },
    {
      id: 1000001002,
      name: "Chloroquine Posphat IP 250mg",
    },
    {
      id: 1000001006,
      name: "Chloraquine phos. Tab 250 mg",
    },
    {
      id: 1000000961,
      name: "Inj. 5 Fluorouracil 25ml",
    },
    {
      id: 1000000975,
      name: "Sterile Water for injection5ml/amp",
    },
    {
      id: 1000000981,
      name: "X-Ray developer",
    },
    {
      id: 1000001007,
      name: "Polyvitamin (Prophulactic) NFI",
    },
    {
      id: 1000001008,
      name: "Erythromcin Stearate Tab 250 mg",
    },
    {
      id: 1000001009,
      name: "Erythromcin Stearate Tab 500 mg",
    },
    {
      id: 1000001011,
      name: "Benzylpencillin inj 1 mega (NHM)",
    },
    {
      id: 1000001012,
      name: "Ranitidine IP HCL 300 mg",
    },
    {
      id: 1000001013,
      name: "Benzylpenicillin inj i.p 0.5 mega (NHM)",
    },
    {
      id: 1000001014,
      name: "Vitamin B-Complex (Prophylactic) NFI",
    },
    {
      id: 1000001015,
      name: "Diclofenac Sodium SR 100 mg",
    },
    {
      id: 1000000967,
      name: "Tab. Prednisolone 10mg",
    },
    {
      id: 1000000932,
      name: "Tab. Lithium carbonate 300 mg",
    },
    {
      id: 1000000943,
      name: "I.V. Sodium Chloride 0.9%.",
    },
    {
      id: 1000001003,
      name: "Amlodipine Tab 10 mg",
    },
    {
      id: 1000000934,
      name: "Tab. Clonazepam 0.25 mg",
    },
    {
      id: 1000001005,
      name: "Tab. Erythromycine Stearate IP 500 mg",
    },
    {
      id: 1000000960,
      name: "Inj. Methotrexate 25mg/ml",
    },
    {
      id: 1000000979,
      name: "Conc. Haemodialysis Fluid(Dialysis Solution).",
    },
    {
      id: 1000000945,
      name: "I.V. Ringer lactate",
    },
    {
      id: 1000000947,
      name: "INJ. GLUCOSE 10%.",
    },
    {
      id: 1000001016,
      name: "Cefuroxime Axetil 250 mg",
    },
    {
      id: 1000001017,
      name: "Cefuroxime Axetil 500 mg",
    },
    {
      id: 1000001018,
      name: "Dicyclomine Hcl IP 20mg + Paracetamol IP 500 mg",
    },
    {
      id: 1000001022,
      name: "Cefotaxime Sodium 1 gm +Sulbactum Sod. 500 mg",
    },
    {
      id: 1000001024,
      name: "Cefotaxime Sodium 500 gm +Sulbactum 250 mg",
    },
    {
      id: 1000001026,
      name: "Cefotaxime sodium inj 500 mg ",
    },
    {
      id: 1000001027,
      name: "CEFOTAXIME SODIUM 250 MG & SULBACTUM 125 MG",
    },
    {
      id: 1000001028,
      name: "CEFOTAXIME SODIUM 500 MG & SULBACTUM 250 MG",
    },
    {
      id: 1000001029,
      name: "Albendazole Suspension 200mg/5ml",
    },
    {
      id: 1000001030,
      name: "CEFOTAXIME SODIUM & SULB . SODIUM  INJ 1.5 MG",
    },
    {
      id: 1000001031,
      name: "Cefotaxime Sodium 250 gm +Sulbactum 125 mg",
    },
    {
      id: 1000001032,
      name: "ETOPFYLLIN & THEOPHYLLINE INJ (NHM)",
    },
    {
      id: 1000001034,
      name: "CEFADROXIL CAPSULES 500 MG",
    },
    {
      id: 1000001036,
      name: "CEFUROXIME AXETIL TAB 500 MG",
    },
    {
      id: 1000001037,
      name: "OFLOXACIN  WITH ORINDAZOL TABLET (NHM)",
    },
    {
      id: 1000001039,
      name: "PANTOPRAZOLE GASTRO-RESISTANT TABLET",
    },
    {
      id: 1000001041,
      name: "TINIDAZOLE TABLETS (300 MG)",
    },
    {
      id: 1000001042,
      name: "ALBENDAZOLE ORAL SUSP , 10 ML",
    },
    {
      id: 1000001043,
      name: "Ceftazadime 250 mg",
    },
    {
      id: 1000001044,
      name: "CLOTRIMAZOLE OINTMENT",
    },
    {
      id: 1000001045,
      name: "Ceftazadime 500 mg",
    },
    {
      id: 1000001047,
      name: "AMIKACIN SULPHATE INJ  (NHM)",
    },
    {
      id: 1000001048,
      name: "Ampicillin Sodium I.P 250 mg",
    },
    {
      id: 1000001049,
      name: "AMIKACIN SULPHATE INJ 250 ML  (NHM)",
    },
    {
      id: 1000001050,
      name: "Atropine Sulphat IP 25 mg/ml",
    },
    {
      id: 1000001051,
      name: "CEFTAZIDIME SODIUM INJ 250 MG",
    },
    {
      id: 1000001052,
      name: "CEFTAZIDIME SODIUM INJ 500 MG",
    },
    {
      id: 1000001053,
      name: "AMPICILLIN SODIUM INJ 250 MG",
    },
    {
      id: 1000001055,
      name: "DICYCLOMINE 20 MG+PARACETAMOL 500 MG (SAPASMOGIP TABLET)",
    },
    {
      id: 1000001056,
      name: "Syrup Paracetamol",
    },
    {
      id: 1000000734,
      name: "Halothane",
    },
    {
      id: 1000001025,
      name: "Tinidazole 300 mg",
    },
    {
      id: 1000000923,
      name: "Tab. Diazepam 5mg",
    },
    {
      id: 1000000741,
      name: "Inj. Atropine Sulphate 0.6 mg/ml",
    },
    {
      id: 1000000742,
      name: "Inj. Glycopyrrolate 0.2 mg/ml",
    },
    {
      id: 1000000743,
      name: "Inj. Methocarbamol 100mg/ml",
    },
    {
      id: 1000000744,
      name: "Inj. Neostigmine 0.5 mg/ml",
    },
    {
      id: 1000000746,
      name: "Inj. Succinylcholine Chloride 50 mg/ml",
    },
    {
      id: 1000000747,
      name: "Tab. Acetylsalicylic Acid 300mg/tab",
    },
    {
      id: 1000000749,
      name: "Syr. Paracetamol 125/5 mg/ml",
    },
    {
      id: 1000000750,
      name: "Inj. Paracetamol 150mg/ml",
    },
    {
      id: 1000000752,
      name: "Inj. Pethidine HCl 50mg/ml",
    },
    {
      id: 1000000753,
      name: "Inj. Pentazocine Lactate 30mg/ml",
    },
    {
      id: 1000000754,
      name: "Tab. Diclofenac Sodium 50mg/ml",
    },
    {
      id: 1000000770,
      name: "Inj. Pyridine Aldoxime Methoiodide 500/20 mg/ml",
    },
    {
      id: 1000000777,
      name: "Inj. Phenytoin 50mg/ml",
    },
    {
      id: 1000001035,
      name: "Povidone Iodine Solution/Ointment 15mg",
    },
    {
      id: 1000001033,
      name: "Clotrimazole Ointment 15mg",
    },
    {
      id: 1000001019,
      name: "Eteo-Theophyllin 2ml amp",
    },
    {
      id: 1000000764,
      name: "Inj. Adrenaline",
    },
    {
      id: 1000000991,
      name: "Ampicilli Trihydrrate Cap 500 mg",
    },
    {
      id: 1000000992,
      name: "Vitamin B Complex Tablet",
    },
    {
      id: 1000000993,
      name: "Amoxycillin 250 mg+ Clozacillin 250 mg",
    },
    {
      id: 1000000995,
      name: "Ampicillin IP 250mg",
    },
    {
      id: 1000000996,
      name: "Ampicillin IP 500 mg",
    },
    {
      id: 1000000997,
      name: "B-Complex+Vit C & Zinc/Cebexin-Z",
    },
    {
      id: 1000001010,
      name: "Cephadroxil 500 mg",
    },
    {
      id: 10283,
      name: "TAB. PARACETAMOL 325 mg",
    },
    {
      id: 1000001046,
      name: "POVIDONE IODINE OINTMENT .",
    },
    {
      id: 1000001020,
      name: "Ofloxacin 200mg + Ornidazole 500 mg",
    },
    {
      id: 1000001023,
      name: "Tab. Pantoprazole 40 mg",
    },
    {
      id: 1000000737,
      name: "Inj. Lignocaine Plain 2%.",
    },
    {
      id: 1000000751,
      name: "Tab. Ibuprofen 200mg",
    },
    {
      id: 1000001054,
      name: "Inj. ATROPINE SULPHATE 1MG/ML",
    },
    {
      id: 1000001021,
      name: "Cefotaxime sodium inj 250 mg",
    },
    {
      id: 1000001004,
      name: "Tab. Erythromycine Stearate IP 250 mg",
    },
    {
      id: 1000000740,
      name: "Inj. Bupivacaine Hydrochloride 0.5%.",
    },
    {
      id: 1000000748,
      name: "Tab. Paracetamol 500 mg/tab",
    },
    {
      id: 1000000855,
      name: "Tab. Atenolol 50mg",
    },
    {
      id: 10602,
      name: "TAB. AMOXICILLINE 125MG",
    },
    {
      id: 1000000733,
      name: "Inj. Thiopentone Sodium 500mg/vail",
    },
    {
      id: 1000000735,
      name: "Inj. Fentanyl 50 mg/ml",
    },
    {
      id: 1000000736,
      name: "Inj. Atracurium Besylate 10mg",
    },
    {
      id: 1000000738,
      name: "Inj. Lignocaine with Adrenaline 26.5 mg/ml",
    },
    {
      id: 1000000739,
      name: "Inj. Lignocaine Heavy (53.3 + 75)mg/ml",
    },
    {
      id: 1000000757,
      name: "Susp. Nimesulide 10mg",
    },
    {
      id: 1000000758,
      name: "Tab. Tramadol HCL 50mg",
    },
    {
      id: 1000000759,
      name: "Inj. Tramadol 25mg",
    },
    {
      id: 1000000760,
      name: "Inj. Dexamethasone Sodium Phosphate 4mg",
    },
    {
      id: 1000000761,
      name: "Tab. Dexamethasone 0.5mg",
    },
    {
      id: 1000000762,
      name: "Inj. Hydrocortisone Sodium Succinate 100mg",
    },
    {
      id: 1000000763,
      name: "Tab. Prednisolone 5mg",
    },
    {
      id: 10603,
      name: "SYP. CO-TRIMOXAZOLE 50ML",
    },
    {
      id: 10604,
      name: "POVIDONE IODINE 25GM",
    },
    {
      id: 10605,
      name: "KETOCONAZOLE SHAMPOO",
    },
    {
      id: 10281,
      name: "Temp",
    },
    {
      id: 10282,
      name: "demo drug",
    },
    {
      id: 10606,
      name: "CLOTRIMAZOLE CREAM 25GM",
    },
    {
      id: 1000000781,
      name: "Tab. Albendazole 400mg",
    },
    {
      id: 1000000756,
      name: "Tab. Nimesulide 100mg",
    },
    {
      id: 10607,
      name: "DETTOL LIQUID 100ML",
    },
    {
      id: 1000000994,
      name: "Tetracycline Hydrocloride Cap 250MG",
    },
    {
      id: 10608,
      name: "INJ. AVIL 2ML",
    },
    {
      id: 10610,
      name: "INJ. ANTI-SNAKE VENOM 10ML",
    },
    {
      id: 10611,
      name: "COUGH SYRUP 120ML",
    },
    {
      id: 10613,
      name: "TABLET O2 (OFLOXACIN + TINIDAZOLE.).",
    },
    {
      id: 10609,
      name: "INJ. ANTI-RABIES VACCINE",
    },
    {
      id: 10615,
      name: "POVIDONE IODINE SOLUTION 100ML",
    },
    {
      id: 10654,
      name: "Sharbat-e-Unnab 200ml",
    },
    {
      id: 10655,
      name: "Sharbat-e-Bazoori Motadil 200ml",
    },
    {
      id: 10656,
      name: "Sharbat-e-Deenar 200ml",
    },
    {
      id: 10657,
      name: "Zimad-e-Mihallil 50 gm",
    },
    {
      id: 10631,
      name: "Itrifal-e-Shahtra 100 gm",
    },
    {
      id: 10660,
      name: "tab. zidovudine 300mg + lamivudine 150 + nevirapine 200mg",
    },
    {
      id: 10661,
      name: "tab. Effavirenz 600 mg",
    },
    {
      id: 10663,
      name: "tab. Lopinavir 200 mg + Ritonavir 50 mg",
    },
    {
      id: 10665,
      name: "tab. Nevirapine 200 mg",
    },
    {
      id: 10666,
      name: "tab Zidovudine 300 mg + Lamivudine 150 mg",
    },
    {
      id: 10667,
      name: "tab. Ritonavir 100 mg",
    },
    {
      id: 10668,
      name: "tab. Lopinavir 100 mg +Ritonavir 25 mg",
    },
    {
      id: 10659,
      name: "tab. Abacavir 600mg + tab. lamivudine 300 mg",
    },
    {
      id: 10676,
      name: "tab. Reltagravir 400 mg",
    },
    {
      id: 10677,
      name: "tab. Abacavir 300 mg (single molecule).",
    },
    {
      id: 10678,
      name: "tab. Lamivudine 150 mg(single molecule).",
    },
    {
      id: 10662,
      name: "tab. Tenofovir 300 mg + Lamivudine 150 mg",
    },
    {
      id: 10664,
      name: "tab. Tenofovir 300 mg + Lamivudine 150 mg +Effavirez 600 mg",
    },
    {
      id: 10612,
      name: "PERMETHRIN LOTION 1%30ml.",
    },
    {
      id: 1000000954,
      name: "Tab. Zinc 20mg",
    },
    {
      id: 10358,
      name: "Co-trimoxazole IPSS(Sulphamethoxazole400mg+Trimethoprim80mg).",
    },
    {
      id: 1000000745,
      name: "Inj. Pancuronium bromide 2mg/ml",
    },
    {
      id: 1000000765,
      name: "Tab. Chlorpheniramine maleate  4mg",
    },
    {
      id: 1000000766,
      name: "Inj. Pheniramine maleate 22.75mg",
    },
    {
      id: 1000000767,
      name: "Tab. Cetrizine DiHCl 10mg/tab",
    },
    {
      id: 1000000768,
      name: "Syr. Cetrizine DiHCl 5/5mg",
    },
    {
      id: 1000000755,
      name: "Inj. Morphine Sulphate 10 mg/ml",
    },
    {
      id: 1000000769,
      name: "Inj. Dimercaprol 50mg",
    },
    {
      id: 1000000771,
      name: "Tab. Phenobarbitone 30 mg/tab",
    },
    {
      id: 1000000772,
      name: "Inj. Phenobarbitone Sodium 200mg/ml",
    },
    {
      id: 1000000773,
      name: "Tab. Carbamazepine 200mg/tab",
    },
    {
      id: 1000000778,
      name: "Tab. Mebendazole100mg/tab",
    },
    {
      id: 1000000774,
      name: "Tab. Sodium Valproate 200mg/tab",
    },
    {
      id: 1000000775,
      name: "Inj. Diazepam 5mg/ml",
    },
    {
      id: 1000000931,
      name: "Tab. Nitrazepam 10mg/tab",
    },
    {
      id: 1000000833,
      name: "Tab. Tinidazole 300mg/tab",
    },
    {
      id: 1000000826,
      name: "Tab. Ethambutol200mg",
    },
    {
      id: 1000000814,
      name: "Tab. Roxithromycin 150mg",
    },
    {
      id: 10747,
      name: "Dil. Ipecac  30",
    },
    {
      id: 1000000818,
      name: "Cap. Rifampicin 450mg",
    },
    {
      id: 1000000989,
      name: "AMOXYCILLIN & CLOXACILLIN CAPSULE",
    },
    {
      id: 10362,
      name: "ciprofloxacin 250mg+Tinidazole300mg(SS).",
    },
    {
      id: 1000000783,
      name: "Susp. Pyrental palmoate 50mg/ml",
    },
    {
      id: 10364,
      name: "Ibuprofen IP 400mg.",
    },
    {
      id: 10367,
      name: "TAB. LOSARTAN 25 MG",
    },
    {
      id: 10368,
      name: "Norfloxacin 400mg+Trinidazole.",
    },
    {
      id: 10369,
      name: "TAB. OFLOXACIN 400MG",
    },
    {
      id: 10374,
      name: "LEVOCETRIZINE 5mg.",
    },
    {
      id: 10382,
      name: "ACECLOFENAC 100MG + PARACETAMOL 500MG TABS",
    },
    {
      id: 10383,
      name: "CALCIUM + VITAMIN D3 500MG",
    },
    {
      id: 10388,
      name: "OMEPRAZOLE+DOMEPERIDONE.",
    },
    {
      id: 10389,
      name: "AMOXICILLIN IP 250mg.",
    },
    {
      id: 10390,
      name: "AMOXICILLIN IP 500mg.",
    },
    {
      id: 10391,
      name: "ciprofloxacin IP250mg",
    },
    {
      id: 1000000862,
      name: "Tab. Amlodipin 5mg/tab",
    },
    {
      id: 10363,
      name: "TAB. GLIMPIRIDE 1MG",
    },
    {
      id: 10395,
      name: "LOSARTON 50mg",
    },
    {
      id: 10396,
      name: "LOSARTON 25mg",
    },
    {
      id: 1000000776,
      name: "Tab. Phenytoin Sodium 100mg",
    },
    {
      id: 1000000822,
      name: "Cap. Rifampicin 300mg",
    },
    {
      id: 10402,
      name: "Surgical globe",
    },
    {
      id: 10403,
      name: "Sprit",
    },
    {
      id: 10406,
      name: "cotton swabs",
    },
    {
      id: 10407,
      name: "cotton roll 200gm",
    },
    {
      id: 10408,
      name: "Gauzethan ,10mtr",
    },
    {
      id: 1000000780,
      name: "Susp. Albendazole 200mg/5ml",
    },
    {
      id: 10361,
      name: "Tab. Cefixime 100mg",
    },
    {
      id: 10387,
      name: "Tab. Azithromycin 250mg",
    },
    {
      id: 1000000940,
      name: "Syr. Salbutamol Sulphate 100mg/ml",
    },
    {
      id: 10300,
      name: "Tab. ATORVASTATIN 20 mg",
    },
    {
      id: 10401,
      name: "Tab. IFA Blue .",
    },
    {
      id: 10409,
      name: "distilled water ,5 ltr",
    },
    {
      id: 10410,
      name: "Glacial Active acid, 500ml",
    },
    {
      id: 10417,
      name: "NORFLOXACIN EYE/EAR DROP",
    },
    {
      id: 10418,
      name: "SCABIES LOTION, TUBE",
    },
    {
      id: 10420,
      name: "POVIDIN OINTMENT, TUBE",
    },
    {
      id: 10421,
      name: "CANDID OINTMENT, TUBE",
    },
    {
      id: 10422,
      name: "DIGESTIVE ENZYME PAEDIATRIC BOTTLE",
    },
    {
      id: 10423,
      name: "DIGESTIVE ENZYME ADULT BOTTLE",
    },
    {
      id: 10426,
      name: "FREE COLD SYRUP(ANTI COLD) BOTTLE",
    },
    {
      id: 10427,
      name: "IVF R-L BOTTLE 500 ML",
    },
    {
      id: 10428,
      name: "IVF 5% DEXTROSE BOTTLE",
    },
    {
      id: 10430,
      name: "COTTON ROLL 200 GM",
    },
    {
      id: 10429,
      name: "BANDAGE 6 INCH, ROLL",
    },
    {
      id: 10431,
      name: "TAB. CANDID V6 100MG",
    },
    {
      id: 10432,
      name: "CANDID V GEL, TUBE",
    },
    {
      id: 10434,
      name: "DISPOSABLE SYRINGE 2cc, 100 pc",
    },
    {
      id: 10433,
      name: "DISPOSABLE SYRINGE 5cc, 100 pc",
    },
    {
      id: 10435,
      name: "sprit 100ml",
    },
    {
      id: 10404,
      name: "Surgical Hand Gloves 6 half",
    },
    {
      id: 10405,
      name: "Surgical Hand Gloves 7 half",
    },
    {
      id: 10436,
      name: "Syrup.Paracetamol 250mg",
    },
    {
      id: 10440,
      name: "cough syrup adult",
    },
    {
      id: 10441,
      name: "Cough syrup paediatric, bottle",
    },
    {
      id: 10442,
      name: "Syrup.Ofloxacin 50+Ornidazole 125 mg",
    },
    {
      id: 10443,
      name: "SYRUP ZINCOPRIT PAEDIATRIC, BOTTLE 15 ML",
    },
    {
      id: 10444,
      name: "SYRUP ZINCOPRIT ADULT, BOTTLE 200 ML",
    },
    {
      id: 1000000790,
      name: "Ciprofloxacin  IP 500mg",
    },
    {
      id: 10447,
      name: "SUSP. COTRIMOXAZOLE  60ml.",
    },
    {
      id: 10288,
      name: "ACECLOFENAC TAB 100mg",
    },
    {
      id: 10449,
      name: "ORS  IP(21 GM).",
    },
    {
      id: 10450,
      name: "DICLOFENAC SODIUM PROLONGED-RELEASE",
    },
    {
      id: 10451,
      name: "DICYCLOMINE 20 MG+PARACETAMOL 325 MG",
    },
    {
      id: 10304,
      name: "CEFIXIME   TABLET 200 mg",
    },
    {
      id: 10307,
      name: "METFORMIN HCL TABLETS 500 MG",
    },
    {
      id: 10308,
      name: "PARACETAMOL 325MG +DICLOFENAC 50MG",
    },
    {
      id: 10312,
      name: "CEFTRIAXONE INJ 500",
    },
    {
      id: 10313,
      name: "CEFTRIAXONE INJ IP 1 G",
    },
    {
      id: 10314,
      name: "Tab. Fluconazole  150mg",
    },
    {
      id: 10290,
      name: "Cetirizine Syrup 60 ml",
    },
    {
      id: 10286,
      name: "Cotrimoxazole Tabs (Trimetho. 160mg & Sulpha. 800mg).",
    },
    {
      id: 10287,
      name: "CEPHALEXIN  Cap.IP 500MG",
    },
    {
      id: 10294,
      name: "paracetamol paediatric 60ml",
    },
    {
      id: 10295,
      name: "PARACETAMOL PAEDIATRIC",
    },
    {
      id: 10298,
      name: "ACECLOFENAC 100MG + PARACETAMOL 325MG TABS",
    },
    {
      id: 10297,
      name: "Paracet 325mg+Ibupro400mg",
    },
    {
      id: 10284,
      name: "AMOXICILLIN ORAL SUS 60ML",
    },
    {
      id: 10285,
      name: "Tab. Azithromycin 500mg",
    },
    {
      id: 10416,
      name: "GENTAMICINES EYES DROP",
    },
    {
      id: 10299,
      name: "Amoxycillin&potassium clav 600mg",
    },
    {
      id: 10305,
      name: "CETRIZINE HCL BP 10MG",
    },
    {
      id: 10306,
      name: "LOSARTAN POTASSIUM TAB 50 MG",
    },
    {
      id: 10309,
      name: "PARACET IP 325 MG + IBUPRO IP 400MG TAB",
    },
    {
      id: 10310,
      name: "RANITIDINE HYDROCHLORIDE TABLET IP 150 MG",
    },
    {
      id: 10311,
      name: "AMOXYCILLIN & POTASSIUM CLAVULANATE INJ 1.2 G .",
    },
    {
      id: 10315,
      name: "Omeprazole IP 20mg + Domperidone IP 10mg",
    },
    {
      id: 10316,
      name: "CEFOPERAZONE INJ 1 G",
    },
    {
      id: 10317,
      name: "Tab. Atenolol 25mg",
    },
    {
      id: 10319,
      name: "CEFTRIAXONE 1G & SULBACTAM 500MG INJ",
    },
    {
      id: 10320,
      name: "CEFTAZIDIME INJ 1G",
    },
    {
      id: 10321,
      name: "Cap. Omeprazole IP 20mg + Domeridone IP 10mg",
    },
    {
      id: 10322,
      name: "GENTAMICIN INJ IP 40MG/ML 2 ML VAIL -PPP",
    },
    {
      id: 10323,
      name: "MEROPENEM INJ IP 500  MG",
    },
    {
      id: 10324,
      name: "MEROPENEM INJ IP 1 G",
    },
    {
      id: 10325,
      name: "PIPERACILLIN 4G + TAZOBACTAM 0.5G INJ",
    },
    {
      id: 10328,
      name: "Tab IFA Ferrous SU Fate and FA",
    },
    {
      id: 10329,
      name: "Tab. Glimpiride 2mg",
    },
    {
      id: 10330,
      name: "RANITIDINE INJECTION IP 2ML/50MG/AMPOULE",
    },
    {
      id: 10331,
      name: "AMOXYLLIN CAPS IP 250 MG",
    },
    {
      id: 10341,
      name: "METRONIDAZOLE TABLETS IP 400 MG",
    },
    {
      id: 10342,
      name: "METRONIDAZOLE TABLETS PP 200 MG COATED",
    },
    {
      id: 10343,
      name: "TINIDAZOLE TABLET IP 500 MG",
    },
    {
      id: 10344,
      name: "AMOXI & POTASSIUM CLAVULANATE 300 MG INJ GSNS",
    },
    {
      id: 10345,
      name: "CEFOTAXIME SODIUM INJ IP 1G 10CC",
    },
    {
      id: 10346,
      name: "Amoxycillin&potassium clavulanate inj.IP600",
    },
    {
      id: 10347,
      name: "FRUSEMIDE INJ 2ML AMPOULE",
    },
    {
      id: 10348,
      name: "CIPRFLOXACIN HCL TABS 250MG",
    },
    {
      id: 10349,
      name: "plasma volume expender 500 ml",
    },
    {
      id: 10352,
      name: "Co-trimoxazole IP(Sulphamethoxazole 100mg+Trimethoprim20mg).",
    },
    {
      id: 10336,
      name: "Inj. DICLOFENAC SODIUM IP 25 MG/ML",
    },
    {
      id: 10353,
      name: "Gentamycine IP 2 ml.",
    },
    {
      id: 10354,
      name: "IV LEVOFLOXACIN",
    },
    {
      id: 10357,
      name: "Sparfloxacin 100mg.",
    },
    {
      id: 10372,
      name: "Calcium 500mg +Vitamin D3 250mg.",
    },
    {
      id: 10292,
      name: "Inj. Cefoperazone 1G & Sulbactam 1G",
    },
    {
      id: 10296,
      name: "Ciprofloxacin 500mg + Tinidazole 600mg",
    },
    {
      id: 10333,
      name: "COUGH SYRUP",
    },
    {
      id: 10334,
      name: "TETRACYCLINE HYDROCHLORISE CAP 500MG",
    },
    {
      id: 10337,
      name: "BENZATHINE PENICILLIN 6 LAC",
    },
    {
      id: 10338,
      name: "BENZATHINE PENICILLIN 12 LAC INJ",
    },
    {
      id: 10339,
      name: "CEPHALEXIN CAPSULES IP 250 MG",
    },
    {
      id: 10303,
      name: "Tab. ATORVASTATIN 10MG",
    },
    {
      id: 10340,
      name: "OMEPRAZOLE CAPS IP 20 MG",
    },
    {
      id: 10375,
      name: "AMOXICILLIN sod+CLAVULANATE POTASSIUM 300mg.",
    },
    {
      id: 10376,
      name: "AMOXICILLIN sod+CLAVULANATE POTASSIUM 1200mg.",
    },
    {
      id: 10377,
      name: "Domperidone suspension 5mg.",
    },
    {
      id: 10616,
      name: "Araq-e-Kasni 200ml",
    },
    {
      id: 10617,
      name: "Araq-e-Mako 200ml",
    },
    {
      id: 10618,
      name: "Habb-e-Asgandh 30 pills",
    },
    {
      id: 10658,
      name: "Tab. Buprenorphine 2 mg",
    },
    {
      id: 10669,
      name: "tab. abacavir 60 mg +lamivudine 30 mg",
    },
    {
      id: 10670,
      name: "tab. Zidovudine 60 mg + Lamivudine 30 mg",
    },
    {
      id: 10671,
      name: "tab. Zidovudine 60 mg + Lamivudine 30 mg + Nevirapine 50 mg",
    },
    {
      id: 10672,
      name: "tab. Effavirenz 200 mg",
    },
    {
      id: 10673,
      name: "tab. Darunavir 600 mg",
    },
    {
      id: 10674,
      name: "tab. Nevirapine 50 mg",
    },
    {
      id: 10675,
      name: "tab. Atazanavir 300 mg",
    },
    {
      id: 10332,
      name: "Cap. AMOXYCILLIN IP 500 MG",
    },
    {
      id: 10350,
      name: "Inj. Mannitol 20%.",
    },
    {
      id: 10380,
      name: "Inj Frusemide 10mg/ml",
    },
    {
      id: 10381,
      name: "BENZATHINE PENICILLIN 24 Lac.",
    },
    {
      id: 10384,
      name: "Cefoperazone 500mg+Sulbactum 500mg.",
    },
    {
      id: 10397,
      name: "Inj. Benzyl Penicillin IP 5 lac",
    },
    {
      id: 10400,
      name: "COUGH SYRUP (DPH).",
    },
    {
      id: 10448,
      name: "SUSP. COTRIMOXAZOLE  60ml.",
    },
    {
      id: 10437,
      name: "Tab.NIMUSULIDE 425 mg",
    },
    {
      id: 10445,
      name: "Tab.NEUROBION  Forte",
    },
    {
      id: 10439,
      name: "Tab.Norfloxacin 400mg+Trinidazole500 mg.",
    },
    {
      id: 10438,
      name: "Tab.Amlodipine 2.5mg",
    },
    {
      id: 10446,
      name: "Tab.CIFRAN 250mg",
    },
    {
      id: 10425,
      name: "Cap.Bodyrich",
    },
    {
      id: 10424,
      name: "Calcium+Vitamin D3 750mg.",
    },
    {
      id: 10419,
      name: "TAB. CYCLOPAM",
    },
    {
      id: 10414,
      name: "TAB. ANTICOLD 500 mg",
    },
    {
      id: 10413,
      name: "Calcium+Vitamin D3 750mg.",
    },
    {
      id: 10412,
      name: "cap. Amoxicillin 500 mg",
    },
    {
      id: 10411,
      name: "cap. Amoxicillin 250 mg",
    },
    {
      id: 1000000782,
      name: "Tab. Pyrantal Panoate 250mg",
    },
    {
      id: 10452,
      name: "SYRUP IFA",
    },
    {
      id: 10584,
      name: "SAVLON 1 LITRE",
    },
    {
      id: 10585,
      name: "SOFRAMYCIN SKIN OINMENT 25G",
    },
    {
      id: 10586,
      name: "DICLOFENAC 3ML",
    },
    {
      id: 10587,
      name: "ANTACID LIQUID 170ML",
    },
    {
      id: 10588,
      name: "INJ PANTOPERAZOLE 40MG",
    },
    {
      id: 10589,
      name: "SYP PARACRTAMOL 60ML",
    },
    {
      id: 10590,
      name: "TAB. CIPROFLOXACIN + TINIDAZOLE",
    },
    {
      id: 10591,
      name: "SYP VITAMIN B-COMPLEX",
    },
    {
      id: 10592,
      name: "PHENYL BLACK 450ML",
    },
    {
      id: 10593,
      name: "LULICONAZOLE CREAM 15GM",
    },
    {
      id: 10594,
      name: "TAB. CHLORINEX",
    },
    {
      id: 10595,
      name: "DETTOL LIQUID 200ML",
    },
    {
      id: 10596,
      name: "TAB. VITAMIN C",
    },
    {
      id: 10597,
      name: "NADIFLOXACIN CREAM 15GM",
    },
    {
      id: 10598,
      name: "TAB. TERBINAFINE 250MG",
    },
    {
      id: 10599,
      name: "COUGH SYRUP 60ML",
    },
    {
      id: 10600,
      name: "INJ. TRAMADOL HCL",
    },
    {
      id: 10601,
      name: "TAB. CEFALEXINE 250MG",
    },
    {
      id: 10614,
      name: "TAB. EFAVIRENZ 200MG",
    },
    {
      id: 10620,
      name: "Habb-e-Bawaseer Damiya 30 pills",
    },
    {
      id: 10621,
      name: "Habb-e-Hilteet 30 pills",
    },
    {
      id: 10622,
      name: "Habb-e-Jawahar 30 pills",
    },
    {
      id: 10623,
      name: "Habb-e-Jund 30 pills",
    },
    {
      id: 10624,
      name: "Habb-e-Kabid Nausadari 30 pills",
    },
    {
      id: 10625,
      name: "Habb-e-Muqil 30 pills",
    },
    {
      id: 10626,
      name: "Habb-e-Shifa 30 pills",
    },
    {
      id: 10619,
      name: "Habb-e-Azaraqi 30 pills",
    },
    {
      id: 10627,
      name: "Habb-e-Suranjan 30 pills",
    },
    {
      id: 10628,
      name: "Habb-e-raal 30 pills",
    },
    {
      id: 10629,
      name: "Habb-e-Tiinkar 30 pills",
    },
    {
      id: 10630,
      name: "Qurs-e-Habis 30 pills",
    },
    {
      id: 10632,
      name: "Itrifal-e-Ustukhuddus 100 gm",
    },
    {
      id: 10633,
      name: "Itrifal-e-Zamani 100 gm",
    },
    {
      id: 10634,
      name: "Itrifal-e-Kishneezi 100 gm",
    },
    {
      id: 10635,
      name: "Jawarish Amla Sada 100gm",
    },
    {
      id: 10636,
      name: "Jawarish Bisbasa 100gm",
    },
    {
      id: 10637,
      name: "Jawarish Jalinoos 100 gm",
    },
    {
      id: 10638,
      name: "Jawarish Kamooni 100 gm",
    },
    {
      id: 10639,
      name: "Khamira Abresham Sada 60gm",
    },
    {
      id: 10640,
      name: "Kushta-e-Baiza-e-Murgh 10gm",
    },
    {
      id: 10641,
      name: "Kushta-e-Faulad 10gm",
    },
    {
      id: 10642,
      name: "Lauq-e-Sapistan 100 gm",
    },
    {
      id: 10643,
      name: "Marham Quba 50 gm",
    },
    {
      id: 10644,
      name: "Majoon Chobchini 100 gm",
    },
    {
      id: 10645,
      name: "Majoon Dabeed-ul-Ward 100 gm",
    },
    {
      id: 10646,
      name: "Majoon Falshifa 100 gm",
    },
    {
      id: 10647,
      name: "Majoon Ispand Sokhtani 100 gm",
    },
    {
      id: 10648,
      name: "Majoon Jograj Guggulu 100 gm",
    },
    {
      id: 10649,
      name: "Majoon Nankhwah 100 gm",
    },
    {
      id: 10650,
      name: "Majoon Suparipak 100 gm",
    },
    {
      id: 10651,
      name: "Majoon Ushba 100 gm",
    },
    {
      id: 10652,
      name: "Raughan-e-Laboob-e-Saba 50 ml",
    },
    {
      id: 10653,
      name: "Raughan-e-Surkh 25 ml",
    },
    {
      id: 10385,
      name: "INJ. CEFTRIAXONE 250MG",
    },
    {
      id: 11047,
      name: "Tab. Dapsone 50mg",
    },
    {
      id: 1000000845,
      name: "Tab. Artesunate 50mg",
    },
    {
      id: 1000000876,
      name: "Oint. Betamethasone valerate 0.1%.",
    },
    {
      id: 10386,
      name: "INJ. RANITIDINE IP 25 MG/ML",
    },
    {
      id: 10679,
      name: "tab. Lamivudine 100 mg(single molecule).",
    },
    {
      id: 10680,
      name: "tab. Stavudine 30 mg(single molecule).",
    },
    {
      id: 10681,
      name: "tab.Zidovudine 300 mg(single molecule).",
    },
    {
      id: 10682,
      name: "Suspension Lopinavir 80 mg + Ritonavir 20 mg, 160 ml",
    },
    {
      id: 10683,
      name: "tab.Rifavudine 150 mg",
    },
    {
      id: 10684,
      name: "tab. Buprenorphine 0.4 mg",
    },
    {
      id: 1000000801,
      name: "Inj. Amikacin Sulphate 100MG",
    },
    {
      id: 1000001038,
      name: "INJ. Amikacin IP 100mg/2ml",
    },
    {
      id: 1000001040,
      name: "INJ. Amikacin IP 250mg/2ml",
    },
    {
      id: 10685,
      name: "Dil. Abies Can. 6",
    },
    {
      id: 10686,
      name: "Dil. Antim Tart. 6",
    },
    {
      id: 10687,
      name: "Dil. Arsenic Iod  6",
    },
    {
      id: 10688,
      name: "Dil. Baryta Mur 6",
    },
    {
      id: 10689,
      name: "Dil. Camphora 6",
    },
    {
      id: 10690,
      name: "Dil. Chininum Sulph. 6",
    },
    {
      id: 10691,
      name: "Dil. Equisetum Hym 6",
    },
    {
      id: 10692,
      name: "Dil. Guaiacum 6",
    },
    {
      id: 10693,
      name: "Dil. Hepar Sulph 6",
    },
    {
      id: 10694,
      name: "Dil. Podophyllum 6",
    },
    {
      id: 10695,
      name: "Dil. Rhux Tox 6",
    },
    {
      id: 10696,
      name: "Dil. Robinia 6",
    },
    {
      id: 10697,
      name: "Dil. Sabal Serrulata 6",
    },
    {
      id: 10698,
      name: "Dil. Spongia Tosta 6",
    },
    {
      id: 10699,
      name: "Dil. Uranium Nit. 6",
    },
    {
      id: 10700,
      name: "Dil. Urtica Urens 6",
    },
    {
      id: 10701,
      name: "Dil. Viburnum Opulus 6",
    },
    {
      id: 10702,
      name: "Dil. Abies Nigra 30",
    },
    {
      id: 10703,
      name: "Dil. Acid Flour 30",
    },
    {
      id: 10704,
      name: "Dil. Acid Nit 30",
    },
    {
      id: 10705,
      name: "Dil. Aconite Nap 30",
    },
    {
      id: 10706,
      name: "Dil. Acid Sulph 30",
    },
    {
      id: 10707,
      name: "Dil. Antim. Crud. 30",
    },
    {
      id: 10708,
      name: "Dil. Apis Mel 30",
    },
    {
      id: 10709,
      name: "Dil. Argent. Nit. 30",
    },
    {
      id: 10710,
      name: "Dil. Argentum Met. 30",
    },
    {
      id: 10711,
      name: "Dil. Arnica  Mont. 30",
    },
    {
      id: 10712,
      name: "Dil. Arsenic Alb 30",
    },
    {
      id: 10713,
      name: "Dil. Aurum Met. 30",
    },
    {
      id: 10714,
      name: "Dil. Avena Sat 30",
    },
    {
      id: 10715,
      name: "Dil. Bafo Rana 30",
    },
    {
      id: 10716,
      name: "Dil. Baptisia Tin. 30",
    },
    {
      id: 10717,
      name: "Dil. Belladonna  30",
    },
    {
      id: 10718,
      name: "Dil. Bellis Per. 30",
    },
    {
      id: 10719,
      name: "Dil. Berb Vulg 30",
    },
    {
      id: 10720,
      name: "Dil. Borax 30",
    },
    {
      id: 10721,
      name: "Dil. Bovista 30",
    },
    {
      id: 10722,
      name: "Dil. Bromium 30",
    },
    {
      id: 10723,
      name: "Dil. Bryonia Alba 30",
    },
    {
      id: 10724,
      name: "Dil. Cactus Grand 30",
    },
    {
      id: 10725,
      name: "Dil. Calc. Carb. 30",
    },
    {
      id: 10726,
      name: "Dil. Calcarea Phos. 30",
    },
    {
      id: 10727,
      name: "Dil. Cantharis 30",
    },
    {
      id: 10728,
      name: "Dil. Carbo Anim. 30",
    },
    {
      id: 10729,
      name: "Dil. Cardus Mar. 30",
    },
    {
      id: 10730,
      name: "Dil. Caulophylum 30",
    },
    {
      id: 10731,
      name: "Dil. Cedron 30",
    },
    {
      id: 10732,
      name: "Dil. Chamomilla 30",
    },
    {
      id: 10733,
      name: "Dil. Chininum Ars. 30",
    },
    {
      id: 10734,
      name: "Dil. Cina  30",
    },
    {
      id: 10735,
      name: "Dil. Cocculus Ind. 30",
    },
    {
      id: 10736,
      name: "Dil. Croton Tig. 30",
    },
    {
      id: 10737,
      name: "Dil. Dioscorea V. 30",
    },
    {
      id: 10738,
      name: "Dil. Digitalis Purp. 30",
    },
    {
      id: 10739,
      name: "Dil. Drosera Rot 30",
    },
    {
      id: 10740,
      name: "Dil. Dulcamara 30",
    },
    {
      id: 10741,
      name: "Dil. Euphrasia 30",
    },
    {
      id: 10742,
      name: "Dil. Glonoinum 30",
    },
    {
      id: 10743,
      name: "Dil. Hekla Lava 30",
    },
    {
      id: 10744,
      name: "Dil. Helleborus Nig. 30",
    },
    {
      id: 10745,
      name: "Dil. Hypericum Perf. 30",
    },
    {
      id: 10746,
      name: "Dil. Iodium 30",
    },
    {
      id: 10748,
      name: "Dil. Iris Vers. 30",
    },
    {
      id: 10749,
      name: "Dil. Kali Brom. 30",
    },
    {
      id: 10750,
      name: "Dil. Kali Mur. 30",
    },
    {
      id: 10751,
      name: "Dil. Kali Sulph 30",
    },
    {
      id: 10752,
      name: "Dil. Lac. Defl. 30",
    },
    {
      id: 10753,
      name: "Dil. Ledum Pal 30",
    },
    {
      id: 10754,
      name: "Dil. Lycopodium Clav. 30",
    },
    {
      id: 10755,
      name: "Dil. Mag Phos. 30",
    },
    {
      id: 10756,
      name: "Dil. Merc. Cor. 30",
    },
    {
      id: 10757,
      name: "Dil. Nat. Phos. 30",
    },
    {
      id: 10758,
      name: "Dil. Nat. Sulph. 30",
    },
    {
      id: 10759,
      name: "Dil. Nux Vomica 30",
    },
    {
      id: 10760,
      name: "Dil. Ocimum Can. 30",
    },
    {
      id: 10761,
      name: "Dil. Petrolium 30",
    },
    {
      id: 10762,
      name: "Dil. Phosphorus 30",
    },
    {
      id: 10763,
      name: "Dil. Physostigma 30",
    },
    {
      id: 10764,
      name: "Dil. Psorinum 30",
    },
    {
      id: 10765,
      name: "Dil. Ratanhia 30",
    },
    {
      id: 10766,
      name: "Dil. Robinia 30",
    },
    {
      id: 10767,
      name: "Dil. Rumex Crisp 30",
    },
    {
      id: 10768,
      name: "Dil. Ruta Grav. 30",
    },
    {
      id: 10769,
      name: "Dil. Sabadilla 30",
    },
    {
      id: 10770,
      name: "Dil. Sabina 30",
    },
    {
      id: 10771,
      name: "Dil. Sarasaparilla 30",
    },
    {
      id: 10773,
      name: "Dil. Sticta Pul 30",
    },
    {
      id: 10774,
      name: "Dil. Tarentula Cubensis 30",
    },
    {
      id: 10775,
      name: "Dil. Tarentula Hispanica 30",
    },
    {
      id: 10776,
      name: "Dil. Tellurium 30",
    },
    {
      id: 10777,
      name: "Dil. Terebinthina 30",
    },
    {
      id: 10778,
      name: "Dil. Teucri M.V. 30",
    },
    {
      id: 10779,
      name: "Dil. Uranium Nit. 30",
    },
    {
      id: 10780,
      name: "Dil. Ustilago Maydis 30",
    },
    {
      id: 10772,
      name: "Dil. Staphysagria 30",
    },
    {
      id: 10781,
      name: "Dil. Abrotanum 200",
    },
    {
      id: 10782,
      name: "Dil. Acid Benz. 200",
    },
    {
      id: 10783,
      name: "Dil. Acid Carb 200",
    },
    {
      id: 10784,
      name: "Dil. Acid Flour 200",
    },
    {
      id: 10785,
      name: "Dil. Acid Nit 200",
    },
    {
      id: 10786,
      name: "Dil. Acid Mur 200",
    },
    {
      id: 10787,
      name: "Dil. Acid Phos 200",
    },
    {
      id: 10788,
      name: "Dil. Aconite  200",
    },
    {
      id: 10789,
      name: "Dil. Actea rac (Cimicifuga) 200",
    },
    {
      id: 10790,
      name: "Dil. Aesculus Hipp. 200",
    },
    {
      id: 10791,
      name: "Dil. Allium Cepa 200",
    },
    {
      id: 10792,
      name: "Dil. Aloesoc  200",
    },
    {
      id: 10793,
      name: "Dil. Alumina 200",
    },
    {
      id: 10794,
      name: "Dil. Ammonium Carb. 200",
    },
    {
      id: 10795,
      name: "Dil. Ammonium Mur 200",
    },
    {
      id: 10796,
      name: "Dil. Ammonium Phos 200",
    },
    {
      id: 10797,
      name: "Dil. Anacardium Ori. 200",
    },
    {
      id: 10798,
      name: "Dil. Anthracinum 200",
    },
    {
      id: 10799,
      name: "Dil. Antim. Crud. 200",
    },
    {
      id: 10800,
      name: "Dil. Antim. Tart 200",
    },
    {
      id: 10801,
      name: "Dil. Apis Mel 200",
    },
    {
      id: 10802,
      name: "Dil. Apocynum Ca. 200",
    },
    {
      id: 10803,
      name: "Dil. Argent Met. 200",
    },
    {
      id: 10804,
      name: "Dil. Argent. Nit. 200",
    },
    {
      id: 10805,
      name: "Dil. Arnica  Mont. 200",
    },
    {
      id: 10806,
      name: "Dil. Arsenic Alb 200",
    },
    {
      id: 10807,
      name: "Dil. Arsenic Iod. 200",
    },
    {
      id: 10808,
      name: "Dil. Asafoetida 200",
    },
    {
      id: 10809,
      name: "Dil. Baryta Carb. 200",
    },
    {
      id: 10810,
      name: "Dil. Bryonia Alba 200",
    },
    {
      id: 10811,
      name: "Dil. Calc. Carb. 200",
    },
    {
      id: 10812,
      name: "Dil. Calc. Flour 200",
    },
    {
      id: 10813,
      name: "Dil. Calendula Off 200",
    },
    {
      id: 10814,
      name: "Dil. Capsicum 200",
    },
    {
      id: 10815,
      name: "Dil. Carbo Veg. 200",
    },
    {
      id: 10816,
      name: "Dil. Carcinosinum 200",
    },
    {
      id: 10817,
      name: "Dil. Causticum 200",
    },
    {
      id: 10818,
      name: "Dil. China Off 200",
    },
    {
      id: 10819,
      name: "Dil. Coffea Cruda 200",
    },
    {
      id: 10820,
      name: "Dil. Colchicum 200",
    },
    {
      id: 10821,
      name: "Dil. Collinsonia 200",
    },
    {
      id: 10822,
      name: "Dil. Colocynthis 200",
    },
    {
      id: 10823,
      name: "Dil. Condurango 200",
    },
    {
      id: 10824,
      name: "Dil. Conium Mac. 200",
    },
    {
      id: 10825,
      name: "Dil. Crotalus Hor. 200",
    },
    {
      id: 10826,
      name: "Dil. Cuprum Met 200",
    },
    {
      id: 10827,
      name: "Dil. Drosera Rot 200",
    },
    {
      id: 10828,
      name: "Dil. Equisetum Hym. 200",
    },
    {
      id: 10829,
      name: "Dil. Eupatorium Perf. 200",
    },
    {
      id: 10830,
      name: "Dil. Ferrum Met. 200",
    },
    {
      id: 10831,
      name: "Dil. Gelsemium Semp. 200",
    },
    {
      id: 10832,
      name: "Dil. Glonoinum 200",
    },
    {
      id: 10833,
      name: "Dil. Graphites 200",
    },
    {
      id: 10834,
      name: "Dil. Hamamelis Vir. 200",
    },
    {
      id: 10835,
      name: "Dil. Helleborus Niger 200",
    },
    {
      id: 10836,
      name: "Dil. Hepar Sulph 200",
    },
    {
      id: 10837,
      name: "Dil. Hyoscyamus N. 200",
    },
    {
      id: 10838,
      name: "Dil. Ignatia Amara 200",
    },
    {
      id: 10839,
      name: "Dil. Kali Bich. 200",
    },
    {
      id: 10840,
      name: "Dil. Kali Carb. 200",
    },
    {
      id: 10841,
      name: "Dil. Kali Iod 200",
    },
    {
      id: 10842,
      name: "Dil. Kali Phos 200",
    },
    {
      id: 10843,
      name: "Dil. Kalmia Lat. 200",
    },
    {
      id: 10844,
      name: "Dil. Kreosotum 200",
    },
    {
      id: 10845,
      name: "Dil. Lachesis  200",
    },
    {
      id: 10846,
      name: "Dil. Lycopodium Clav. 200",
    },
    {
      id: 10847,
      name: "Dil. Mag Phos. 200",
    },
    {
      id: 10848,
      name: "Dil. Medorrhinum 200",
    },
    {
      id: 10849,
      name: "Dil. Merc. Cor. 200",
    },
    {
      id: 10850,
      name: "Dil. Merc. Sol. 200",
    },
    {
      id: 10851,
      name: "Dil. Mezereum 200",
    },
    {
      id: 10852,
      name: "Dil. Murex Pur 200",
    },
    {
      id: 10853,
      name: "Dil. Naja Trip 200",
    },
    {
      id: 10854,
      name: "Dil. Nat. Mur. 200",
    },
    {
      id: 10855,
      name: "Dil. Natrum Ars. 200",
    },
    {
      id: 10856,
      name: "Dil. Nux Mox 200",
    },
    {
      id: 10857,
      name: "Dil. Nux Vomica 200",
    },
    {
      id: 10858,
      name: "Dil. Opium 200",
    },
    {
      id: 10859,
      name: "Dil. Physostigma 200",
    },
    {
      id: 10860,
      name: "Dil. Plumbum Met. 200",
    },
    {
      id: 10861,
      name: "Dil. Podophyllum 200",
    },
    {
      id: 10862,
      name: "Dil. Prunus Spinosa 200",
    },
    {
      id: 10863,
      name: "Dil. Pulsatilla 200",
    },
    {
      id: 10864,
      name: "Dil. Pyrogenium 200",
    },
    {
      id: 10865,
      name: "Dil. Ranuncul Bulb. 200",
    },
    {
      id: 10866,
      name: "Dil. Rhododendron 200",
    },
    {
      id: 10867,
      name: "Dil. Rhus Tox 200",
    },
    {
      id: 10868,
      name: "Dil. Secale Cor 200",
    },
    {
      id: 10869,
      name: "Dil. Selenium 200",
    },
    {
      id: 10870,
      name: "Dil. Senega 200",
    },
    {
      id: 10871,
      name: "Dil. Sepia 200",
    },
    {
      id: 10872,
      name: "Dil. Silicea 200",
    },
    {
      id: 10873,
      name: "Dil. Spigelia 200",
    },
    {
      id: 10874,
      name: "Dil. Spongia T. 200",
    },
    {
      id: 10875,
      name: "Dil. Stannum Met. 200",
    },
    {
      id: 10876,
      name: "Dil. Staphysagria 200",
    },
    {
      id: 10877,
      name: "Dil. Sulphur 200",
    },
    {
      id: 10878,
      name: "Dil. Thuja Occ 200",
    },
    {
      id: 10879,
      name: "Dil. Thyroidinum  200",
    },
    {
      id: 10880,
      name: "Dil. Tuberculinum Bovinum 200",
    },
    {
      id: 10881,
      name: "Dil. Veratrum Alb. 200",
    },
    {
      id: 10882,
      name: "Dil. Veratrum Viride 200",
    },
    {
      id: 10883,
      name: "Dil. Wyethia  200",
    },
    {
      id: 10884,
      name: "Dil. Zincum Met. 200",
    },
    {
      id: 10885,
      name: "Dil. Zincum Phos 200",
    },
    {
      id: 10886,
      name: "Dil. Arnica Mont. 1M",
    },
    {
      id: 10887,
      name: "Dil. Bryonia Alba 1M",
    },
    {
      id: 10888,
      name: "Dil. Calc. Phos 1M",
    },
    {
      id: 10889,
      name: "Dil. Carcinosin 1M",
    },
    {
      id: 10890,
      name: "Dil. Causticum 1M",
    },
    {
      id: 10891,
      name: "Dil. Collin Sonia 1M",
    },
    {
      id: 10892,
      name: "Dil. Conium Mac. 1M",
    },
    {
      id: 10893,
      name: "Dil. Gelsemium 1M",
    },
    {
      id: 10894,
      name: "Dil. Lillium Tig 1M",
    },
    {
      id: 10895,
      name: "Dil. Lycopodium Clav 1M",
    },
    {
      id: 10896,
      name: "Dil. Nat. Sulph 1M",
    },
    {
      id: 10897,
      name: "Dil. Nitric Acid 1M",
    },
    {
      id: 10898,
      name: "Dil. Nux Vomica 1M",
    },
    {
      id: 10899,
      name: "Dil. Phos. Acid 1M",
    },
    {
      id: 10900,
      name: "Dil. Physostigma 1M",
    },
    {
      id: 10901,
      name: "Dil. Psorinum 1M",
    },
    {
      id: 10902,
      name: "Dil. Pulsatilla 1M",
    },
    {
      id: 10903,
      name: "Dil. Rhus Tox 1M",
    },
    {
      id: 10904,
      name: "Dil. Silicea  1M",
    },
    {
      id: 10905,
      name: "Dil. Sulphur 1M",
    },
    {
      id: 10906,
      name: "Dil. Thuja Occ 1M",
    },
    {
      id: 10907,
      name: "Dil. Thyroidinum 1M",
    },
    {
      id: 10908,
      name: "EOT. Aesculus Hip",
    },
    {
      id: 10909,
      name: "EOT. Arnica",
    },
    {
      id: 10910,
      name: "EOT. Calendula",
    },
    {
      id: 10911,
      name: "EOT. Catharis",
    },
    {
      id: 10912,
      name: "EOT. Hemamelis",
    },
    {
      id: 10913,
      name: "EOT. Ledum Pal",
    },
    {
      id: 10914,
      name: "EOT. Rhus Tox",
    },
    {
      id: 10915,
      name: "Calcarea Flour. 6x",
    },
    {
      id: 10916,
      name: "Calcarea Phos. 6x",
    },
    {
      id: 10917,
      name: "Calcarea Sulph 6x",
    },
    {
      id: 10918,
      name: "Ferrum Phos 6x",
    },
    {
      id: 10919,
      name: "Kali Mur 6x",
    },
    {
      id: 10920,
      name: "Kali Phos 6x",
    },
    {
      id: 10921,
      name: "kali Sulph 6x",
    },
    {
      id: 10922,
      name: "Nat. Phos 6x",
    },
    {
      id: 10923,
      name: "Nat. Sulph. 6x",
    },
    {
      id: 10924,
      name: "Nat. Mur 6x",
    },
    {
      id: 10925,
      name: "Mag. Phos. 6x",
    },
    {
      id: 10926,
      name: "Silicea 6x",
    },
    {
      id: 10927,
      name: "MT. Apocynum. Can Q",
    },
    {
      id: 10928,
      name: "MT. Arnica Mont Q",
    },
    {
      id: 10929,
      name: "MT. Baptisia Tinct Q",
    },
    {
      id: 10930,
      name: "MT. Bellis per Q",
    },
    {
      id: 10931,
      name: "MT. Berberis Vulgaris Q",
    },
    {
      id: 10932,
      name: "MT. Blatta Orientalis Q",
    },
    {
      id: 10933,
      name: "MT. Cactus grandiflours Q",
    },
    {
      id: 10934,
      name: "MT. Calendula off. EXT",
    },
    {
      id: 10935,
      name: "MT. Cantharis EXT",
    },
    {
      id: 10936,
      name: "MT. Cardus Mar. Q",
    },
    {
      id: 10937,
      name: "MT. Chelidonium Maj. Q",
    },
    {
      id: 10938,
      name: "MT. China Off. Q",
    },
    {
      id: 10939,
      name: "MT. Cina Q",
    },
    {
      id: 10940,
      name: "MT. Crataegus Q",
    },
    {
      id: 10941,
      name: "MT. Digitalis Q",
    },
    {
      id: 10942,
      name: "MT. Dioscorea Q",
    },
    {
      id: 10943,
      name: "MT. Echinacea Ang. Q",
    },
    {
      id: 10944,
      name: "MT. Ginseng Q",
    },
    {
      id: 10945,
      name: "MT. Hemamelis Q",
    },
    {
      id: 10946,
      name: "MT. Hydrastis Can. Q",
    },
    {
      id: 10947,
      name: "MT. Hydrocotyle Q",
    },
    {
      id: 10948,
      name: "MT. Hypericum Perf. Q",
    },
    {
      id: 10949,
      name: "MT. J. Ashoka Q",
    },
    {
      id: 10950,
      name: "MT. Justicia Adh. Q",
    },
    {
      id: 10951,
      name: "MT. Kreosotum Q",
    },
    {
      id: 10952,
      name: "MT. Lemna Minor Q",
    },
    {
      id: 10953,
      name: "MT. Ocimum Can Q",
    },
    {
      id: 10954,
      name: "MT. Ocimum Sanct Q",
    },
    {
      id: 10955,
      name: "MT. Passiflora. Inc. Q",
    },
    {
      id: 10956,
      name: "MT. Phytolaca. D. Q",
    },
    {
      id: 10957,
      name: "MT. Plantago M. EXT",
    },
    {
      id: 10958,
      name: "MT. Rauwolfia Serp. Q",
    },
    {
      id: 10959,
      name: "MT. Sabal Serrulata Q",
    },
    {
      id: 10960,
      name: "MT. Sarasaparilla Q",
    },
    {
      id: 10961,
      name: "MT. Senecio Aur Q",
    },
    {
      id: 10962,
      name: "MT. Syzygium Jamb. Q",
    },
    {
      id: 10963,
      name: "MT. Thuja Occ. EXT",
    },
    {
      id: 10964,
      name: "MT. Urtica Urens Q",
    },
    {
      id: 10965,
      name: "MT. Ustilago M Q",
    },
    {
      id: 10966,
      name: "MT. Viburnum Op Q",
    },
    {
      id: 10967,
      name: "Mullein Oil",
    },
    {
      id: 10968,
      name: "Glubules NO. 30",
    },
    {
      id: 10335,
      name: "RANITIDINE HYDROCLORIDE 300 MG",
    },
    {
      id: 11006,
      name: "Inj. Artesunate 60mg",
    },
    {
      id: 10969,
      name: "ABHAYARISHTAM 200ML",
    },
    {
      id: 10970,
      name: "Tab. Ferrous Sulphate and Folic Acid(IFA LARGE-RED).",
    },
    {
      id: 10976,
      name: "Sodium CR Tablet",
    },
    {
      id: 10977,
      name: "Tab Amoxicillin(500mg)+Clavulanic Acid 125 mg",
    },
    {
      id: 10978,
      name: "Tab. Tranexemic acid 500mg",
    },
    {
      id: 10985,
      name: "Tab. Levothyroxine",
    },
    {
      id: 10988,
      name: "Tab. Mesoprostol",
    },
    {
      id: 10990,
      name: "Liquid amoxicillin(200mg)+Clavulanic acid 28.5mg/ml",
    },
    {
      id: 10991,
      name: "amoxicillin(1g)+Clavulanic Acid(200mg),powder for injection",
    },
    {
      id: 10992,
      name: "Tab. Allopurinol 300mg",
    },
    {
      id: 10979,
      name: "Inj  Tranexemic acid 100mg",
    },
    {
      id: 10980,
      name: "Xylometazoline 10ml",
    },
    {
      id: 11007,
      name: "Hydrocortisone powder for injection 100mg/ml",
    },
    {
      id: 10987,
      name: "Tab. Mifepristone 200mg",
    },
    {
      id: 10989,
      name: "Tab. Risperidone 1mg",
    },
    {
      id: 10993,
      name: "Tab. Sodium valproate 300mg",
    },
    {
      id: 10994,
      name: "Tab. Sodium valproate 500mg",
    },
    {
      id: 10995,
      name: "Tab. Amoxicillin 500mg + Clavulanic Acid 125mg",
    },
    {
      id: 10997,
      name: "Inj. Artesunate 120mg",
    },
    {
      id: 11015,
      name: "Inj. Enoxaparin 60MG/0.6ML",
    },
    {
      id: 10999,
      name: "Tab. Folic Acid 5mg",
    },
    {
      id: 11000,
      name: "Cap. Hydroxyurea 500mg",
    },
    {
      id: 11003,
      name: "Tab. Levothyroxine 12.5mcg to 150 mcg",
    },
    {
      id: 11005,
      name: "Tab. Misoprostol 200mcg",
    },
    {
      id: 11008,
      name: "Tab. Telmisartan 40mg",
    },
    {
      id: 10983,
      name: "Tab. Methylprednisolone 16mg",
    },
    {
      id: 10984,
      name: "Inj. Methylprednisolone 40mg/ml",
    },
    {
      id: 10986,
      name: "Timolol Drop 0.5%.",
    },
    {
      id: 11009,
      name: "Tab. Entecavir 0.5MG",
    },
    {
      id: 11004,
      name: "Drop Timolol (Miotics) 0.5%.",
    },
    {
      id: 11001,
      name: "Xylometazoline 0.05%.",
    },
    {
      id: 10981,
      name: "Cap. Omeprazole 20mg",
    },
    {
      id: 11010,
      name: "Cap. Ribavirin 200MG",
    },
    {
      id: 10972,
      name: "Inj Golimumab 50MG",
    },
    {
      id: 10973,
      name: "Fentanyl Patch with D trans patch 25MG",
    },
    {
      id: 10974,
      name: "Inj. Respiradone LAI 50MG",
    },
    {
      id: 11011,
      name: "Tab. Sofosbuvir 400MG",
    },
    {
      id: 11012,
      name: "Tab. Tenofovir 300MG",
    },
    {
      id: 11013,
      name: "Powder for Inj. Amphotericin B conventional + Lipid/Liposomal 50MG",
    },
    {
      id: 11014,
      name: "Inj. Enoxaparin 40MG/0.4ML",
    },
    {
      id: 11016,
      name: "Inj. Lignocaine Plain 1%.",
    },
    {
      id: 11017,
      name: "Inj. Midazolam 1MG/ML",
    },
    {
      id: 11018,
      name: "Ibuprofen Oral Liquid 100mg/5ml",
    },
    {
      id: 10975,
      name: "Tab. Allopurinol 100mg",
    },
    {
      id: 10998,
      name: "Susp. Chloroquine 50mg/5ml",
    },
    {
      id: 11002,
      name: "Xylometazoline 0.1% to 1%.",
    },
    {
      id: 10982,
      name: "Ondansetron 4mg/5 ml",
    },
    {
      id: 11019,
      name: "Cap. Mefenamic Acid 250MG",
    },
    {
      id: 11020,
      name: "Cap. Tramadol 100MG",
    },
    {
      id: 11021,
      name: "Inj. Tramadol 50MG/ML",
    },
    {
      id: 11022,
      name: "Tab. Colchicine 0.5MG",
    },
    {
      id: 11023,
      name: "Tab. Azathioprine 50MG",
    },
    {
      id: 11024,
      name: "Tab. Hydroxychloroquine 200MG",
    },
    {
      id: 11025,
      name: "Tab. Hydroxychloroquine 400MG",
    },
    {
      id: 11026,
      name: "Tab. Leflunomide 10MG",
    },
    {
      id: 11027,
      name: "Tab. Sulfasalazine 500MG",
    },
    {
      id: 11028,
      name: "Inj. Adrenaline 1MG/ML",
    },
    {
      id: 11029,
      name: "Tab. Chlorpheniramine 4MG",
    },
    {
      id: 11031,
      name: "Tab. Carbamazepine 100MG",
    },
    {
      id: 11032,
      name: "Tab. Carbamazepine CR 200MG",
    },
    {
      id: 11033,
      name: "Tab. Carbamazepine 400MG",
    },
    {
      id: 11034,
      name: "Tab. Carbamazepine CR 400MG",
    },
    {
      id: 11035,
      name: "Carbamazepine Oral Liquid 100MG/5ML",
    },
    {
      id: 11036,
      name: "Tab. Lorazepam 1MG",
    },
    {
      id: 1000000933,
      name: "Tab. Lorazepam 2MG",
    },
    {
      id: 11037,
      name: "Tab. Phenytoin 50MG",
    },
    {
      id: 11038,
      name: "Phenytoin Oral Liquid 30MG/5ML",
    },
    {
      id: 11039,
      name: "Inj. Ampicillin 1G",
    },
    {
      id: 11040,
      name: "Inj. Cefotaxime 1g",
    },
    {
      id: 11042,
      name: "Cap. Cloxacillin 500MG",
    },
    {
      id: 11087,
      name: "Tab. Metoprolol SR Tablet 50mg",
    },
    {
      id: 11043,
      name: "Susp. Cloxacillin 125mg/5ml",
    },
    {
      id: 11044,
      name: "Tab. Nitrofurantoin 100mg",
    },
    {
      id: 1000000819,
      name: "Cap. Clofazimine 50mg",
    },
    {
      id: 11045,
      name: "Cap. Clofazimine 100mg",
    },
    {
      id: 11046,
      name: "Tab. Dapsone 25mg",
    },
    {
      id: 11048,
      name: "Clotrimazole 100mg",
    },
    {
      id: 11049,
      name: "Tab. Fluconazole 50mg",
    },
    {
      id: 11050,
      name: "Tab. Fluconazole 200mg",
    },
    {
      id: 11051,
      name: "Tab. Acyclovir 200mg",
    },
    {
      id: 11052,
      name: "Tab. Entecavir 1MG",
    },
    {
      id: 11053,
      name: "Tab. Lumefantrine 80+480MG",
    },
    {
      id: 11056,
      name: "Tab. Artesunate 25mg+ (Sulphadoxine Pyrimethamine) 250+12.5mg",
    },
    {
      id: 11057,
      name: "Tab. Artesunate 50mg+ (Sulphadoxine Pyrimethamine) 500+25mg",
    },
    {
      id: 11058,
      name: "Tab. Artesunate 100mg+ (Sulphadoxine Pyrimethamine) 750+37.5mg",
    },
    {
      id: 11059,
      name: "Tab. Artesunate 150mg+ (Sulphadoxine Pyrimethamine) 500+25mg",
    },
    {
      id: 11060,
      name: "Tab. Artesunate 200mg+ (Sulphadoxine Pyrimethamine) 750+37.5mg",
    },
    {
      id: 11061,
      name: "Tab. Chloroquine 150mg",
    },
    {
      id: 11062,
      name: "Tab. Premaquine 15mg",
    },
    {
      id: 11063,
      name: "Tab. Flunarizine 5mg",
    },
    {
      id: 11064,
      name: "Tab. Flunarizine 10mg",
    },
    {
      id: 11065,
      name: "Tab. Propranolol 40mg",
    },
    {
      id: 11066,
      name: "Tab. Propranolol 10mg",
    },
    {
      id: 11067,
      name: "Inj. Erythropoietin 2000 IU/ML",
    },
    {
      id: 11068,
      name: "Inj. Erythropoietin 10000 IU/ML",
    },
    {
      id: 11069,
      name: "Susp. Ferrous salts 25mg/ml",
    },
    {
      id: 11070,
      name: "Tab. Ferrous salt 45mg + Folic acid 400mcg",
    },
    {
      id: 11072,
      name: "Inj. Iron sucrose 20mg/ml",
    },
    {
      id: 11073,
      name: "Tab. Warfarin 1mg",
    },
    {
      id: 11074,
      name: "Tab. Warfarin 2mg",
    },
    {
      id: 11075,
      name: "Tab. Warfarin 3mg",
    },
    {
      id: 11076,
      name: "Tab. Warfarin 5mg",
    },
    {
      id: 11077,
      name: "Tab. Clopidogrel 75mg",
    },
    {
      id: 11078,
      name: "Tab. Diltiazem 60mg",
    },
    {
      id: 11079,
      name: "Tab. Diltiazem 30mg",
    },
    {
      id: 11083,
      name: "TAB. ISOSORBIDE DINITRATE 10MG",
    },
    {
      id: 11084,
      name: "Tab. Metoprolol 25mg",
    },
    {
      id: 11085,
      name: "Tab. Metoprolol 50mg",
    },
    {
      id: 11088,
      name: "Tab. Amiodarone 100mg",
    },
    {
      id: 11089,
      name: "Tab. Amiodarone 200mg",
    },
    {
      id: 11090,
      name: "Tab. verapamil 40mg",
    },
    {
      id: 11091,
      name: "Tab. Verapamil 80mg",
    },
    {
      id: 11092,
      name: "Tab. Almodipine 5mg",
    },
    {
      id: 11093,
      name: "Tab. Almodipine 10mg",
    },
    {
      id: 11094,
      name: "Tab. Almodipine 100mg",
    },
    {
      id: 11071,
      name: "Susp. Ferrous salt 20mg/ml + Folic acid 100mcg/ml",
    },
    {
      id: 11080,
      name: "Tab. Diltiazem SR 90mg",
    },
    {
      id: 11081,
      name: "Tab. Glyceryl Trinitrate Sublingual 0.5mg",
    },
    {
      id: 11054,
      name: "Tab. ARTEMETHER 20MG + LUMEFANTRINE 120MG",
    },
    {
      id: 11041,
      name: "Tab. Cloxacillin 250MG",
    },
    {
      id: 11030,
      name: "Inj. Calcium Gluconate 10% 10ML",
    },
    {
      id: 11095,
      name: "Tab. Enalapril 2.5mg",
    },
    {
      id: 11096,
      name: "TAB. HYDROCHLOROTHIAZIDE 12.5mg",
    },
    {
      id: 11097,
      name: "TAB. HYDROCHLOROTHIAZIDE 25mg",
    },
    {
      id: 11098,
      name: "Tab. Methyldopa 250mg",
    },
    {
      id: 11099,
      name: "Tab. Ramipril 2.5mg",
    },
    {
      id: 11100,
      name: "Tab. Ramipril 5mg",
    },
    {
      id: 11101,
      name: "Tab. Telmisartan 20mg",
    },
    {
      id: 11102,
      name: "Tab. Telmisartan 80mg",
    },
    {
      id: 1000000859,
      name: "Tab. Digoxin 0.25mg",
    },
    {
      id: 1000000871,
      name: "Silver Sulphadiazine Cream 1%.",
    },
    {
      id: 11104,
      name: "Oint. Betamethasone 0.05%.",
    },
    {
      id: 11105,
      name: "Calamine",
    },
    {
      id: 11106,
      name: "Oint. Salicylic Acid 6%.",
    },
    {
      id: 11082,
      name: "Tab. Isosorbide-5-mononitrate 20mg",
    },
    {
      id: 11107,
      name: "Chlorhexidine Solution 5%.",
    },
    {
      id: 11108,
      name: "Tab. Furosemide 40mg",
    },
    {
      id: 11110,
      name: "Permethrin lotion1%.",
    },
    {
      id: 11111,
      name: "Permethrin lotion5%.",
    },
    {
      id: 11112,
      name: "Tab. Spironolactone 25mg",
    },
    {
      id: 11113,
      name: "Tab. Spironolactone 50mg",
    },
    {
      id: 11114,
      name: "Tab. Ondansetron 4mg",
    },
    {
      id: 11115,
      name: "Inj. Ondansetron 2mg/ml",
    },
    {
      id: 11116,
      name: "Tab. Dicyclomine 10mg",
    },
    {
      id: 11117,
      name: "Tab. Hyoscine butylbromide 10mg",
    },
    {
      id: 11118,
      name: "Tab. Hyoscine butylbromide 20mg",
    },
    {
      id: 11119,
      name: "Susp. Lactulose 10g/15ml",
    },
    {
      id: 11120,
      name: "Tab. Methylprednisolone 8mg",
    },
    {
      id: 11121,
      name: "Tab. Prednisolone 20mg",
    },
    {
      id: 11122,
      name: "Inj. Intermediate Acting (NPH) Insulin 40 IU/ml",
    },
    {
      id: 11123,
      name: "Inj. Premix Insulin 30:70 Injection (Regular:NPH) 40 IU/ml",
    },
    {
      id: 11124,
      name: "Tab. Carbimazole 5mg",
    },
    {
      id: 11125,
      name: "Tab. Carbimazole 10mg",
    },
    {
      id: 11126,
      name: "Tab. Neostigmine 15 mg",
    },
    {
      id: 11127,
      name: "Oint. Gentamicin 0.3%.",
    },
    {
      id: 11128,
      name: "Inj. Betamethasone 4mg/ml",
    },
    {
      id: 11129,
      name: "Tab. Nifedipine  (pre term labour) 10mg",
    },
    {
      id: 11130,
      name: "Tab. Risperidone 2mg",
    },
    {
      id: 11131,
      name: "Tab. Risperidone 4mg",
    },
    {
      id: 11132,
      name: "Tab. Amitriptyline 10mg",
    },
    {
      id: 11133,
      name: "Tab. Amitriptyline 75mg",
    },
    {
      id: 11134,
      name: "Tab. Escitalopram 5mg",
    },
    {
      id: 11135,
      name: "Tab. Escitalopram 10mg",
    },
    {
      id: 11136,
      name: "Cap. Fluoxetine 10mg",
    },
    {
      id: 11137,
      name: "Cap. Fluoxetine 20mg",
    },
    {
      id: 11138,
      name: "Tab. Mycophenolate sodium Enteric coated 360mg",
    },
    {
      id: 11139,
      name: "Cap. Tacrolimus capsules 1mg",
    },
    {
      id: 11140,
      name: "Tab. Clonazepam 0.5mg",
    },
    {
      id: 11141,
      name: "Cap. Clomipramine 25mg",
    },
    {
      id: 11142,
      name: "Inj. Glucose 5%.",
    },
    {
      id: 11143,
      name: "Inj. Glucose 10%.",
    },
    {
      id: 11144,
      name: "Inj. Glucose 25%.",
    },
    {
      id: 11145,
      name: "Inj. Glucose 5% + Sodium Chloride 0.9%.",
    },
    {
      id: 11146,
      name: "Inj. Potassium Chloride 150mg/ml",
    },
    {
      id: 11149,
      name: "Inj. Water for Injection",
    },
    {
      id: 11161,
      name: "Cap. Vitamin A 200000 IU",
    },
    {
      id: 11147,
      name: "Inj. Ringer Lactate IP",
    },
    {
      id: 11151,
      name: "Tab. Calcium Carbonate 250mg",
    },
    {
      id: 11152,
      name: "Tab. Calcium Carbonate 500mg",
    },
    {
      id: 11155,
      name: "Tab. Pyridoxine 10mg",
    },
    {
      id: 11156,
      name: "Tab. Pyridoxine 50mg",
    },
    {
      id: 11157,
      name: "Tab. Pyridoxine 100mg",
    },
    {
      id: 11158,
      name: "Tab. Riboflavin 5mg",
    },
    {
      id: 11159,
      name: "Inj. Thiamine 100mg/ml",
    },
    {
      id: 11160,
      name: "Cap. Vitamin A 5000 IU",
    },
    {
      id: 11162,
      name: "Cap. Vitamin A 100000 IU",
    },
    {
      id: 1000000821,
      name: "Cap. Rifampicin 150mg",
    },
    {
      id: 11164,
      name: "Tab. Primaquine 15mg",
    },
    {
      id: 11165,
      name: "Tab. Amlodipine 10mg",
    },
    {
      id: 11166,
      name: "Tab. Amlodipine 100mg",
    },
    {
      id: 1000000938,
      name: "Tab. Salbutamol Sulphate 4mg",
    },
    {
      id: 11150,
      name: "Tab. Ascorbic Acid (Vitamin C) 500mg",
    },
    {
      id: 11154,
      name: "Susp. Cholecalciferol  Oral Liquid 400 IU/ml",
    },
    {
      id: 11163,
      name: "Susp. Vitamin A Oral Liquid 100000 IU/ml",
    },
    {
      id: 11103,
      name: "POVIDONE IODINE 4%.",
    },
    {
      id: 11148,
      name: "Inj. Sodium bicarbonate 10ML",
    },
    {
      id: 10971,
      name: "Tab. Canagliflozin 100 mg",
    },
    {
      id: 10379,
      name: "amoxicillin (A)+Clavulanic acid (B)125+31.25/5",
    },
    {
      id: 11167,
      name: "Inj. Bipivacaine 0.5% with 7.5% glucose",
    },
    {
      id: 11168,
      name: "Oint. prilocaine 2.5% + Lignocaine 2.5%.",
    },
    {
      id: 11170,
      name: "Inj. Diltiazem 5mg/ml",
    },
    {
      id: 11174,
      name: "Oint. Benzoyl Peroxide 2.5%.",
    },
    {
      id: 11175,
      name: "Tube. White Petrolatum 100%.",
    },
    {
      id: 11176,
      name: "IUD Containing Copper",
    },
    {
      id: 11177,
      name: "Comdom",
    },
    {
      id: 11178,
      name: "Oint. Erythromycin 0.5%.",
    },
    {
      id: 11179,
      name: "Vial. Proparacaine (Local anaesthetics) 0.5%.",
    },
    {
      id: 11182,
      name: "Inhalation. Tiotropium (DPI) 18mcg/dose",
    },
    {
      id: 11308,
      name: "Drop. Lignocaine 4%.",
    },
    {
      id: 11181,
      name: "Inhalation Budesonide + Formoterol",
    },
    {
      id: 11183,
      name: "Inj. Sodium Chloride 0.45%.",
    },
    {
      id: 11184,
      name: "Inhalation Isoflurane",
    },
    {
      id: 11185,
      name: "Inj. Ketamine 50mg/ml",
    },
    {
      id: 11186,
      name: "Inhalation Nitrious oxide",
    },
    {
      id: 11187,
      name: "Inhalation Oxygen",
    },
    {
      id: 11188,
      name: "Inj. Propofol 10mg/ml",
    },
    {
      id: 11189,
      name: "Inhalation Sevoflurane",
    },
    {
      id: 11191,
      name: "Topical Form Lignocaine 2-5%.",
    },
    {
      id: 11192,
      name: "Inj. Lignocaine 1% with 7.5% glucose",
    },
    {
      id: 11193,
      name: "Inj. Lignocaine 2% with 7.5% glucose",
    },
    {
      id: 11194,
      name: "Inj. Lignocaine 5% with 7.5% glucose",
    },
    {
      id: 11195,
      name: "Inj. Lignocaine 1% + Adrenaline 1:200000 (5mcg/ml).",
    },
    {
      id: 11196,
      name: "Inj. Lignocaine 2% + Adrenaline 1:200000 (5mcg/ml).",
    },
    {
      id: 11198,
      name: "Susp. Midazolam 2mg/ml",
    },
    {
      id: 11200,
      name: "Inj. Morphine 15mg/ml",
    },
    {
      id: 11203,
      name: "Tab. Acetylsalicylic Acid Enteric coated 300 to 500mg",
    },
    {
      id: 11202,
      name: "Acetylsalicylic Acid Dispersible 300 to 500mg",
    },
    {
      id: 11201,
      name: "Acetylsalicylic Acid Effervescent 300 to 500mg",
    },
    {
      id: 11204,
      name: "Tab. Paracetamol 650mg",
    },
    {
      id: 11205,
      name: "Inj. Paracetamol 150mg/ml",
    },
    {
      id: 11206,
      name: "Inj. Fentanyl 50mcg/ml",
    },
    {
      id: 11207,
      name: "Tab. Methotrexate 7.5mg",
    },
    {
      id: 11208,
      name: "Tab. Methotrexate 10mg",
    },
    {
      id: 11209,
      name: "Chlorpheniramine Oral Liquid 2mg/5ml",
    },
    {
      id: 11210,
      name: "Desferrioxamine Powder for Injection 500mg",
    },
    {
      id: 11211,
      name: "Inj. Methylthioninium Chloride (Methylene blue) 10mg/ml",
    },
    {
      id: 11212,
      name: "Inj. Naloxone 0.4mg/ml",
    },
    {
      id: 11213,
      name: "Inj. Pralidoxime chloride (2-PAM) 25mg/ml",
    },
    {
      id: 11214,
      name: "Inj. Sodium nitrite 30mg/ml",
    },
    {
      id: 11215,
      name: "Susp. Carbamazepine 100mg/ml",
    },
    {
      id: 11216,
      name: "Susp. Carbamazepine 200mg/ml",
    },
    {
      id: 11217,
      name: "Susp. Diazepam 2mg/5ml",
    },
    {
      id: 11219,
      name: "Inj. Magnesium Sulphate 500mg/ml",
    },
    {
      id: 11220,
      name: "Tab. Phenobarbitone 60mg",
    },
    {
      id: 11221,
      name: "Susp. Phenobarbitone 20mg/5ml",
    },
    {
      id: 11222,
      name: "Tab. Phenytoin 300mg",
    },
    {
      id: 11223,
      name: "Tab. Phenytoin ER 300mg",
    },
    {
      id: 11224,
      name: "Phenytoin Oral Liquid 125MG/5ML",
    },
    {
      id: 11225,
      name: "Inj. Phenytoin 25mg/ml",
    },
    {
      id: 11226,
      name: "Tab. Sodium Valproate CR 300mg",
    },
    {
      id: 11227,
      name: "Tab. Sodium Valproate CR 500mg",
    },
    {
      id: 11228,
      name: "Sodium Valproate Oral Liquid 200mg/5ml",
    },
    {
      id: 11229,
      name: "Inj. Sodium Valproate 100mg/ml",
    },
    {
      id: 11230,
      name: "Susp. Amoxicillin Oral Liquid 250mg/5ml",
    },
    {
      id: 10996,
      name: "Susp. Amoxicillin 200mg + Clavulanic Acid Oral Liquid 28.5mg / 5ml",
    },
    {
      id: 11231,
      name: "Inj. Amoxicillin 500mg + Clavulanic Acid 100mg",
    },
    {
      id: 11232,
      name: "Inj. Amoxicillin 1mg + Clavulanic Acid 200mg",
    },
    {
      id: 11199,
      name: "Inj. Midazolam 1mg/ml",
    },
    {
      id: 11171,
      name: "Acytylsalicylic acid Effervescent 75mg",
    },
    {
      id: 11173,
      name: "Tab. Acytylsalicylic Acid Enteric coated 75mg",
    },
    {
      id: 11180,
      name: "Inhalation Budesonide + Formoterol (MDI/DPI) 100 mcg/dose",
    },
    {
      id: 11315,
      name: "Sol. Cetrimide 20%.",
    },
    {
      id: 11233,
      name: "Inj. Benzathine benzylpenicillin 6Lacs",
    },
    {
      id: 11234,
      name: "Tab. Cefadroxil 500mg",
    },
    {
      id: 11197,
      name: "Tab. Midazolam 7.5mg",
    },
    {
      id: 11169,
      name: "Susp. Sofosbuvir 200mg/5ml",
    },
    {
      id: 11235,
      name: "Susp. Cefadroxil Oral Liquid 125mg/5ml",
    },
    {
      id: 11237,
      name: "Tab. Cefixime 400mg",
    },
    {
      id: 11238,
      name: "Susp. Cefixime Oral Liquid 50mg/5ml",
    },
    {
      id: 11239,
      name: "Susp. Cefixime Oral Liquid 100mg/5ml",
    },
    {
      id: 11245,
      name: "Inj. Cloxacillin 250mg",
    },
    {
      id: 11246,
      name: "Susp. Azithromycin Oral Liquid 200mg/5ml",
    },
    {
      id: 11247,
      name: "Inj. Azithromycin 500mg",
    },
    {
      id: 11248,
      name: "Tab. Cotrimoxazole 400mg + Trimethoprim 160mg",
    },
    {
      id: 11249,
      name: "Tab. Cotrimoxazole 800mg + Trimethoprim 80mg",
    },
    {
      id: 11250,
      name: "Tab. Cotrimoxazole 800mg + Trimethoprim 160mg",
    },
    {
      id: 11251,
      name: "Susp. Cotrimoxazole 200mg/5ml + 40mg/5ml",
    },
    {
      id: 11252,
      name: "Susp. Metronidazole Oral Liquid 200mg/ml",
    },
    {
      id: 11253,
      name: "Inj. Metronidazole 500mg/5ml",
    },
    {
      id: 11254,
      name: "Susp. Nitrofurantoin Oral Liquid 25mg/5ml",
    },
    {
      id: 11255,
      name: "Inj. Capreomycin 1mg",
    },
    {
      id: 11256,
      name: "Susp. Fluconazole 50mg/5ml",
    },
    {
      id: 11257,
      name: "Tab. Acyclovir 400mg",
    },
    {
      id: 11055,
      name: "Susp. Lumefantrine 80mg/5ml+480mg/5ml",
    },
    {
      id: 11258,
      name: "Tab. Primaquine 2.5mg",
    },
    {
      id: 11259,
      name: "Tab. Primaquine 7.5mg",
    },
    {
      id: 11260,
      name: "Tab. Propranolol 80mg",
    },
    {
      id: 11261,
      name: "Inj. Midazolam 5mg/ml",
    },
    {
      id: 11262,
      name: "Tab. Midazolam 15mg",
    },
    {
      id: 11263,
      name: "Inj. Hydroxocobalamin 1mg/ml",
    },
    {
      id: 11264,
      name: "Tab. Phytomenadione 10mg",
    },
    {
      id: 11265,
      name: "Inj. Phytomenadione 10mg",
    },
    {
      id: 11266,
      name: "Inj. Glyceryl Trinitrate 5mg",
    },
    {
      id: 11267,
      name: "Tab. Isosorbide-5-mononitrate 10mg",
    },
    {
      id: 11268,
      name: "Tab. Isosorbide-5-mononitrate SR 30mg",
    },
    {
      id: 11269,
      name: "Tab. Isosorbide-5-mononitrate SR 60mg",
    },
    {
      id: 11270,
      name: "Tab.Metformin 750mg.",
    },
    {
      id: 11271,
      name: "Tab.Metformin 1000mg.",
    },
    {
      id: 11272,
      name: "Inj. Adenosine 3mg/ml",
    },
    {
      id: 11273,
      name: "Inj. Dobutamine 50mg/ml",
    },
    {
      id: 11274,
      name: "Tab. Amlodipine 5mg",
    },
    {
      id: 11275,
      name: "Tab. Atenolol 100mg",
    },
    {
      id: 11276,
      name: "Tab. Hydrochlorothiazide SR 25mg",
    },
    {
      id: 11277,
      name: "Tab. Hydrochlorothiazide SR 50mg",
    },
    {
      id: 11278,
      name: "Inj. Labetalol 5mg/ml",
    },
    {
      id: 11279,
      name: "Tab. Methyldopa 500mg",
    },
    {
      id: 11280,
      name: "Susp. Digoxin Oral Liquid 0.05mg/ml",
    },
    {
      id: 11281,
      name: "Homatropine 2%.",
    },
    {
      id: 11282,
      name: "Inj. Noradrenaline 2mg/ml",
    },
    {
      id: 11283,
      name: "Phenylephrine 5%.",
    },
    {
      id: 11284,
      name: "Phenylephrine 10%.",
    },
    {
      id: 11172,
      name: "Acytylsalicylic Acid Dispersible 75mg",
    },
    {
      id: 11285,
      name: "Acytylsalicylic acid Effervescent 150mg",
    },
    {
      id: 11286,
      name: "Tropicamide 1%.",
    },
    {
      id: 11287,
      name: "Acytylsalicylic Acid Dispersible 150mg",
    },
    {
      id: 11288,
      name: "Carboxymethylcellulose 0.5%.",
    },
    {
      id: 11289,
      name: "Tab. Acytylsalicylic Acid Enteric coated 150mg",
    },
    {
      id: 11291,
      name: "Inj. Streptokinase 15,000,00 IU",
    },
    {
      id: 11292,
      name: "Tab. Dinoprostone 0.5mg",
    },
    {
      id: 11293,
      name: "Inj. Streptokinase 750000 IU",
    },
    {
      id: 11294,
      name: "Tube. Dinoprostone 0.5mg",
    },
    {
      id: 11295,
      name: "Methylrosanilinium Chloride Topial Preparation 0.25 to 2%.",
    },
    {
      id: 11296,
      name: "Tab. Methylergometrine 0.125mg",
    },
    {
      id: 11297,
      name: "Inj. Methylergometrine 0.2mg/ml",
    },
    {
      id: 11298,
      name: "Inj. Oxytocin 10 IU/ml",
    },
    {
      id: 11299,
      name: "Susp. Risperidone Oral Liquid 1mg/ml",
    },
    {
      id: 11300,
      name: "Tab. Escitalopram 20mg",
    },
    {
      id: 11301,
      name: "Tab. Clonazepam 1mg",
    },
    {
      id: 11302,
      name: "Coal tar Solution 5%.",
    },
    {
      id: 11303,
      name: "Cap. Clomipramine 10mg",
    },
    {
      id: 11304,
      name: "Cap. Clomipramine 75mg",
    },
    {
      id: 11305,
      name: "Cap. Fluoxetine 40mg",
    },
    {
      id: 11306,
      name: "Cap. Fluoxetine 60mg",
    },
    {
      id: 11307,
      name: "Drop. Fluorescein 1%.",
    },
    {
      id: 11290,
      name: "CARBOXYMETHYLCELLULOSE EYE DROP IP 1% W/V 10ML VIAL",
    },
    {
      id: 11385,
      name: "gfgfg",
    },
    {
      id: 11244,
      name: "Inj. Ceftriaxone 500mg",
    },
    {
      id: 11243,
      name: "Inj. Ceftriaxone 250mg",
    },
    {
      id: 11241,
      name: "Inj. Cefotaxime 500mg",
    },
    {
      id: 11242,
      name: "Inj. Ceftazidime 250mg",
    },
    {
      id: 11309,
      name: "Susp. Barium Sulphate Oral Liquid 100%.",
    },
    {
      id: 11310,
      name: "Susp. Barium Sulphate Oral Liquid 250%.",
    },
    {
      id: 11324,
      name: "Drop. Clotrimazole 1%.",
    },
    {
      id: 11312,
      name: "Inhallation Iprotropium",
    },
    {
      id: 11313,
      name: "Inj. Lohexol 140mg to 350mg iodine/ml",
    },
    {
      id: 11311,
      name: "Iprotropium respirator solution for use in nebulizer 250mcg/ml",
    },
    {
      id: 11314,
      name: "Inhalation Salbutamol",
    },
    {
      id: 11316,
      name: "Salbutamol Respirator solution for use in Nebulizer 5mg/ml",
    },
    {
      id: 11317,
      name: "Solution Ethyl Alcohol 70%.",
    },
    {
      id: 11318,
      name: "Inj. Glucose 50%.",
    },
    {
      id: 11319,
      name: "Solution Hydrogen Peroxide 6%.",
    },
    {
      id: 11320,
      name: "Solution Glutaraldehyde S 2%.",
    },
    {
      id: 11321,
      name: "Susp. Furosemide Oral Liquid 10mg",
    },
    {
      id: 11322,
      name: "Inj. Furosemide 10mg",
    },
    {
      id: 11109,
      name: "Inj. Mannitol 10%.",
    },
    {
      id: 11323,
      name: "Susp. Potassium Chloride Oral Liquid 500mg/5ml",
    },
    {
      id: 11325,
      name: "Inj. Pantoprazole S,T 40mg",
    },
    {
      id: 11326,
      name: "Susp. RANITIDINE 75mg/5ml",
    },
    {
      id: 11327,
      name: "Tab. Thiamine 100mg",
    },
    {
      id: 11328,
      name: "Tab. Ondansertron 4mg",
    },
    {
      id: 11329,
      name: "Inj. Golimumab 100mg",
    },
    {
      id: 11330,
      name: "Susp. Ondansertron Oral Liquid 2mg/5ml",
    },
    {
      id: 11331,
      name: "Inj. Ondansertron 2mg/5ml",
    },
    {
      id: 11332,
      name: "Susp. Dicyclomine Oral Liquid 10mg/ml",
    },
    {
      id: 11333,
      name: "Inj. Hyoscine 20mg/ml",
    },
    {
      id: 11334,
      name: "Susp. Prednisolone Oral Liquid 5mg",
    },
    {
      id: 11335,
      name: "Tab. Glimepiride 1mg",
    },
    {
      id: 11336,
      name: "Tab. Glimepiride 2mg",
    },
    {
      id: 11337,
      name: "Susp. Surfactant Intratracheal Instillation",
    },
    {
      id: 11338,
      name: "Oint. Acyclovir 3%.",
    },
    {
      id: 11339,
      name: "Drops. Ciprofloxacin 0.3%.",
    },
    {
      id: 11340,
      name: "Drops. POVIDONE IODINE 0.6%.",
    },
    {
      id: 11190,
      name: "Inj. Bupivacaine 0.5% with 7.5% glucose",
    },
    {
      id: 11343,
      name: "Activated Charcoal Powder",
    },
    {
      id: 11344,
      name: "Inj. Benzathine benzylpenicillin 12 Lacs",
    },
    {
      id: 11345,
      name: "Tab. Cefadroxil 1g",
    },
    {
      id: 11380,
      name: "Tablet Co-trimoxazole(Sulphamethoxazole 400mg+Tri methoprim 80mg).",
    },
    {
      id: 11346,
      name: "Inj. Cefazolin 500mg",
    },
    {
      id: 11349,
      name: "Drops. POVIDONE IODINE 5%.",
    },
    {
      id: 11350,
      name: "Drop. Prednisolone 1%.",
    },
    {
      id: 11341,
      name: "Drop. Prednisolone 0.1%.",
    },
    {
      id: 11351,
      name: "Drops Pilocarpine 4%.",
    },
    {
      id: 11342,
      name: "Drops Pilocarpine 2%.",
    },
    {
      id: 11352,
      name: "Drop Timolol (Miotics) 0.25%.",
    },
    {
      id: 11353,
      name: "drop.tropicamide 1%.",
    },
    {
      id: 11354,
      name: "budesonide(inhalation)100mcg.",
    },
    {
      id: 11355,
      name: "resp.soln.Ipratropium 250mcg/ml.",
    },
    {
      id: 11356,
      name: "lotion.white petrolatum 1%.",
    },
    {
      id: 11357,
      name: "cream white petrolatum 5%.",
    },
    {
      id: 11359,
      name: "POVIDONE IODINE  SOLUTION IP 5% 500ml",
    },
    {
      id: 11382,
      name: "Tablet Co-trimoxazole(Sulphamethoxazole 800mg+Tri methoprim 160mg).",
    },
    {
      id: 11360,
      name: "inj.calcium carbonate 100mg/ml.",
    },
    {
      id: 11361,
      name: "POVIDONE IODINE 5%.",
    },
    {
      id: 11362,
      name: "POVIDONE IODINE 6%.",
    },
    {
      id: 11363,
      name: "POVIDONE IODINE 7%.",
    },
    {
      id: 11364,
      name: "POVIDONE IODINE 8%.",
    },
    {
      id: 11365,
      name: "POVIDONE IODINE 9%.",
    },
    {
      id: 11366,
      name: "POVIDONE IODINE 10%.",
    },
    {
      id: 11367,
      name: "Co-Trimoxazole(Sulphamethoxazole) 400mg",
    },
    {
      id: 11368,
      name: "Clotrimoxazole Pessary 100mg",
    },
    {
      id: 11369,
      name: "ACYLOVIR TAB 200MG",
    },
    {
      id: 11218,
      name: "Tab. Lorazepam 2mg/ml",
    },
    {
      id: 11371,
      name: "Salycylic Acid Ointment 6%.",
    },
    {
      id: 11372,
      name: "INJ. HYOSCINE 10MG",
    },
    {
      id: 11373,
      name: "BETAMETHASONE Cream 5% 15GM",
    },
    {
      id: 11374,
      name: "BETAMETHASONE Cream 0.1%.",
    },
    {
      id: 11375,
      name: "Susp. Lactulose 100 ML",
    },
    {
      id: 11376,
      name: "Inj. Lignocaine 30 ML",
    },
    {
      id: 11377,
      name: "Susp. Carbamazepine 60ml",
    },
    {
      id: 11358,
      name: "Inj. Lorazepam 2mg/ml",
    },
    {
      id: 11236,
      name: "Inj. Cefazolin 1g.",
    },
    {
      id: 11240,
      name: "Inj. Cefotaxime 250mg",
    },
    {
      id: 11153,
      name: "Tab. CHOLECALCIFEROL GRANULES 60,000 IU /GM",
    },
    {
      id: 11378,
      name: "Tranexamic acid Tablet 500mg",
    },
    {
      id: 11379,
      name: "Tranexamic acid Inj. 100mg/ml",
    },
    {
      id: 11383,
      name: "Susp Co-trimoxazole(Sulphamethoxazole 200mg+Tri methoprim 40mg/5ml).",
    },
    {
      id: 11381,
      name: "Inj. Iohexol 140mg to 350mg iodine/ml",
    },
    {
      id: 11347,
      name: "Acetyl Salicylic acid 75mg",
    },
    {
      id: 11348,
      name: "Acetyl Salicylic acid 150mg",
    },
    {
      id: 11086,
      name: "Tab. Metoprolol SR Tablet 25mg",
    },
    {
      id: 11384,
      name: "Tab.Calcium Carbonate 1.1mg",
    },
    {
      id: 11386,
      name: "Sodium Chloride Nasal Spray 20ml",
    },
    {
      id: 11387,
      name: "TAB. Aspirin 150mg",
    },
    {
      id: 11388,
      name: "TAB. Metformin Hydrochloride (Sustained Release) 500mg + Glimepiride 2mg",
    },
    {
      id: 11389,
      name: "Tab. Gliclazide 40mg",
    },
    {
      id: 11390,
      name: "Inj. Insulin IP (Insulin Human Soluble 30% and Isophane 70%) 40 IU/ml",
    },
    {
      id: 11391,
      name: "TAB. Metformin Hydrochloride (Sustained Release) 1000mg",
    },
    {
      id: 11393,
      name: "Tab. Voglibose 0.3mg",
    },
    {
      id: 11370,
      name: "INJ. NORMAL SALINE I.V 0.9% .",
    },
    {
      id: 11394,
      name: "Tab. Voglibose 0.2mg",
    },
    {
      id: 11395,
      name: "Tab. Telmisartan 40mg + Amlodipine 5mg",
    },
    {
      id: 11398,
      name: "Tab. Telmisartan 40mg + Chlorthalidone 12.5mg",
    },
    {
      id: 11401,
      name: "Tab. Labetalol 100mg",
    },
    {
      id: 11402,
      name: "Tab. Rosuvastatin 10mg",
    },
    {
      id: 11403,
      name: "Tab. METFORMIN HCL 1000 MG(prolonged release) + Glimepride 2mg",
    },
    {
      id: 11404,
      name: "Tab. METFORMIN HCL 500MG (prolonged release) + Glimepride 1mg",
    },
    {
      id: 11405,
      name: "Tab. Pioglitazone 15mg",
    },
    {
      id: 11406,
      name: "Tab. Metformin Hydrochloride 500mg (Sustained Release) + Voglibose 0.2mg",
    },
    {
      id: 11407,
      name: "Tab. Metformin Hydrochloride 500mg + Voglibose 0.3mg",
    },
    {
      id: 11408,
      name: "Tab. Teneligliptin 20mg + Metformin Hydrochloride 500mg sustained release",
    },
    {
      id: 11409,
      name: "Tab. Teneligliptin 20mg + Metformin Hydrochloride 1000mg Sustained Release",
    },
    {
      id: 11410,
      name: "Tab. Cilnidipine 10mg + Telmisartan 40mg",
    },
    {
      id: 11411,
      name: "Tab. Vildagliptin 50mg",
    },
    {
      id: 11392,
      name: "Tab. Atorvastatin 5mg",
    },
    {
      id: 11444,
      name: "CAP. RIBAVIRIN USP 200mg",
    },
    {
      id: 11396,
      name: "Tab. Rosuvastatin 20mg",
    },
    {
      id: 11397,
      name: "Tab. Olmesartan Medoxomil 40mg",
    },
    {
      id: 11399,
      name: "Tab. Olmesartan Medoxomil 40mg + HYDROCHLOROTHIAZIDE 12.5mg",
    },
    {
      id: 11400,
      name: "Tab. Olmesartan 20mg + Amlodipine 5mg",
    },
    {
      id: 11412,
      name: "Inj. Remdesivir 100mg",
    },
    {
      id: 11413,
      name: "Inj. Tocilizumab 400mg",
    },
    {
      id: 11414,
      name: "Inj. Posaconazole 300mg",
    },
    {
      id: 11415,
      name: "Inj. I.V.I.G (Immunorel 10%) 50ml",
    },
    {
      id: 11416,
      name: "Inj. Amphotericin B 50mg",
    },
    {
      id: 11445,
      name: "TAB. SOFOSBUVIR AND VELPATASVIR 400mg/100mg",
    },
    {
      id: 11446,
      name: "TAB. TENOFOVIR DISOPROXIL FUMARATE IP 300mg",
    },
    {
      id: 11447,
      name: "Hemophilic Factor-VIII third generation-250 IU Vails",
    },
    {
      id: 11417,
      name: "Inj. Sulbactum Cefoperazone 1.5gm",
    },
    {
      id: 11418,
      name: "Inj. Sulbactum & Cefoperazone 1.5 g",
    },
    {
      id: 11419,
      name: "IFA Red Tablet.",
    },
    {
      id: 11420,
      name: "Tab. Torasemide IP 10mg",
    },
    {
      id: 11421,
      name: "Tab. Rosuvastatin 10mg and Fenofibrate 160mg IP",
    },
    {
      id: 11422,
      name: "Tab. Aspirin Enteric coated IP 75mg",
    },
    {
      id: 11423,
      name: "Tab. Teneligliptin IP 20mg",
    },
    {
      id: 11424,
      name: "Tab. Gliclazide 80mg and Metformin Hydrochloride 500mg",
    },
    {
      id: 11425,
      name: "Tab. Cilnidipine IP 10mg",
    },
    {
      id: 11426,
      name: "Tab. Cilnidipine IP  5mg",
    },
    {
      id: 11427,
      name: "Tab. Telmisartan 40mg and Hydrochorothiazide 12.5mg IP",
    },
    {
      id: 11428,
      name: "Tab.Teneligliptin IP 20mg",
    },
    {
      id: 11429,
      name: "Tab. Metformin Hydrochloride 500mg(Sustained Relese), Glimepiride 2mg and Voglibose 0.2mg",
    },
    {
      id: 11430,
      name: "Tab. Metformin 1000mg (Prolonged release) and Glimepiride 1mg IP",
    },
    {
      id: 11431,
      name: "Inj. Soluble Insulin Injection IP",
    },
    {
      id: 11432,
      name: "Inj. Biphasic Isophane Insulin Injection IP (50:50) 40 IU per ml",
    },
    {
      id: 11433,
      name: "Inj. Biphasic Isophane Insulin Injection IP 100 IU/ml (30:70) 30% soluble Insulin and 70% Isophane",
    },
    {
      id: 11434,
      name: "Inj. Insulin Regular(R-DNA Origin) Injection 100 IU",
    },
    {
      id: 11435,
      name: "Inj. Insulin Injection IP (Insulin Human soluble 30% and Isophane 70%) 40 IU/ml",
    },
    {
      id: 11436,
      name: "Inj. Insulin Glargine Injection IP 100 IU per ml",
    },
    {
      id: 11437,
      name: "Tab. Metformin Hydrochloride Prolonged-Release 500mg and Glimepiride 2mh IP",
    },
    {
      id: 11438,
      name: "Tab. Torsemide IP 5mg",
    },
    {
      id: 11439,
      name: "TAB. DACLATASVIR 60mg",
    },
    {
      id: 11440,
      name: "TAB. DACLATASVIR 30mg",
    },
    {
      id: 11441,
      name: "TAB. SOFOSBUVIR 400mg",
    },
    {
      id: 11442,
      name: "TAB. ENTECAVIR 0.5mg",
    },
    {
      id: 11443,
      name: "TAB. ENTECAVIR 1mg",
    },
    {
      id: 11448,
      name: "Hemophilic Factor-VIII third generation-500 IU Vails",
    },
    {
      id: 11449,
      name: "Hemophilic Factor-VIII third generation-1000 IU Vails",
    },
    {
      id: 11450,
      name: "Hemophilic Factor-VIII third generation-1500 IU Vails",
    },
    {
      id: 11451,
      name: "Tab. Olanzapine 10 mg",
    },
    {
      id: 11452,
      name: "Tab.Sertraline 50 mg",
    },
    {
      id: 11453,
      name: "Tab. Paroxetine 12.55 mg",
    },
    {
      id: 11454,
      name: "Tab. Donepezil 5mg",
    },
    {
      id: 11455,
      name: "Tab. Clomipramine 50 mg",
    },
    {
      id: 11456,
      name: "Tab. Etizolam 0.25 mg",
    },
    {
      id: 11457,
      name: "Tab. Trihexphenidyl 2 mg",
    },
    {
      id: 11458,
      name: "Tab. Divalproex sodium 250 mg",
    },
    {
      id: 11459,
      name: "Tab. Telmisartan 80mg and Amlodipine 5mg",
    },
    {
      id: 11460,
      name: "Tab. Zinc Acetate 50mg",
    },
    {
      id: 11461,
      name: "Hemophilic Factor-IX third generation-500 IU Vails",
    },
  ];
  console.log("dataLenght", data.length);
  const callApi = async (endPoint, setData, setCopyData, setActiveIndicies) => {
    await getNotificationService(endPoint)
      .then((r) => {
        // console.log("Response", r?.data.data);
        // setActiveIndicies(r.data?.data?.map(() => false));
        // setCopyData(r?.data?.data);
        // setData(r?.data?.data);

        setActiveIndicies(data?.map(() => false));
        setCopyData(data);
        setData(data);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  useEffect(() => {
    callApi(
      "calls/getAllProgrammerLists",
      setprogrammeData,
      setCopyprogrmmeData,
      setProgrammeActiveIndicies
    );
    callApi(
      "calls/getAllDruglist",
      setDrugData,
      setCopyDrugData,
      setDrugActiveIndicies
    );
  }, []);
  const handleDrugLeftListItemClick = (e, id, element, index) => {
    const elementExist = drugTempArray?.filter((item) => {
      return item.id === id;
    });
    if (elementExist.length === 0) {
      setDrugTempArray([...drugTempArray, element]);
    } else {
      for (let [i, item] of drugTempArray?.entries()) {
        if (item.id === id) {
          drugTempArray.splice(i, 1);
        }
      }
    }
    if (!drugActiveIndicies.at(index)) {
      setDrugActiveIndicies(
        drugActiveIndicies.map((bool, j) => (j === index ? true : bool))
      );
    } else {
      setDrugActiveIndicies(
        drugActiveIndicies.map((bool, j) => (j === index ? false : bool))
      );
    }
  };
  const handleDrugRightListItemClick = (e, id, element, index) => {
    const elementExist = drugRightTempArray?.filter((item) => {
      return item.id === id;
    });
    if (elementExist.length === 0) {
      setDrugRightTempArray([...drugRightTempArray, element]);
    } else {
      for (let [i, item] of drugRightTempArray.entries()) {
        if (item.id === id) {
          drugRightTempArray.splice(i, 1);
        }
      }
    }

    if (drugFirstClick) {
      setSelectedDrugItemActiveIndices(
        selectDrugItemActiveIndices.map((bool, j) =>
          j === index ? true : false
        )
      );
      setDrugFirstClick(false);
    } else {
      const t = [...selectDrugItemActiveIndices];
      const ut = t.map((elem, i) => {
        if (i === index) {
          if (elem) {
            return (t[index] = false);
          } else if (!elem) {
            return (t[index] = true);
          }
        } else {
          return elem;
        }
      });

      setSelectedDrugItemActiveIndices(ut);
    }
  };

  const handleRightListItemClick = (e, id, element, index) => {
    const elementExist = rightProgrammeTempArray?.filter((item) => {
      return item.id === id;
    });
    if (elementExist.length === 0) {
      setRightProgrammeTempArray([...rightProgrammeTempArray, element]);
    } else {
      for (let [i, item] of rightProgrammeTempArray.entries()) {
        if (item.id === id) {
          rightProgrammeTempArray.splice(i, 1);
        }
      }
    }

    if (programmeFirstClick) {
      setSelectedProgrammeItemActiveIndices(
        selectProgrammeItemActiveIndices.map((bool, j) =>
          j === index ? true : false
        )
      );
      setProgrammeFirstClick(false);
    } else {
      const t = [...selectProgrammeItemActiveIndices];
      const ut = t.map((elem, i) => {
        if (i === index) {
          if (elem) {
            return (t[index] = false);
          } else if (!elem) {
            return (t[index] = true);
          }
        } else {
          return elem;
        }
      });
      setSelectedProgrammeItemActiveIndices(ut);
    }
  };

  const handleLeftListItemClick = (e, id, element, index) => {
    const elementExist = programmeTempArray?.filter((item) => {
      return item.id === id;
    });
    if (elementExist.length === 0) {
      setProgrammeTempArray([...programmeTempArray, element]);
    } else {
      for (let [i, item] of programmeTempArray?.entries()) {
        if (item.id === id) {
          programmeTempArray.splice(i, 1);
        }
      }
    }
    if (!programmeActiveIndicies.at(index)) {
      setProgrammeActiveIndicies(
        programmeActiveIndicies.map((bool, j) => (j === index ? true : bool))
      );
    } else {
      setProgrammeActiveIndicies(
        programmeActiveIndicies.map((bool, j) => (j === index ? false : bool))
      );
    }
  };

  const handleMoveSelectedItemToRight = (
    tempArray,
    setFirstClick,
    copyiedData,
    setSelectedItemActiveIndices,
    setRightTempArray,
    setActiveIndicies,
    activeIndicies,
    setSelectedItem,
    setData
  ) => {
    if (tempArray?.length > 0) {
      setFirstClick(true);
      const cloneData = [...copyiedData];
      setSelectedItemActiveIndices(tempArray?.map(() => true));
      setRightTempArray([]);
      setActiveIndicies(activeIndicies.map((bool, j) => false));
      const rightDispalyList = cloneData.filter((elem) => {
        return tempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setSelectedItem(rightDispalyList);
      const leftRearrangedList = cloneData.filter((elem) => {
        return !tempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setData(leftRearrangedList);
    }
  };

  const handleMoveSelectedItemToLeft = (
    selectItemActiveIndices,
    rightTempArray,
    setFirstClick,
    selectedItem,
    setSelectedItemActiveIndices,
    tempArray,
    setTempArray,
    copyiedData,
    setData,
    setSelectedItem,
    setRightTempArray,
    setActiveIndicies,
    activeIndicies
  ) => {
    const allACtiveClasses = selectItemActiveIndices.every((e) => e === true);
    if (rightTempArray.length > 0) {
      setFirstClick(true);
      const cloneData = [...selectedItem];
      const rightDispalyList = cloneData.filter((elem) => {
        return !rightTempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setSelectedItemActiveIndices(rightDispalyList?.map(() => true));
      const reverseBackElements = cloneData.filter((elem) => {
        return rightTempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });

      const updateTempArray = tempArray.filter((elem) => {
        return !reverseBackElements.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setTempArray(updateTempArray);
      const storeIntoOne = [...copyiedData];
      reverseBackElements.map((elem) => {
        storeIntoOne.push(elem);
      });
      setData(storeIntoOne);
      setSelectedItem(rightDispalyList);
      setRightTempArray([]);
      // update the selected List
    } else if (allACtiveClasses) {
      handleShiftAllElementToLeft(
        copyiedData,
        setSelectedItemActiveIndices,
        setData,
        setRightTempArray,
        setTempArray,
        setSelectedItem,
        setActiveIndicies,
        activeIndicies
      );
    }
  };

  const handleShiftAllElementToRight = (
    copyiedData,
    setFirstClick,
    setSelectedItemActiveIndices,
    setSelectedItem,
    setRightTempArray,
    setTempArray,
    setData
  ) => {
    const cloneData = [...copyiedData];
    setFirstClick(true);
    setSelectedItemActiveIndices(cloneData?.map(() => true));
    setSelectedItem(cloneData);
    setRightTempArray([]);
    setTempArray(cloneData);
    setData([]);
  };

  const handleShiftAllElementToLeft = (
    copyiedData,
    setSelectedItemActiveIndices,
    setData,
    setRightTempArray,
    setTempArray,
    setSelectedItem,
    setActiveIndicies,
    activeIndicies
  ) => {
    const cloneData = [...copyiedData];
    console.log("cloneData", cloneData);

    setSelectedItemActiveIndices([]);
    setData(cloneData);
    setRightTempArray([]);
    setTempArray([]);
    setSelectedItem([]);
    setActiveIndicies(activeIndicies.map((bool) => false));
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="d-flex">
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="storeName">
                    Store Name
                  </label>
                </div>
                <div className="col-7 m-0">
                  <SelectOption className="d-inline" id="storeName" data={[]} />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="financialYear">
                    Financial Year
                  </label>
                </div>
                <div className="col-7">
                  <SelectOption id="financialYear" data={[]} />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="demandType">
                    Demand Type
                  </label>
                </div>
                <div className="col-7">
                  <SelectOption id="demandType" data={[]} />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-4 text-center">
                  <label className="labellineHeight" htmlFor="demandType">
                    Last Date
                  </label>
                </div>
                <div className="col-8">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className={classes.root}
                      value={lastDate}
                      onChange={(newValue) => {
                        console.log("NewValue", newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="periodic">
                    Periodic
                  </label>
                </div>
                <div className="col-7">
                  <SelectOption id="periodic" data={[]} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="New Request" />
        </div>
        <div className="row">
          <div className="d-flex">
            <label>Do you want program-wise drug demands from the stores</label>
            <RadioCheckBox
              id1="programWiseDrug1"
              id2="programWiseDrug2"
              name="programWiseDrug"
              labelText1="Yes"
              labelText2="No"
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="Programme List" />
        </div>
        <div className="row">
          <TransferComponent
            apiData={programmeData}
            activeIndicies={programmeActiveIndicies}
            handleMoveSelectedItemToLeft={() => {
              handleMoveSelectedItemToLeft(
                selectProgrammeItemActiveIndices,
                rightProgrammeTempArray,
                setProgrammeFirstClick,
                selectedProgrammeItem,
                setSelectedProgrammeItemActiveIndices,
                programmeTempArray,
                setProgrammeTempArray,
                copyProgrmmeData,
                setprogrammeData,
                setSelectedProgrammeItem,
                setRightProgrammeTempArray,
                setProgrammeActiveIndicies,
                programmeActiveIndicies
              );
            }}
            handleMoveSelectedItemToRight={() => {
              handleMoveSelectedItemToRight(
                programmeTempArray,
                setProgrammeFirstClick,
                copyProgrmmeData,
                setSelectedProgrammeItemActiveIndices,
                setRightProgrammeTempArray,
                setProgrammeActiveIndicies,
                programmeActiveIndicies,
                setSelectedProgrammeItem,
                setprogrammeData
              );
            }}
            handleShiftAllElementToRight={() => {
              handleShiftAllElementToRight(
                copyProgrmmeData,
                setProgrammeFirstClick,
                setSelectedProgrammeItemActiveIndices,
                setSelectedProgrammeItem,
                setRightProgrammeTempArray,
                setProgrammeTempArray,
                setprogrammeData
              );
            }}
            handleShiftAllElementToLeft={() => {
              handleShiftAllElementToLeft(
                copyProgrmmeData,
                setSelectedProgrammeItemActiveIndices,
                setprogrammeData,
                setRightProgrammeTempArray,
                setProgrammeTempArray,
                setSelectedProgrammeItem,
                setProgrammeActiveIndicies,
                programmeActiveIndicies
              );
            }}
            handleLeftListItemClick={handleLeftListItemClick}
            handleRightListItemClick={handleRightListItemClick}
            selectedItem={selectedProgrammeItem}
            selectItemActiveIndices={selectProgrammeItemActiveIndices}
          />
        </div>
        <div className="row">
          <div className="d-flex">
            <label>Do you want notification for selected drugs </label>
            <RadioCheckBox
              id1="selectDrugs1"
              id2="selectDrugs2"
              name="selectDrugs"
              labelText1="Yes"
              labelText2="No"
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="Drug List List" />
        </div>
        <div className="row">
          <TransferComponent
            apiData={drugData}
            activeIndicies={drugActiveIndicies}
            handleMoveSelectedItemToLeft={() => {
              handleMoveSelectedItemToLeft(
                selectDrugItemActiveIndices,
                drugRightTempArray,
                setDrugFirstClick,
                selectedDrugItem,
                setSelectedDrugItemActiveIndices,
                drugTempArray,
                setDrugTempArray,
                copyDrugData,
                setDrugData,
                setSelectedDrugItem,
                setDrugRightTempArray,
                setDrugActiveIndicies,
                drugActiveIndicies
              );
            }}
            handleMoveSelectedItemToRight={() => {
              handleMoveSelectedItemToRight(
                drugTempArray,
                setDrugFirstClick,
                copyDrugData,
                setSelectedDrugItemActiveIndices,
                setDrugRightTempArray,
                setDrugActiveIndicies,
                drugActiveIndicies,
                setSelectedDrugItem,
                setDrugData
              );
            }}
            handleShiftAllElementToRight={() => {
              handleShiftAllElementToRight(
                copyDrugData,
                setDrugFirstClick,
                setSelectedDrugItemActiveIndices,
                setSelectedDrugItem,
                setDrugRightTempArray,
                setDrugTempArray,
                setDrugData
              );
            }}
            handleShiftAllElementToLeft={() => {
              handleShiftAllElementToLeft(
                copyDrugData,
                setSelectedDrugItemActiveIndices,
                setDrugData,
                setDrugRightTempArray,
                setDrugTempArray,
                setSelectedDrugItem,
                setDrugActiveIndicies,
                drugActiveIndicies
              );
            }}
            handleLeftListItemClick={handleDrugLeftListItemClick}
            handleRightListItemClick={handleDrugRightListItemClick}
            selectedItem={selectedDrugItem}
            selectItemActiveIndices={selectDrugItemActiveIndices}
          />
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="Remarks" />
        </div>
        <div className="row mb-5">
          <div className="col-6">
            <label for="remarks" class="form-label">
              Remarks
            </label>
            <textarea className="form-control" rows="3" id="remarks"></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenNotification;
