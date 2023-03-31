import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});
const styles = StyleSheet.create({
  fontSize: {
    fontSize: "10px",
  },
  em: {
    fontStyle: "bold",
  },
  table: {
    borderColor: "#000",
    borderWidth: 1,
    marginHorizontal: 10,
    flexFlow: 1,
  },
  tableRow: {
    flexDirection: "row",
  },
  headerBg: {
    backgroundColor: "#aaa",
  },
  tableCellHeader: {
    margin: 2,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  cell: {
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    flexWrap: "wrap",
    width: "100%",
    padding: "5px",
    fontSize: 8,
  },
  textCenter: {
    textAlign: "center",
  },
});
const PdfTable = ({ column, tableData }) => {
  return (
    <View style={styles.table} wrap>
      <View style={[styles.tableRow, styles.headerBg]} fixed>
        {column &&
          column.map((cell, j) => {
            console.log("Cell", cell);
            const columnLenth = column.length - 1;
            return (
              <View
                key={j}
                style={[
                  styles.cell,
                  { border: "none", borderRight: "1px solid grey" },
                  j == columnLenth ? { borderRightWidth: 0 } : {},
                ]}
              >
                <Text style={styles.tableCellHeader}>{cell.value}</Text>
              </View>
            );
          })}
      </View>
      {tableData &&
        tableData.map((row, i) => {
          const dataLength = tableData.length - 1;
          return (
            <View key={i} style={[styles.tableRow]}>
              <View
                style={[
                  styles.cell,
                  {
                    width: "17%",
                    borderStyle: "solid",
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                  },
                  i === dataLength ? { borderBottomWidth: 0 } : {},
                ]}
              >
                <Text>{i + 1}</Text>
              </View>
              {column &&
                column.slice(1).map((cell, j) => {
                  const columnLenth = column.length - 2;
                  return (
                    <View
                      key={j}
                      style={[
                        styles.cell,
                        {
                          width: cell?.width,
                          borderStyle: "solid",
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                        },
                        j === columnLenth ? { borderRightWidth: 0 } : {},
                        i === dataLength ? { borderBottomWidth: 0 } : {},
                      ]}
                    >
                      <Text style={styles.textCenter}>
                        {row[cell.id]}
                        {i}
                        {dataLength}
                      </Text>
                    </View>
                  );
                })}
            </View>
          );
        })}
    </View>
  );
};
PdfTable.propTypes = {
  column: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
};

export default PdfTable;
