export async function GET() {
    return new Response(JSON.stringify(process.env), {
        headers: {
            "content-type": "application/json",
        },
    });
}
