'use client'

import { Button } from "../ui/button";
import { useState } from "react";
import { RefreshCw } from "lucide-react";

export default function RefreshButton() {

    const [loading, setLoading] = useState(false);

    const handleRefresh = async () => { 
        setLoading(true);
        window.location.reload()
        
    };

  return (
    <Button onClick={handleRefresh} variant="outline">
      <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
      Refresh Data
    </Button>
  );
}
