import { writeTextFile } from "@tauri-apps/api/fs";
import { save } from "@tauri-apps/api/dialog";

export function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string); // Base64 string
      } else {
        reject(new Error("Failed to read the file."));
      }
    };

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file); // Read the file as a Base64 string
  });
}

export function convertToCSV(data: any[]): string {
  if (data.length === 0) return "";

  // Extract the headers, skipping the "picture" column
  const headers = Object.keys(data[0])
    .filter((key) => key !== "picture")
    .join(",");

  // Map the rows, skipping the "picture" column for each row
  const rows = data.map((row) =>
    Object.entries(row)
      .filter(([key]) => key !== "picture") // Skip the "picture" column
      .map(([, value]) => `"${value}"`) // Handle commas in values
      .join(",")
  );

  return [headers, ...rows].join("\n");
}

export async function exportTableAsCSV(data: any[]) {
  const csvData = convertToCSV(data);

  if (!csvData) {
    console.error("No data to export");
    return;
  }

  // Prompt user to select a location and filename
  const filePath = await save({
    filters: [{ name: "MemberDatabase", extensions: ["csv"] }],
  });

  if (filePath) {
    // Write the CSV data to the selected file path
    await writeTextFile(filePath, csvData);
    console.log("CSV file saved at:", filePath);
  } else {
    console.log("File saving was canceled");
  }
}
