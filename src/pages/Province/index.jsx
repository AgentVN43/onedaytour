import { useEffect, useState } from "react";
import { provincesService } from "../../services/provincesService";
export default function Province() {
  const [province, setProvince] = useState([]);
  const [DepartureProvince, setDepartureProvince] = useState([]);
  const [DestinationProvince, setDestinationProvince] = useState([]);
  
 

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-center mt-20 space-x-20">test</div>
    </div>
  );
}
