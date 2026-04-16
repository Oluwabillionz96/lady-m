import {
  fileToBuffer,
  uploadImage,
  validateImageFile,
} from "@/lib/cloudinary/upload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get all files from the form data
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    console.log('Upload request received, files:', files.length);

    // Check if any files exist
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Process all files
    const uploadResults = [];

    for (const file of files) {
      console.log('Processing file:', file.name, file.type, file.size);

      // Validate each file
      const validation = validateImageFile(file);
      if (!validation.valid) {
        console.error('Validation failed:', validation.error);
        return NextResponse.json(
          { error: `File ${file.name}: ${validation.error}` },
          { status: 400 },
        );
      }

      try {
        // Convert and upload each file
        console.log('Converting file to buffer...');
        const buffer = await fileToBuffer(file);
        console.log('Buffer created, size:', buffer.length);
        
        console.log('Uploading to Cloudinary...');
        const result = await uploadImage(buffer);
        console.log('Upload successful:', result.public_id);

        uploadResults.push({
          filename: file.name,
          public_id: result.public_id,
          secure_url: result.secure_url,
          width: result.width,
          height: result.height,
        });
      } catch (uploadError) {
        console.error('Upload error for file:', file.name, uploadError);
        return NextResponse.json(
          { 
            success: false,
            error: `Failed to upload ${file.name}: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}` 
          },
          { status: 500 }
        );
      }
    }

    // Return all results
    return NextResponse.json({
      success: true,
      data: uploadResults,
      count: uploadResults.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload" 
    }, { status: 500 });
  }
}
