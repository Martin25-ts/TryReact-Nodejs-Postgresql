import React, { useState, useEffect } from 'react';
import { Skeleton } from 'primereact/skeleton';
import { Knob } from "primereact/knob";
import { Card } from "primereact/card";

export default function income() {
  const [income, setIncome] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/get-sum-income');
        const jsonData = await response.json();
        setIncome(jsonData.body[0]); // Mengambil data pertama dari array body
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Card className="income fadeinleft animation-duration-1000" title="Income">
        {income ? (
          <Knob value={income.total_income} max={income.total_nominal} strokeWidth={5} size={200} readOnly valueColor="#436850" />
        ) : (<Skeleton className="skeleton-bar" shape="circle" size="5rem"></Skeleton> ) }
        
      </Card>
    </>
  );
}
