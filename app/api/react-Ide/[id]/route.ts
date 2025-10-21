import { readTemplateStructureFromJson, saveTemplateStructureToJson } from "@/features/react-Ide/lib/path-to-json";
import { db } from "@/lib/db";
import { reactTempelate } from "@/lib/reactTemplete";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

function validateJsonStructure(data: unknown): boolean {
    try {
        JSON.parse(JSON.stringify(data)); // Ensures it's serializable
        return true;
    } catch (error) {
        console.error("Invalid JSON structure:", error);
        return false;
    }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        return Response.json({
            error: "Missing ReactIde id"
        }, { status: 400 })
    }

    const reactIde = await db.project.findUnique({
        where: {
            id
        }
    })

    if (!reactIde) {
        return Response.json({
            error: "ReactIde not found"
        }, { status: 404 })
    }

    const templateKey = reactIde.template as keyof typeof reactTempelate
    const reactPath = reactTempelate[templateKey];

    if (!reactPath) {
        return Response.json({ error: "Invaild React Template" }, { status: 404 })
    }

    try {
        const inputPath = path.join(process.cwd(), reactPath);
        const outputFile = path.join(process.cwd(), `output/${templateKey}.json`);

        await saveTemplateStructureToJson(inputPath, outputFile)
        const result = await readTemplateStructureFromJson(outputFile);

        // Validate the JSON structure before saving
        if (!validateJsonStructure(result.items)) {
            return Response.json({ error: "Invalid JSON structure" }, { status: 500 });
        }

        await fs.unlink(outputFile);

        return Response.json({ success: true, templateJson: result }, { status: 200 });

    } catch (error) {
        console.error("Error generating react template JSON:", error);
        return Response.json({ error: "Failed to generate react template" }, { status: 500 });
    }
}