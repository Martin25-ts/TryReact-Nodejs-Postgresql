import React, { useState, useEffect } from 'react';
import { Skeleton } from 'primereact/skeleton';
import { Knob } from "primereact/knob";
import { Card } from "primereact/card";

export default function outcome() {

  const [outcome, setOutCome] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/get-sum-outcome');
        const jsonData = await response.json();
        setOutCome(jsonData.body[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <>
      <Card className="outcome fadeinright animation-duration-1000" title="Outcome">
        {outcome ?
          (<Knob value={outcome.total_outcome} max={outcome.total_nominal} strokeWidth={5} size={200} readOnly valueColor="#BF3131" />)
          : ((<Skeleton className="skeleton-bar" shape="circle" size="5rem"></Skeleton> ))
        }

        
      </Card>
    </>
  );
}