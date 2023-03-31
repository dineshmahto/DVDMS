import React from "react";
import { View, StyleSheet, Image, Text } from "@react-pdf/renderer";
import PropTypes from "prop-types";
const styles = StyleSheet.create({
  header: {
    fontSize: 13,
    marginBottom: 5,
    textAlign: "center",
    color: "black",
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: "10px",
  },
});
const PdfHeader = ({ imageName, government, department, state }) => {
  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          style={styles.image}
          src={process.env.PUBLIC_URL + `/images/${imageName}.png`}
        />
      </View>
      <Text style={styles.header}>{government}</Text>
      <Text style={styles.header}>{department}</Text>
      <Text style={styles.header}>{state}</Text>
    </>
  );
};

PdfHeader.propTypes = {
  imageName: PropTypes.string.isRequired,
  government: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

export default React.memo(PdfHeader);
