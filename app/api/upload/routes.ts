import {
  fileToBuffer,
  uploadImage,
  validateImageFile,
} from "@/lib/cloudinary/upload";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  try {
    // Get all files from the form data
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    // Check if any files exist
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Process all files
    const uploadResults = [];

    for (const file of files) {
      // Validate each file
      const validation = validateImageFile(file);
      if (!validation.valid) {
        return NextResponse.json(
          { error: `File ${file.name}: ${validation.error}` },
          { status: 400 },
        );
      }

      // Convert and upload each file
      const buffer = await fileToBuffer(file);
      const result = await uploadImage(buffer);

      uploadResults.push({
        filename: file.name,
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
      });
    }

    // Return all results
    return NextResponse.json({
      success: true,
      data: uploadResults,
      count: uploadResults.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "failed to upload" }, { status: 500 });
  }
};
