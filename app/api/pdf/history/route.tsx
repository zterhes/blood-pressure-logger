import { NextRequest, NextResponse } from "next/server";
import { getCheckedServerSession } from "../../../utils/auth/utils";
import { findHistory } from "../../repository/history";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToStream,
} from "@react-pdf/renderer";

export const revalidate = true;

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
export const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export async function GET(request: NextRequest) {
  try {
    const checkedSession = await getCheckedServerSession();
    const from = request.nextUrl.searchParams.get("from");
    const to = request.nextUrl.searchParams.get("to");

    const fromDate = from ? new Date(from) : undefined;

    const toDate = to ? new Date(to) : undefined;
    toDate?.setDate(toDate.getDate() + 1);

    const response = await findHistory(
      checkedSession.user.id,
      fromDate,
      toDate
    );
    toDate?.setDate(toDate.getDate() - 1);
    const date = fromDate
      ? fromDate.toLocaleDateString() + "-" + toDate?.toLocaleDateString()
      : new Date().toDateString();

    const userName = checkedSession.user.name.replace(/\s/g, "_");

    const fileName = `${userName}_blood_pressure_history` + "_" + date + ".pdf";

    const stream = await renderToStream(<MyDocument />);
    return new NextResponse(stream as unknown as ReadableStream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}`,
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
