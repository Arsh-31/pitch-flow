"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    setData(data.output || "No output received.");
    setLoading(false);
  };

  return (
    <div className="max-w-lg items-center mx-auto space-y-4 p-4">
      <h1 className="font-bold items-center mx-auto flex justify-center text-2xl mt-7 mb-6">
        PitchFlow
      </h1>
      <div className="grid w-full gap-4">
        <div className="relative w-full">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="resize-none pr-8 pb-6"
            rows={3}
            placeholder="Type your message here."
          />
          <div>
            <span
              className={`absolute bottom-1 right-2 text-sm ${
                message.length > 50 ? "text-red-600" : "text-muted-foreground"
              }`}
            >
              <span>{message.length}</span>/50
            </span>
          </div>
        </div>
        <Button onClick={generate} className="cursor-pointer">
          {loading ? "Generating..." : "Generate"}
        </Button>

        {data && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <p className="text-lg font-semibold">Generated Tagline:</p>
            <p className="mt-2 text-gray-800">{data}</p>
          </div>
        )}
      </div>
    </div>
  );
}
