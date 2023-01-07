import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
  view: {
    display: "flex",
    flexDirection: "row",
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    display: "grid",
    gridTemplateColumns: "2",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    width: "100%",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  sub_heading: {
    fontSize: 20,
    textAlign: "center",
    color: "grey",
    borderBottom: "1px",
  },
});
const Pdf = ({ user, info, address }) => {

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.heading}>Birth certificate</Text>
        <Text style={styles.sub_heading}>Personal details</Text>
        <View style={styles.view}>
          <Text style={styles.text}>First name:{user.first_name}</Text>
          <Text style={styles.text}>Middle name:{user.middle_name}</Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.text}>Last name:{user.last_name}</Text>
          <Text style={styles.text}>Father name:{user.father_name}</Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.text}>Mother name:{user.mother_name}</Text>
          <Text style={styles.text}>
            Grandfather name:{user.grandfather_name}
          </Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.text}>
            Grandmother name:{user.grandmother_name}
          </Text>
        </View>
        <Text style={styles.sub_heading}>Address</Text>
        <View className="text-sm">
          <Text style={styles.text}>District:{address.district}</Text>
          <Text style={styles.text}>Address:{address.address}</Text>
        </View>
        <View className="text-sm">
          <Text style={styles.text}>Ward:{address.ward}</Text>
        </View>
        <View className="text-sm">
          <Text style={styles.text}>Province:{address.province}</Text>
        </View>
        <View className="text-sm">
          <Text style={styles.text}>Contact:{info.phone_number}</Text>
        </View>
        </Page>
    </Document>
  );
};

export default Pdf;
