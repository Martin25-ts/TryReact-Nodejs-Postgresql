import React, { useState, useEffect } from "react";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";

export default function History() {
  const [incomes, setIncomes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/get-all-incomes");
        const jsonData = await response.json();
        setIncomes(jsonData.body);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {incomes ? (
        <div
          className="income-history p-4 mt-5 border-round-3xl bg-blue-50 flex flex-column gap-2"
          style={{ width: "48%" }}
        >
          {incomes &&
            incomes.map(
              (income) =>
                income.tipe === "in" && ( 
                  <div
                    key={income.id}
                    className="w-full border-bottom-2 pb-2 flex justify-content-between"
                  >
                    <div>
                      <h1>{income.tujuan}</h1>
                      <span className="text-green-600">
                        {`Rp. ${income.nominal}`}
                      </span>
                      <br />
                      <p>
                        {new Date(income.tanggal).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-column justify-content-center gap-1">
                      <Button
                        className="w-full p-1"
                        label="Delete"
                        severity="danger"
                        raised
                      />
                      <Button
                        className="w-full p-1"
                        label="Update"
                        severity="info"
                        raised
                      />
                    </div>
                  </div>
                )
            )}
        </div>
      ) : (
        <Skeleton className="mt-4" width="100%" height="auto" borderRadius="16px"></Skeleton>
      )}

      {incomes ? (
        <div
        className="outcome-history p-4 mt-5 border-round-3xl bg-blue-50 flex flex-column gap-2"
        style={{ width: "48%" }}
      >
        {incomes &&
          incomes.map(
            (income) =>
              income.tipe === "out" && (
                <div
                  key={income.id}
                  className="w-full border-bottom-2 pb-2 flex justify-content-between align-content-center"
                >
                  <div className="">
                    <h1>{income.tujuan}</h1>
                    <span className="text-red-500">{`Rp. ${income.nominal}`}</span>

                    <br />
                    <p>
                      {new Date(income.tanggal).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-column justify-content-center gap-1">
                    <Button
                      className="w-full p-1"
                      label="Delete"
                      severity="danger"
                      raised
                    />
                    <Button
                      className="w-full p-1"
                      label="Update"
                      severity="info"
                      raised
                    />
                  </div>
                </div>
              )
          )}
      </div>
      ) : (
        <Skeleton className="mt-4" width="100%" height="50vh" borderRadius="16px"></Skeleton>
      )}

      
    </>
  );
}
