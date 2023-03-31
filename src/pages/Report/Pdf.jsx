import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
  PDFDownloadLink,
  usePDF,
} from "@react-pdf/renderer";
import PdfTable from "../../components/pdf/PdfTable";
import PdfHeader from "../../components/pdf/PdfHeader";
import PdfFooter from "../../components/pdf/PdfFooter";
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});
const styles = StyleSheet.create({
  fontSize: {
    fontSize: "10px",
  },
  challanNo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
  },
  body: {
    paddingTop: 35,
    paddingBottom: 150,
    paddingHorizontal: 35,
  },

  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
});

const Doc = () => {
  const rows = [
    {
      id: "1",
      drugName: "Amoxicillin Cap.",
      progName: "State",
      IssQty: "4000",
      BatchNo: "MLLC-024",
      MfgDate: "Dec 2022",
      ExpDate: "Nov 2024",
    },
    {
      id: "2",
      drugName: "Amoxicillin Cap.",
      progName: "State",
      IssQty: "4000",
      BatchNo: "MLLC-024",
      MfgDate: "Dec 2022",
      ExpDate: "Nov 2024",
    },
    {
      id: "3",
      drugName: "Amoxicillin Cap.",
      progName: "State",
      IssQty: "4000",
      BatchNo: "MLLC-024",
      MfgDate: "Dec 2022",
      ExpDate: "Nov 2024",
    },
    {
      id: "4",
      drugName: "Amoxicillin Cap.",
      progName: "State",
      IssQty: "4000",
      BatchNo: "MLLC-024",
      MfgDate: "Dec 2022",
      ExpDate: "Nov 2024",
    },
    {
      id: "5",
      drugName: "Amoxicillin Cap.",
      progName: "State",
      IssQty: "4000",
      BatchNo: "MLLC-024",
      MfgDate: "Dec 2022",
      ExpDate: "Nov 2024",
    },
    {
      id: "6",
      drugName: "Amoxicillin Cap.",
      progName: "State",
      IssQty: "4000",
      BatchNo: "MLLC-024",
      MfgDate: "Dec 2022",
      ExpDate: "Nov 2024",
    },
    {
      id: "7",
      drugName: "Amoxicillin Cap.",
      progName: "State",
      IssQty: "4000",
      BatchNo: "MLLC-024",
      MfgDate: "Dec 2022",
      ExpDate: "Nov 2024",
    },
    {
      id: "8",
      drugName: "Amoxicillin Cap.",
      progName: "State",
      IssQty: "4000",
      BatchNo: "MLLC-024",
      MfgDate: "Dec 2022",
      ExpDate: "Nov 2024",
    },
    {
      id: "9",
      drugName: "Amoxicillin Cap.",
      progName: "State",
      IssQty: "4000",
      BatchNo: "MLLC-024",
      MfgDate: "Dec 2022",
      ExpDate: "Nov 2024",
    },
    {
      id: "10",
      drugName: "Amoxicillin Cap.",
      progName: "State",
      IssQty: "4000",
      BatchNo: "MLLC-024",
      MfgDate: "Dec 2022",
      ExpDate: "Nov 2024",
    },
    {
      id: "11",
      drugName: "Amoxicillin Cap.",
      progName: "State",
      IssQty: "4000",
      BatchNo: "MLLC-024",
      MfgDate: "Dec 2022",
      ExpDate: "Nov 2024",
    },
    {
      id: "12",
      drugName: "Amoxicillin Cap.",
      progName: "State",
      IssQty: "4000",
      BatchNo: "MLLC-024",
      MfgDate: "Dec 2022",
      ExpDate: "Nov 2024",
    },
    {
      id: "13",
      drugName: "Amoxicillin Cap.",
      progName: "State",
      IssQty: "4000",
      BatchNo: "MLLC-024",
      MfgDate: "Dec 2022",
      ExpDate: "Nov 2024",
    },
  ];
  const column = [
    {
      id: "slNo",
      value: "Sl.No",
      width: "17%",
    },
    {
      id: "drugName",
      value: "Name of Drugs",
      width: "17%",
    },
    {
      id: "progName",
      value: "Program Name",
      width: "17%",
    },
    {
      id: "IssQty",
      value: "Issued Qty.",
      width: "17%",
    },
    {
      id: "BatchNo",
      value: "Batch No.",
      width: "17%",
    },
    {
      id: "MfgDate",
      value: "Mfg. Date",
      width: "17%",
    },
    {
      id: "ExpDate",
      value: "Exp Date.",
      width: "17%",
    },
  ];

  return (
    <Document>
      <Page wrap style={styles.body}>
        <PdfHeader
          imageName="download"
          government="GOVERNMENT OF NAGALAND"
          department=" DIRECTORATE OF HEALTH AND FAMILY WELFARE"
          state="NAGALAND"
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: "10px",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "10px",
            }}
          >
            <Text style={{ marginBottom: "5px" }}>Ref Issue No: 54962</Text>
            <Text style={{ marginBottom: "5px" }}>Issue Date: 2023-03-21</Text>
          </View>
          <View>
            <Text style={styles.displayBolck}>Issued by: State Warehouse</Text>
          </View>
        </View>
        {/* To Section */}
        <View>
          <Text style={{ fontSize: "10px" }}>To,</Text>
        </View>
        <View style={{ display: "flex", fontSize: "10px" }}>
          <View>
            <Text
              style={{
                marginLeft: "25px",
                marginBottom: "5px",
                marginTop: "5px",
              }}
            >
              The Medical Officer
            </Text>
          </View>
          <View>
            <Text style={{ marginLeft: "25px", marginBottom: "5px" }}>
              Noklak CHCCH Tuensang
            </Text>
          </View>
        </View>
        {/* End of To section */}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            fontSize: "10px",
            textDecoration: "underline",
            marginTop: "10px",
          }}
        >
          <Text style={{ fontWeight: 700, color: "black" }}>Sub :</Text>
          <Text style={{ fontWeight: 700, color: "black" }}>
            Issue / Receipt Voucher
          </Text>
        </View>

        <View
          style={{ fontSize: "10px", marginTop: "8px", marginBottom: "8px" }}
        >
          <Text>
            The following items are issued to you for
            Hospitals/CHC/PHC/Sub-Centre uses etc.
          </Text>
        </View>

        <PdfTable column={column} tableData={rows} />
        <PdfFooter />
      </Page>
    </Document>
  );
};

const Pdf = () => {
  const [instance, updateInstance] = usePDF({ document: <Doc /> });

  if (instance.loading) return <div>Loading ...</div>;

  if (instance.error) return <div>Something went wrong: </div>;
  return (
    <>
      <a href={instance.url} download="test.pdf">
        Download
      </a>
      <PDFViewer style={{ width: "100%", height: "800px" }}>
        <Doc />
      </PDFViewer>
    </>
  );
};
export default Pdf;
