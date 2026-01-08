import React from "react";
import { useEffect, useState } from "react";
import {useAuthContext} from "../../context/AuthContext";
import {getSuggestions} from "../../services/AIService";


function HomeUser(){
  const [loading, setLoading] = useState(false);
   const [protip, setProtip] = useState("");

  const { dashboardData, setDashboardData } = useAuthContext();

  async function loadSugg() {
    try {
      setLoading(true);
      const sg = await getSuggestions();
      // setSuggetion(sg);
      setLoading(false);
      dashboardData(sg);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!protip) {
      loadSugg();
    }
  }, []);

  return (
    <div className="p-8">
      {loading && (
        <div className="flex justify-center">
          <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
    
  </svg>
        </div>
      )}
      {!loading && protip && (
        <card className="max-w-lg mx-auto">
          <h1 className="text-2xl font-semibold">✅ Tip of this moment</h1>
          <p className="">{protip}</p>

          <button>Reload tip</button>
        </card>
      )}
    </div>
  );
}

export default HomeUser;